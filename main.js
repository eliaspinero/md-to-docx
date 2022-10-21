import { saveAs } from "file-saver";
import md2docx from "./md2docx";

const fileInput = document.getElementById("markdownFile");
const convertButton = document.getElementById("convertButton");
const urlInput = document.getElementById("url");
convertButton.addEventListener("click", (e) => {
  const url = urlInput.value;
  var file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = async function (evt) {
      const text = evt.target.result;
      await convert(text);
    };
    reader.onerror = function (evt) {
      console.log(evt);
    };
  }
if (url && !file) {
  const text = fetch(url).then(async data => convert(await data.text()));
};
});
async function convert(text) {
  const converted = await md2docx(text);
  saveAs(converted, "test.docx");
}

