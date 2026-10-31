/* ===== 17 : aurora curtains over a mountain lake with reflection (loop) ===== */
C[17]=()=>{newTL();const R=rng(1717),AW=480,AH=270,SKY=H*.8,ac=offscreen(AW,AH),ax=ac.getContext('2d'),ai=ax.createImageData(AW,AH);
  const LY=[{c0:[60,255,160],c1:[120,110,255],y:.2,k:0},{c0:[40,230,200],c1:[200,90,255],y:.28,k:1},{c0:[120,255,120],c1:[255,90,200],y:.15,k:2}];
  const ST=Array.from({length:900},()=>({x:R()*W,y:R()*SKY,s:.7+R()*1.3,ph:R()*TAU,k:1+((R()*4)|0),a:.3+R()*.7}));
  const mt=[];for(let x=-20;x<=W+20;x+=10)mt.push([x,SKY-30-130*Math.max(0,fbm(x*.0016+5,2,4)*.5+.5)-14*Math.sin(x*.05)]);
  const yb=new Float32Array(AW),ry=new Float32Array(AW),br=new Float32Array(AW);
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    let g=ctx.createLinearGradient(0,0,0,SKY);g.addColorStop(0,'#010309');g.addColorStop(.7,'#041028');g.addColorStop(1,'#0b2442');ctx.fillStyle=g;ctx.fillRect(0,0,W,SKY);
    ctx.globalCompositeOperation='lighter';ctx.fillStyle='#e8efff';for(const s of ST){const f=1-s.y/SKY*.85,tw=(.5+.5*Math.sin(th*s.k*2+s.ph))**2;ctx.globalAlpha=s.a*f*(.25+.75*tw);ctx.fillRect(s.x,s.y,s.s,s.s)}
    const P=new Float32Array(AW*AH*3);
    for(const L of LY){for(let i=0;i<AW;i++){const x=i/AW*W;yb[i]=H*L.y+170*lnoise(x*.0011+L.k*5,L.k*3,th)+40*Math.sin(x*.004+th*(L.k+1)+L.k);ry[i]=.5+.5*lnoise(x*.014+L.k*9,L.k*7,th*2);br[i]=.55+.45*lnoise(x*.0022+3,L.k*2+1,th)}
      for(let j=0;j<AH;j++){const y=j/AH*SKY;for(let i=0;i<AW;i++){const d=yb[i]+SKY*.12-y;let I;if(d>0)I=Math.exp(-d/(H*.2));else I=Math.exp(d/(H*.012));I*=(.4+.6*ry[i])*br[i]*.65;if(I<.004)continue;const m=clamp(d/(H*.3),0,1),k=(j*AW+i)*3;P[k]+=lerp(L.c0[0],L.c1[0],m)/255*I;P[k+1]+=lerp(L.c0[1],L.c1[1],m)/255*I;P[k+2]+=lerp(L.c0[2],L.c1[2],m)/255*I}}}
    for(let p=0;p<AW*AH;p++){const r=P[p*3],gg=P[p*3+1],b=P[p*3+2],a=Math.min(1,Math.max(r,gg,b));ai.data[p*4]=a?r/a*255:0;ai.data[p*4+1]=a?gg/a*255:0;ai.data[p*4+2]=a?b/a*255:0;ai.data[p*4+3]=a*255}
    ax.putImageData(ai,0,0);ctx.globalAlpha=.95;ctx.drawImage(ac,0,0,W,SKY);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;g=ctx.createLinearGradient(0,SKY,0,H);g.addColorStop(0,'#06182e');g.addColorStop(1,'#010610');ctx.fillStyle=g;ctx.fillRect(0,SKY,W,H-SKY);
    ctx.save();ctx.beginPath();ctx.rect(0,SKY,W,H-SKY);ctx.clip();ctx.translate(0,SKY*2);ctx.scale(1,-1);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.65;ctx.drawImage(ac,0,0,W,SKY);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.85;ctx.fillStyle='#02060e';ctx.beginPath();ctx.moveTo(-20,SKY);for(const p of mt)ctx.lineTo(p[0],p[1]);ctx.lineTo(W+20,SKY);ctx.closePath();ctx.fill();ctx.restore();
    g=ctx.createLinearGradient(0,SKY,0,H);g.addColorStop(0,'rgba(1,6,16,0)');g.addColorStop(1,'rgba(1,6,16,.7)');ctx.fillStyle=g;ctx.fillRect(0,SKY,W,H-SKY);
    ctx.globalAlpha=1;ctx.fillStyle='#02060e';ctx.beginPath();ctx.moveTo(-20,SKY+2);for(const p of mt)ctx.lineTo(p[0],p[1]);ctx.lineTo(W+20,SKY+2);ctx.closePath();ctx.fill();
    bloom(.5,[2,4]);vignette(.4);grain(.03)}};

