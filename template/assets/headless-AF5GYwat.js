function n(){return{target:"headless",async readFile(e){return Bun.file(e).text()},async readBinary(e){return Bun.file(e).arrayBuffer()},requestFrame(e){setTimeout(e,0)},now(){return performance.now()}}}export{n as createHeadlessRuntime};
//# sourceMappingURL=headless-AF5GYwat.js.map
