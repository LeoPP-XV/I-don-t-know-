const $=id=>document.getElementById(id),V=$("v");
const pad=n=>String(n).padStart(2,"0"),fd=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()),td=()=>fd(new Date());
const ld=(k,f)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?f:v}catch(e){return f}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let P=ld("ec_p",[]),cur="",S={},tm=0,msg="";
function loadP(n){cur=n;put("ec_cur",n);S=ld("ec_d_"+n,{});S.chk=S.chk||{};S.st=S.st||{};S.days=S.days||{};S.tk=S.tk||{};S.ex=S.ex||[];S.su=S.su||{};S.log=S.log||{};S.best1=S.best1||0;S.wr=S.wr||[];S.goal=S.goal||10;S.sync=S.sync||{};hd()}
function hd(){$("who").textContent="👤 "+cur;$("sub").textContent=new Date().toLocaleDateString("zh-TW",{month:"long",day:"numeric",weekday:"long"})}
if(!P.length){P=["我"];put("ec_p",P)}
function th(t){document.documentElement.dataset.theme=t==="auto"?"":t;put("ec_th",t)}th(ld("ec_th","auto"));
function streak(){let n=0,d=new Date();if(!S.days[td()])d.setDate(d.getDate()-1);while(S.days[fd(d)]){n++;d.setDate(d.getDate()-1)}return n}
const UK=()=>{const k=[];U.forEach((u,i)=>u[2].forEach((_,j)=>k.push(i+"_"+j)));DAYS.forEach((_,j)=>k.push("d1_"+j));CRIT.forEach((_,j)=>k.push("c1_"+j));return k};
function tally(){const k=UK();return[k.filter(x=>S.chk[x]).length,k.length]}
function acc(){let c=0,n=0;Object.values(S.st).forEach(x=>{c+=x[0];n+=x[1]});return n?Math.round(c/n*100):null}
function summary(){const[d,a]=tally();return{name:cur,pct:Math.round(d/a*100),streak:streak(),today:S.days[td()]||0,goal:S.goal,acc:acc(),updated:new Date().toISOString()}}
function sv(){S.ts=Date.now();put("ec_d_"+cur,S);put("ec_sum",summary());clearTimeout(tm);if(S.sync.gist&&S.sync.token)tm=setTimeout(push,2500)}
function mark(){S.days[td()]=(S.days[td()]||0)+1}
const ring=(p,c="#fff",bg="#ffffff44")=>`<div class="ring"><svg width="96" height="96"><circle cx="48" cy="48" r="40" fill="none" stroke="${bg}" stroke-width="9"/><circle cx="48" cy="48" r="40" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${2*Math.PI*40}" stroke-dashoffset="${2*Math.PI*40*(1-p/100)}"/></svg><span>${p}%</span></div>`;
const tabs=[["home","🏠","首頁"],["quiz","📝","題庫"],["prac","🧮","練習"],["prc","🔧","術科"],["me","👤","我的"]];
let curT="home";
function go(t){curT=t;$("nav").innerHTML=tabs.map(x=>`<button class="${x[0]==t?"on":""}" onclick="go('${x[0]}')"><b>${x[1]}</b>${x[2]}</button>`).join("");({home,quiz,prac,prc,me})[t]();scrollTo(0,0)}
function logF(i){const l=S.log[i]||{};const f=(k,t)=>`<div class="mu">${t}</div><input type="text" style="width:100%" value="${(l[k]||"").replace(/"/g,"&quot;")}" onchange="lg(${i},'${k}',this.value)">`;
 return `<details><summary>📒 學習紀錄</summary>${f("l","學了什麼")}${f("d","做了什麼")}${f("f","哪裡失敗")}${f("s","測驗分數")}<div class="mu">是否過關</div><select onchange="lg(${i},'p',this.value)">${["","過關","未過關"].map(x=>`<option ${l.p==x?"selected":""}>${x}</option>`).join("")}</select></details>`}
