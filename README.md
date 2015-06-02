# SimpleDiagram
Cacooみたいな（モデル無視で）Class図っぽいものがかけると良いな。  
JavascriptのCanvasを利用してお絵かきDiagramを作る。  
まずは○、△、□が描けること。  


## 技術
Canvas、イベントがらみは（お勉強もかねて）Javascriptをそのまま使うことを前提とする。  
ただし、デファクトスタンダードなライブラリがあればは使う（momentjs等）。

## 設計
MVCかMVVMか？
* MVVM  
 * 自力でのMVVMはつらいかも。

## マイルストーン
何か動くものができたらいいね。
* Rect、Circle、Line、Path等。
* テキスト、カラー等のスタイル。
* 移動、拡大縮小、回転。
* トランザクション、Undo、Redo。
* コピペ。

## 開発環境
* 言語はJavascript。ES6がブラウザ標準で動くようになったら移植するかも。
* CIは何か使いたい。無料オンライン？
* UTなに使う？Jasmine？Mocha？
* パッケージ管理はnpm+bowerで。
* タスク実行はGruntではなくgulp使おうか。
* リポジトリ共有なのでissue管理はどうしよう？ → <span style="color:red;">一旦Issuesを使う。ただし、ブランチ名のタグを作って使う。</span>
* チャットはいらないよね。
