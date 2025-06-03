# PM - Product Management Web Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## 概要

HTML/CSS/JSで構成されたシンプルなPM（Product Management）Webアプリ。
ローカルの `data.txt` にプロダクト情報のCRUD操作を行います。

## 特徴

- 🎯 **シンプル設計** - HTML/CSS/JSのみで構築
- 📄 **data.txt管理** - プロダクトデータを行単位で保存
- 📱 **レスポンシブ** - モダンで使いやすいUI
- ⚡ **軽量高速** - 複雑な依存関係なし

## 使用方法

`index.html` をブラウザで開くだけ。

```bash
# リポジトリをクローン
git clone git@github.com:izag8216/pm.git
cd pm

# ブラウザで開く
open index.html
```

## 機能

### プロダクト管理
- ✅ プロダクトの作成・編集・削除
- 📊 ステータス管理（企画中・アクティブ・完了・保留）
- 🎯 優先度設定（高・中・低）
- 👤 担当者の割り当て
- 📅 期限の設定
- 🏷️ タグによる分類

### 検索・フィルタ
- 🔍 リアルタイム検索
- 📊 ステータス別フィルタ
- 🎯 優先度別フィルタ

### 統計表示
- 📈 プロダクト数の統計
- 📊 ステータス別カウント

## ファイル構成

```
pm/
├── index.html          # メインHTMLファイル
├── styles.css          # CSSスタイルシート
├── app.js             # JavaScriptアプリケーション
├── data.txt           # データファイル（サンプル）
└── README.md          # プロジェクト説明
```

## データ構造

### data.txt形式
```
ID|Name|Description|Status|Priority|Owner|Deadline|Tags|CreatedAt|UpdatedAt
```

### プロダクトオブジェクト
```javascript
{
  id: "unique_id",           // ユニークID
  name: "プロダクト名",        // プロダクト名（必須）
  description: "説明",        // 詳細説明
  status: "active",          // ステータス
  priority: "high",          // 優先度
  owner: "担当者名",          // 担当者
  deadline: "2024-03-15",    // 期限（YYYY-MM-DD）
  tags: ["tag1", "tag2"],    // タグ配列
  createdAt: "ISO_DATE",     // 作成日時
  updatedAt: "ISO_DATE"      // 更新日時
}
```

## デモ

- **URL**: https://izag8216.github.io/pm/

## 技術仕様

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **データ保存**: LocalStorage
- **スタイリング**: CSS Grid, Flexbox, CSS Variables
- **アイコン**: Font Awesome 6.4.0
- **フォント**: Inter (Google Fonts)

## ブラウザサポート

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## キーボードショートカット

- `Ctrl + N` - 新規プロダクト作成
- `Esc` - モーダルを閉じる

## ライセンス

MIT License

## 作者

**izag8216**
- 🌐 GitHub: [https://github.com/izag8216](https://github.com/izag8216)
- 📦 Repository: [https://github.com/izag8216/pm](https://github.com/izag8216/pm)

---

Made with ❤️ and Claude AI
