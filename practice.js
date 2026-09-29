const CC=["黑","棕","紅","橙","黃","綠","藍","紫","灰","白"],CH=["#111","#7b4a1e","#d22","#f80","#ee0","#2a2","#24c","#808","#888","#fff"];
let rc=null;
function prac(){
 V.innerHTML=`<div class="c"><h2>色碼電阻</h2><div id="rc"></div></div>
 <div class="c"><h2>進位轉換</h2><div id="bc"></div></div>
 <div class="c"><h2>邏輯閘真值表</h2><div id="lg"></div></div>
 <div class="c"><h2>歐姆定律／功率</h2><div id="om"></div></div>`;newRC();newBC();newLG();newOM()}
function fmt(v){return v>=1e6?v/1e6+"MΩ":v>=1e3?v/1e3+"kΩ":v+"Ω"}
function newRC(){const five=Math.random()<.5,n=five?3:2;let d=[];for(let i=0;i<n;i++)d.push(Math.floor(Math.random()*(i?10:9))+(i?0:1));
 const m=Math.floor(Math.random()*4),tol=five?[1,"棕","#7b4a1e"]:[[5,"金","#d4af37"],[10,"銀","#ccc"]][Math.floor(Math.random()*2)];
 const val=+d.join("")*10**m;const t=five?["±1%","棕","#7b4a1e"]:["±"+tol[0]+"%",tol[1],tol[2]];
 rc={val,five};const bands=d.map(x=>[CC[x],CH[x]]).concat([[CC[m],CH[m]],[t[1],t[2]]]);
 $("rc").innerHTML=`<div class="res">${bands.map(b=>`<span class="sw" style="background:${b[1]}"></span>`).join("")}</div><div class="mu">${bands.map(b=>b[0]).join("、")}（${five?"五環":"四環"}）</div><input type="text" id="ri" placeholder="例：4.7k、220、1M" inputmode="text"> <button class="b" onclick="chRC()">檢查</button><button class="b" onclick="newRC()">換一題</button><div id="rr"></div>`}
function pv(s){s=s.trim().toLowerCase().replace(/[ωΩ]/g,"");const m=s.match(/^([\d.]+)\s*([kmr]?)$/);if(!m)return NaN;return +m[1]*({k:1e3,m:1e6,r:1,"":1}[m[2]])}
function chRC(){const v=pv($("ri").value);$("rr").innerHTML=v==rc.val?`<p class="ok">正確：${fmt(rc.val)}</p>`:`<p class="bad">${isNaN(v)?"格式不對":"不對"}，答案 ${fmt(rc.val)}${rc.five?"（前三環為有效數字，第四環為倍率）":""}</p>`}
let bc=null;
function newBC(){const k=Math.floor(Math.random()*4),n=Math.floor(Math.random()*200)+8;const F=[["十進位 → 二進位",n,n.toString(2)],["二進位 → 十進位",n.toString(2),n+""],["十進位 → 十六進位",n,n.toString(16).toUpperCase()],["十進位 → BCD",n,String(n).split("").map(x=>(+x).toString(2).padStart(4,"0")).join("")]][k];bc=F[2];
 $("bc").innerHTML=`<p>${F[0]}：<b>${F[1]}</b></p><input type="text" id="bi" inputmode="text"> <button class="b" onclick="chBC()">檢查</button><button class="b" onclick="newBC()">換一題</button><div id="br"></div>`}
