<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <navbar />
    <!-- <tags-view  /> -->
    <div class="content">
      <!-- <div class="sidebarWrap"> -->
        <sidebar class="sidebar-container" />
      <!-- </div> -->

      <div class="hasTagsView" :class="sidebar.opened?'main-container':'main-hideSideBar'">
        <Brand v-if="isBread"></Brand>
        <app-main />
        <!-- <div class="bottomTxt" >{{bottomTxt}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, TagsView } from "./components";
import Navbar from "./components/navbar/Navbar.vue";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import Brand from '@/components/Breadcrumb/index.vue'
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Brand
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      fixedHeader: state => state.settings.fixedHeader,
      isBread:state => state.app.isBreadcrumb
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  data() {
    return {
      bottomTxt: ""
    };
  },
  mounted() {
    console.log(this.$router)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.bottomTxt {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #192c58;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  background: #e0e6f1;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.content {
  position: relative;
  display: flex;
  height: calc(100% - 60px);
}

</style>
<style lang="scss">

  .sidebarWrap {
  // width: 280px;
  height: 100vh;
  background-color: #FFFFFF;
  overflow-y: auto;
  /*??????????????????*/
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /* //?????????????????? */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(49, 49, 49, 0.04);
    border-radius: 3px;
  }
}
</style>
