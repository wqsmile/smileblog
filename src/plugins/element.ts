import "element-plus/lib/theme-chalk/index.css";
import {
  ElButton,
  ElMain,
  ElHeader,
  ElContainer,
  ElAside,
  ElPagination,
  ElSwitch,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElSelect,
  ElOption,
  ElInput,
  ElPopover,
  ElUpload,
  ElDialog,
  ElTag,
  ElTooltip,
  ElEmpty,
  ElImage,
  ElAutocomplete,
  ElCascader,
  ElCarousel,
  ElCarouselItem,
  ElDivider,
} from "element-plus";

export default function setupElement(app: any) {
  app.use(ElButton);
  app.use(ElMain);
  app.use(ElHeader);
  app.use(ElContainer);
  app.use(ElAside);
  app.use(ElPagination);
  app.use(ElSwitch);
  app.use(ElDropdown);
  app.use(ElDropdownMenu);
  app.use(ElDropdownItem);
  app.use(ElSelect);
  app.use(ElOption);
  app.use(ElInput);
  app.use(ElPopover);
  app.use(ElUpload);
  app.use(ElDialog);
  app.use(ElTag);
  app.use(ElTooltip);
  app.use(ElEmpty);
  app.use(ElImage);
  app.use(ElAutocomplete);
  app.use(ElCascader);
  app.use(ElCarousel);
  app.use(ElCarouselItem);
  app.use(ElDivider);
}
