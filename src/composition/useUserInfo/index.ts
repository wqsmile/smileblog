import { getInfo, setInfo } from "@/api/user";
import { ref, getCurrentInstance } from "vue";
import { Message, ConfirmMessage } from "@/utils/message";
import fileToBlob from "@/utils/fileToBlob";
import { sendImg } from "@/api/blog";

export default function useUserInfo() {
  const usernameRef = ref("");
  const profileRef = ref("logo.png");
  const descRef = ref("");
  const tagRef = ref([]);
  const imgRef = ref("");
  const upload = async () => {
    try {
      const file = ctx.$refs.inputFile.files[0];
      imgRef.value = fileToBlob(file);
      mofidyInfo("profile", file.name);
      file && sendImg(file);
    } catch (err) {
      console.log(err);
    }
  };
  (async () => {
    const res = await getInfo();
    if (res) {
      usernameRef.value = res.username;
      profileRef.value = res.profile;
      descRef.value = res.desc;
      tagRef.value = res.tag || [];
    }
  })();
  async function mofidyInfo(name, value) {
    console.log(value);

    const res = await setInfo({ [name]: value });
    if (res) {
      Message("success", "修改信息成功");
    } else {
      Message("warning", "修改信息失败");
    }
  }
  const handleSubmit = async (name, value) => {
    mofidyInfo(name, value);
  };
  const inputVisibleRef = ref(false);
  const inputValueRef = ref("");
  const handleClose = async (name, value) => {
    ConfirmMessage("success", "确定删除该标签吗？").then((res) => {
      if (res) {
        tagRef.value.splice(tagRef.value.indexOf(value), 1);
        mofidyInfo(name, tagRef.value);
      }
    });
  };
  const { ctx } = getCurrentInstance();
  const showInput = () => {
    inputVisibleRef.value = true;
    ctx.$nextTick(() => {
      ctx.$refs.saveTagInput.$refs.input.focus();
    });
  };
  const handleInputConfirm = (name, value) => {
    console.log(name, value);

    let inputValue = inputValueRef.value;
    if (inputValue) {
      tagRef.value.push(inputValue);

      mofidyInfo(name, tagRef.value);
    }
    inputVisibleRef.value = false;
    inputValueRef.value = "";
  };
  return {
    handleSubmit,
    username: usernameRef,
    profile: profileRef,
    desc: descRef,
    tag: tagRef,
    inputVisible: inputVisibleRef,
    inputValue: inputValueRef,
    showInput,
    handleClose,
    handleInputConfirm,
    img: imgRef,
    upload,
  };
}
