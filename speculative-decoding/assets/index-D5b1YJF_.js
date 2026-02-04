import{i as O,f as L,j as e,k as u,h as p,C as E,l as D,M as i,n as q,r as _n,o as nn,p as Nn,R as Vn,q as On,t as Fn,u as Un,v as jn,P as Kn,w as Z}from"./canvas-setup-FxFxhnX5.js";const vn=2771565,$n=12093002,Jn=4175994,Qn=14440536,sn=7041664,I={padding:[],color:[],thickness:[],transition:[]};O(I,{defaults:()=>({padding:.15,color:sn,thickness:2,transition:1})});const Q={},no=.55,oo={group:"simulation",update(n){for(const r of n.query([I,L,e])){const t=L.content[r]??"",c=L.fontSize[r]||1,l=I.padding[r],s=I.color[r],y=I.thickness[r],h=Math.min(1,I.transition[r]),g=t.length*c*no,m=c,b=g/2+l,f=m/2+l;if([...n.query([p(E.relation,r),Q,u])].length===0)for(let x=0;x<4;x++){const X=n.addEntity();n.addComponent(X,e),n.addComponent(X,u),n.addComponent(X,Q),n.addComponent(X,p(E.relation,r)),u.color[X]=s,u.thickness[X]=y,u.visible[X]=1,u.opacity[X]=1}const d=[...n.query([p(E.relation,r),Q,u])];e.posX[d[0]]=-b,e.posY[d[0]]=-f,e.posZ[d[0]]=0,u.offsetX[d[0]]=b*2*h,u.offsetY[d[0]]=0,u.offsetZ[d[0]]=0,e.posX[d[1]]=-b,e.posY[d[1]]=f,e.posZ[d[1]]=0,u.offsetX[d[1]]=b*2*h,u.offsetY[d[1]]=0,u.offsetZ[d[1]]=0,e.posX[d[2]]=-b,e.posY[d[2]]=-f,e.posZ[d[2]]=0,u.offsetX[d[2]]=0,u.offsetY[d[2]]=f*2*h,u.offsetZ[d[2]]=0,e.posX[d[3]]=b,e.posY[d[3]]=-f,e.posZ[d[3]]=0,u.offsetX[d[3]]=0,u.offsetY[d[3]]=f*2*h,u.offsetZ[d[3]]=0}}},To={components:{Border:I,BorderLine:Q},systems:[oo]},C={barCount:[],transition:[],blend:[],smoothness:[],comparisonTransition:[],comparisonZ:[],acceptanceTransition:[],acceptanceYOffset:[],acceptanceSize:[],residualTransition:[],minTransition:[],excessDraftTransition:[],excessTargetTransition:[],transferProgress:[]};O(C,{defaults:()=>({barCount:5,transition:1,blend:0,smoothness:.15,comparisonTransition:0,comparisonZ:-.6,acceptanceTransition:0,acceptanceYOffset:.5,acceptanceSize:.35,residualTransition:0,minTransition:0,excessDraftTransition:0,excessTargetTransition:0,transferProgress:0})});const Y={index:[],probability:[],goalProbability:[]};O(Y,{defaults:()=>({index:0,probability:.2,goalProbability:.2})});const un=D("distribution-bar-owner",{exclusive:!0}),Cn=D("comparison-bar-owner",{exclusive:!0}),wn=D("acceptance-marker-owner",{exclusive:!0}),En=D("residual-bar-owner",{exclusive:!0}),Tn=D("min-bar-owner",{exclusive:!0}),Pn=D("excess-draft-bar-owner",{exclusive:!0}),zn=D("excess-target-bar-owner",{exclusive:!0}),W={index:[]};O(W,{defaults:()=>({index:0})});const A={distribution:[],barIndex:[],yOffset:[]};O(A,{defaults:()=>({distribution:0,barIndex:0,yOffset:.7})});const Dn=new Map,kn=new Map;function Po(n,r,t){Dn.set(n,r),t&&kn.set(n,t)}function fn(n,r,t){const c=n>>16&255,l=n>>8&255,s=n&255,y=r>>16&255,h=r>>8&255,g=r&255,m=Math.round(c+(y-c)*t),b=Math.round(l+(h-l)*t),f=Math.round(s+(g-s)*t);return m<<16|b<<8|f}const to=14440536,Xn=15048768,eo=4175994;function io(n){return n<.9?fn(to,Xn,n/.9):fn(Xn,eo,(n-.9)/.1)}const on=8,B=5.5;function so(n,r){const t=Math.max(0,Math.min(1,n));return 1-Math.pow(1-t,r*60)}const ro={group:"simulation",update(n){const r=n.time.deltaTime;for(const t of n.query([C,e])){const c=C.barCount[t],l=C.transition[t],s=C.blend[t],y=C.smoothness[t],h=C.comparisonTransition[t],g=C.comparisonZ[t],m=[...n.query([p(un.relation,t),Y,i,e])];for(;m.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,Y),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(un.relation,t)),i.shape[o]=q.Box,Y.index[o]=m.length,m.push(o)}const b=on/c,f=b*.7,z=-on/2+b/2,d=Dn.get(t),x=kn.get(t),X=so(y,r),rn=fn(vn,$n,s);for(let o=0;o<c;o++){const a=m[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=v+(w-v)*s;Y.goalProbability[a]=P,Y.probability[a]+=(P-Y.probability[a])*X;const T=Y.probability[a],M=Math.max(.05,T*B);e.posX[a]=z+o*b,e.posY[a]=M/2*l,e.posZ[a]=0,i.sizeX[a]=f*l,i.sizeY[a]=M*l,i.sizeZ[a]=f*l,i.color[a]=rn}const k=[...n.query([p(Cn.relation,t),i,e])];if(h>0){for(;k.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(Cn.relation,t)),i.shape[o]=q.Box,k.push(o)}for(let o=0;o<c;o++){const a=k[o],v=d&&d.length>o?d[o]:.2,w=Math.max(.05,v*B);e.posX[a]=z+o*b,e.posY[a]=w/2*h,e.posZ[a]=g,i.sizeX[a]=f*h,i.sizeY[a]=w*h,i.sizeZ[a]=f*h,i.color[a]=vn}}else for(const o of k)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0;const R=C.acceptanceTransition[t],N=C.acceptanceYOffset[t],Wn=C.acceptanceSize[t],H=[...n.query([p(wn.relation,t),W,i,e])];if(R>0){for(;H.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,W),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(wn.relation,t)),i.shape[o]=q.Sphere,W.index[o]=H.length,H.push(o)}for(let o=0;o<c;o++){const a=H[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=Math.max(v,w)*B,T=w>0?Math.min(1,v/w):1;e.posX[a]=z+o*b,e.posY[a]=P+N,e.posZ[a]=g/2;const M=Wn*R;i.sizeX[a]=M,i.sizeY[a]=M,i.sizeZ[a]=M,i.color[a]=io(T)}}else for(const o of H)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0;const V=C.residualTransition[t],F=[...n.query([p(En.relation,t),i,e])];if(V>0){for(;F.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(En.relation,t)),i.shape[o]=q.Box,F.push(o)}for(let o=0;o<c;o++){const a=F[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=Math.max(0,v-w);if(P<=.001){i.sizeX[a]=0,i.sizeY[a]=0,i.sizeZ[a]=0;continue}const T=P*B*V;e.posX[a]=z+o*b,e.posY[a]=T/2,e.posZ[a]=0,i.sizeX[a]=f*V,i.sizeY[a]=T,i.sizeZ[a]=f*V,i.color[a]=9647082}}else for(const o of F)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0;const U=C.minTransition[t],j=[...n.query([p(Tn.relation,t),i,e])];if(U>0){for(;j.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(Tn.relation,t)),i.shape[o]=q.Box,j.push(o)}for(let o=0;o<c;o++){const a=j[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=Math.min(v,w),T=Math.max(.05,P*B*U);e.posX[a]=z+o*b,e.posY[a]=T/2,e.posZ[a]=0,i.sizeX[a]=f*U,i.sizeY[a]=T,i.sizeZ[a]=f*U,i.color[a]=Jn}}else for(const o of j)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0;const an=C.excessDraftTransition[t],yn=C.transferProgress[t],K=[...n.query([p(Pn.relation,t),i,e])];if(an>0){for(;K.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(Pn.relation,t)),i.shape[o]=q.Box,K.push(o)}for(let o=0;o<c;o++){const a=K[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=Math.min(v,w),T=Math.max(0,w-v);if(T<=.001){i.sizeX[a]=0,i.sizeY[a]=0,i.sizeZ[a]=0;continue}const M=1-yn,G=T*B*an*M,cn=P*B,xn=f*an*M;e.posX[a]=z+o*b,e.posY[a]=cn+G/2,e.posZ[a]=0,i.sizeX[a]=xn,i.sizeY[a]=G,i.sizeZ[a]=xn,i.color[a]=Qn}}else for(const o of K)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0;const $=C.excessTargetTransition[t],J=[...n.query([p(zn.relation,t),i,e])];if($>0){for(;J.length<c;){const o=n.addEntity();n.addComponent(o,e),n.addComponent(o,i),n.addComponent(o,p(E.relation,t)),n.addComponent(o,p(zn.relation,t)),i.shape[o]=q.Box,J.push(o)}for(let o=0;o<c;o++){const a=J[o],v=d&&d.length>o?d[o]:.2,w=x&&x.length>o?x[o]:v,P=Math.min(v,w),T=Math.max(0,v-w);if(T<=.001){i.sizeX[a]=0,i.sizeY[a]=0,i.sizeZ[a]=0;continue}const M=yn,G=T*B*$*M,cn=P*B;e.posX[a]=z+o*b,e.posY[a]=cn+G/2,e.posZ[a]=0,i.sizeX[a]=f*$,i.sizeY[a]=G,i.sizeZ[a]=f*$,i.color[a]=9647082}}else for(const o of J)i.sizeX[o]=0,i.sizeY[o]=0,i.sizeZ[o]=0}}},ao={group:"simulation",update(n){for(const r of n.query([A,e])){const t=A.distribution[r],c=A.barIndex[r],l=A.yOffset[r];if(!n.hasComponent(t,C))continue;const s=C.barCount[t],h=[...n.query([p(un.relation,t),Y])].find(d=>Y.index[d]===c);if(h===void 0)continue;const g=Y.probability[h],m=on/s,f=-on/2+m/2+c*m,z=g*B;e.posX[r]=f,e.posY[r]=.5+z+l}}},zo={components:{ProbabilityDistribution:C,DistributionBar:Y,BarHighlight:A,AcceptanceMarker:W},systems:[ro,ao]},qn={data:new Float32Array(nn*4)};function dn(n){const r=qn.data;function t(l){return r[l*4+n]}function c(l,s){r[l*4+n]=s}return new Proxy([],{get(l,s){if(s==="get")return t;if(s==="set")return c;const y=Number(s);if(!Number.isNaN(y))return t(y)},set(l,s,y){const h=Number(s);return Number.isNaN(h)?!1:(c(h,y),!0)}})}const tn={transition:dn(0),width:dn(1),height:dn(2)};O(tn,{defaults:()=>({transition:0,width:.5,height:5})});const co=`
struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) transition: f32,
}

struct Scene {
  viewProj: mat4x4<f32>,
  cameraWorld: mat4x4<f32>,
  ambientColor: vec4<f32>,
  sunDirection: vec4<f32>,
  sunColor: vec4<f32>,
  cameraMode: f32,
  cameraSize: f32,
  viewport: vec2<f32>,
}

struct LegendData {
  transition: f32,
  width: f32,
  height: f32,
  _pad: f32,
}

@group(0) @binding(0) var<uniform> scene: Scene;
@group(0) @binding(1) var<storage, read> entityIds: array<u32>;
@group(0) @binding(2) var<storage, read> legends: array<LegendData>;
@group(0) @binding(3) var<storage, read> matrices: array<mat4x4<f32>>;

@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOutput {
  let eid = entityIds[iid];
  let legend = legends[eid];
  let transform = matrices[eid];

  let halfW = legend.width * 0.5 * legend.transition;
  let halfH = legend.height * 0.5 * legend.transition;

  var localPos: vec2<f32>;
  var uv: vec2<f32>;
  switch vid {
    case 0u: { localPos = vec2(-halfW, -halfH); uv = vec2(0.0, 0.0); }
    case 1u: { localPos = vec2(halfW, -halfH); uv = vec2(1.0, 0.0); }
    case 2u: { localPos = vec2(halfW, halfH); uv = vec2(1.0, 1.0); }
    case 3u: { localPos = vec2(-halfW, -halfH); uv = vec2(0.0, 0.0); }
    case 4u: { localPos = vec2(halfW, halfH); uv = vec2(1.0, 1.0); }
    case 5u: { localPos = vec2(-halfW, halfH); uv = vec2(0.0, 1.0); }
    default: { localPos = vec2(0.0, 0.0); uv = vec2(0.0, 0.0); }
  }

  let worldPos = transform[3].xyz + vec3(localPos, 0.0);
  let clipPos = scene.viewProj * vec4(worldPos, 1.0);

  var out: VertexOutput;
  out.position = clipPos;
  out.uv = uv;
  out.transition = legend.transition;
  return out;
}

struct FragmentOutput {
  @location(0) color: vec4<f32>,
  @location(1) mask: f32,
}

@fragment
fn fs(input: VertexOutput) -> FragmentOutput {
  let t = input.uv.y;

  // Nonlinear: Red -> Yellow at 90%, Yellow -> Green in top 10%
  var color: vec3<f32>;
  let red = vec3(0.863, 0.345, 0.345);
  let yellow = vec3(0.898, 0.627, 0.251);
  let green = vec3(0.247, 0.722, 0.478);
  if (t < 0.9) {
    color = mix(red, yellow, t / 0.9);
  } else {
    color = mix(yellow, green, (t - 0.9) / 0.1);
  }

  var out: FragmentOutput;
  out.color = vec4(color, input.transition);
  out.mask = select(0.0, 1.0, input.transition > 0.01);
  return out;
}
`;function lo(n,r,t){const c=n.createShaderModule({code:co});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"vs"},fragment:{module:c,entryPoint:"fs",targets:[{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},{format:t,writeMask:GPUColorWrite.RED}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthCompare:"less",depthWriteEnabled:!1}})}function uo(n){let r=null,t=null;return{id:"gradient-legend",pass:Kn.Overlay,order:1,execute(){},draw(c,l){const s=n.getCount();s!==0&&(r||(r=lo(l.device,l.format,l.maskFormat)),t||(t=l.device.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:n.scene}},{binding:1,resource:{buffer:n.entityIds}},{binding:2,resource:{buffer:n.legends}},{binding:3,resource:{buffer:n.matrices}}]})),c.setPipeline(r),c.setBindGroup(0,t),c.draw(6,s))}}}const In=_n("gradient-legends"),Yn=new Uint32Array(nn),fo={group:"draw",update(n){const r=On.from(n),t=In.from(n);if(!r||!t)return;const{device:c}=r;let l=0;for(const s of n.query([tn,e]))tn.transition[s]<=0||(Yn[l++]=s);c.queue.writeBuffer(t.buffer,0,qn.data),c.queue.writeBuffer(t.entityIds,0,Yn,0,l),t.count=l}},Xo={systems:[fo],components:{GradientLegend:tn},dependencies:[Nn,Vn],initialize(n){const r=On.from(n),t=Fn.from(n);if(!r||!t)return;const{device:c}=r,l={buffer:c.createBuffer({label:"gradient-legends",size:nn*4*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),entityIds:Un(c,nn),count:0};n.setResource(In,l),jn(n,uo({scene:t.scene,legends:l.buffer,entityIds:l.entityIds,matrices:t.matrices,getCount:()=>l.count}))}},en={trigger:[]};O(en,{defaults:()=>({trigger:0})});const An=new Map;function Yo(n,r,t){An.set(n,{original:r,replacement:t})}const _={active:[],lineTransition:[]};O(_,{defaults:()=>({active:0,lineTransition:1})});const po={},Rn={},Hn={},S={index:[],transition:[]};O(S,{defaults:()=>({index:0,transition:1})});const Gn={},pn={},go={valid:[],transition:[]};O(go,{defaults:()=>({valid:1,transition:0})});const Zn=-4,mo=.55,ln=.7,ho=1.4,bn=2;function Sn(n,r){for(const t of n.query([p(E.relation,r),L])){const c=L.content[t]??"",l=L.fontSize[t]||1;return c.length*l*mo}return 1}const bo={group:"simulation",update(n){for(const r of n.query([S,e])){const t=S.transition[r];e.scaleX[r]=t,e.scaleY[r]=t,e.scaleZ[r]=t}}},yo={group:"simulation",update(n){for(const r of n.query([_,e])){const t=[...n.query([p(E.relation,r),S,e])];if(t.length===0)continue;t.sort((g,m)=>S.index[g]-S.index[m]);const c=t.filter(g=>!n.hasComponent(g,pn)),l=t.filter(g=>n.hasComponent(g,pn)),s=c.map(g=>Sn(n,g)),y=s.reduce((g,m)=>g+m,0)+ln*Math.max(0,c.length-1);let h=-y/2;for(let g=0;g<c.length;g++){const m=c[g],b=s[g];e.posX[m]=h+b/2,e.posY[m]=0,e.posZ[m]=Zn,h+=b+ln}h=y/2+ho;for(let g=0;g<l.length;g++){const m=l[g],b=Sn(n,m);e.posX[m]=h+b/2,e.posY[m]=0,e.posZ[m]=Zn,h+=b+ln}}}},gn={},Mn=D("network-line-target",{exclusive:!0}),xo={group:"simulation",update(n){for(const r of n.query([_,e])){const t=_.lineTransition[r];for(const c of n.query([p(E.relation,r),S,e])){const l=[...n.query([p(Mn.relation,c),gn,u])];let s;l.length===0?(s=n.addEntity(),n.addComponent(s,e),n.addComponent(s,u),n.addComponent(s,Z),n.addComponent(s,gn),n.addComponent(s,p(E.relation,r)),n.addComponent(s,p(Mn.relation,c)),u.color[s]=sn,u.thickness[s]=bn,u.visible[s]=1,Z.start[s]=0,Z.end[s]=1,Z.size[s]=1):s=l[0];const y=e.posX[c],h=e.posY[c],g=e.posZ[c],m=Math.min(1,S.transition[c]);u.offsetX[s]=y*m,u.offsetY[s]=h*m,u.offsetZ[s]=g*m,u.opacity[s]=t}}}},mn={},Bn=D("latent-arrow-owner",{exclusive:!0}),hn={},Ln=D("validation-line-target",{exclusive:!0}),vo={group:"simulation",update(n){for(const r of n.query([S,e])){const t=[...n.query([p(E.relation,r),Gn,e])];if(t.length===0)continue;const c=t[0],l=[...n.query([p(Bn.relation,r),mn,u])];let s;l.length===0?(s=n.addEntity(),n.addComponent(s,e),n.addComponent(s,u),n.addComponent(s,Z),n.addComponent(s,mn),n.addComponent(s,p(E.relation,r)),n.addComponent(s,p(Bn.relation,r)),u.color[s]=sn,u.thickness[s]=bn,u.visible[s]=1,u.opacity[s]=1,Z.start[s]=0,Z.end[s]=1,Z.size[s]=1):s=l[0];const y=e.posZ[c]-3.5;e.posX[s]=0,e.posY[s]=0,e.posZ[s]=y,u.offsetX[s]=0,u.offsetY[s]=0,u.offsetZ[s]=-.8}}},Co={group:"simulation",update(n){for(const r of n.query([Hn,e])){const t=e.scaleX[r];if(!(t<.01))for(const c of n.query([Rn,e])){const l=[...n.query([p(E.relation,c),S,e])];if(l.length===0)continue;const s=e.posX[c],y=e.posY[c],h=e.posZ[c];for(const g of l){const m=Math.max(0,Math.min(1,S.transition[g])),b=[...n.query([p(Ln.relation,g),hn,u])];let f;if(b.length===0?(f=n.addEntity(),n.addComponent(f,e),n.addComponent(f,u),n.addComponent(f,Z),n.addComponent(f,hn),n.addComponent(f,p(Ln.relation,g)),u.color[f]=sn,u.thickness[f]=bn,u.visible[f]=1,Z.start[f]=0,Z.end[f]=1,Z.size[f]=1):f=b[0],m<.01){u.opacity[f]=0;continue}const z=e.posX[g],d=e.posZ[g],x=s+z*m,X=y,rn=h+d*m,k=e.posX[r],R=e.posY[r],N=e.posZ[r];e.posX[f]=k,e.posY[f]=R,e.posZ[f]=N,u.offsetX[f]=(x-k)*t,u.offsetY[f]=(X-R)*t,u.offsetZ[f]=(rn-N)*t,u.opacity[f]=t*m}}}}},wo={group:"simulation",update(n){for(const r of n.query([en,L])){const t=en.trigger[r],c=An.get(r);if(!c)continue;const l=L.content[r]??"",{original:s,replacement:y}=c;t>.5&&l!==y&&y?L.content[r]=y:t<=.5&&l!==s&&s&&(L.content[r]=s)}}},Zo={components:{Network:_,TargetModel:po,DraftModel:Rn,ValidationModel:Hn,Slot:S,Latent:Gn,Output:pn,NetworkLine:gn,LatentArrow:mn,ValidationLine:hn,TokenReplacement:en},systems:[bo,yo,xo,vo,Co,wo]};export{To as B,Xo as G,zo as P,Zo as S,en as T,C as a,A as b,Yo as c,Po as s};
//# sourceMappingURL=index-D5b1YJF_.js.map
