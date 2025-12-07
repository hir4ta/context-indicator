# Claude Code Context Indicator

Claude Code のステータスラインにコンテキスト使用率をリアルタイム表示するツール

## インストール

```bash
npm install -g claude-code-context-indicator
```

## セットアップ

```bash
context-indicator --setup
```

その後、Claude Code を再起動してください。

## 機能

- **プログレスバー表示**: 視覚的にコンテキスト使用率を把握
- **10段階グラデーション**: 使用率に応じて段階表示
  - 0-10%: Cyan
  - 10-20%: Teal
  - 20-30%: Mint
  - 30-40%: Green
  - 40-50%: Light Green
  - 50-60%: Purple
  - 60-70%: Lavender
  - 70-80%: Yellow
  - 80-90%: Orange
  - 90-100%: Red

## 表示例

```text
Context Used: ░░░░░░░░░░ 0.0%
Context Used: ███░░░░░░░ 31.0%
Context Used: ██████░░░░ 55.0%
Context Used: ████████░░ 75.0%
Context Used: ██████████ 95.0%
```

## 仕組み

Claude Code は 200K トークンのコンテキストウィンドウを持ちますが、auto-compact 機能により約 45K トークンがバッファとして予約されています。このツールは実効的な使用可能領域 (155K トークン) を基準にパーセンテージを計算します。

## ライセンス

MIT
