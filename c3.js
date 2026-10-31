/* ===== 9 : golden glitter star border WITH ALPHA CHANNEL (transparent centre, loop) ===== */
C[9]=()=>{newTL();const R=rng(909),m=70,Wi=W-2*m,Hi=H-2*m,PL=2*(Wi+Hi);
  const pos=s=>{let d=((s%1)+1)%1*PL;if(d<Wi)return[m+d,m,0,1];d-=Wi;if(d<Hi)return[W-m,m+d,-1,0];d-=Hi;if(d<Wi)return[W-m-d,H-m,0,-1];d-=Wi;return[m,H-m-d,1,0]};
  const gauss=()=>{let u=0;for(let i=0;i<4;i++)u+=R();return(u-2)*1.7};
  const GL=Array.from({length:15000},()=>{const t=R(),sig=t<.2?4:t<.7?22:t<.93?52:96;return{s:R(),o:gauss()*sig,z:R()<.93?1.2+R()*1.3:2.6+R()*2.6,a:.45+R()*.55,ph:R()*TAU,k:2+((R()*3)|0),w:(R()*3)|0,pale:R()<.28}});
  const SR=[];for(let i=0;i<86;i++){const s=(i+R()*.8)/86,big=R()<.16;SR.push({s,o:10+R()*80,r:big?26+R()*18:9+R()*15,rot:R()*TAU,ph:R()*TAU,k:1+((R()*2)|0),sg:R()<.5?-1:1})}
  const CO=[[0,0,1,1],[W,0,-1,1],[W,H,-1,-1],[0,H,1,-1]].flatMap(([cx,cy,sx,sy])=>[[cx+sx*116,cy+sy*116,64,.3],[cx+sx*196,cy+sy*84,40,1.6],[cx+sx*86,cy+sy*196,40,2.6],[cx+sx*250,cy+sy*152,24,.9],[cx+sx*148,cy+sy*252,24,3.9]]);
  draw=()=>{clear();const ms=now(),th=LOOP(ms);ctx.globalCompositeOperation='lighter';
    for(const grp of [0,1]){ctx.fillStyle=grp?'#fff3cf':'#f0b53a';for(const p of GL){if((p.pale?1:0)!==grp)continue;const q=pos(p.s),w=Math.sin(th*p.k+p.ph-p.s*TAU*(3+p.w)),tw=(.5+.5*w)**2.2,al=Math.min(1,p.a*1.35)*(.14+.86*tw);if(al<.03)continue;
      const sway=Math.sin(th*p.k+p.ph)*4,x=q[0]+q[2]*(p.o+sway),y=q[1]+q[3]*(p.o+sway);ctx.globalAlpha=al;ctx.fillRect(x-p.z/2,y-p.z/2,p.z,p.z)}}
    const drawStar=(x,y,r,rot,b,ph)=>{ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.55+.45*b;ctx.drawImage(goldStar(r),-r,-r,2*r,2*r);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=b*.9;ctx.drawImage(spr([255,210,100],128),-r*2.1,-r*2.1,r*4.2,r*4.2);ctx.restore();
      if(b>.82){const e=(b-.82)/.18;ctx.globalAlpha=1;flare(x,y,r*(.8+.55*e),.75*e,'#ffe9a6')}};
    for(const s of SR){const q=pos(s.s),w=Math.sin(th*2-s.s*TAU*3+s.ph*.3),b=clamp(.5+.5*w,0,1)**1.4,x=q[0]+q[2]*s.o,y=q[1]+q[3]*s.o;drawStar(x,y,s.r,s.rot+.25*Math.sin(th*s.k+s.ph)*s.sg,b,s.ph)}
    for(const [x,y,r,ph] of CO){const b=clamp(.5+.5*Math.sin(th*2+ph),0,1)**1.3;drawStar(x,y,r,.2*Math.sin(th+ph),b,ph)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.6,[2,4])}};

