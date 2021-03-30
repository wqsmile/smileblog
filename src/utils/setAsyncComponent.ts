import { defineAsyncComponent, h } from "vue";
import Loading from "@/components/asyncLoader/Loading.vue";
import Error from "@/components/asyncLoader/Error.vue";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false,
});

export function setAsyncComponent(path: string) {
  return defineAsyncComponent({
    loader: () => import(/* @vite-ignore */ path),
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, "出错了！！");
      },
    },
  });
}

export function setAsyncPage(path: string) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      const component = await import(/* @vite-ignore */ path);
      NProgress.done();
      return component;
    },
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, "出错了！！");
      },
    },
  });
}
