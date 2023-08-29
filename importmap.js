/**
 * @param {string} content - The content.
 * @returns {string} Also string, but content is encoded as a file.
 */
function importFile(content) {
  return "data:text/javascript;base64," + btoa(content);
}
const onnxruntimeWeb = `
  //await import("https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.15.0/ort.es6.min.js");
  await import("https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.14.0/ort.es6.min.js");
  //http://127.0.0.1/transformer/onnxruntime/js/common/dist/
  //await import("http://127.0.0.1/transformer/onnxruntime/js/common/dist/ort-common.js");
  //await import("http://127.0.0.1/transformer/onnxruntime/js/web/dist/ort-webgl.js");
  //await import("https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.14.0/ort.es6.min.js");
  let ONNX = globalThis.ort;
  export default ONNX;
  export {
    ONNX
  };
`;
const imports = {
  'transformers': './node_modules/@xenova/transformers/src/transformers.js',
  //"transformers": "/transformers/transformers.js_es6/src/transformers.js",
  //"transformersUtilsCore": "/transformers/transformers.js_es6/src/utils/core.js",
  "fs": importFile("export default {};"),
  "url": importFile("export default {};"),
  "path": importFile("export default {};"),
  "stream/web": importFile("export default {};"),
  "sharp": importFile("export default {};"),
  "onnxruntime-node": importFile("export default {};"),
  "onnxruntime-web": importFile(onnxruntimeWeb),
};
const importmap = document.createElement("script");
importmap.type = "importmap";
importmap.textContent = JSON.stringify({imports});
document.body.appendChild(importmap);