function lg(i,k,v){S.log[i]=S.log[i]||{};S.log[i][k]=v;sv()}
function home(){
 const s=summary(),[d,a]=tally(),pr=Math.min(100,Math.round(s.today/s.goal*100)),bt=S.best1||0,pass=bt>=18&&CRIT.slice(1).every((_,j)=>S.chk["c1_"+(j+1)]);
 const ck=(k,t)=>`<label class="ck"><input type="checkbox" ${S.chk[k]?"checked":""} onchange="tg('${k}',this.checked)">${t}</label>`;
 V.innerHTML=`<div class="c hero">${ring(s.pct)}<div><b>總進度</b><div class="mu">已完成 ${d}／${a} 項</div><div class="kp"><i>🔥 連續 ${s.streak} 天</i><i>今日 ${s.today}／${s.goal}</i><i>正確率 ${s.acc==null?"–":s.acc+"%"}</i></div></div></div>
 <div class="c"><div class="u"><h2>今日目標</h2><span class="tag">${pr}%</span></div><div class="bar"><i style="width:${pr}%"></i></div><div class="mu">作答題目、勾選項目都算今日進度。</div><button class="b" onclick="sc='all';go('quiz')">開始練習</button></div>`+
 U.map((u,i)=>{const n=u[2].length,dn=u[2].filter((_,j)=>S.chk[i+"_"+j]).length,x=S.su[i]||[0,0];
 let ex="";
 if(i==0)ex=`<details open><summary>📅 兩週課表（${DAYS.filter((_,j)=>S.chk["d1_"+j]).length}/14 天）</summary>${DAYS.map((t,j)=>ck("d1_"+j,`Day ${t[0]}｜${t[1]} <span class="mu">${t[2]}</span>`)).join("")}<div class="mu">Week 1 實作要量：${W1.join("、")}。自問：為什麼 LED 前面要有電阻？</div></details>
 <details><summary>🧰 材料檢查（烙鐵先不用買）</summary>${MAT.map((t,j)=>ck("m1_"+j,t)).join("")}</details>
 <details><summary>🧪 過關考核 ${pass?"✅ 已過關":""}</summary><div class="mu">理論最佳：${bt}/20（需 ≥18）</div><button class="b x" onclick="startEx('u0',20)">Unit 01 理論測驗 20 題</button>${CRIT.map((t,j)=>j?ck("c1_"+j,t):"").join("")}<div class="mu">最後一天不看筆記，直接測。</div></details>`;
 return `<div class="c"><div class="u"><h2>單元 0${i+1}｜${u[0]}</h2><span class="tag">${u[1]}　${dn}/${n}</span></div><div class="bar"><i style="width:${dn/n*100}%"></i></div>${u[2].map((g,j)=>ck(i+"_"+j,g)).join("")}${ex}<div class="mu">此單元題庫正確率：${x[1]?Math.round(x[0]/x[1]*100)+"%（"+x[1]+" 題）":"尚未作答"}</div>${u[3]?`<button class="b" onclick="sc='u${i}';go('quiz')">練這單元</button>`:`<button class="b" onclick="go('prc')">看術科題組</button>`}${i==7?`<button class="b x" onclick="sc='all';go('quiz');startEx('all',20)">學科模擬 20 題</button>`:""}${logF(i)}</div>`}).join("")}
function tg(k,v){S.chk[k]=v;if(v)mark();sv();home()}
let sc="all",qi=null,ex=null;
const isI=c=>/^\d/.test(c);
function pool(k){const I=Q.map((_,i)=>i);
 if(k=="wr")return I.filter(i=>S.wr.includes(Q[i][0]));if(k=="all")return I.filter(i=>isI(Q[i][1]));if(k=="com")return I.filter(i=>!isI(Q[i][1]));
 if(k[0]=="c")return I.filter(i=>Q[i][1]==k.slice(1));
 const u=U[+k.slice(1)],re=u[4]?new RegExp(u[4]):null;return I.filter(i=>(!u[3].length||u[3].includes(Q[i][1]))&&(!re||re.test(Q[i][2]+Q[i][3].join(""))))}
function quiz(){ex=null;
 V.innerHTML=`<div class="c"><h2>題庫練習</h2><div class="row"><select id="qs" onchange="sc=this.value;nq()"><option value="all">工業電子 全部</option>${U.map((u,i)=>u[3]?`<option value="u${i}">單元 ${i+1} ${u[0]}</option>`:"").join("")}${Object.keys(CAT).map(c=>`<option value="c${c}">${isI(c)?"工作項目 "+c+" ":"共同科目 "}${CAT[c]}</option>`).join("")}<option value="com">共同科目 全部</option><option value="wr">錯題本（${S.wr.length}）</option></select><button class="b" onclick="nq()">下一題</button></div><button class="b x" onclick="startEx('all',20)">🎯 工業電子模擬 20 題</button><button class="b x" onclick="startEx('com',20)">🎯 共同科目模擬 20 題</button><div class="mu">題庫 ${Q.length} 題（114.09 版工業電子＋四科共同科目）。有圖的題目未收錄。</div></div><div id="qb"></div>`;$("qs").value=sc;nq()}
