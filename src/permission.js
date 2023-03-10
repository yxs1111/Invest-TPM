/*
 * @Description:
 * @Date: 2021-09-02 11:13:37
 * @LastEditTime: 2023-01-11 16:34:06
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import auth from '@/utils/auth' // get token
import getPageTitle from '@/utils/get-page-title'
import { decrypt } from '@/utils/crypto/crypto-util'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/register','/portal'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = 'FrieslandCampina iInvest System'
  // determine whether the user has logged in
  const hasToken = auth.getToken()
  if(to.path==='/login') {
    next()
    return 
  }
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/dashboard' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const auth_menus = store.getters.auth_menus && store.getters.auth_menus.length > 0
      if (auth_menus) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = auth.getUserInfo()
          console.log("setMenu");
          const menus = await getAndSetMenu()
          const info = {}
          info.roles = roles
          info.menus = menus
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', info)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          if(to.path==='/portal'&&from.path==='/login') {
            next({ path: '/dashboard' })
          } else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          console.error(error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  //No-login
  // const hasToken = 'admin-token'
  // const role = 'admin'
  // if (hasToken) {
  //   next()
  //   const accessRoutes = await store.dispatch('permission/generateRoutes', role)
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function getAndSetMenu() {
  let menus = auth.getAuthMenus()
  if (!menus) {
    menus = store.dispatch('user/getAuthMenu')
  } else {
    store.commit('user/SET_AUTH_MENUS', menus)
  }
  return menus
}