/* ===== 18 : confetti cannons, rainbow confetti with ALPHA CHANNEL (15 s, clears by the end) ===== */
C[18]=()=>{newTL();const R=rng(1818),COL=['#ffc933','#ff3d8b','#22d3ee','#ffffff','#ff7a1a','#8b5cf6','#4ade80'];
  const CN=[[.4,160,1030,-65,36],[.4,1760,1030,-115,36],[2.3,W/2,1050,-90,52],[4.2,160,1030,-60,34],[4.2,1760,1030,-120,34],[6.3,520,1050,-78,40],[6.3,1400,1050,-102,40],[8.4,W/2,1050,-90,62],[9.6,160,1030,-62,34],[9.6,1760,1030,-118,34]];
  const B=CN.map(([t0,x,y,ang,sp])=>({t0,x,y,p:Array.from({length:320},()=>{const a=(ang+(R()*2-1)*sp)*Math.PI/180,v=700+Math.pow(R(),.7)*1000;return{vx:Math.cos(a)*v,vy:Math.sin(a)*v,vt:230+R()*150,w:10+R()*14,h:6+R()*8,c:COL[(R()*7)|0],ph:R()*TAU,sp:(R()<.5?-1:1)*(2+R()*7),fl:3+R()*6,sw:10+R()*30,dot:R()<.18,dl:R()*.12}})}));
  draw=()=>{clear();const t=now()/1000,k=1.45;
    for(const b of B){const rt=t-b.t0;if(rt<0)continue;
      if(rt<.2){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-rt/.2)*.9;ctx.drawImage(spr([255,214,120],128),b.x-110,b.y-110,220,220);ctx.globalCompositeOperation='source-over'}
      for(const p of b.p){const a=rt-p.dl;if(a<0)continue;const e=(1-Math.exp(-k*a))/k,x=b.x+p.vx*e+Math.sin(a*2.2+p.ph)*p.sw*Math.min(1,a*.8),y=b.y+p.vt*a+(p.vy-p.vt)*e;if(y>H+40||x<-40||x>W+40)continue;
        const fl=Math.cos(a*p.fl+p.ph),sh=fl>0?1:.62;ctx.save();ctx.translate(x,y);ctx.rotate(p.ph+a*p.sp*.4);ctx.scale(1,Math.max(.06,Math.abs(fl)));ctx.globalAlpha=1;ctx.fillStyle=p.c;
        if(p.dot){ctx.beginPath();ctx.arc(0,0,p.h*.7,0,TAU);ctx.fill()}else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
        if(sh<1){ctx.fillStyle='rgba(0,0,0,.28)';if(p.dot){ctx.beginPath();ctx.arc(0,0,p.h*.7,0,TAU);ctx.fill()}else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h)}ctx.restore()}}
    ctx.globalAlpha=1}};

