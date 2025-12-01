const i=`<sequence name="blog-show-model">
  <tween target="stage" attr="stage-animation.camera-x" to="8" duration="1.0" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.connections" to="1" duration="0.7" easing="sine-in-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="0.7" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="0.7" easing="expo-out"></tween>
  <pause duration="0.4"></pause>
  <tween target="stage" attr="stage-animation.text-gen-t" to="1" duration="0.8" easing="sine-out"></tween>
</sequence>

<sequence name="blog-hide-model">
  <tween target="stage" attr="stage-animation.text-gen-t" to="0" duration="0.3" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="-50" duration="0.7" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.connections" to="0" duration="0.7" easing="sine-in-out"></tween>
</sequence>
`,s=`<sequence name="blog-show-training">
  <tween target="stage" attr="stage-animation.text-gen-t" to="0" duration="0.4" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="0" duration="0.7" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.7" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.7" easing="expo-out"></tween>
  <pause duration="0.2"></pause>
  <tween target="shake-driver" attr="at" to="-20 0 0" duration="0.01" easing="linear"></tween>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0.1" duration="0.01" easing="linear"></tween>
  <tween target="stage" attr="stage-animation.text-input-t" to="1" duration="0.8" easing="sine-out"></tween>
  <tween target="shake-driver" attr="at" to="10 0 0" duration="0.8" easing="linear"></tween>
  <pause duration="0.2"></pause>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0" duration="0.01" easing="linear"></tween>
</sequence>

<sequence name="blog-hide-training">
  <tween target="shake-driver" attr="at" to="10 0 0" duration="0.01" easing="linear"></tween>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0.1" duration="0.01" easing="linear"></tween>
  <tween target="stage" attr="stage-animation.text-input-t" to="0" duration="0.4" easing="sine-in"></tween>
  <tween target="shake-driver" attr="at" to="-20 0 0" duration="0.4" easing="linear"></tween>
  <pause duration="0.1"></pause>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0" duration="0.01" easing="linear"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="0.5" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="0.5" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="8" duration="0.7" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.text-gen-t" to="1" duration="0.5" easing="sine-out"></tween>
</sequence>
`,g=`<sequence name="blog-show-sampling">
  <tween target="stage" attr="stage-animation.camera-x" to="21" duration="1.0" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.collapse" to="1" duration="0.5" easing="circ-out"></tween>
  <tween target="stage" attr="stage-animation.text-gen-t" to="0" duration="0.3" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.text-input-t" to="0" duration="0.3" easing="sine-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="1.2" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="1.2" easing="expo-out"></tween>
  <tween target="camera" attr="main-camera.ortho-size" to="20" duration="1.2" easing="expo-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="1" duration="0.8" easing="sine-out"></tween>
</sequence>

<sequence name="blog-hide-sampling">
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="0" duration="0.3" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.collapse" to="0" duration="0.4" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="0" duration="0.5" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.text-input-t" to="1" duration="0.4" easing="sine-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.5" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.5" easing="expo-out"></tween>
</sequence>
`,u=`<sequence name="blog-show-scores">
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.8" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.8" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.scores-t" to="1" duration="0.8" easing="sine-out"></tween>
</sequence>

<sequence name="blog-hide-scores">
  <tween target="stage" attr="stage-animation.scores-t" to="0" duration="0.4" easing="sine-in"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="0.5" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="0.5" easing="expo-out"></tween>
</sequence>
`,w=`<sequence name="blog-show-advantage">
  <tween target="stage" attr="stage-animation.average-line-t" to="1" duration="0.6" easing="back-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="stage" attr="stage-animation.sort-t" to="1" duration="0.8" easing="back-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="shake-driver" attr="at" to="21 0 0" duration="0.01" easing="linear"></tween>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0.05" duration="0.2" easing="sine-out"></tween>
  <pause duration="0.2"></pause>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0" duration="0.2" easing="sine-in"></tween>
</sequence>

<sequence name="blog-hide-advantage">
  <tween target="stage" attr="stage-animation.sort-t" to="0" duration="0.4" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.average-line-t" to="0" duration="0.3" easing="sine-in"></tween>
</sequence>
`,c=`<sequence name="blog-show-grpo">
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="0" duration="0.4" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.average-line-t" to="0" duration="0.3" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="18" duration="1.0" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="1.0" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="1.0" easing="expo-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="stage" attr="stage-animation.text-gen-t" to="1" duration="0.6" easing="sine-out"></tween>
</sequence>

<sequence name="blog-hide-grpo">
  <tween target="stage" attr="stage-animation.text-gen-t" to="0" duration="0.3" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="21" duration="0.8" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.8" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.8" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.average-line-t" to="1" duration="0.4" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="1" duration="0.5" easing="sine-out"></tween>
</sequence>
`,d=`<sequence name="blog-show-grpo-weights">
  <tween target="stage" attr="stage-animation.token-scale-t" to="1" duration="0.8" easing="expo-out"></tween>
</sequence>

<sequence name="blog-hide-grpo-weights">
  <tween target="stage" attr="stage-animation.token-scale-t" to="0" duration="0.4" easing="sine-in"></tween>
</sequence>
`,m=`<sequence name="blog-show-gspo-weights">
  <tween target="stage" attr="stage-animation.token-scale-t" to="0" duration="0.6" easing="expo-out"></tween>
</sequence>

<sequence name="blog-hide-gspo-weights">
  <tween target="stage" attr="stage-animation.token-scale-t" to="1" duration="0.4" easing="sine-in"></tween>
</sequence>
`,p=`<sequence name="blog-show-conclusion">
  <tween target="stage" attr="stage-animation.collapse" to="0" duration="0.5" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="8" duration="1.0" easing="expo-out"></tween>
  <tween target="camera" attr="main-camera.ortho-size" to="28" duration="1.0" easing="expo-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="bounce-driver" attr="position-shaker-driver.amplitude" to="1" duration="0.01" easing="linear"></tween>
  <tween target="bounce-driver" attr="at" to="30 0 0" duration="0.6" easing="linear"></tween>
  <pause duration="0.4"></pause>
  <tween target="bounce-driver" attr="position-shaker-driver.amplitude" to="0" duration="0.01" easing="linear"></tween>
</sequence>

<sequence name="blog-hide-conclusion">
  <tween target="camera" attr="main-camera.ortho-size" to="20" duration="0.6" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="18" duration="0.8" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.collapse" to="1" duration="0.4" easing="circ-out"></tween>
</sequence>
`,l=`<sequence name="blog-generate-outputs-forward">
  <tween target="stage" attr="stage-animation.text-input-t" to="1" duration="0.8" easing="sine-out"></tween>
  <pause duration="0.5"></pause>
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="1" duration="1.0" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="21" duration="1.2" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.collapse" to="1" duration="0.8" easing="circ-out"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="1.2" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="1.2" easing="expo-out"></tween>
  <tween target="camera" attr="main-camera.ortho-size" to="20" duration="1.2" easing="expo-out"></tween>
</sequence>

<sequence name="blog-generate-outputs-reverse">
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.6" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.6" easing="expo-out"></tween>
  <tween target="camera" attr="main-camera.ortho-size" to="28" duration="0.6" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.collapse" to="0" duration="0.5" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.camera-x" to="0" duration="0.6" easing="expo-out"></tween>
  <tween target="stage" attr="stage-animation.multiple-outputs-t" to="0" duration="0.4" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.text-input-t" to="0" duration="0.4" easing="sine-in"></tween>
</sequence>
`,h=`<sequence name="blog-score-responses-forward">
  <tween target="camera" attr="orbit-camera.target-pitch" to="0" duration="0.7" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0" duration="0.7" easing="expo-out"></tween>
  <pause duration="0.2"></pause>
  <tween target="stage" attr="stage-animation.scores-t" to="1" duration="0.6" easing="sine-out"></tween>
  <tween target="stage" attr="stage-animation.average-line-t" to="1" duration="0.4" easing="sine-out"></tween>
  <pause duration="0.3"></pause>
  <tween target="stage" attr="stage-animation.sort-t" to="1" duration="1.2" easing="back-out"></tween>
  <pause duration="0.8"></pause>
  <tween target="shake-driver" attr="at" to="21 0 0" duration="0.01" easing="linear"></tween>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0.05" duration="0.2" easing="sine-out"></tween>
  <pause duration="0.2"></pause>
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0" duration="0.2" easing="sine-in"></tween>
</sequence>

<sequence name="blog-score-responses-reverse">
  <tween target="shake-driver" attr="scale-shaker-driver.amplitude" to="0" duration="0.1" easing="linear"></tween>
  <tween target="stage" attr="stage-animation.sort-t" to="0" duration="0.5" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.average-line-t" to="0" duration="0.4" easing="sine-in"></tween>
  <tween target="stage" attr="stage-animation.scores-t" to="0" duration="0.5" easing="sine-in"></tween>
  <tween target="camera" attr="orbit-camera.target-pitch" to="0.5" duration="0.8" easing="expo-out"></tween>
  <tween target="camera" attr="orbit-camera.target-yaw" to="0.6" duration="0.8" easing="expo-out"></tween>
</sequence>
`,b=`<sequence name="blog-token-weighting-forward">
  <tween target="stage" attr="stage-animation.token-scale-t" to="0" duration="0.8" easing="sine-out"></tween>
</sequence>

<sequence name="blog-token-weighting-reverse">
  <tween target="stage" attr="stage-animation.token-scale-t" to="1" duration="0.8" easing="sine-out"></tween>
</sequence>
`,x={"0-1":"blog-show-model","1-0":"blog-hide-model","1-2":"blog-show-training","2-1":"blog-hide-training","2-3":"blog-show-sampling","3-2":"blog-hide-sampling","3-4":"blog-show-scores","4-3":"blog-hide-scores","4-5":"blog-show-advantage","5-4":"blog-hide-advantage","5-6":"blog-show-grpo","6-5":"blog-hide-grpo","6-7":"blog-show-grpo-weights","7-6":"blog-hide-grpo-weights","7-8":"blog-show-gspo-weights","8-7":"blog-hide-gspo-weights","8-9":"blog-show-conclusion","9-8":"blog-hide-conclusion"},v={"0-1":"blog-generate-outputs-forward","1-0":"blog-generate-outputs-reverse"},q={"0-1":"blog-score-responses-forward","1-0":"blog-score-responses-reverse"},k={"0-1":"blog-token-weighting-forward","1-0":"blog-token-weighting-reverse"};function f(e){const n=[i,s,g,u,w,c,d,m,p];for(const t of n){const a=document.createElement("div");a.innerHTML=t.trim();for(const r of Array.from(a.children))e.appendChild(r)}}function o(e,n){const t=document.createElement("div");t.innerHTML=n.trim();for(const a of Array.from(t.children))e.appendChild(a)}function S(e){o(e,l)}function E(e){o(e,h)}function T(e){o(e,b)}const y=[{title:"The Language Model",description:"We start with a neural network that generates text one token at a time."},{title:"Training Setup",description:"To improve the model, we give it a prompt to complete. But there's no single right answer."},{title:"Sample Responses",description:"The model generates several different responses from the same prompt, giving us a batch to compare."},{title:"Score Responses",description:"A reward function scores each response based on whatever we're optimizing for."},{title:"Compare to Average",description:"Responses scoring above the group average get reinforced; below-average ones get suppressed."},{title:"GRPO",description:"So far, this is identical to GRPO. The difference is how we assign credit to individual tokens."},{title:"Token Weighting",description:"GRPO weights tokens by position, assuming some contribute more to the outcome than others."},{title:"GSPO",description:"GSPO weights all tokens equally. Good response? Reinforce the whole thing."},{title:"Better Results",description:"This simplification reduces gradient variance, leading to more stable training."}];export{v as G,y as S,k as T,S as a,E as b,T as c,x as d,q as e,f as i};
//# sourceMappingURL=step-content-DanWperp.js.map
