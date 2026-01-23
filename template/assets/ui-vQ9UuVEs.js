import"./mp4-muxer-DaZBAdSD.js";const y={fps:60,bitrate:5e6,width:1920,height:1080,durationSeconds:3};function f(r,o){const a=URL.createObjectURL(r),c=document.createElement("a");c.href=a,c.download=o,c.click(),URL.revokeObjectURL(a)}const h=`
.rec {
  position: fixed;
  bottom: 16px;
  right: 16px;
  background: #1a1a1a;
  padding: 12px;
  font: 11px/1.4 monospace;
  color: #888;
  z-index: 9999;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rec-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.rec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #444;
  flex-shrink: 0;
}

.rec.has-canvas .rec-dot { background: #666; }
.rec.is-recording .rec-dot { background: #c00; }

.rec-status { color: #aaa; }

.rec select {
  background: #111;
  border: 1px solid #333;
  color: #ccc;
  font: inherit;
  padding: 4px 6px;
  flex: 1;
  min-width: 0;
}

.rec select:focus { outline: none; border-color: #555; }

.rec-nav {
  display: flex;
  gap: 4px;
}

.rec-nav button {
  flex: 1;
  background: #111;
  border: 1px solid #333;
  color: #888;
  font: inherit;
  padding: 4px 8px;
  cursor: pointer;
}

.rec-nav button:hover:not(:disabled) { color: #ccc; border-color: #555; }
.rec-nav button:disabled { color: #444; cursor: default; }

.rec-record {
  background: #111;
  border: 1px solid #333;
  color: #c44;
  font: inherit;
  padding: 6px 8px;
  cursor: pointer;
  text-align: center;
}

.rec-record:hover:not(:disabled) { background: #1a1a1a; border-color: #555; }
.rec-record:disabled { color: #444; cursor: default; }

.rec-hide { display: none !important; }

body.recording-mode .rec { display: none; }
body.recording-mode { margin: 0; padding: 0; overflow: hidden; background: #000; }
body.recording-mode canvas.recording-target {
  display: block !important;
  position: fixed;
  top: 0;
  left: 0;
}
body.recording-mode .blog-container { display: none; }
`;let l=!1;function g(){if(l)return;const r=document.createElement("style");r.textContent=h,document.head.appendChild(r),l=!0}function w(r){g();const o=document.createElement("div");o.className="rec",o.innerHTML=`
    <div class="rec-row">
      <span class="rec-dot"></span>
      <span class="rec-status">Ready</span>
    </div>
    <div class="rec-row rec-canvas-row rec-hide">
      <select class="rec-canvas"></select>
    </div>
    <div class="rec-row rec-step-row rec-hide">
      <span>Step</span>
      <span><span class="rec-current">0</span>/<span class="rec-max">0</span></span>
    </div>
    <div class="rec-nav rec-step-row rec-hide">
      <button class="rec-prev">&larr;</button>
      <button class="rec-next">&rarr;</button>
    </div>
    <button class="rec-record">Record [R]</button>
  `;const a=o.querySelector(".rec-status"),c=o.querySelector(".rec-record"),p=o.querySelector(".rec-canvas-row"),s=o.querySelector(".rec-canvas"),u=o.querySelectorAll(".rec-step-row"),v=o.querySelector(".rec-current"),b=o.querySelector(".rec-max"),d=o.querySelector(".rec-prev"),i=o.querySelector(".rec-next");r.showCanvasSelect&&p.classList.remove("rec-hide"),r.showSteps&&u.forEach(e=>e.classList.remove("rec-hide")),c.addEventListener("click",()=>{c.disabled||r.onRecord()}),s.addEventListener("change",()=>r.onCanvasChange?.(s.value)),d.addEventListener("click",()=>r.onPrev?.()),i.addEventListener("click",()=>r.onNext?.()),document.addEventListener("keydown",e=>{e.key.toLowerCase()==="r"&&!c.disabled&&r.onRecord(),r.showSteps&&(e.key==="ArrowLeft"&&r.onPrev?.(),e.key==="ArrowRight"&&r.onNext?.())});function x(e){if(o.classList.toggle("has-canvas",e.hasCanvas),o.classList.toggle("is-recording",e.isRecording),a.textContent=e.status,c.disabled=e.isRecording||!e.hasCanvas,r.showSteps){const t=e.currentStep??0,n=e.maxStep??0;v.textContent=String(t),b.textContent=String(n),d.disabled=e.isRecording||t<=0,i.disabled=e.isRecording||t>=n,c.disabled=e.isRecording||t>=n}if(r.showCanvasSelect&&e.canvases){const t=s.value;s.innerHTML=e.canvases.map(n=>`<option value="${n.key}">${n.label}</option>`).join(""),e.canvases.some(n=>n.key===t)&&(s.value=t)}}return{element:o,update:x}}export{y as D,w as c,f as d};
//# sourceMappingURL=ui-vQ9UuVEs.js.map