/* ===== 19 : Ramadan Kareem, golden crescent, lanterns and arabesque (15 s) ===== */
C[19]=()=>{const D=DUR/1000,g={fade:0,pat:0,cr:0,ar:0,en:0,l0:0,l1:0,l2:0,l3:0,cam:0};newTL();const R=rng(1919);
  A(g,{fade:0},{fade:1},0,.8,'power1.out');A(g,{pat:0},{pat:1},.2,3,'power2.out');[0,1,2,3].forEach(i=>A(g,{['l'+i]:0},{['l'+i]:1},.6+i*.35,1.6,'expo.out'));
  A(g,{cr:0},{cr:1},1.6,1.6,'power3.out');A(g,{ar:0},{ar:1},3.0,1.5,'power3.out');A(g,{en:0},{en:1},4.4,1.3,'power3.out');A(g,{cam:0},{cam:1},0,D,'none');A(g,{fade:1},{fade:0},D-1,1,'power1.in');
  const ST=Array.from({length:130},()=>({x:R()*W,y:R()*H*.7,s:.8+R()*1.6,ph:R()*TAU,k:.6+R()*1.6}));
  const LN=[[250,360,150,0,'l0'],[500,200,105,1.7,'l1'],[1670,360,150,3.1,'l2'],[1420,200,105,4.4,'l3']];
  const crescent=(()=>{let c=null;return r=>{if(c)return c;const px=Math.ceil(r*2.6*S),o=offscreen(px,px),x=o.getContext('2d');x.translate(px/2,px/2);const u=px/2.6;
    const gg=x.createLinearGradient(-u,-u,u,u);gg.addColorStop(0,'#fff0b8');gg.addColorStop(.45,'#f0bd45');gg.addColorStop(1,'#b97a14');x.fillStyle=gg;x.beginPath();x.arc(0,0,u,0,TAU);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(u*.38,-u*.12,u*.84,0,TAU);x.fill();
    x.globalCompositeOperation='source-atop';x.strokeStyle='rgba(255,246,210,.8)';x.lineWidth=u*.025;x.beginPath();x.arc(0,0,u*.96,Math.PI*.55,Math.PI*1.4);x.stroke();return c=o}})();
  function lantern(px,len,sz,ph,k,t){const sw=.07*Math.sin(t*.9+ph),dy=-(1-k)*(len+sz+80);ctx.save();ctx.translate(px,dy);ctx.rotate(sw);
    ctx.strokeStyle='rgba(212,170,80,.7)';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(0,len);ctx.stroke();ctx.translate(0,len);const w=sz*.6,h=sz,fl=.85+.15*Math.sin(t*5+ph*3)+.05*Math.sin(t*11+ph);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5*fl;ctx.drawImage(spr([255,170,60],256),-sz*1.5,h*.1-sz*1.1,sz*3,sz*2.4);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.fillStyle='#c8921f';ctx.beginPath();ctx.moveTo(-w*.3,0);ctx.quadraticCurveTo(0,-h*.22,w*.3,0);ctx.lineTo(w*.5,h*.08);ctx.lineTo(-w*.5,h*.08);ctx.closePath();ctx.fill();ctx.beginPath();ctx.arc(0,-h*.17,w*.07,0,TAU);ctx.fill();
    const bg=ctx.createLinearGradient(0,h*.08,0,h*.78);bg.addColorStop(0,`rgba(255,${190*fl|0},90,.95)`);bg.addColorStop(1,`rgba(255,${130*fl|0},40,.9)`);ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(-w*.5,h*.08);ctx.lineTo(w*.5,h*.08);ctx.lineTo(w*.42,h*.78);ctx.lineTo(-w*.42,h*.78);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#d9a63a';ctx.lineWidth=3;for(const f of [-.5,-.17,.17,.5]){ctx.beginPath();ctx.moveTo(f*w,h*.08);ctx.lineTo(f*w*.84,h*.78);ctx.stroke()}ctx.beginPath();ctx.moveTo(-w*.45,h*.4);ctx.lineTo(w*.45,h*.4);ctx.stroke();
    ctx.fillStyle='#c8921f';ctx.beginPath();ctx.moveTo(-w*.46,h*.78);ctx.lineTo(w*.46,h*.78);ctx.lineTo(w*.12,h*.95);ctx.lineTo(-w*.12,h*.95);ctx.closePath();ctx.fill();ctx.beginPath();ctx.arc(0,h*.99,w*.07,0,TAU);ctx.fill();ctx.strokeStyle='#c8921f';ctx.beginPath();ctx.moveTo(0,h*1.02);ctx.lineTo(0,h*1.2);ctx.stroke();ctx.restore()}
  const goldT=()=>{const gg=ctx.createLinearGradient(0,-120,0,120);gg.addColorStop(0,'#ffe9a0');gg.addColorStop(.5,'#eab335');gg.addColorStop(1,'#b87a16');return gg};
  draw=()=>{clear();const t=now()/1000;ctx.save();const cs=1+.03*g.cam;ctx.translate(W/2,H/2);ctx.scale(cs,cs);ctx.translate(-W/2,-H/2);
    let gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#04202f');gr.addColorStop(1,'#010a12');ctx.fillStyle=gr;ctx.fillRect(-60,-60,W+120,H+120);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25*g.fade;ctx.drawImage(spr([20,140,150],256),W/2-900,-100,1800,1100);
    ctx.globalAlpha=.07*g.pat*g.fade;ctx.strokeStyle='#f0c460';ctx.lineWidth=1.5;{const T=170;ctx.beginPath();for(let y=0;y<H+T;y+=T)for(let x=0;x<W+T;x+=T){starPath(ctx,x,y,T*.5,T*.3,8,Math.PI/8);ctx.moveTo(x+T*.5,y);ctx.arc(x,y,T*.5,0,TAU)}ctx.stroke()}
    ctx.fillStyle='#fff3d0';for(const s of ST){ctx.globalAlpha=g.fade*(.15+.6*(.5+.5*Math.sin(t*s.k+s.ph))**2);ctx.fillRect(s.x,s.y,s.s,s.s)}
    ctx.globalCompositeOperation='source-over';
    if(g.cr>.01){const cr=165,sc=.7+.3*g.cr,cy=225+(1-g.cr)*40;ctx.save();ctx.translate(W/2,cy);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.28*g.cr*g.fade;ctx.drawImage(spr([255,190,80],256),-cr*2,-cr*2,cr*4,cr*4);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.cr*g.fade;ctx.rotate(-.35+.015*Math.sin(t*.8));ctx.scale(sc,sc);ctx.drawImage(crescent(cr),-cr*1.3,-cr*1.3,cr*2.6,cr*2.6);
      ctx.restore();ctx.save();ctx.translate(W/2+62,cy-24);ctx.globalAlpha=g.cr*g.fade;ctx.rotate(t*.3);starPath(ctx,0,0,30*sc,13*sc,5);const sg=ctx.createLinearGradient(-30,-30,30,30);sg.addColorStop(0,'#fff0b8');sg.addColorStop(1,'#d79a24');ctx.fillStyle=sg;ctx.fill();ctx.restore()}
    for(const [px,len,sz,ph,key] of LN){ctx.globalAlpha=g.fade;lantern(px,len,sz,ph,g[key],t)}
    ctx.globalAlpha=g.fade*g.ar;txt('رمضان كريم',W/2,640+30*(1-g.ar),{f:'Amiri',w:700,size:240,fill:goldT(),glow:[['rgba(255,190,70,.45)',30]],sc:.94+.06*g.ar});
    ctx.globalAlpha=g.fade*g.en;txt('RAMADAN KAREEM',W/2,835+14*(1-g.en),{f:'Montserrat',w:700,size:46,ls:24,fill:'#f3d58a'});
    const ln=g.en*340;ctx.globalAlpha=g.fade*g.en;const lg=ctx.createLinearGradient(W/2-ln,0,W/2+ln,0);lg.addColorStop(0,'rgba(240,196,96,0)');lg.addColorStop(.5,'rgba(240,196,96,.9)');lg.addColorStop(1,'rgba(240,196,96,0)');ctx.fillStyle=lg;ctx.fillRect(W/2-ln,890,2*ln,2);
    ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.5,[2,4]);vignette(.5);grain(.03)}};