/* ===== 10 : Black Friday sale banner, kinetic type (15 s) ===== */
C[10]=()=>{const D=DUR/1000,g={wipe:0,band:0,rib:0,badge:0,sh:0,out:1,tag:0,cam:0};newTL();const R=rng(1010);
  const RED='#e5142b',YEL='#ffd400';
  const sets=[mkL('BLACK','Montserrat',900,300,W/2,-6),mkL('BLACK','Montserrat',900,300,W/2+12,-6),mkL('FRIDAY','Montserrat',900,290,W/2,-6),mkL('UP TO 70% OFF','Bebas Neue',400,128,W/2,12)];
  const slam=(set,at,dir,st)=>set.L.forEach((l,i)=>A(l,{a:0,y:dir*320,sc:1.7},{a:1,y:0,sc:1},at+i*st,.75,'power4.out'));
  slam(sets[1],1.0,-1,.07);slam(sets[0],1.0,-1,.07);slam(sets[2],1.6,1,.07);
  sets[3].L.forEach((l,i)=>A(l,{a:0,y:46,sc:.7},{a:1,y:0,sc:1},3.2+i*.045,.6,'back.out(2)'));
  A(g,{band:0},{band:1},.3,.9,'expo.out');A(g,{rib:0},{rib:1},3.0,.8,'expo.out');A(g,{badge:0},{badge:1},4.1,1.0,'elastic.out(1,.5)');A(g,{tag:0},{tag:1},.6,1.0,'power3.out');
  A(g,{sh:18},{sh:0},2.3,.6,'power3.out');A(g,{sh:10},{sh:0},1.2,.5,'power3.out');A(g,{cam:0},{cam:1},0,D,'none');A(g,{out:1},{out:0},D-1.0,1.0,'power1.in');
  const EM=Array.from({length:110},()=>({x:R()*W,v:R(),m:1+((R()*2)|0),s:1.2+R()*3.5,ph:R()*TAU,c:R()<.6?[229,20,43]:R()<.6?[255,212,0]:[255,255,255],sw:10+R()*40}));
  const T=offscreen(W*S,H*S),tx=T.getContext('2d');
  draw=()=>{clear();const ms=now(),t=ms/1000,beat=fr(t/.5),pulse=Math.pow(1-beat,3)*(t>3?1:0);
    const sx=g.sh*Math.sin(ms*.11),sy=g.sh*Math.cos(ms*.093);ctx.save();const cs=1+.045*g.cam;ctx.translate(W/2+sx,H/2+sy);ctx.scale(cs,cs);ctx.translate(-W/2,-H/2);
    ctx.fillStyle='#050505';ctx.fillRect(-100,-100,W+200,H+200);
    ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.35);const per=170,off=(ms*.03)%(per*2);for(let i=-14;i<14;i++){ctx.fillStyle=i%2?'#0d0204':'#070707';ctx.fillRect(-2000+i*per-off,-1500,per,3000)}ctx.restore();
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55+.15*pulse;ctx.drawImage(spr([229,20,43],256),W/2-1100,H-700,2200,1100);ctx.globalAlpha=.2;ctx.drawImage(spr([255,60,60],256),-300,-400,1200,1000);
    for(const e of EM){const y=H+20-((e.v+t/(7+e.m*3))%1)*(H+60),a=Math.sin(Math.PI*((H+20-y)/(H+60)))**.7;ctx.globalAlpha=a*.8*g.out;ctx.fillStyle=rgba(e.c,1);ctx.fillRect(e.x+Math.sin(t*.8+e.ph)*e.sw,y,e.s,e.s)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.out;
    ctx.save();ctx.translate(W/2,655);ctx.rotate(-.105);let gr=ctx.createLinearGradient(0,-130,0,130);gr.addColorStop(0,'#ff2a3d');gr.addColorStop(1,'#b3001b');ctx.fillStyle=gr;ctx.fillRect(-1300,-135,2600*g.band,270);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(-1300,-135,2600*g.band,6);ctx.restore();
    ctx.save();ctx.translate(W/2,H*.5);ctx.globalAlpha=g.out*g.tag;txt('MEGA DEALS   •   LIMITED TIME ONLY',0,-H*.5+98,{f:'Montserrat',w:800,size:36,ls:14,fill:'#fff',a:.9});ctx.restore();
    ctx.globalAlpha=g.out;const sc=1+.012*pulse;
    ctx.save();ctx.translate(W/2,330);ctx.scale(sc,sc);ctx.translate(-W/2,-330);drawL(sets[1],330,{fill:RED});drawL(sets[0],330,{fill:'#ffffff',glow:[['rgba(255,255,255,.12)',10]]});ctx.restore();
    ctx.save();ctx.translate(W/2,650);ctx.rotate(-.105);ctx.scale(sc,sc);ctx.translate(-W/2,-650);ctx.save();ctx.shadowColor='rgba(80,0,10,.6)';ctx.shadowBlur=20*S;ctx.shadowOffsetY=10*S;drawL(sets[2],650,{fill:'#ffffff'});ctx.restore();ctx.restore();
    ctx.save();ctx.translate(W/2,925);ctx.rotate(.04);ctx.fillStyle=YEL;ctx.fillRect(-1300*g.rib,-66,2600*g.rib,132);ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(-1300*g.rib,58,2600*g.rib,8);
    ctx.translate(-W/2,-925);drawL(sets[3],925,{fill:'#0a0a0a'});ctx.restore();
    if(g.badge>.01){ctx.save();ctx.translate(1690,215);ctx.rotate(-.14+(1-g.badge)*-.7+.03*Math.sin(t*2));ctx.scale(.85*g.badge*(1+.03*pulse),.85*g.badge*(1+.03*pulse));
      starPath(ctx,0,0,150,118,16,t*.25);ctx.fillStyle='rgba(0,0,0,.45)';ctx.save();ctx.translate(8,10);ctx.fill();ctx.restore();const bg=ctx.createRadialGradient(-30,-40,10,0,0,150);bg.addColorStop(0,'#fff27a');bg.addColorStop(1,'#ffc400');ctx.fillStyle=bg;ctx.fill();ctx.lineWidth=5;ctx.strokeStyle='#0a0a0a';ctx.stroke();
      txt('SALE',0,4,{f:'Montserrat',w:900,size:86,ls:2,fill:'#0a0a0a'});ctx.restore()}
    /* light sweep across the headline words, every 3 s after the build */
    const ph=((t-5.2)%3)/1.1;if(t>5.2&&ph>=0&&ph<=1){const main=ctx;ctx=tx;tx.setTransform(1,0,0,1,0,0);tx.globalCompositeOperation='source-over';tx.globalAlpha=1;tx.clearRect(0,0,T.width,T.height);tx.setTransform(S,0,0,S,0,0);
      drawL(sets[0],330,{fill:'#fff'});tx.save();tx.translate(W/2,650);tx.rotate(-.105);tx.translate(-W/2,-650);drawL(sets[2],650,{fill:'#fff'});tx.restore();
      tx.globalCompositeOperation='source-atop';const bx=-300+ez('power2.inOut',ph)*(W+600),gg=tx.createLinearGradient(bx-160,0,bx+160,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,'rgba(255,255,255,.95)');gg.addColorStop(1,'rgba(255,255,255,0)');tx.fillStyle=gg;tx.fillRect(0,0,W,H);ctx=main;
      ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.8*g.out;ctx.drawImage(T,0,0);ctx.restore()}
    ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    if(g.out<1){ctx.globalAlpha=1-g.out;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
    bloom(.22,[2,4]);vignette(.32);grain(.03)}};

/* ===== 11 : comic burst, radial speed lines and halftone, zooming on the beat (loop, empty burst = copy space) ===== */
C[11]=()=>{newTL();const R=rng(1111),PAL=[[[255,212,0],[255,160,0]],[[255,61,46],[196,22,42]],[[24,184,255],[10,111,224]]],N=22,BS=Array.from({length:N},(_,i)=>({ro:300+R()*90,ri:196+R()*40}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),bl=2500,bi=Math.floor(ms/bl),ph=fr(ms/bl),cx=W/2,cy=H/2,e=clamp((ph-.82)/.18,0,1),k=ez('power2.inOut',e);
    const c0=PAL[bi%3],c1=PAL[(bi+1)%3],A1=mixc(c0[0],c1[0],k),A2=mixc(c0[1],c1[1],k),pulse=Math.pow(1-ph,3);
    let g=ctx.createRadialGradient(cx,cy,60,cx,cy,1150);g.addColorStop(0,rgba(A1,1));g.addColorStop(1,rgba(A2,1));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(.26);ctx.fillStyle=rgba(mixc(A2,[0,0,0],.35),.5);ctx.beginPath();for(let y=-1300;y<1300;y+=40)for(let x=-1500;x<1500;x+=40){const px=x+((y/40)&1)*20,d=Math.hypot(px,y),r=clamp((d-380)/760,0,1)*17;if(r<.8)continue;ctx.moveTo(px+r,y);ctx.arc(px,y,r,0,TAU)}ctx.fill();ctx.restore();
    const st=Math.floor(ms/83.333)%180,rr=rng(st*977+13);
    for(let i=0;i<72;i++){const a=i*TAU/72+(rr()-.5)*.045,w=(.012+rr()*.03)*(1+.4*pulse),rin=300+rr()*300+90*pulse,dark=rr()<.78,R2=1500;ctx.fillStyle=dark?'rgba(14,14,20,.92)':'rgba(255,255,255,.95)';ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*rin,cy+Math.sin(a)*rin);ctx.lineTo(cx+Math.cos(a-w)*R2,cy+Math.sin(a-w)*R2);ctx.lineTo(cx+Math.cos(a+w)*R2,cy+Math.sin(a+w)*R2);ctx.closePath();ctx.fill()}
    const ring=ez('expo.out',ph);ctx.strokeStyle='#fff';ctx.globalAlpha=Math.pow(1-ph,1.4)*.9;ctx.lineWidth=3+16*(1-ph);ctx.beginPath();ctx.arc(cx,cy,330+900*ring,0,TAU);ctx.stroke();ctx.globalAlpha=1;
    const sc=1+.1*pulse,rot=.05*Math.sin(th*2),pts=[];for(let i=0;i<N*2;i++){const a=rot+i*Math.PI/N,r=(i%2?BS[i>>1].ri:BS[i>>1].ro)*sc;pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r*.86])}
    const path=(ox,oy)=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0]+ox,p[1]+oy):ctx.moveTo(p[0]+ox,p[1]+oy));ctx.closePath()};
    path(16,18);ctx.fillStyle='rgba(10,10,16,.9)';ctx.fill();path(0,0);ctx.fillStyle='#fffdf4';ctx.fill();
    ctx.save();path(0,0);ctx.clip();ctx.fillStyle=rgba(mixc(A1,[255,255,255],.35),.55);ctx.beginPath();for(let y=-100;y<H+100;y+=30)for(let x=-100;x<W+100;x+=30){const px=x+((y/30)&1)*15,d=Math.hypot(px-cx,(y-cy)/.86),r=clamp((d-130)/260,0,1)*9;if(r<.6)continue;ctx.moveTo(px+r,y);ctx.arc(px,y,r,0,TAU)}ctx.fill();ctx.restore();
    path(0,0);ctx.lineWidth=11;ctx.lineJoin='round';ctx.strokeStyle='#0c0c12';ctx.stroke();
    grain(.025,'soft-light')}};