function nq(){ex=null;const p=pool(sc);if(!p.length){$("qb").innerHTML='<div class="c">這個範圍沒有題目 🎉</div>';return}qi=p[Math.floor(Math.random()*p.length)];show()}
function startEx(k,n){let p=pool(k).sort(()=>Math.random()-.5);if(k=="com"){const c={};p=p.filter(i=>(c[Q[i][1]]=(c[Q[i][1]]||0)+1)<=5)}
 const l=p.slice(0,n);ex={k,l,i:0,ok:0};qi=l[0];if(!$("qb"))V.innerHTML='<div id="qb"></div>';show()}
function show(){const q=Q[qi];
 $("qb").innerHTML=`<div class="c"><div class="mu">${ex?`模擬測驗 ${ex.i+1}／${ex.l.length}　`:""}${isI(q[1])?"工作項目 "+q[1]:"共同科目"} ${CAT[q[1]]}</div><p>${q[2]}</p>${q[3].map((o,i)=>`<button class="o" onclick="ans(${i+1},this)">${"①②③④"[i]} ${o}</button>`).join("")}<div id="fb"></div></div>`}
function ans(a,el){const q=Q[qi],bs=[...document.querySelectorAll("button.o")];if(bs.some(b=>b.disabled))return;bs.forEach(b=>b.disabled=true);
 bs[q[4]-1].classList.add("r");const ok=a==q[4];if(!ok)el.classList.add("w");
 const bump=(o,k)=>{o[k]=o[k]||[0,0];o[k][1]++;if(ok)o[k][0]++};bump(S.st,q[1]);const uk=ex?ex.k:sc;if(uk[0]=="u")bump(S.su,+uk.slice(1));
 if(ex&&ok)ex.ok++;if(!ok&&!S.wr.includes(q[0]))S.wr.push(q[0]);if(ok&&sc=="wr")S.wr=S.wr.filter(i=>i!=q[0]);mark();sv();
 $("fb").innerHTML=`<p class="${ok?"ok":"bad"}">${ok?"答對了":"答案是 "+"①②③④"[q[4]-1]}</p><button class="b" onclick="nx()">${ex&&ex.i+1>=ex.l.length?"看成績":"下一題"}</button>`}
function nx(){if(!ex)return nq();ex.i++;if(ex.i<ex.l.length){qi=ex.l[ex.i];return show()}
 const n=ex.l.length,p=Math.round(ex.ok/n*100);S.ex.push({d:td(),s:ex.ok,n,t:{u0:"Unit01",all:"工業電子",com:"共同科目"}[ex.k]||ex.k});S.ex=S.ex.slice(-15);if(ex.k=="u0")S.best1=Math.max(S.best1||0,ex.ok);sv();
 $("qb").innerHTML=`<div class="c hero">${ring(p)}<div><b>${ex.ok}／${n}</b><div class="mu">${p>=70?"達到及格線 70%":"還差一點，去錯題本複習"}</div></div></div><button class="b" onclick="startEx('${ex.k}',${n})">再測一次</button><button class="b g" onclick="sc='wr';quiz()">看錯題本</button>`;ex=null}