/* ===== 20 : bright pastel mesh gradient with floating glass bubbles (loop, light background) ===== */
C[20]=()=>{newTL();const R=rng(2020),MW=192,MH=108,mc=offscreen(MW,MH),mx=mc.getContext('2d');
  const BL=[{c:[255,184,161],x:.2,y:.25,ax:.1,ay:.08,r:.42,k:1,ph:0},{c:[201,182,255],x:.78,y:.2,ax:.08,ay:.12,r:.46,k:1,ph:1.5},{c:[169,216,255],x:.5,y:.85,ax:.14,ay:.06,r:.5,k:1,ph:3},{c:[255,233,168],x:.12,y:.8,ax:.08,ay:.1,r:.38,k:2,ph:4.2},{c:[255,167,196],x:.88,y:.7,ax:.07,ay:.1,r:.4,k:1,ph:5.3},{c:[185,241,214],x:.5,y:.35,ax:.12,ay:.1,r:.36,k:2,ph:2.2}];
  const BB=Array.from({length:9},()=>({x:R()*W,y:R()*H,r:50+Math.pow(R(),1.5)*170,ph:R()*TAU,k:1+((R()*2)|0),ax:20+R()*60,ay:20+R()*60}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    mx.globalCompositeOperation='source-over';mx.fillStyle='#fdf4f1';mx.fillRect(0,0,MW,MH);
    for(const b of BL){const x=(b.x+b.ax*Math.sin(th*b.k+b.ph))*MW,y=(b.y+b.ay*Math.sin(th*(b.k+1)+b.ph*1.3))*MH,r=b.r*MW,gg=mx.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,rgba(b.c,.95));gg.addColorStop(1,rgba(b.c,0));mx.fillStyle=gg;mx.fillRect(0,0,MW,MH)}
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(mc,0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.1;ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.5);const bx=Math.sin(th)*300,lg=ctx.createLinearGradient(bx-300,0,bx+300,0);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(.5,'rgba(255,255,255,1)');lg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=lg;ctx.fillRect(bx-300,-1400,600,2800);ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    for(const b of BB){const x=b.x+Math.sin(th*b.k+b.ph)*b.ax,y=b.y+Math.cos(th*b.k+b.ph)*b.ay,gg=ctx.createRadialGradient(x-b.r*.35,y-b.r*.4,b.r*.05,x,y,b.r);gg.addColorStop(0,'rgba(255,255,255,.5)');gg.addColorStop(.7,'rgba(255,255,255,.08)');gg.addColorStop(1,'rgba(255,255,255,.28)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(x,y,b.r,0,TAU);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.65)';ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,b.r*.82,Math.PI*1.1,Math.PI*1.4);ctx.stroke()}
    grain(.04,'soft-light')}};
