/* c0.js : shared sprite helpers for the seasonal pack (loads before c1.js). All sprites are cached and sized for the current scale S. */
const _bk={};
function bokehSpr(c,px=128){const k=c.join()+'b'+px;if(_bk[k])return _bk[k];const s=offscreen(px,px),x=s.getContext('2d'),h=px/2,g=x.createRadialGradient(h,h,0,h,h,h);
  g.addColorStop(0,rgba(c,.10));g.addColorStop(.72,rgba(c,.2));g.addColorStop(.9,rgba(c,.5));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.fillRect(0,0,px,px);return _bk[k]=s}
const _fk={};
/* snowflake sprite: v 0 dendrite, 1 plate, 2 star ; r = logical radius ; low=true gives a soft out-of-focus version */
function flakeSpr(v,col,r,low){const px=low?40:Math.max(48,Math.ceil(r*2*S/16)*16),k=v+col+px;if(_fk[k])return _fk[k];
  const s=offscreen(px,px),x=s.getContext('2d'),h=px/2,u=h*.92,lw=Math.max(1.2,px/34);x.translate(h,h);x.strokeStyle=col;x.fillStyle=col;x.lineCap='round';x.lineJoin='round';
  for(let i=0;i<6;i++){x.save();x.rotate(i*TAU/6);x.lineWidth=lw;x.beginPath();x.moveTo(0,0);x.lineTo(u,0);x.stroke();
    if(v===0){for(const [p,l] of [[.34,.3],[.6,.22],[.8,.12]]){x.lineWidth=lw*.8;x.beginPath();x.moveTo(u*p,0);x.lineTo(u*(p+l*.75),u*l*.75);x.moveTo(u*p,0);x.lineTo(u*(p+l*.75),-u*l*.75);x.stroke()}}
    else if(v===1){x.lineWidth=lw*.9;x.beginPath();x.moveTo(u*.42,0);x.lineTo(u*.6,u*.19);x.moveTo(u*.42,0);x.lineTo(u*.6,-u*.19);x.stroke();x.beginPath();x.arc(u*.93,0,lw*1.2,0,TAU);x.fill()}
    else{x.lineWidth=lw*.8;x.beginPath();x.moveTo(u*.5,0);x.lineTo(u*.72,u*.14);x.moveTo(u*.5,0);x.lineTo(u*.72,-u*.14);x.moveTo(u*.74,0);x.lineTo(u*.94,u*.1);x.moveTo(u*.74,0);x.lineTo(u*.94,-u*.1);x.stroke()}
    x.restore()}
  if(v===1){x.lineWidth=lw*.9;x.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6;i?x.lineTo(Math.cos(a)*u*.3,Math.sin(a)*u*.3):x.moveTo(Math.cos(a)*u*.3,Math.sin(a)*u*.3)}x.closePath();x.stroke()}
  x.beginPath();x.arc(0,0,lw*1.4,0,TAU);x.fill();return _fk[k]=s}
function starPath(c,x,y,ro,ri,n=5,rot=-Math.PI/2){c.beginPath();for(let i=0;i<n*2;i++){const a=rot+i*Math.PI/n,r=i%2?ri:ro;i?c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):c.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}c.closePath()}
/* gold 5-point star sprite with bevel facets */
const _sk={};
function goldStar(r){const px=Math.max(48,Math.ceil(r*2.2*S/16)*16);if(_sk[px])return _sk[px];const s=offscreen(px,px),x=s.getContext('2d'),h=px/2,ro=h*.92,ri=ro*.46;
  const g=x.createLinearGradient(0,0,px,px);g.addColorStop(0,'#fff6d0');g.addColorStop(.35,'#f6c84e');g.addColorStop(.7,'#c88a1c');g.addColorStop(1,'#f9d77a');x.fillStyle=g;starPath(x,h,h,ro,ri);x.fill();
  for(let i=0;i<5;i++){const a0=-Math.PI/2+i*TAU/5,a1=a0+TAU/10,ax=h+Math.cos(a0)*ro,ay=h+Math.sin(a0)*ro,bx=h+Math.cos(a1)*ri,by=h+Math.sin(a1)*ri,a2=a0-TAU/10,cx=h+Math.cos(a2)*ri,cy=h+Math.sin(a2)*ri;
    x.fillStyle=`rgba(255,250,225,${.34})`;x.beginPath();x.moveTo(h,h);x.lineTo(ax,ay);x.lineTo(bx,by);x.closePath();x.fill();
    x.fillStyle='rgba(120,70,5,.30)';x.beginPath();x.moveTo(h,h);x.lineTo(ax,ay);x.lineTo(cx,cy);x.closePath();x.fill()}
  x.strokeStyle='rgba(255,246,210,.9)';x.lineWidth=Math.max(1,px/60);starPath(x,h,h,ro,ri);x.stroke();return _sk[px]=s}