function chBC(){const v=$("bi").value.trim().toUpperCase();$("br").innerHTML=v==bc?'<p class="ok">正確</p>':`<p class="bad">答案：${bc}</p>`}
const GT={AND:(a,b)=>a&b,OR:(a,b)=>a|b,NAND:(a,b)=>+!(a&b),NOR:(a,b)=>+!(a|b),XOR:(a,b)=>a^b,XNOR:(a,b)=>+!(a^b)};let gn="AND",gu=[0,0,0,0];
function newLG(){const k=Object.keys(GT);gn=k[Math.floor(Math.random()*k.length)];gu=[0,0,0,0];drawLG()}
function drawLG(r){$("lg").innerHTML=`<p>閘：<b>${gn}</b>　點輸出欄切換 0/1</p><table><tr><th>A</th><th>B</th><th>Y</th></tr>${[[0,0],[0,1],[1,0],[1,1]].map((p,i)=>`<tr><td>${p[0]}</td><td>${p[1]}</td><td><button class="o" style="text-align:center;margin:0;${r?(gu[i]==GT[gn](p[0],p[1])?"border-color:var(--ok)":"border-color:var(--bad)"):""}" onclick="gu[${i}]^=1;drawLG()">${gu[i]}</button></td></tr>`).join("")}</table><button class="b" onclick="chLG()">檢查</button><button class="b" onclick="newLG()">換一題</button>`}
function chLG(){drawLG(1)}
let om=null;
function newOM(){const R=[100,220,470,1000,2200,4700,10000][Math.floor(Math.random()*7)],Vv=[3,5,9,12,15][Math.floor(Math.random()*5)];const t=Math.floor(Math.random()*3);
 const F=[["電阻 "+fmt(R)+"，電壓 "+Vv+"V，電流是多少 mA？",Vv/R*1000],["電阻 "+fmt(R)+"，電壓 "+Vv+"V，消耗功率多少 mW？",Vv*Vv/R*1000],["LED 順向壓降約 1.6V，電源 "+Vv+"V，欲通過 10mA，限流電阻約多少 Ω？",(Vv-1.6)/0.01]][t];om=F[1];
 $("om").innerHTML=`<p>${F[0]}</p><input type="text" id="oi" inputmode="decimal"> <button class="b" onclick="chOM()">檢查</button><button class="b" onclick="newOM()">換一題</button><div id="or"></div>`}
function chOM(){const v=parseFloat($("oi").value);$("or").innerHTML=Math.abs(v-om)/om<0.03?`<p class="ok">正確：${om.toFixed(1)}</p>`:`<p class="bad">答案約 ${om.toFixed(1)}（誤差 3% 內算對）</p>`}
let gi=0;
function prc(){const g=G[gi];
 V.innerHTML=`<div class="c"><h2>試題二 測試題組</h2><select onchange="gi=+this.value;prc()">${G.map((x,i)=>`<option value="${i}" ${i==gi?"selected":""}>題組 ${x[0]}</option>`).join("")}</select>
 <div class="sc"><table><tr><th>RL1</th><th>RL2</th><th>RL3</th><th>RL4</th><th>RL5</th></tr><tr>${g.slice(1,6).map(x=>`<td>${x}</td>`).join("")}</tr><tr><th>R7</th><th>R8</th><th>R11</th><th colspan=2>波形</th></tr><tr>${g.slice(6,9).map(x=>`<td>${x}</td>`).join("")}<td colspan=2>${g[9]}<br>量測點 ${g[10]}</td></tr></table></div>
 <div class="mu">跳接／電阻值必須與題組完全相同，否則不及格。</div></div>
 <div class="c"><h2>術科自我檢查</h2>${TK.map((t,i)=>`<label class="ck"><input type="checkbox" ${S.tk[i]?"checked":""} onchange="S.tk[${i}]=this.checked;sv()">${t[0]}</label>`).join("")}<button class="b" onclick="S.tk={};sv();prc()">重置</button></div>
 <div class="c"><h2>重大缺失（直接不及格）</h2><div class="mu">・裸銅線間距小於萬孔板兩點距<br>・焊接面使用跳線／導線繞板外緣<br>・電路與佈置圖不符<br>・未在時間內完成、通電短路、作弊<br>・音樂盒：電源 ON 後指示燈不亮或無聲</div></div>
 <div class="c mu">音樂盒（試題一，114.10.17 修正）：組裝觸控子板前，先確認 TP1=12V(±1V)、TP2=5V(±0.5V)、TP3=6V(±0.5V)；音量 0～7、兩種音樂；1kHz 3Vp-p 正弦波須從「外部音源端子」輸入且有聲音。</div>`}
