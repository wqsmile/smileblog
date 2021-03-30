import { ElMessage, ElMessageBox } from "element-plus";
import { MessageType } from "element-plus/lib/el-message/src/types";

export function Message(
  type: string = "success",
  message: string = "操作成功"
) {
  ElMessage[type](message);
}

export function ConfirmMessage(
  type: MessageType = "success",
  content: string = "确定此操作吗？",
  title: string = "提示"
) {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type,
  });
}
