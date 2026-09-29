# 工業電子丙級練習（網頁版）

## 1. 放上 GitHub Pages
1. GitHub 建立新 repo（例如 `ec-trainer`），把這個資料夾內所有檔案上傳到根目錄。
2. Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main` / `/ (root)`。
3. 約 1 分鐘後網址是 `https://你的帳號.github.io/ec-trainer/`。

## 2. 連到桌面／主畫面（PWA）
- iPhone Safari：分享 → 加入主畫面
- Android Chrome：選單 → 安裝應用程式
- 電腦 Chrome／Edge：網址列右側的安裝圖示

## 3. 跨裝置同步與小工具
1. 到 gist.github.com 建一個 **public** Gist（檔名隨意），複製網址最後那串 Gist ID。
2. GitHub → Settings → Developer settings → Personal access tokens，建立只勾 `gist` 權限的 token。
3. 網頁「我的 → GitHub 雲端同步」填 Gist ID、使用者名稱、token，按儲存並上傳。
4. 之後每次作答會自動上傳 `progress.json`。
5. iPhone：安裝 Scriptable，貼上 `scriptable.js`（換成你的帳號與 Gist ID），桌面加小工具。
   Android：用 KWGT 等工具讀同一個 raw 網址。

注意：token 只存在你的裝置；不要把 token 上傳到 repo。Public Gist 內容任何人有網址都看得到（含進度與備份）。

## 更新紀錄
- 題庫：工業電子丙級學科（114.09.01 版）＋四科共同科目，共 912 題（有圖的題目未收錄）
- 術科：已套用 114.10.17 修正對照表（TP1/2/3 先量測、外部音源端子輸入、萬用電路板限換 1 次）
- Unit 01：兩週課表、材料檢查、過關考核、學習紀錄