/* autumn leaves: kind 0 maple, 1 oak-like. cols = 3 css colors light->dark */
const _lf={};
function leafSpr(kind,cols,r){const px=Math.max(48,Math.ceil(r*2.3*S/16)*16),k=kind+cols.join()+px;if(_lf[k])return _lf[k];
  const s=offscreen(px,px),x=s.getContext('2d'),h=px/2,u=h*.84;x.translate(h,h*1.02);const g=x.createLinearGradient(-u*.7,-u,u*.7,u*.5);g.addColorStop(0,cols[0]);g.addColorStop(.55,cols[1]);g.addColorStop(1,cols[2]);x.fillStyle=g;x.lineJoin='round';
  const pt=(d,r2)=>[Math.sin(d*Math.PI/180)*r2*u,-Math.cos(d*Math.PI/180)*r2*u];
  if(kind===0){const R=[[0,1],[16,.5],[36,.86],[55,.46],[74,.7],[98,.36],[124,.5],[150,.28],[168,.2]],P=[...R,...R.slice(0,-1).reverse().map(([d,r2])=>[-d,r2])];
    x.beginPath();P.forEach(([d,r2],i)=>{const [a,b]=pt(d,r2);i?x.lineTo(a,b):x.moveTo(a,b)});x.closePath();x.fill();
    x.strokeStyle='rgba(70,20,0,.5)';x.lineWidth=Math.max(1,px/70);x.beginPath();for(const [d,r2] of [[0,.92],[36,.78],[-36,.78],[74,.62],[-74,.62],[124,.42],[-124,.42]]){const [a,b]=pt(d,r2);x.moveTo(0,u*.1);x.lineTo(a,b)}x.stroke();
    x.lineWidth=Math.max(1.5,px/46);x.strokeStyle='#5a2a0c';x.beginPath();x.moveTo(0,u*.1);x.lineTo(0,u*.42);x.stroke()}
  else{x.beginPath();const N=40;for(let i=0;i<=N;i++){const t=i/N,w=.44*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.04)),.85)*(1+.26*Math.sin(t*Math.PI*7+.6));const px2=w*u,py=-u*.95+t*u*1.75;i?x.lineTo(px2,py):x.moveTo(px2,py)}
    for(let i=N;i>=0;i--){const t=i/N,w=.44*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.04)),.85)*(1+.26*Math.sin(t*Math.PI*7+.6));x.lineTo(-w*u,-u*.95+t*u*1.75)}x.closePath();x.fill();
    x.strokeStyle='rgba(70,20,0,.5)';x.lineWidth=Math.max(1,px/70);x.beginPath();x.moveTo(0,-u*.95);x.lineTo(0,u*.8);for(let i=1;i<6;i++){const y=-u*.95+i*u*.27;x.moveTo(0,y+u*.05);x.lineTo(u*.3,y-u*.1);x.moveTo(0,y+u*.05);x.lineTo(-u*.3,y-u*.1)}x.stroke();
    x.lineWidth=Math.max(1.5,px/46);x.strokeStyle='#5a2a0c';x.beginPath();x.moveTo(0,u*.78);x.lineTo(0,u*1.0);x.stroke()}
  return _lf[k]=s}
/* pumpkin: r logical radius, face=true makes a jack-o-lantern whose cut-outs are painted warm so a glow can be added on top */
const _pk={};
function pumpkinSpr(r,face){const px=Math.ceil(r*2.7*S/16)*16,k=px+(face?'f':'p');if(_pk[k])return _pk[k];const s=offscreen(px,px),x=s.getContext('2d'),u=px/2/1.32;x.translate(px/2,px*.58);
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,.74*u,1.0*u,.16*u,0,0,TAU);x.fill();
  for(const [cx,rx] of [[-.6,.4],[.6,.4],[-.32,.5],[.32,.5],[0,.54]]){const g=x.createRadialGradient(cx*u-rx*u*.3,-.3*u,u*.05,cx*u,0,u*.95);g.addColorStop(0,'#ff9f3a');g.addColorStop(.45,'#e5600a');g.addColorStop(1,'#6e2002');x.fillStyle=g;x.beginPath();x.ellipse(cx*u,0,rx*u*1.08,.76*u,0,0,TAU);x.fill();x.strokeStyle='rgba(80,22,0,.5)';x.lineWidth=u*.03;x.stroke()}
  if(face){x.fillStyle='#ffc23d';x.beginPath();for(const sg of [-1,1]){x.moveTo(sg*.34*u,-.12*u);x.lineTo(sg*.18*u,-.34*u);x.lineTo(sg*.5*u,-.32*u);x.closePath()}x.fill();
    x.beginPath();x.moveTo(-.46*u,.14*u);x.lineTo(-.3*u,.3*u);x.lineTo(-.15*u,.2*u);x.lineTo(0,.34*u);x.lineTo(.15*u,.2*u);x.lineTo(.3*u,.3*u);x.lineTo(.46*u,.14*u);x.quadraticCurveTo(0,.56*u,-.46*u,.14*u);x.closePath();x.fill()}
  x.fillStyle='#4a2a0e';x.beginPath();x.moveTo(-.1*u,-.7*u);x.quadraticCurveTo(-.14*u,-1.0*u,.06*u,-1.14*u);x.lineTo(.2*u,-1.04*u);x.quadraticCurveTo(.1*u,-.9*u,.12*u,-.7*u);x.closePath();x.fill();
  x.strokeStyle='#3f7a22';x.lineWidth=u*.05;x.lineCap='round';x.beginPath();x.moveTo(.1*u,-.8*u);x.bezierCurveTo(.5*u,-.95*u,.7*u,-.7*u,.52*u,-.55*u);x.stroke();
  return _pk[k]=s}
