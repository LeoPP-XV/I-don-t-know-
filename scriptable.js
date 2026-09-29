// iPhone 小工具：安裝 Scriptable App → 新增腳本貼上 → 桌面加 Scriptable 小工具並選此腳本
// 把下面兩個值換成你的 GitHub 使用者名稱與 Gist ID
const URL="https://gist.githubusercontent.com/你的使用者名稱/你的GistID/raw/progress.json";
let r={pct:0,streak:0,today:0,goal:10};
try{r=await new Request(URL).loadJSON()}catch(e){}
const w=new ListWidget();w.backgroundColor=new Color("#14201a");
const t=w.addText("⚡ 丙級進度");t.textColor=Color.white();t.font=Font.boldSystemFont(14);
const p=w.addText(r.pct+"%");p.font=Font.boldSystemFont(36);p.textColor=new Color("#4cc38a");
const s=w.addText("🔥 連續 "+r.streak+" 天\n今日 "+r.today+"/"+r.goal);s.textColor=Color.white();s.font=Font.systemFont(12);
w.refreshAfterDate=new Date(Date.now()+30*60*1000);
if(config.runsInWidget)Script.setWidget(w);else w.presentSmall();
Script.complete();
