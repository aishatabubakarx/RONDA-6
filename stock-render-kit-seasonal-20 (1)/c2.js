/* ===== 5 : golden snowflake overlay on black (loop, screen-blend friendly) ===== */
C[5]=()=>{newTL();const R=rng(505),mk=(n,r0,r1,m,a,low,tum)=>Array.from({length:n},()=>({x:R()*W,v:R(),r:r0+R()*(r1-r0),m,a:a*(.65+.35*R()),ph:R()*TAU,k:1+((R()*2)|0),kt:1+((R()*2)|0),sg:R()<.5?-1:1,vr:(R()*3)|0,sw:20+R()*70,low,tum,gl:R()<.35,kg:2+((R()*3)|0)}));
  const L=[mk(80,7,15,1,.5),mk(46,22,44,2,.8,0,1),mk(9,80,140,3,.36,1,1),mk(7,50,74,2,1,0,1)];
  const DUST=Array.from({length:700},()=>({x:R()*W,v:R(),s:.8+R()*1.6,ph:R()*TAU,k:1+((R()*3)|0),a:.3+R()*.7,m:R()<.6?1:2}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;ctx.globalCompositeOperation='lighter';
    ctx.fillStyle='#f4c85a';for(const d of DUST){const y=H-((d.v+u*d.m)%1)*H,tw=(.5+.5*Math.sin(th*d.k*2+d.ph))**2;ctx.globalAlpha=d.a*(.1+.7*tw);ctx.fillRect(d.x+Math.sin(th*d.k+d.ph)*24,y,d.s,d.s)}
    for(const layer of L)for(const f of layer){const yy=(f.v+u*f.m)%1,y=-f.r*1.3+yy*(H+2.6*f.r),x=f.x+Math.sin(th*f.k+f.ph)*f.sw,tilt=f.tum?.2+.8*Math.abs(Math.cos(th*f.kt+f.ph)):1;
      ctx.save();ctx.translate(x,y);ctx.rotate(f.ph+th*f.sg*f.k);ctx.scale(1,tilt);
      if(f.low){ctx.globalAlpha=f.a;ctx.drawImage(flakeSpr(f.vr,'#f2c04e',f.r,1),-f.r,-f.r,2*f.r,2*f.r)}
      else{ctx.globalAlpha=f.a*.35;ctx.drawImage(spr([244,190,80],64),-f.r*1.7,-f.r*1.7,f.r*3.4,f.r*3.4);ctx.globalAlpha=f.a;ctx.drawImage(flakeSpr(f.vr,'#e8b445',f.r),-f.r,-f.r,2*f.r,2*f.r);ctx.globalAlpha=f.a*.55;ctx.drawImage(flakeSpr(f.vr,'#fff1c4',f.r),-f.r,-f.r,2*f.r,2*f.r)}
      ctx.restore();
      if(f.gl&&f.r>20&&!f.low){const a=Math.max(0,Math.sin(th*f.kg+f.ph))**14;if(a>.05){ctx.save();ctx.translate(x,y);ctx.rotate(f.ph+th*f.sg*f.k);flare(f.r*.9,0,f.r*.5*(.4+a),a,'#fff6dc');ctx.restore()}}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.8,[2,4]);grain(.02)}};

/* ===== 6 : blue stage spotlight beams sweeping through haze (loop) ===== */
C[6]=()=>{newTL();const R=rng(606),FW=240,FH=135,fk=offscreen(FW,FH),fx=fk.getContext('2d'),fi=fx.createImageData(FW,FH),FLOOR=900;
  const BM=[[220,18,16,1,0,1750,3.4,[40,110,255],.55],[560,6,22,2,1,1750,2.6,[90,200,255],.5],[960,0,26,1,2,1850,3.8,[60,140,255],.62],[1360,-6,22,2,4,1750,2.6,[90,200,255],.5],[1700,-18,16,1,3.2,1750,3.4,[40,110,255],.55],[400,-10,14,3,.7,1500,1.8,[200,230,255],.34],[1520,10,14,3,2.3,1500,1.8,[200,230,255],.34]];
  const MO=Array.from({length:560},()=>({x:R()*W,y:R()*H,s:.8+R()*1.6,ph:R()*TAU,k:1+((R()*3)|0),m:R()<.5?1:2,a:.3+R()*.7}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#01030a');g.addColorStop(.7,'#030b20');g.addColorStop(1,'#05102c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(let j=0;j<FH;j++)for(let i=0;i<FW;i++){const x=i/FW*W,y=j/FH*H,n=lnoise(x*.0012,y*.0016,th)*.65+lnoise(x*.003+9,y*.003,th*2)*.35,v=Math.max(0,.55+.7*n)*(.4+.6*(1-y/H*.5)),k=(j*FW+i)*4;fi.data[k]=40;fi.data[k+1]=110;fi.data[k+2]=235;fi.data[k+3]=Math.min(255,v*30)}
    fx.putImageData(fi,0,0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1;ctx.drawImage(fk,0,0,W,H);
    g=ctx.createLinearGradient(0,FLOOR-170,0,H);g.addColorStop(0,'rgba(30,80,190,0)');g.addColorStop(.55,'rgba(30,80,190,.16)');g.addColorStop(1,'rgba(10,30,90,.05)');ctx.fillStyle=g;ctx.fillRect(0,FLOOR-170,W,H-FLOOR+170);
    const info=[];
    for(const [sx,b,am,k,ph,L,hw,c,al] of BM){const ang=b+am*Math.sin(th*k+ph),ar=ang*Math.PI/180,dx=Math.sin(ar),dy=Math.cos(ar);info.push([sx,ang,hw,L,al]);
      for(const [wm,am2] of [[2.2,.2],[1.3,.38],[.55,.8]]){const h=hw*wm*Math.PI/180,c1=Math.cos(h),s1=Math.sin(h),p1=[sx+L*(dx*c1-dy*s1),-40+L*(dx*s1+dy*c1)],p2=[sx+L*(dx*c1+dy*s1),-40+L*(-dx*s1+dy*c1)];
        const gg=ctx.createLinearGradient(sx,-40,sx+dx*L,-40+dy*L);gg.addColorStop(0,rgba(c,al*am2));gg.addColorStop(.45,rgba(c,al*am2*.4));gg.addColorStop(1,rgba(c,0));ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(sx,-40);ctx.lineTo(p1[0],p1[1]);ctx.lineTo(p2[0],p2[1]);ctx.closePath();ctx.fill()}
      ctx.globalAlpha=.85;ctx.drawImage(spr(c,256),sx-190,-40-190,380,380);
      const hx=sx+dx*(FLOOR+40)/dy;ctx.globalAlpha=.42*al/.55;ctx.drawImage(spr(c,128),hx-280,FLOOR-48,560,120);ctx.globalAlpha=.3*al/.55;ctx.drawImage(spr([230,244,255],128),hx-110,FLOOR-14,220,48)}
    ctx.fillStyle='#d4e8ff';
    for(const m of MO){const y=((m.y/H-u*m.m)%1+1)%1*H,x=m.x+Math.sin(th*m.k+m.ph)*26;let bn=0;for(const [sx,ang,hw,L,al] of info){const am=Math.atan2(x-sx,y+40)*180/Math.PI,d=(am-ang)/(hw*1.25);bn=Math.max(bn,Math.exp(-d*d)*(1-Math.hypot(x-sx,y+40)/L)*al/.55)}
      const tw=(.5+.5*Math.sin(th*m.k*2+m.ph))**2;ctx.globalAlpha=Math.min(1,m.a*(.05+1.1*Math.max(0,bn))*(.3+.7*tw));if(ctx.globalAlpha<.02)continue;ctx.fillRect(x,y,m.s*1.3,m.s*1.3)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.9,[2,4]);vignette(.5);grain(.025)}};

/* ===== 7 : GREEN SCREEN snowflake and bokeh light frame (chroma green #00B140, loop) ===== */
C[7]=()=>{newTL();window.BG='#00b140';const R=rng(707),side=()=>R()<.5?R()*300:W-R()*300,edge=()=>R()<.5?R()*190:H-R()*190;
  const V=[],Hh=[],mkF=(arr,n,r0,r1,m,a,low,pos)=>{for(let i=0;i<n;i++){const p=pos();arr.push({x:p[0],y:p[1],v:R(),r:r0+R()*(r1-r0),m,a:a*(.7+.3*R()),ph:R()*TAU,k:1+((R()*2)|0),sg:R()<.5?-1:1,vr:(R()*3)|0,sw:10+R()*36,low})}};
  mkF(V,60,6,13,1,.7,0,()=>[side(),0]);mkF(V,44,16,30,2,.95,0,()=>[side(),0]);mkF(V,8,70,120,3,.45,1,()=>[side(),0]);mkF(V,5,44,64,2,1,0,()=>[side(),0]);
  mkF(Hh,50,6,13,1,.7,0,()=>[0,edge()]);mkF(Hh,36,16,30,1,.95,0,()=>[0,edge()]);mkF(Hh,6,70,110,1,.45,1,()=>[0,edge()]);
  const CL=[[255,255,255],[255,218,140],[196,226,255],[255,192,214],[255,244,214]];
  const BK=Array.from({length:70},()=>{const s=R()<.5,x=s?side():R()*W,y=s?R()*H:edge();return{x,y,r:14+Math.pow(R(),1.8)*110,c:CL[(R()*5)|0],a:.35+R()*.5,ph:R()*TAU,k:1+((R()*2)|0),sw:12+R()*30}});
  const ST=Array.from({length:30},()=>{const s=R()<.5,x=s?side():R()*W,y=s?R()*H:edge();return{x,y,r:9+R()*22,k:2+((R()*4)|0),ph:R()*TAU}});
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;ctx.globalCompositeOperation='source-over';
    for(const b of BK){ctx.globalAlpha=b.a*(.7+.3*Math.sin(th*b.k+b.ph));ctx.drawImage(bokehSpr(b.c),b.x+Math.sin(th*b.k+b.ph)*b.sw-b.r,b.y+Math.cos(th*b.k+b.ph)*b.sw*.6-b.r,2*b.r,2*b.r)}
    const cols=['#ffffff','#f4fbff','#fffdf6'];
    const fl=(f,x,y)=>{ctx.save();ctx.translate(x,y);ctx.rotate(f.ph+th*f.sg*f.k);ctx.globalAlpha=f.a;ctx.drawImage(flakeSpr(f.vr,f.low?'#ffffff':cols[f.vr],f.r,f.low),-f.r,-f.r,2*f.r,2*f.r);ctx.restore()};
    for(const f of V){const yy=(f.v+u*f.m)%1;fl(f,f.x+Math.sin(th*f.k+f.ph)*f.sw,-f.r+yy*(H+2*f.r))}
    for(const f of Hh){const xx=(f.v+u*f.m*(f.y>H/2?-1:1)+1)%1;fl(f,-f.r+xx*(W+2*f.r),f.y+Math.sin(th*f.k+f.ph)*f.sw)}
    for(const s of ST){const a=(.5+.5*Math.sin(th*s.k+s.ph))**3;flare(s.x,s.y,s.r*(.4+.8*a),.3+.7*a,'#ffffff')}
    ctx.globalAlpha=1}};

/* ===== 8 : starry night sky, milky way, moon, shooting stars, pine ridge (loop) ===== */
C[8]=()=>{newTL();const R=rng(808),MW=320,MH=180,mk=offscreen(MW,MH),mx=mk.getContext('2d'),mi=mx.createImageData(MW,MH);
  const TC=[[255,255,255],[190,215,255],[255,236,205]],tint=()=>TC[(R()*3)|0];
  const T=Array.from({length:2600},()=>({x:R()*W,y:R()*H*.86,s:.7+R()*1.1,a:.25+R()*.75,ph:R()*TAU,k:1+((R()*4)|0),z:.3+R()*.7,c:tint()}));
  const M=Array.from({length:420},()=>({x:R()*W,y:R()*H*.84,r:3+R()*7,a:.3+R()*.6,ph:R()*TAU,k:1+((R()*4)|0),z:.5+R()*.5,c:tint()}));
  const Bg=Array.from({length:36},()=>({x:80+R()*(W-160),y:60+R()*H*.7,r:12+R()*30,k:2+((R()*4)|0),ph:R()*TAU,c:tint()}));
  const SS=[[2.2,.9,300,120,1,.55],[7.4,1,1500,70,-1,.4],[11.6,.9,860,200,1,.6]];
  const ridge=[[],[]];{for(let row=0;row<2;row++){const r2=rng(81+row);let x=-40;while(x<W+60){const base=H*(row?.97:.9)-40*(.5+.5*fbm(x*.0022+row*5,3,3)),h=(row?110:70)+r2()*(row?170:110);ridge[row].push([x,base,h]);x+=(row?34:26)+r2()*(row?54:40)}}}
  draw=()=>{clear();const ms=now(),th=LOOP(ms),t=ms/1000;
    let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#010208');g.addColorStop(.5,'#050d26');g.addColorStop(.82,'#12214a');g.addColorStop(1,'#1d2c58');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(let j=0;j<MH;j++)for(let i=0;i<MW;i++){const x=i/MW*W,y=j/MH*H,lined=Math.abs((x-W*.05)*.62+(y-H)*.78),core=Math.exp(-((lined/(H*.2))**2)),n=.5+.5*lnoise(x*.0035,y*.0035,th),dust=Math.max(0,lnoise(x*.0035+20,y*.0035,th*2)),a=core*(.3+.7*n)*(1-.5*dust),k=(j*MW+i)*4,w=core*core;
      mi.data[k]=lerp(60,215,w);mi.data[k+1]=lerp(95,185,w);mi.data[k+2]=lerp(200,205,w);mi.data[k+3]=clamp(a*85,0,255)}
    mx.putImageData(mi,0,0);ctx.globalAlpha=.8;ctx.drawImage(mk,0,0,W,H);
    for(const s of T){const x=s.x+Math.sin(th)*3*s.z,tw=(.5+.5*Math.sin(th*s.k*2+s.ph))**2;ctx.globalAlpha=s.a*(.25+.75*tw)*.9;ctx.fillStyle=rgba(s.c,1);ctx.fillRect(x,s.y,s.s,s.s)}
    for(const s of M){const x=s.x+Math.sin(th+s.ph)*5*s.z,tw=(.5+.5*Math.sin(th*s.k*2+s.ph))**2;ctx.globalAlpha=s.a*(.3+.7*tw);ctx.drawImage(spr(s.c,64),x-s.r,s.y-s.r,2*s.r,2*s.r)}
    for(const s of Bg){const a=(.5+.5*Math.sin(th*s.k+s.ph))**2.5,x=s.x+Math.sin(th+s.ph)*7;ctx.globalAlpha=.35+.65*a;ctx.drawImage(spr(s.c,128),x-s.r*1.3,s.y-s.r*1.3,s.r*2.6,s.r*2.6);flare(x,s.y,s.r*(.5+.6*a),.5+.5*a,rgba(s.c,1))}
    const mxp=1500+Math.sin(th)*6,myp=225;ctx.globalAlpha=.2;ctx.drawImage(spr([170,190,255],256),mxp-420,myp-420,840,840);ctx.globalAlpha=.16;ctx.drawImage(spr([230,236,255],256),mxp-170,myp-170,340,340);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;g=ctx.createRadialGradient(mxp-14,myp-14,6,mxp,myp,56);g.addColorStop(0,'#fffef6');g.addColorStop(1,'#d9dcef');ctx.fillStyle=g;ctx.beginPath();ctx.arc(mxp,myp,54,0,TAU);ctx.fill();
    ctx.fillStyle='rgba(120,130,170,.16)';for(const [cx,cy,cr] of [[-16,-10,13],[18,8,10],[-6,22,8],[22,-22,6]]){ctx.beginPath();ctx.arc(mxp+cx,myp+cy,cr,0,TAU);ctx.fill()}
    ctx.globalCompositeOperation='lighter';
    for(const [t0,dur,x0,y0,dir,len] of SS){const p=(t-t0)/dur;if(p<0||p>1)continue;const e=ez('power1.inOut',p),hx=x0+dir*e*len*3.2,hy=y0+e*len*1.6,tx=hx-dir*200*Math.sin(Math.PI*p),ty=hy-100*Math.sin(Math.PI*p),gg=ctx.createLinearGradient(tx,ty,hx,hy);gg.addColorStop(0,'rgba(180,210,255,0)');gg.addColorStop(1,'rgba(255,255,255,.95)');
      ctx.globalAlpha=Math.sin(Math.PI*p);ctx.strokeStyle=gg;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(hx,hy);ctx.stroke();ctx.drawImage(spr([200,225,255],64),hx-18,hy-18,36,36)}
    ctx.globalAlpha=.16;ctx.globalCompositeOperation='lighter';{const fy=H*.8;const gg=ctx.createLinearGradient(0,fy-120,0,fy+60);gg.addColorStop(0,'rgba(120,150,230,0)');gg.addColorStop(.6,'rgba(120,150,230,.9)');gg.addColorStop(1,'rgba(120,150,230,0)');ctx.fillStyle=gg;ctx.fillRect(0,fy-120+8*Math.sin(th),W,180)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    for(let row=0;row<2;row++){ctx.fillStyle=row?'#010207':'#050a1d';ctx.beginPath();ctx.moveTo(-60,H+10);
      for(const [x,b2,h] of ridge[row]){const sw=Math.sin(th+x*.013)*1.4;ctx.lineTo(x-.17*h,b2);ctx.lineTo(x-.07*h,b2-.42*h);ctx.lineTo(x-.11*h,b2-.42*h);ctx.lineTo(x-.035*h+sw*.3,b2-.72*h);ctx.lineTo(x-.06*h+sw*.3,b2-.72*h);ctx.lineTo(x+sw,b2-h);ctx.lineTo(x+.06*h+sw*.3,b2-.72*h);ctx.lineTo(x+.035*h+sw*.3,b2-.72*h);ctx.lineTo(x+.11*h,b2-.42*h);ctx.lineTo(x+.07*h,b2-.42*h);ctx.lineTo(x+.17*h,b2)}
      ctx.lineTo(W+60,H+10);ctx.closePath();ctx.fill()}
    bloom(.4,[2,4]);vignette(.4);grain(.03)}};
