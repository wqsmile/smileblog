export default function fileToBlob(file: File) {
  try {
    const windowUrl = window.URL || window.webkitURL;
    return windowUrl.createObjectURL(file);
  } catch (err) {
    console.log(err);
  }
}
