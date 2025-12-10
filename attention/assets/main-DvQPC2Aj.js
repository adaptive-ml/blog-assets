import{S as q,d as tt,r as m,u as j,s as M,i as y,L as A,c as et,a as nt}from"./plugin-DQL4gMZR.js";function ot(e){const t=document.querySelector(e);return t?{btnPrev:t.querySelector(".btn-prev"),btnNext:t.querySelector(".btn-next"),counter:t.querySelector(".step-counter"),title:t.querySelector(".step-title"),description:t.querySelector(".step-description"),info:t.querySelector(".step-info")}:null}function at(e,t,n){const{steps:o,elements:i,renderDescription:d}=n,{btnPrev:a,btnNext:s,counter:r,title:w,description:p,info:u}=i,S=o.length-1;if(o.length<=1){const c=a?.closest(".step-navigator");c&&(c.style.display="none");return}const h=c=>{w&&(w.textContent=c.title),p&&(d?d(p,c.description):p.textContent=c.description)},x=()=>{if(!u)return;u.style.minHeight="";let c=0;for(const v of o)h(v),c=Math.max(c,u.offsetHeight);u.style.minHeight=`${c}px`;const b=q.target[t];h(o[b]??{title:"",description:""})};x(),window.addEventListener("resize",x),document.fonts.ready.then(x);const T=()=>{const c=q.target[t];a&&(a.disabled=c<=0),s&&(s.disabled=c>=S),r&&(r.textContent=`Step ${c+1} of ${o.length}`),h(o[c]??{title:"",description:""})};T(),a?.addEventListener("click",()=>{const c=q.target[t];c>0&&(q.target[t]=c-1)}),s?.addEventListener("click",()=>{const c=q.target[t];c<S&&(q.target[t]=c+1)}),e.registerSystem({group:"simulation",update:T})}function rt(e){const o=new DOMParser().parseFromString(e,"text/html").querySelectorAll("div.step"),i=[],d={};return o.forEach((a,s)=>{const r=a.getAttribute("data-title")??"",w=a.getAttribute("data-description")??"";i.push({title:r,description:w});const p=a.getElementsByTagName("sequence");if(p.length>=1){const u=p[0].getAttribute("name");u&&(d[`${s-1}-${s}`]=u)}if(p.length>=2){const u=p[1].getAttribute("name");u&&(d[`${s}-${s-1}`]=u)}}),{steps:i,sequenceMap:d}}var z={ui8:"ui8",ui16:"ui16",ui32:"ui32",f32:"f32",eid:"eid"},P={i8:"Int8",ui8:"Uint8",ui8c:"Uint8Clamped",i16:"Int16",ui16:"Uint16",i32:"Int32",ui32:"Uint32",eid:"Uint32",f32:"Float32",f64:"Float64"},k={i8:Int8Array,ui8:Uint8Array,ui8c:Uint8ClampedArray,i16:Int16Array,ui16:Uint16Array,i32:Int32Array,ui32:Uint32Array,f32:Float32Array,f64:Float64Array,eid:Uint32Array},_={uint8:2**8,uint16:2**16},st=e=>t=>Math.ceil(t/e)*e,it=st(4),dt=Symbol("storeRef"),B=Symbol("storeSize"),ct=Symbol("storeMaps"),X=Symbol("storeFlattened"),Y=Symbol("storeBase"),lt=Symbol("storeType"),V=Symbol("storeArrayElementCounts"),$=Symbol("storeSubarrays"),F=Symbol("subarrayCursors"),pt=Symbol("subarray"),I=Symbol("parentArray"),wt=Symbol("tagStore"),W=Symbol("indexType"),H=Symbol("indexBytes"),D=Symbol("isEidType"),f={},ut=(e,t)=>{const n=t*k[e].BYTES_PER_ELEMENT,o=new ArrayBuffer(n),i=new k[e](o);return i[D]=e===z.eid,i},mt=(e,t,n)=>{const o=e[B],i=Array(o).fill(0);i[lt]=t,i[D]=t===z.eid;const d=e[F],a=n<=_.uint8?z.ui8:n<=_.uint16?z.ui16:z.ui32;if(!n)throw new Error("bitECS - Must define component array length");if(!k[t])throw new Error(`bitECS - Invalid component array property type ${t}`);if(!e[$][t]){const w=e[V][t],p=new k[t](it(w*o));p[W]=P[a],p[H]=k[a].BYTES_PER_ELEMENT,e[$][t]=p}const s=d[t],r=s+o*n;d[t]=r,i[I]=e[$][t].subarray(s,r);for(let w=0;w<o;w++){const p=n*w,u=p+n;i[w]=i[I].subarray(p,u),i[w][W]=P[a],i[w][H]=k[a].BYTES_PER_ELEMENT,i[w][pt]=!0}return i},R=e=>Array.isArray(e)&&typeof e[0]=="string"&&typeof e[1]=="number",ft=(e,t)=>{const n=Symbol("store");if(!e||!Object.keys(e).length)return f[n]={[B]:t,[wt]:!0,[Y]:()=>f[n]},f[n];e=JSON.parse(JSON.stringify(e));const o={},i=a=>{const s=Object.keys(a);for(const r of s)R(a[r])?(o[a[r][0]]||(o[a[r][0]]=0),o[a[r][0]]+=a[r][1]):a[r]instanceof Object&&i(a[r])};i(e);const d={[B]:t,[ct]:{},[$]:{},[dt]:n,[F]:Object.keys(k).reduce((a,s)=>({...a,[s]:0}),{}),[X]:[],[V]:o};if(e instanceof Object&&Object.keys(e).length){const a=(s,r)=>{if(typeof s[r]=="string")s[r]=ut(s[r],t),s[r][Y]=()=>f[n],d[X].push(s[r]);else if(R(s[r])){const[w,p]=s[r];s[r]=mt(d,w,p),s[r][Y]=()=>f[n],d[X].push(s[r])}else s[r]instanceof Object&&(s[r]=Object.keys(s[r]).reduce(a,s[r]));return s};return f[n]=Object.assign(Object.keys(e).reduce(a,e),d),f[n][Y]=()=>f[n],f[n]}},gt=1e5,yt=gt,ht=()=>yt,xt=(e,t)=>{const n=ft(e,ht());return e&&Object.keys(e).length,n},g=z;const l=xt({color:g.ui32,padding:g.f32,thickness:g.f32,transition:g.f32,initialized:g.ui8,lineTop:g.eid,lineRight:g.eid,lineBottom:g.eid,lineLeft:g.eid}),N=tt([l,m]);function L(e,t,n){const o=e.createEntity();return e.addComponent(o,m,{posX:0,posY:0,posZ:0}),e.addComponent(o,y,{offsetX:0,offsetY:0,offsetZ:0,color:t,thickness:n,visible:1}),o}const Z={group:"simulation",update(e){for(const t of N(e.world)){if(l.initialized[t])continue;const n=l.color[t],o=l.thickness[t];l.lineTop[t]=L(e,n,o),l.lineRight[t]=L(e,n,o),l.lineBottom[t]=L(e,n,o),l.lineLeft[t]=L(e,n,o),l.initialized[t]=1}}},Q={group:"simulation",after:[Z],update(e){for(const t of N(e.world)){if(!l.initialized[t])continue;let n,o;if(e.hasComponent(t,j))n=j.width[t],o=j.fontSize[t];else{console.warn("border: bounds not implemented for non-text entities");continue}if(n===0)continue;const i=M.posX[t],d=M.posY[t],a=M.posZ[t],s=l.padding[t],r=Math.max(0,Math.min(1,l.transition[t])),w=n/2+s,p=o/2+s,u=i-w,S=i+w,h=d+p,x=d-p,T=S-u,c=h-x,b=l.lineTop[t],v=l.lineRight[t],E=l.lineBottom[t],C=l.lineLeft[t];m.posX[b]=u,m.posY[b]=h,m.posZ[b]=a,y.offsetX[b]=T*r,y.offsetY[b]=0,m.posX[v]=S,m.posY[v]=h,m.posZ[v]=a,y.offsetX[v]=0,y.offsetY[v]=-c*r,m.posX[E]=u,m.posY[E]=x,m.posZ[E]=a,y.offsetX[E]=T*r,y.offsetY[E]=0,m.posX[C]=u,m.posY[C]=x,m.posZ[C]=a,y.offsetX[C]=0,y.offsetY[C]=c*r}}},bt={group:"simulation",after:[Q],update(e){for(const t of N(e.world))if(!e.exists(t)){const n=l.lineTop[t],o=l.lineRight[t],i=l.lineBottom[t],d=l.lineLeft[t];e.exists(n)&&e.destroyEntity(n),e.exists(o)&&e.destroyEntity(o),e.exists(i)&&e.destroyEntity(i),e.exists(d)&&e.destroyEntity(d)}}},vt={systems:[Z,Q,bt],components:{Border:l},config:{defaults:{border:{color:16777215,padding:0,thickness:1.5,transition:1}}}},kt=`<entity name="controller-setup" step-controller></entity>
<entity name="camera-target-setup" transform="pos: -3.17 0 0"></entity>
<orbit-camera
  name="camera-setup"
  target="camera-target-setup"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens" transform="pos: -3 0 0" gap="0.7" align="center">
  <word name="token-the" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-the" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-the" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x1" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-dog" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-dog" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x2" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-was" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-was" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x3" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="nn-arrow" transform="pos: 0.55 0 0; scale: 0 0 0" line="offset: 1.5 0 0; color: 0x3d4852; thickness: 4; arrow-end: 1; arrow-size: 0.4"></entity>

<word name="token-output" text="barking" font-size="0.8" transform="pos: 4.2 0 0; scale: 0 0 0" color="#b85a2d" border="padding: 0.2; thickness: 2; color: 0x8a4221; transition: 0">
  <word name="label-yhat" text="ŷ" transform="pos: 0 -1.1 0" font-size="0.6" color="#b85a2d">
    <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#b85a2d"></word>
  </word>
</word>

<div class="step" data-title="Input tokens" data-description="We start with a sequence of input tokens—&lt;span class=&quot;token-input&quot;&gt;&quot;the&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;was&quot;&lt;/span&gt;."></div>

<div class="step" data-title="Word embeddings" data-description="Each token maps to a vector representing its meaning, referred to as its &lt;span class=&quot;token-embedding&quot;&gt;embedding&lt;/span&gt;. The &lt;span class=&quot;token-embedding&quot;&gt;embedding&lt;/span&gt; of &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; contains the meaning of dog.">
  <sequence name="show-embeddings">
    <tween target="camera-target-setup" attr="transform.posX" to="-3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-target-setup" attr="transform.posY" to="3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-setup" attr="main-camera.ortho-size" to="10" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-pitch" to="0.3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-yaw" to="0.5" duration="0.6" easing="expo-out"></tween>
    <tween target="arrow-the" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-the" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.08"></pause>
    <tween target="arrow-dog" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-dog" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.08"></pause>
    <tween target="arrow-was" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-was" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-embeddings">
    <tween target="pivot-the" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="pivot-dog" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="pivot-was" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="arrow-the" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="arrow-dog" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="arrow-was" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="camera-target-setup" attr="transform.posX" to="-3.17" duration="0.4" easing="expo-out"></tween>
    <tween target="camera-target-setup" attr="transform.posY" to="0" duration="0.4" easing="expo-out"></tween>
    <tween target="camera-setup" attr="main-camera.ortho-size" to="11" duration="0.4" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-pitch" to="0" duration="0.4" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-yaw" to="0" duration="0.4" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Next-token prediction" data-description="These &lt;span class=&quot;token-embedding&quot;&gt;embeddings&lt;/span&gt; are fed to a neural network, which predicts the most likely next token. Here it outputs &lt;span class=&quot;token-output&quot;&gt;&quot;barking&quot;&lt;/span&gt;.">
  <sequence name="show-output">
    <tween target="pivot-the" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="pivot-dog" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="pivot-was" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="arrow-the" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="arrow-dog" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="arrow-was" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="camera-target-setup" attr="transform.posX" to="0.5" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-target-setup" attr="transform.posY" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="main-camera.ortho-size" to="11" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-pitch" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-yaw" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="nn-arrow" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="token-output" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="token-output" attr="border.transition" to="1" duration="1.0" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-output">
    <tween target="nn-arrow" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="token-output" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="token-output" attr="border.transition" to="0" duration="0.2" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="camera-target-setup" attr="transform.posX" to="-3" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-target-setup" attr="transform.posY" to="3" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="main-camera.ortho-size" to="10" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-pitch" to="0.3" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-setup" attr="orbit-camera.target-yaw" to="0.5" duration="0.5" easing="expo-out"></tween>
    <tween target="arrow-the" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-the" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="arrow-dog" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-dog" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="arrow-was" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-was" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
  </sequence>
</div>
`,qt=`<entity name="controller-problem" step-controller></entity>
<entity name="camera-target-problem" transform="pos: -4.5 0 0"></entity>
<orbit-camera
  name="camera-problem"
  target="camera-target-problem"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens-problem" transform="pos: -4.5 0 0" gap="0.7" align="center">
  <word name="token-the-p" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the-p" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-the-p" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-the-p" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x1-p" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-hot-p" text="hot" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-hot-p" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-hot-p" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-hot-p" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x2-p" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog-p" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog-p" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-dog-p" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-dog-p" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x3-p" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was-p" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was-p" transform="pos: 0 0.7 0; scale: 0 0 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-was-p" transform="pos: 0 2 0; scale: 0 0 0">
      <renderer name="embed-was-p" transform="pos: 0 2 0" size="0.4 4 0.4" color="#6b4c8a"></renderer>
    </entity>
    <word name="label-x4-p" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="nn-arrow-p" transform="pos: 0 0 0; scale: 0 0 0" line="offset: 1.5 0 0; color: 0x3d4852; thickness: 4; arrow-end: 1; arrow-size: 0.4"></entity>

<word name="token-output-p" text="panting?" font-size="0.8" transform="pos: 3.65 0 0; scale: 0 0 0" color="#b85a2d" border="padding: 0.2; thickness: 2; color: 0x8a4221; transition: 0">
  <word name="label-yhat-p" text="ŷ" transform="pos: 0 -1.1 0" font-size="0.6" color="#b85a2d">
    <word text="5" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#b85a2d"></word>
  </word>
</word>

<div class="step" data-title="Input tokens" data-description="We now have the input tokens &lt;span class=&quot;token-input&quot;&gt;&quot;the&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;was&quot;&lt;/span&gt;."></div>

<div class="step" data-title="Dog embedding" data-description="The &lt;span class=&quot;token-embedding&quot;&gt;embedding&lt;/span&gt; of &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; is exactly the same as in the previous example.">
  <sequence name="show-dog-embedding">
    <tween target="camera-target-problem" attr="transform.posY" to="3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="10" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0.3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0.5" duration="0.6" easing="expo-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-dog-p" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-dog-embedding">
    <tween target="pivot-dog-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="camera-target-problem" attr="transform.posY" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="11" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0" duration="0.3" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Hot embedding" data-description="The &lt;span class=&quot;token-embedding&quot;&gt;embedding&lt;/span&gt; of &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt; encodes the meaning of hot.">
  <sequence name="show-hot-embedding">
    <tween target="arrow-hot-p" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-hot-p" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-hot-embedding">
    <tween target="pivot-hot-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="arrow-hot-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Next-token prediction" data-description="The model may naturally predict &lt;span class=&quot;token-output&quot;&gt;&quot;panting&quot;&lt;/span&gt;. But this isn't the most likely interpretation of &quot;hot dog&quot;.">
  <sequence name="show-prediction">
    <tween target="pivot-hot-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="pivot-dog-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="arrow-hot-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="camera-target-problem" attr="transform.posX" to="-1.5" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-target-problem" attr="transform.posY" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="11" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0" duration="0.5" easing="expo-out"></tween>
    <tween target="nn-arrow-p" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="token-output-p" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="token-output-p" attr="border.transition" to="1" duration="1.0" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-prediction">
    <tween target="nn-arrow-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="token-output-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="token-output-p" attr="border.transition" to="0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="camera-target-problem" attr="transform.posX" to="-4.5" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-target-problem" attr="transform.posY" to="3" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="10" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0.3" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0.5" duration="0.3" easing="expo-out"></tween>
    <tween target="arrow-hot-p" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="pivot-hot-p" attr="scale" to="1 1 1" duration="0.25" easing="expo-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="pivot-dog-p" attr="scale" to="1 1 1" duration="0.25" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Contextual meaning" data-description="The meaning of &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; should ideally change when in the context of &quot;hot dog&quot;. This is where attention comes in.">
  <sequence name="show-contextual">
    <tween target="nn-arrow-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="token-output-p" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="token-output-p" attr="border.transition" to="0" duration="0.3" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="camera-target-problem" attr="transform.posX" to="-4.5" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-target-problem" attr="transform.posY" to="3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="10" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0.3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0.5" duration="0.6" easing="expo-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="pivot-dog-p" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-contextual">
    <tween target="pivot-dog-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="arrow-dog-p" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="camera-target-problem" attr="transform.posX" to="-1.5" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-target-problem" attr="transform.posY" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="main-camera.ortho-size" to="11" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-pitch" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-problem" attr="orbit-camera.target-yaw" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="nn-arrow-p" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="token-output-p" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="token-output-p" attr="border.transition" to="1" duration="0.6" easing="expo-out"></tween>
  </sequence>
</div>
`,zt=`<entity name="controller-dot-product" step-controller></entity>
<entity name="camera-target-dot-product" transform="pos: 0 0 0"></entity>
<orbit-camera
  name="camera-dot-product"
  target="camera-target-dot-product"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<!-- Vector a (green) - column layout -->
<entity name="vector-a" transform="pos: -2 0 0">
  <!-- Left bracket -->
  <entity name="bracket-a-left" transform="pos: -0.6 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: 0.15 0 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: 0.15 0 0; color: 0x107d32; thickness: 3"></entity>
  </entity>
  <!-- Numbers (vertical column, centered) -->
  <entity name="numbers-a" transform="pos: 0 0 0">
    <word text="2" font-size="0.5" transform="pos: 0 1.2 0" color="#107d32"></word>
    <word text="4" font-size="0.5" transform="pos: 0 0.4 0" color="#107d32"></word>
    <word text="1" font-size="0.5" transform="pos: 0 -0.4 0" color="#107d32"></word>
    <word text="3" font-size="0.5" transform="pos: 0 -1.2 0" color="#107d32"></word>
  </entity>
  <!-- Right bracket -->
  <entity name="bracket-a-right" transform="pos: 0.6 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: -0.15 0 0; color: 0x107d32; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: -0.15 0 0; color: 0x107d32; thickness: 3"></entity>
  </entity>
  <!-- Label -->
  <word name="label-a" text="a" font-size="0.6" transform="pos: 0 -2.5 0" color="#107d32"></word>
</entity>

<!-- Vector b (blue) - column layout -->
<entity name="vector-b" transform="pos: 2 0 0">
  <!-- Left bracket -->
  <entity name="bracket-b-left" transform="pos: -0.6 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: 0.15 0 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: 0.15 0 0; color: 0x275af1; thickness: 3"></entity>
  </entity>
  <!-- Numbers (vertical column, centered) -->
  <entity name="numbers-b" transform="pos: 0 0 0">
    <word text="3" font-size="0.5" transform="pos: 0 1.2 0" color="#275af1"></word>
    <word text="2" font-size="0.5" transform="pos: 0 0.4 0" color="#275af1"></word>
    <word text="4" font-size="0.5" transform="pos: 0 -0.4 0" color="#275af1"></word>
    <word text="2" font-size="0.5" transform="pos: 0 -1.2 0" color="#275af1"></word>
  </entity>
  <!-- Right bracket -->
  <entity name="bracket-b-right" transform="pos: 0.6 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: -0.15 0 0; color: 0x275af1; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: -0.15 0 0; color: 0x275af1; thickness: 3"></entity>
  </entity>
  <!-- Label -->
  <word name="label-b" text="b" font-size="0.6" transform="pos: 0 -2.5 0" color="#275af1"></word>
</entity>

<!-- Element-wise product a ⊙ b - starts hidden -->
<entity name="vector-product" transform="pos: 6 0 0; scale: 0 0 0">
  <!-- Left bracket -->
  <entity name="bracket-product-left" transform="pos: -0.8 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: 0.15 0 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: 0.15 0 0; color: 0x28282a; thickness: 3"></entity>
  </entity>
  <!-- Numbers: 2*3=6, 4*2=8, 1*4=4, 3*2=6 -->
  <entity name="numbers-product" transform="pos: 0 0 0">
    <word text="6" font-size="0.5" transform="pos: 0 1.2 0" color="#28282a"></word>
    <word text="8" font-size="0.5" transform="pos: 0 0.4 0" color="#28282a"></word>
    <word text="4" font-size="0.5" transform="pos: 0 -0.4 0" color="#28282a"></word>
    <word text="6" font-size="0.5" transform="pos: 0 -1.2 0" color="#28282a"></word>
  </entity>
  <!-- Right bracket -->
  <entity name="bracket-product-right" transform="pos: 0.8 0 0">
    <entity transform="pos: 0 0 0" line="offset: 0 1.8 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 0 0" line="offset: 0 -1.8 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 1.8 0" line="offset: -0.15 0 0; color: 0x28282a; thickness: 3"></entity>
    <entity transform="pos: 0 -1.8 0" line="offset: -0.15 0 0; color: 0x28282a; thickness: 3"></entity>
  </entity>
  <!-- Label -->
  <word name="label-product" text="a ⊙ b" font-size="0.6" transform="pos: 0 -2.5 0" color="#28282a"></word>
</entity>

<!-- Hadamard symbol (between a and b) - for element-wise product -->
<word name="hadamard-symbol" text="⊙" font-size="0.8" transform="pos: 0 0 0; scale: 0 0 0" color="#28282a"></word>

<!-- Dot symbol (between a and b) - for dot product -->
<word name="dot-symbol" text="·" font-size="0.8" transform="pos: 0 0 0; scale: 0 0 0" color="#28282a"></word>

<!-- Equals symbol -->
<word name="equals-symbol" text="=" font-size="0.8" transform="pos: 4 0 0; scale: 0 0 0" color="#28282a"></word>

<!-- Sum result: 6 + 8 + 4 + 6 = 24 -->
<word name="sum-result" text="24" font-size="0.8" transform="pos: 6 0 0; scale: 0 0 0" color="#28282a"></word>

<!-- Sum label -->
<word name="label-sum" text="a · b" font-size="0.6" transform="pos: 6 -2.5 0; scale: 0 0 0" color="#28282a"></word>

<!-- Scaled result: 24/√4 = 12 -->
<entity name="fraction-line" transform="pos: 6 0 0; scale: 0 0 0">
  <entity transform="pos: 0 0 0" line="offset: 0.6 0 0; color: 0x28282a; thickness: 2"></entity>
  <entity transform="pos: 0 0 0" line="offset: -0.6 0 0; color: 0x28282a; thickness: 2"></entity>
</entity>
<word name="denominator" text="√4" font-size="0.6" transform="pos: 6 -0.6 0; scale: 0 0 0" color="#28282a"></word>
<word name="equals-scaled" text="=" font-size="0.8" transform="pos: 7.5 0 0; scale: 0 0 0" color="#28282a"></word>
<word name="scaled-result" text="12" font-size="0.8" transform="pos: 9 0 0; scale: 0 0 0" color="#28282a"></word>

<div class="step" data-title="Vector similarity" data-description="We have two vectors &lt;span class=&quot;concept-query&quot;&gt;a&lt;/span&gt; and &lt;span class=&quot;concept-key&quot;&gt;b&lt;/span&gt;, and we want to measure how similar they are. To do that, we use the dot product."></div>

<div class="step" data-title="Element-wise product" data-description="First, we multiply corresponding components: &lt;span class=&quot;concept-query&quot;&gt;a&lt;/span&gt; ⊙ &lt;span class=&quot;concept-key&quot;&gt;b&lt;/span&gt;.">
  <sequence name="show-product">
    <tween target="hadamard-symbol" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="equals-symbol" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="vector-product" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-target-dot-product" attr="transform.posX" to="2" duration="0.6" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-product">
    <tween target="vector-product" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="equals-symbol" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="hadamard-symbol" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="camera-target-dot-product" attr="transform.posX" to="0" duration="0.3" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Compute the sum" data-description="Then, we add up the results to get a single number, the dot product: &lt;span class=&quot;concept-query&quot;&gt;a&lt;/span&gt; · &lt;span class=&quot;concept-key&quot;&gt;b&lt;/span&gt; = 24. This can also be written as &lt;span class=&quot;concept-query&quot;&gt;a&lt;/span&gt;&lt;sup&gt;T&lt;/sup&gt;&lt;span class=&quot;concept-key&quot;&gt;b&lt;/span&gt;.">
  <sequence name="show-sum">
    <tween target="hadamard-symbol" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="vector-product" attr="scale" to="0 0 0" duration="0.4" easing="expo-out"></tween>
    <tween target="dot-symbol" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="sum-result" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="label-sum" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-sum">
    <tween target="sum-result" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="label-sum" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="dot-symbol" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="hadamard-symbol" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="vector-product" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Scale by √d" data-description="We divide by √d (where d=4 is our dimension count) to keep values manageable. This gives us 24/√4 = 12.">
  <sequence name="show-scaled">
    <tween target="label-sum" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="sum-result" attr="transform.posY" to="0.5" duration="0.4" easing="expo-out"></tween>
    <tween target="fraction-line" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="denominator" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="equals-scaled" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="scaled-result" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="camera-target-dot-product" attr="transform.posX" to="3.5" duration="0.6" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-scaled">
    <tween target="scaled-result" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="equals-scaled" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="denominator" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="fraction-line" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="sum-result" attr="transform.posY" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="label-sum" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-target-dot-product" attr="transform.posX" to="2" duration="0.3" easing="expo-out"></tween>
  </sequence>
</div>
`,St=`<entity name="controller-query-key" step-controller></entity>
<entity name="camera-target-query-key" transform="pos: -4.5 1.5 0"></entity>
<orbit-camera
  name="camera-query-key"
  target="camera-target-query-key"
  current-distance="12"
  target-distance="12"
  current-yaw="0.5"
  target-yaw="0.5"
  current-pitch="0.3"
  target-pitch="0.3"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 10"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens-qk" transform="pos: -4.5 0 0" gap="0.7" align="center">
  <word name="token-the-qk" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the-qk" transform="pos: 0 0.7 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-the-qk" transform="pos: 0 2 0">
      <renderer name="embed-the-qk" transform="pos: 0 1.25 0" size="0.4 2.5 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-the" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-the" transform="pos: 0 3.8 0; scale: 0 0 0">
        <renderer name="k-vec-the" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k1" text="k" transform="pos: 0 2.3 0" font-size="0.6" color="#275af1">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-the" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0.5 1.0 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-the" transform="pos: 0.5 4.1 0; scale: 0 0 0">
        <renderer name="v-vec-the" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v1" text="v" transform="pos: 0 2.0 0" font-size="0.5" color="#aa4d00">
          <word text="1" transform="pos: 0.22 -0.14 0" font-size="0.35" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x1-qk" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-hot-qk" text="hot" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-hot-qk" transform="pos: 0 0.7 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-hot-qk" transform="pos: 0 2 0">
      <renderer name="embed-hot-qk" transform="pos: 0 1.25 0" size="0.4 2.5 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-hot" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-hot" transform="pos: 0 3.8 0; scale: 0 0 0">
        <renderer name="k-vec-hot" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k2" text="k" transform="pos: 0 2.3 0" font-size="0.6" color="#275af1">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-hot" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0.5 1.0 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-hot" transform="pos: 0.5 4.1 0; scale: 0 0 0">
        <renderer name="v-vec-hot" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v2" text="v" transform="pos: 0 2.0 0" font-size="0.5" color="#aa4d00">
          <word text="2" transform="pos: 0.22 -0.14 0" font-size="0.35" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x2-qk" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog-qk" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog-qk" transform="pos: 0 0.7 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-dog-qk" transform="pos: 0 2 0">
      <renderer name="embed-dog-qk" transform="pos: 0 1.25 0" size="0.4 2.5 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-dog" transform="pos: -0.15 2.8 0; scale: 0 0 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-dog" transform="pos: -0.8 3.8 0; scale: 0 0 0">
        <renderer name="q-vec-dog" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q3" text="q" transform="pos: 0 2.3 0" font-size="0.6" color="#107d32">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-dog" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-dog" transform="pos: 0 3.8 0; scale: 0 0 0">
        <renderer name="k-vec-dog" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k3" text="k" transform="pos: 0 2.3 0" font-size="0.6" color="#275af1">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-dog" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0.5 1.0 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-dog" transform="pos: 0.5 4.1 0; scale: 0 0 0">
        <renderer name="v-vec-dog" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v3" text="v" transform="pos: 0 2.0 0" font-size="0.5" color="#aa4d00">
          <word text="3" transform="pos: 0.22 -0.14 0" font-size="0.35" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x3-qk" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was-qk" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was-qk" transform="pos: 0 0.7 0" line="offset: 0 1 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.2"></entity>
    <entity name="pivot-was-qk" transform="pos: 0 2 0">
      <renderer name="embed-was-qk" transform="pos: 0 1.25 0" size="0.4 2.5 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-was" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-was" transform="pos: 0 3.8 0; scale: 0 0 0">
        <renderer name="k-vec-was" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k4" text="k" transform="pos: 0 2.3 0" font-size="0.6" color="#275af1">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-was" transform="pos: 0 2.8 0; scale: 0 0 0" line="offset: 0.5 1.0 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-was" transform="pos: 0.5 4.1 0; scale: 0 0 0">
        <renderer name="v-vec-was" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v4" text="v" transform="pos: 0 2.0 0" font-size="0.5" color="#aa4d00">
          <word text="4" transform="pos: 0.22 -0.14 0" font-size="0.35" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x4-qk" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="dot-product-label-qk" transform="pos: -4.5 10 0; scale: 0 0 0">
  <word text="q" transform="pos: -0.9 0 0" font-size="0.7" color="#107d32">
    <word text="3" transform="pos: 0.35 -0.2 0" font-size="0.45" color="#107d32"></word>
  </word>
  <word text="·" font-size="0.7" color="#666666"></word>
  <word text="k" transform="pos: 0.5 0 0" font-size="0.7" color="#275af1">
    <word text="2" transform="pos: 0.35 -0.2 0" font-size="0.45" color="#275af1"></word>
  </word>
</entity>

<entity name="full-equation-label" transform="pos: -4.5 10 0; scale: 0 0 0">
  <word text="q" transform="pos: -0.5 0 0" font-size="0.7" color="#107d32">
    <word text="3" transform="pos: 0.35 -0.2 0" font-size="0.45" color="#107d32"></word>
  </word>
  <word text="K" transform="pos: 0.3 0 0" font-size="0.7" color="#275af1">
    <word text="T" transform="pos: 0.45 0.25 0" font-size="0.4" color="#275af1"></word>
  </word>
</entity>

<div class="step" data-title="Input tokens" data-description="We have our input tokens &lt;span class=&quot;token-input&quot;&gt;&quot;the&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;, &lt;span class=&quot;token-input&quot;&gt;&quot;was&quot;&lt;/span&gt; with their &lt;span class=&quot;token-embedding&quot;&gt;embedding vectors&lt;/span&gt;."></div>

<div class="step" data-title="Query projection" data-description="We project &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; (&lt;span class=&quot;katex-inline&quot;&gt;x_3&lt;/span&gt;) to a vector called &lt;span class=&quot;katex-inline concept-query&quot;&gt;q_3&lt;/span&gt;, referred to as the &lt;span class=&quot;concept-query&quot;&gt;query vector&lt;/span&gt;. This vector asks: &lt;i&gt;&quot;what am I looking for?&quot;&lt;/i&gt;">
  <sequence name="show-q-dog">
    <tween target="input-tokens-qk" attr="paragraph.gap" to="1.5" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="orbit-camera.targetYaw" to="0" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="orbit-camera.targetPitch" to="0" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-target-query-key" attr="transform.posY" to="5" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="main-camera.ortho-size" to="13" duration="0.6" easing="expo-out"></tween>
    <tween target="q-arrow-dog" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="pivot-q-dog" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-q-dog">
    <tween target="pivot-q-dog" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="q-arrow-dog" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="input-tokens-qk" attr="paragraph.gap" to="0.7" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="orbit-camera.targetYaw" to="0.5" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="orbit-camera.targetPitch" to="0.3" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-target-query-key" attr="transform.posY" to="1.5" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-query-key" attr="main-camera.ortho-size" to="10" duration="0.3" easing="expo-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Key projection" data-description="We project &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt; (&lt;span class=&quot;katex-inline&quot;&gt;x_2&lt;/span&gt;) to a vector called &lt;span class=&quot;katex-inline concept-key&quot;&gt;k_2&lt;/span&gt;, referred to as the &lt;span class=&quot;concept-key&quot;&gt;key vector&lt;/span&gt;. This vector says: &lt;i&gt;&quot;here's what I provide&quot;&lt;/i&gt;. The dot product &lt;span class=&quot;katex-inline concept-query&quot;&gt;q_3&lt;/span&gt; · &lt;span class=&quot;katex-inline concept-key&quot;&gt;k_2&lt;/span&gt; gives us an &lt;span class=&quot;concept-attention&quot;&gt;attention score&lt;/span&gt; — the amount &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; attends to &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt;.">
  <sequence name="show-k-hot">
    <tween target="k-arrow-hot" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <tween target="pivot-k-hot" attr="scale" to="1 1 1" duration="0.5" easing="expo-out"></tween>
    <tween target="dot-product-label-qk" attr="scale" to="1 1 1" duration="0.5" easing="back-out"></tween>
  </sequence>
  <sequence name="hide-k-hot">
    <tween target="dot-product-label-qk" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-k-hot" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="k-arrow-hot" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Attention scores" data-description="We do the same for every &lt;span class=&quot;concept-key&quot;&gt;key&lt;/span&gt; to get our &lt;span class=&quot;concept-attention&quot;&gt;attention scores&lt;/span&gt;, &lt;span class=&quot;katex-inline concept-query&quot;&gt;q_3&lt;/span&gt;&lt;span class=&quot;katex-inline concept-key&quot;&gt;K&lt;/span&gt;&lt;sup&gt;T&lt;/sup&gt;. This is the amount &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; attends to every other token.">
  <sequence name="show-all-keys">
    <tween target="dot-product-label-qk" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="k-arrow-the" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-k-the" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="k-arrow-dog" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-k-dog" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="k-arrow-was" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-k-was" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="full-equation-label" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
  </sequence>
  <sequence name="hide-all-keys">
    <tween target="full-equation-label" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-k-was" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="k-arrow-was" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-k-dog" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="k-arrow-dog" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-k-the" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="k-arrow-the" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="dot-product-label-qk" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
  </sequence>
</div>
`,Tt=`<entity name="controller-attention-weights" step-controller></entity>
<entity name="camera-target-attention-weights" transform="pos: -4.5 3.5 0"></entity>
<orbit-camera
  name="camera-attention-weights"
  target="camera-target-attention-weights"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens-aw" transform="pos: -4.5 0 0" gap="1.5" align="center">
  <word name="token-the-aw" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the-aw" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-the-aw" transform="pos: 0 1.5 0">
      <renderer name="embed-the-aw" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-the-aw" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-the-aw" transform="pos: 0 2.2 0">
        <renderer name="k-vec-the-aw" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="score-k1" text="8" transform="pos: 0 2.35 0" font-size="0.7" color="#c23a3a"></word>
        <word name="scaled-k1" text="1" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
        <word name="weight-k1" text="0.09" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
      </entity>
    </entity>
    <word name="label-x1-aw" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-hot-aw" text="hot" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-hot-aw" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-hot-aw" transform="pos: 0 1.5 0">
      <renderer name="embed-hot-aw" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-hot-aw" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-hot-aw" transform="pos: 0 2.2 0">
        <renderer name="k-vec-hot-aw" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="score-k2" text="16" transform="pos: 0 2.35 0" font-size="0.7" color="#c23a3a"></word>
        <word name="scaled-k2" text="2" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
        <word name="weight-k2" text="0.23" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
      </entity>
    </entity>
    <word name="label-x2-aw" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog-aw" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog-aw" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-dog-aw" transform="pos: 0 1.5 0">
      <renderer name="embed-dog-aw" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-dog-aw" transform="pos: -0.15 1.2 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-dog-aw" transform="pos: -0.8 2.2 0">
        <renderer name="q-vec-dog-aw" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
      </entity>
      <entity name="k-arrow-dog-aw" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-dog-aw" transform="pos: 0 2.2 0">
        <renderer name="k-vec-dog-aw" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="score-k3" text="24" transform="pos: 0 2.35 0" font-size="0.7" color="#c23a3a"></word>
        <word name="scaled-k3" text="3" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
        <word name="weight-k3" text="0.63" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
      </entity>
    </entity>
    <word name="label-x3-aw" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was-aw" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was-aw" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-was-aw" transform="pos: 0 1.5 0">
      <renderer name="embed-was-aw" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-was-aw" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-was-aw" transform="pos: 0 2.2 0">
        <renderer name="k-vec-was-aw" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="score-k4" text="4" transform="pos: 0 2.35 0" font-size="0.7" color="#c23a3a"></word>
        <word name="scaled-k4" text="0.5" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
        <word name="weight-k4" text="0.05" transform="pos: 0 2.35 0; scale: 0 0 0" font-size="0.7" color="#c23a3a"></word>
      </entity>
    </entity>
    <word name="label-x4-aw" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="equation-label-aw" transform="pos: -4.5 7.7 0">
  <word text="q" transform="pos: -0.5 0 0" font-size="0.7" color="#107d32">
    <word text="3" transform="pos: 0.35 -0.2 0" font-size="0.45" color="#107d32"></word>
  </word>
  <word text="K" transform="pos: 0.3 0 0" font-size="0.7" color="#275af1">
    <word text="T" transform="pos: 0.45 0.25 0" font-size="0.4" color="#275af1"></word>
  </word>
</entity>

<entity name="scaled-label-aw" transform="pos: -4.5 7.7 0; scale: 0 0 0">
  <word text="q" transform="pos: -0.2 0.45 0" font-size="0.6" color="#107d32">
    <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
  </word>
  <word text="K" transform="pos: 0.4 0.45 0" font-size="0.6" color="#275af1">
    <word text="T" transform="pos: 0.35 0.2 0" font-size="0.35" color="#275af1"></word>
  </word>
  <entity transform="pos: 0.3 0 0" line="offset: 0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <entity transform="pos: 0.3 0 0" line="offset: -0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <word text="√d" transform="pos: 0.3 -0.5 0" font-size="0.5" color="#666666"></word>
</entity>

<entity name="softmax-label-aw" transform="pos: -4.5 7.7 0; scale: 0 0 0">
  <word text="softmax(" transform="pos: -1.5 0 0" font-size="0.6" color="#666666"></word>
  <word text="q" transform="pos: 0.2 0.45 0" font-size="0.6" color="#107d32">
    <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
  </word>
  <word text="K" transform="pos: 0.8 0.45 0" font-size="0.6" color="#275af1">
    <word text="T" transform="pos: 0.35 0.2 0" font-size="0.35" color="#275af1"></word>
  </word>
  <entity transform="pos: 0.6 0 0" line="offset: 0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <entity transform="pos: 0.6 0 0" line="offset: -0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <word text="√d" transform="pos: 0.6 -0.5 0" font-size="0.5" color="#666666"></word>
  <word text=")" transform="pos: 1.6 0 0" font-size="0.6" color="#666666"></word>
</entity>

<div class="step" data-title="Raw attention scores" data-description="These are the raw &lt;span class=&quot;concept-attention&quot;&gt;attention scores&lt;/span&gt; for &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;. It attends most to itself, then &lt;span class=&quot;token-input&quot;&gt;&quot;hot&quot;&lt;/span&gt;, then &lt;span class=&quot;token-input&quot;&gt;&quot;the&quot;&lt;/span&gt;, then &lt;span class=&quot;token-input&quot;&gt;&quot;was&quot;&lt;/span&gt;."></div>

<div class="step" data-title="Scale by √d" data-description="As we saw earlier, we divide by &lt;span class=&quot;katex-inline&quot;&gt;\\sqrt{d}&lt;/span&gt; to keep scores in a reasonable range. With 64-dimensional vectors, &lt;span class=&quot;katex-inline&quot;&gt;\\sqrt{64} = 8&lt;/span&gt;.">
  <sequence name="show-scaled">
    <tween target="camera-attention-weights" attr="orbit-camera.targetPitch" to="0.3" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-attention-weights" attr="orbit-camera.targetYaw" to="0.5" duration="0.6" easing="expo-out"></tween>
    <tween target="equation-label-aw" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="scaled-label-aw" attr="scale" to="1 1 1" duration="0.4" easing="back-out"></tween>
    <tween target="score-k1" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="score-k2" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="score-k3" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="score-k4" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="scaled-k1" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="scaled-k2" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="scaled-k3" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="scaled-k4" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
  </sequence>
  <sequence name="hide-scaled">
    <tween target="camera-attention-weights" attr="orbit-camera.targetPitch" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-attention-weights" attr="orbit-camera.targetYaw" to="0" duration="0.3" easing="expo-out"></tween>
    <tween target="scaled-k4" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="scaled-k3" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="scaled-k2" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="scaled-k1" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="score-k1" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="score-k2" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="score-k3" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="score-k4" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="scaled-label-aw" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="equation-label-aw" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
  </sequence>
</div>

<div class="step" data-title="Softmax" data-description="Finally, &lt;b&gt;softmax&lt;/b&gt; normalizes the scores so they sum to 1. These are our final &lt;span class=&quot;concept-attention&quot;&gt;attention weights&lt;/span&gt; for &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;.">
  <sequence name="show-softmax">
    <tween target="camera-attention-weights" attr="orbit-camera.targetPitch" to="0" duration="0.6" easing="expo-out"></tween>
    <tween target="camera-attention-weights" attr="orbit-camera.targetYaw" to="0" duration="0.6" easing="expo-out"></tween>
    <tween target="scaled-label-aw" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="softmax-label-aw" attr="scale" to="1 1 1" duration="0.4" easing="back-out"></tween>
    <tween target="scaled-k1" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="scaled-k2" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="scaled-k3" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <tween target="scaled-k4" attr="scale" to="0 0 0" duration="0.2" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="weight-k1" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="weight-k2" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="weight-k3" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="weight-k4" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
  </sequence>
  <sequence name="hide-softmax">
    <tween target="camera-attention-weights" attr="orbit-camera.targetPitch" to="0.3" duration="0.3" easing="expo-out"></tween>
    <tween target="camera-attention-weights" attr="orbit-camera.targetYaw" to="0.5" duration="0.3" easing="expo-out"></tween>
    <tween target="weight-k4" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="weight-k3" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="weight-k2" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="weight-k1" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="scaled-k1" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="scaled-k2" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="scaled-k3" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="scaled-k4" attr="scale" to="1 1 1" duration="0.2" easing="expo-out"></tween>
    <tween target="softmax-label-aw" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="scaled-label-aw" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
  </sequence>
</div>
`,Et=`<entity name="controller-value-output" step-controller></entity>
<entity name="camera-target-value-output" transform="pos: -4.5 3.5 0"></entity>
<orbit-camera
  name="camera-value-output"
  target="camera-target-value-output"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens-vo" transform="pos: -4.5 0 0" gap="2.0" align="center">
  <word name="token-the-vo" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the-vo" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-the-vo" transform="pos: 0 1.5 0">
      <renderer name="embed-the-vo" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-the-vo" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-the-vo" transform="pos: 0 2.2 0">
        <renderer name="k-vec-the-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k1-vo" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-the-vo" transform="pos: 0.15 1.2 0; scale: 0 0 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-the-vo" transform="pos: 0.8 2.2 0; scale: 0 0 0">
        <renderer name="v-vec-the-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v1-vo" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x1-vo" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-hot-vo" text="hot" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-hot-vo" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-hot-vo" transform="pos: 0 1.5 0">
      <renderer name="embed-hot-vo" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-hot-vo" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-hot-vo" transform="pos: 0 2.2 0">
        <renderer name="k-vec-hot-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k2-vo" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-hot-vo" transform="pos: 0.15 1.2 0; scale: 0 0 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-hot-vo" transform="pos: 0.8 2.2 0; scale: 0 0 0">
        <renderer name="v-vec-hot-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v2-vo" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x2-vo" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog-vo" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog-vo" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-dog-vo" transform="pos: 0 1.5 0">
      <renderer name="embed-dog-vo" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-dog-vo" transform="pos: -0.15 1.2 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-dog-vo" transform="pos: -0.8 2.2 0">
        <renderer name="q-vec-dog-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q3-vo" text="q" transform="pos: 0 2.35 0" font-size="0.6" color="#107d32">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-dog-vo" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-dog-vo" transform="pos: 0 2.2 0">
        <renderer name="k-vec-dog-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k3-vo" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-dog-vo" transform="pos: 0.15 1.2 0; scale: 0 0 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-dog-vo" transform="pos: 0.8 2.2 0; scale: 0 0 0">
        <renderer name="v-vec-dog-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v3-vo" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x3-vo" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was-vo" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was-vo" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-was-vo" transform="pos: 0 1.5 0">
      <renderer name="embed-was-vo" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="k-arrow-was-vo" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-was-vo" transform="pos: 0 2.2 0">
        <renderer name="k-vec-was-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k4-vo" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-was-vo" transform="pos: 0.15 1.2 0; scale: 0 0 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-was-vo" transform="pos: 0.8 2.2 0; scale: 0 0 0">
        <renderer name="v-vec-was-vo" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v4-vo" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x4-vo" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="softmax-label-vo" transform="pos: -4.5 7.7 0">
  <word text="softmax(" transform="pos: -1.5 0 0" font-size="0.6" color="#666666"></word>
  <word text="q" transform="pos: 0.2 0.45 0" font-size="0.6" color="#107d32">
    <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
  </word>
  <word text="K" transform="pos: 0.8 0.45 0" font-size="0.6" color="#275af1">
    <word text="T" transform="pos: 0.35 0.2 0" font-size="0.35" color="#275af1"></word>
  </word>
  <entity transform="pos: 0.6 0 0" line="offset: 0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <entity transform="pos: 0.6 0 0" line="offset: -0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <word text="√d" transform="pos: 0.6 -0.5 0" font-size="0.5" color="#666666"></word>
  <word text=")" transform="pos: 1.6 0 0" font-size="0.6" color="#666666"></word>
  <word name="label-V-vo" text="V" transform="pos: 2.2 0 0; scale: 0 0 0" font-size="0.7" color="#aa4d00"></word>
</entity>

<div class="step" data-title="Attention weights" data-description="We have our &lt;span class=&quot;concept-attention&quot;&gt;attention weights&lt;/span&gt;—the amount &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt; attends to every other token. But we still need to incorporate the actual &lt;i&gt;meaning&lt;/i&gt; of those tokens."></div>

<div class="step" data-title="Value projection" data-description="We project each embedding to a &lt;span class=&quot;concept-value&quot;&gt;value vector&lt;/span&gt; &lt;span class=&quot;katex-inline concept-value&quot;&gt;V&lt;/span&gt;. When multiplied by our &lt;span class=&quot;concept-attention&quot;&gt;attention weights&lt;/span&gt;, this gives us the contextualized meaning of &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;.">
  <sequence name="show-values">
    <tween target="v-arrow-the-vo" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-v-the-vo" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="v-arrow-hot-vo" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-v-hot-vo" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="v-arrow-dog-vo" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-v-dog-vo" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="v-arrow-was-vo" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-v-was-vo" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.1"></pause>
    <tween target="label-V-vo" attr="scale" to="1 1 1" duration="0.4" easing="back-out"></tween>
  </sequence>
  <sequence name="hide-values">
    <tween target="label-V-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-v-was-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="v-arrow-was-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-v-dog-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="v-arrow-dog-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-v-hot-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="v-arrow-hot-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-v-the-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="v-arrow-the-vo" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
  </sequence>
</div>
`,Ct=`<entity name="controller-full-attention" step-controller></entity>
<entity name="camera-target-full-attention" transform="pos: -4.5 3.5 0"></entity>
<orbit-camera
  name="camera-full-attention"
  target="camera-target-full-attention"
  current-distance="12"
  target-distance="12"
  current-yaw="0"
  target-yaw="0"
  current-pitch="0"
  target-pitch="0"
  min-pitch="-1.57"
  max-pitch="1.57"
  offset-y="0"
  main-camera="projection: orthographic; ortho-size: 11"
></orbit-camera>
<entity ambient-light="intensity: 6.0"></entity>
<entity directional-light="intensity: 5.0; direction: -1 2 1"></entity>

<paragraph name="input-tokens-fa" transform="pos: -4.5 0 0" gap="2.0" align="center">
  <word name="token-the-fa" text="the" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-the-fa" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-the-fa" transform="pos: 0 1.5 0">
      <renderer name="embed-the-fa" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-the-fa" transform="pos: -0.15 1.2 0; scale: 0 0 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-the-fa" transform="pos: -0.8 2.2 0; scale: 0 0 0">
        <renderer name="q-vec-the-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q1-fa" text="q" transform="pos: 0 2.35 0" font-size="0.6" color="#107d32">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-the-fa" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-the-fa" transform="pos: 0 2.2 0">
        <renderer name="k-vec-the-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k1-fa" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-the-fa" transform="pos: 0.15 1.2 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-the-fa" transform="pos: 0.8 2.2 0">
        <renderer name="v-vec-the-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v1-fa" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x1-fa" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="1" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-hot-fa" text="hot" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-hot-fa" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-hot-fa" transform="pos: 0 1.5 0">
      <renderer name="embed-hot-fa" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-hot-fa" transform="pos: -0.15 1.2 0; scale: 0 0 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-hot-fa" transform="pos: -0.8 2.2 0; scale: 0 0 0">
        <renderer name="q-vec-hot-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q2-fa" text="q" transform="pos: 0 2.35 0" font-size="0.6" color="#107d32">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-hot-fa" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-hot-fa" transform="pos: 0 2.2 0">
        <renderer name="k-vec-hot-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k2-fa" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-hot-fa" transform="pos: 0.15 1.2 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-hot-fa" transform="pos: 0.8 2.2 0">
        <renderer name="v-vec-hot-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v2-fa" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x2-fa" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="2" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-dog-fa" text="dog" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-dog-fa" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-dog-fa" transform="pos: 0 1.5 0">
      <renderer name="embed-dog-fa" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-dog-fa" transform="pos: -0.15 1.2 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-dog-fa" transform="pos: -0.8 2.2 0">
        <renderer name="q-vec-dog-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q3-fa" text="q" transform="pos: 0 2.35 0" font-size="0.6" color="#107d32">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-dog-fa" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-dog-fa" transform="pos: 0 2.2 0">
        <renderer name="k-vec-dog-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k3-fa" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-dog-fa" transform="pos: 0.15 1.2 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-dog-fa" transform="pos: 0.8 2.2 0">
        <renderer name="v-vec-dog-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v3-fa" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x3-fa" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
  <word name="token-was-fa" text="was" font-size="0.8" color="#2d5a8a" border="padding: 0.2; color: 0x1e3d5e">
    <entity name="arrow-was-fa" transform="pos: 0 0.7 0" line="offset: 0 0.6 0; color: #6b4c8a; thickness: 2; arrow-end: 1; arrow-size: 0.12"></entity>
    <entity name="pivot-was-fa" transform="pos: 0 1.5 0">
      <renderer name="embed-was-fa" transform="pos: 0 0.5 0" size="0.4 1.0 0.4" color="#6b4c8a"></renderer>
      <entity name="q-arrow-was-fa" transform="pos: -0.15 1.2 0; scale: 0 0 0" line="offset: -0.5 0.7 0; color: #107d32; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-q-was-fa" transform="pos: -0.8 2.2 0; scale: 0 0 0">
        <renderer name="q-vec-was-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#107d32"></renderer>
        <word name="label-q4-fa" text="q" transform="pos: 0 2.35 0" font-size="0.6" color="#107d32">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
        </word>
      </entity>
      <entity name="k-arrow-was-fa" transform="pos: 0 1.2 0" line="offset: 0 0.7 0; color: #275af1; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-k-was-fa" transform="pos: 0 2.2 0">
        <renderer name="k-vec-was-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#275af1"></renderer>
        <word name="label-k4-fa" text="k" transform="pos: 0 2.35 0" font-size="0.6" color="#275af1">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#275af1"></word>
        </word>
      </entity>
      <entity name="v-arrow-was-fa" transform="pos: 0.15 1.2 0" line="offset: 0.5 0.7 0; color: #aa4d00; thickness: 2; arrow-end: 1; arrow-size: 0.15"></entity>
      <entity name="pivot-v-was-fa" transform="pos: 0.8 2.2 0">
        <renderer name="v-vec-was-fa" transform="pos: 0 0.8 0" size="0.4 1.6 0.4" color="#aa4d00"></renderer>
        <word name="label-v4-fa" text="v" transform="pos: 0 2.35 0" font-size="0.6" color="#aa4d00">
          <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#aa4d00"></word>
        </word>
      </entity>
    </entity>
    <word name="label-x4-fa" text="x" transform="pos: 0 -1.1 0" font-size="0.6" color="#2d5a8a">
      <word text="4" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#2d5a8a"></word>
    </word>
  </word>
</paragraph>

<entity name="equation-fa" transform="pos: -4.5 7.7 0">
  <word text="softmax(" transform="pos: -1.5 0 0" font-size="0.6" color="#666666"></word>
  <entity name="query-slot-fa" transform="pos: 0.2 0.45 0">
    <word name="label-q3-eq-fa" text="q" font-size="0.6" color="#107d32">
      <word text="3" transform="pos: 0.3 -0.18 0" font-size="0.4" color="#107d32"></word>
    </word>
    <word name="label-Q-eq-fa" text="Q" transform="scale: 0 0 0" font-size="0.6" color="#107d32"></word>
  </entity>
  <word text="K" transform="pos: 0.8 0.45 0" font-size="0.6" color="#275af1">
    <word text="T" transform="pos: 0.35 0.2 0" font-size="0.35" color="#275af1"></word>
  </word>
  <entity transform="pos: 0.6 0 0" line="offset: 0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <entity transform="pos: 0.6 0 0" line="offset: -0.8 0 0; color: 0x666666; thickness: 2"></entity>
  <word text="√d" transform="pos: 0.6 -0.5 0" font-size="0.5" color="#666666"></word>
  <word text=")" transform="pos: 1.6 0 0" font-size="0.6" color="#666666"></word>
  <word text="V" transform="pos: 2.2 0 0" font-size="0.7" color="#aa4d00"></word>
</entity>

<div class="step" data-title="&quot;Dog&quot; self-attention" data-description="So far, we've built the full attention mechanism for &lt;span class=&quot;token-input&quot;&gt;&quot;dog&quot;&lt;/span&gt;—its &lt;span class=&quot;concept-query&quot;&gt;query&lt;/span&gt; attends to all &lt;span class=&quot;concept-key&quot;&gt;keys&lt;/span&gt;, and the weighted &lt;span class=&quot;concept-value&quot;&gt;values&lt;/span&gt; produce its contextualized meaning."></div>

<div class="step" data-title="The full picture" data-description="In practice, every token does the same—each one attends to every other, computing its own contextualized meaning in parallel.">
  <sequence name="show-self-attention">
    <tween target="q-arrow-the-fa" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-q-the-fa" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="q-arrow-hot-fa" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-q-hot-fa" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="q-arrow-was-fa" attr="scale" to="1 1 1" duration="0.3" easing="expo-out"></tween>
    <tween target="pivot-q-was-fa" attr="scale" to="1 1 1" duration="0.4" easing="expo-out"></tween>
    <pause duration="0.05"></pause>
    <tween target="label-q3-eq-fa" attr="scale" to="0 0 0" duration="0.3" easing="sine-out"></tween>
    <tween target="label-Q-eq-fa" attr="scale" to="1 1 1" duration="0.4" easing="back-out"></tween>
  </sequence>
  <sequence name="hide-self-attention">
    <tween target="label-Q-eq-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="label-q3-eq-fa" attr="scale" to="1 1 1" duration="0.3" easing="back-out"></tween>
    <tween target="pivot-q-was-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="q-arrow-was-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-q-hot-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="q-arrow-hot-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="pivot-q-the-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
    <tween target="q-arrow-the-fa" attr="scale" to="0 0 0" duration="0.15" easing="sine-out"></tween>
  </sequence>
</div>
`,O={setup:kt,problem:qt,"dot-product":zt,"query-key":St,"attention-weights":Tt,"value-output":Et,"full-attention":Ct};function At(e,t){const n=O[t];if(!n){console.warn(`No canvas definition found for: ${t}`);return}const o=document.createElement("div");o.innerHTML=n.trim();for(const i of Array.from(o.children))if(i.classList.contains("step"))for(const d of Array.from(i.children))e.appendChild(d);else e.appendChild(i)}const G={query:A.green,key:A.blue,value:A.yellow,attention:A.red};function J(e){return"#"+e.toString(16).padStart(6,"0")}function Yt(){const e=document.documentElement;for(const[t,n]of Object.entries(G))e.style.setProperty(`--color-${t}`,J(n))}function Lt(e,t){e.innerHTML=t,e.querySelectorAll(".katex-inline").forEach(n=>{const o=n.textContent??"";o&&window.katex&&(n.innerHTML=window.katex.renderToString(o,{displayMode:!1,throwOnError:!1}))})}function $t(e){const{steps:t,sequenceMap:n}=rt(O[e]);return{canvasId:`canvas-${e}`,theme:A,createPlugin:()=>[et(n),vt],beforeInit:o=>At(o,e),setupUI:(o,i)=>{const d=o.getEntityByName(`controller-${e}`);if(d===null)return;const a=ot(`.step-navigator[data-canvas="${e}"]`);a&&at(o,d,{steps:t,elements:a,renderDescription:Lt})}}}const jt=Object.keys(O).map($t);function Mt(e){return e.replace(/\\color\{(\w+)\}/g,(t,n)=>{const o=G[n];return o!==void 0?`\\color{${J(o)}}`:t})}function U(){if(typeof window>"u"||!window.katex)return;const e=(t,n)=>{const o=t.textContent??"";if(!o)return;const i=Mt(o);t.innerHTML=window.katex.renderToString(i,{displayMode:n,throwOnError:!1})};document.querySelectorAll(".katex-display").forEach(t=>e(t,!0)),document.querySelectorAll(".katex-inline").forEach(t=>e(t,!1))}function K(){Yt(),nt(jt),document.readyState==="complete"?U():window.addEventListener("load",U)}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K):K());
//# sourceMappingURL=main-DvQPC2Aj.js.map
