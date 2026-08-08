# v2 — Trimco / Weavabel 風格版

呢個版本用返晒根目錄 v1 嘅公司資料（產品分類、公司背景、聯絡資料），但排版同氣質換成 Trimco Group 同 Weavabel 嗰種「專業＋乾淨＋有品牌感」嘅方向：

- 大留白、克制嘅大標題，重點詞用斜體襯線字（Playfair Display）做點綴
- 紅色只做小面積強調（kicker、重點字、底線），主體係黑＋白＋淺灰
- 統計數字帶（20+ 年、6 大技術、2 個生產點、24h 回覆）
- 四欄「能力卡」＋客戶 Logo 牆＋客戶感言＋深色 CTA 區
- 髮絲線分割（1px 淺灰線）代替粗邊框

## 頁面

- `index.html` — 首頁
- `products.html` — 產品分類（可篩選標籤）
- `about.html` — 公司介紹
- `contact.html` — 報價表單

直接雙擊 `index.html` 就睇到。

## 上線前要換嘅嘢

1. **真實產品相** — 產品格係 SVG 佔位圖，換成白底/淺灰底產品實拍。
2. **統計數字** — 20+ 年、6 大技術、2 個生產點、24h 回覆係 placeholder，核對真實數字先好用。
3. **客戶感言** — 依家係佔位符，換成有授權嘅真實客戶。
4. **廠房相** — 深色「Photo placeholder」面板換成車間／師傅／機台實拍。
5. **聯絡資料** — Email、電話、WhatsApp 依家係 placeholder。
6. **表單後台** — 駁 Formspree／公司 Email，或者改做 WhatsApp 連結。
7. **語言切換** — 現時全英文，可以加繁中／簡中。

## 技術

- 純 HTML + CSS + 少量 JavaScript，零依賴、零 build step
- 響應式（手機／平板／桌面）
- Google Fonts：Inter + Playfair Display（有系統字體 fallback）

## 宣傳片

- 網站用緊壓縮版：`assets/videos/bestrims-promo-web.mp4`（720p，9.7MB，原片 29.8MB）
- 原片（V12_Bestrims发音改善版 B.mp4）保留喺 Desktop\AI\公司宣傳片
- 想換片：將新片命名為 `bestrims-promo-web.mp4` 覆蓋就得（建議維持 720p、10MB 內）