/* ===== 12 : repeating text pattern, alternating rows, outline and fill (loop) ===== */
C[12]=()=>{newTL();const WORD='WELCOME',F={f:'Montserrat',w:900,size:168,ls:6},tw0=tw(WORD,'Montserrat',900,168,6),U=tw0+170;
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    let g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#2a44ff');g.addColorStop(1,'#1220b8');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22+.04*Math.sin(th);ctx.drawImage(spr([120,150,255],256),-200,-400,1600,1500);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.21);
    for(let i=-9;i<=9;i++){const dir=i%2?-1:1,kk=(i%3===0)?2:1,off=dir*((u*kk)%1)*U,y=i*152,style=((i%3)+3)%3,wave=.5+.5*Math.sin(th-i*.55),al=.38+.62*wave;
      for(let j=-3;j<=3;j++){const x=-U*.5+j*U+off-tw0/2;ctx.globalAlpha=al;
        if(style===0){txt(WORD,x+7,y+9,{...F,al:'left',fill:'rgba(5,10,90,.45)'});txt(WORD,x,y,{...F,al:'left',fill:'#f6f7ff'})}
        else if(style===1){txt(WORD,x,y,{...F,al:'left',noFill:1,stroke:'#f6f7ff',lw:3.4})}
        else{txt(WORD,x+7,y+9,{...F,al:'left',fill:'rgba(5,10,90,.4)'});txt(WORD,x,y,{...F,al:'left',fill:'#ff5c39'})}
        ctx.globalAlpha=al;ctx.fillStyle=style===2?'#f6f7ff':'#ff5c39';starPath(ctx,x+tw0+85,y,26,10,4,th*0+Math.PI/4);ctx.fill()}}
    ctx.restore();ctx.globalAlpha=1;vignette(.28);grain(.03)}};