function me(){
 const b=Object.keys(CAT).map(c=>{const x=S.st[c]||[0,0],p=x[1]?Math.round(x[0]/x[1]*100):0;return `<div class="st"><span>${CAT[c]}</span><div class="bar"><i style="width:${p}%"></i></div><span>${x[1]?p+"%":"–"}</span></div>`}).join("");
 V.innerHTML=`<div class="c"><h2>帳號（本機多帳號）</h2><div class="row"><select id="pf" onchange="loadP(this.value);me()">${P.map(n=>`<option ${n==cur?"selected":""}>${n}</option>`).join("")}</select><button class="b" onclick="addP()">＋新增</button><button class="b g" onclick="delP()">刪除</button></div><div class="mu">每個帳號的進度分開存放。跨裝置請用下方 GitHub 同步。</div></div>
 <div class="c"><h2>各科目正確率</h2>${b}<h3>模擬測驗紀錄</h3><div class="mu">${S.ex.length?S.ex.slice().reverse().map(e=>`${e.d}　${e.t||""} ${e.s}/${e.n}`).join("<br>"):"尚無紀錄"}</div></div>
 <div class="c"><h2>設定</h2><div class="row">每日目標 <input type="number" id="gl" value="${S.goal}" min="1" max="200" style="width:80px" onchange="S.goal=Math.max(1,+this.value||10);sv()"> 題／項</div><h3>外觀</h3><button class="b g" onclick="th('auto');go('me')">自動</button><button class="b g" onclick="th('light');go('me')">淺色</button><button class="b g" onclick="th('dark');go('me')">深色</button></div>
 <div class="c"><h2>GitHub 雲端同步（Gist）</h2><div class="mu">填入你自己的 Gist ID 與 token（只需 gist 權限）。資料只會傳到你的 Gist，也讓手機小工具能讀進度。</div>
 <p><input type="text" id="gid" placeholder="Gist ID" value="${S.sync.gist||""}" style="width:100%"></p><p><input type="text" id="gus" placeholder="GitHub 使用者名稱" value="${S.sync.user||""}" style="width:100%"></p><p><input type="password" id="gtk" placeholder="Token（存在此裝置）" value="${S.sync.token||""}" style="width:100%"></p>
 <button class="b" onclick="saveSync()">儲存並上傳</button><button class="b g" onclick="pull()">從雲端還原</button><div id="sm" class="mu">${msg}</div>${S.sync.user&&S.sync.gist?`<div class="mu">小工具網址：<br>https://gist.githubusercontent.com/${S.sync.user}/${S.sync.gist}/raw/progress.json</div>`:""}</div>
 <div class="c"><h2>學習紀錄總表</h2><div class="mu">${U.map((u,i)=>{const l=S.log[i];return l&&(l.l||l.d||l.f||l.s||l.p)?`<b>Unit 0${i+1}</b> ${l.p||""}　學：${l.l||"–"}｜做：${l.d||"–"}｜敗：${l.f||"–"}｜分：${l.s||"–"}<br>`:""}).join("")||"尚未填寫（首頁每個單元底部可填）"}</div></div><div class="c"><h2>備份</h2><button class="b g" onclick="exp()">匯出 JSON</button><button class="b g" onclick="$('imp').click()">匯入 JSON</button><input type="file" id="imp" accept=".json" hidden onchange="imp(this.files[0])"></div>
 <div class="c"><h2>小工具</h2><a href="widget.html" style="color:var(--ac)">開啟進度小卡（可加到主畫面）</a></div>`}
function addP(){const n=(prompt("新帳號名稱")||"").trim();if(!n||P.includes(n))return;P.push(n);put("ec_p",P);loadP(n);me()}
function delP(){if(P.length<2)return alert("至少要保留一個帳號");if(!confirm("刪除「"+cur+"」及其進度？"))return;try{localStorage.removeItem("ec_d_"+cur)}catch(e){}P=P.filter(n=>n!=cur);put("ec_p",P);loadP(P[0]);me()}
function exp(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}));a.download="ec-"+cur+"-"+td()+".json";a.click()}
function imp(f){if(!f)return;f.text().then(t=>{try{S=Object.assign(S,JSON.parse(t));sv();loadP(cur);me()}catch(e){alert("檔案格式錯誤")}})}
function saveSync(){S.sync={gist:$("gid").value.trim(),user:$("gus").value.trim(),token:$("gtk").value.trim()};sv();push()}
const gh=()=>({Authorization:"Bearer "+S.sync.token,Accept:"application/vnd.github+json"});
async function push(){if(!S.sync.gist||!S.sync.token)return;const bk=Object.assign({},S,{sync:{}});
 try{const r=await fetch("https://api.github.com/gists/"+S.sync.gist,{method:"PATCH",headers:gh(),body:JSON.stringify({files:{"progress.json":{content:JSON.stringify(summary())},["backup-"+cur+".json"]:{content:JSON.stringify(bk)}}})});
  msg=r.ok?"已同步 "+new Date().toLocaleTimeString():"同步失敗（"+r.status+"），請檢查 ID／token"}catch(e){msg="同步失敗：網路問題"}const m=$("sm");if(m)m.textContent=msg}
async function pull(){try{const r=await fetch("https://api.github.com/gists/"+S.sync.gist,{headers:gh()});const j=await r.json(),f=j.files&&j.files["backup-"+cur+".json"];
  if(!f)return $("sm").textContent="雲端沒有這個帳號的備份";const d=JSON.parse(f.content);S=Object.assign(S,d,{sync:S.sync});sv();msg="已還原";me()}catch(e){$("sm").textContent="還原失敗"}}
loadP(P.includes(ld("ec_cur",""))?ld("ec_cur",""):P[0]);go("home");
