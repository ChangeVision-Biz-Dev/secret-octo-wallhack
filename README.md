# SimpleDiagram
[Cacoo](https://cacoo.com/lang/ja/)みたいな（モデル無視で）Class図っぽいものがかけると良いな。  
JavascriptのCanvasを利用してお絵かきDiagramを作る。  
まずは○、△、□が描けること。  


## 技術
Canvas、イベントがらみは（お勉強もかねて）Javascriptをそのまま使うことを前提とする。  
ただし、デファクトスタンダードなライブラリがあれば使う（[momentjs](http://momentjs.com)等）。

## モジュール化
[require.js](http://requirejs.org)を使ってモジュール化する。できれば、webでもnodeでも使えるとよい。  
[RequireJS使い方メモ](http://qiita.com/opengl-8080/items/196213867b859daea719)  

## 設計
MVCかMVVMか？
* MVVM  
 * 自力でのMVVMはつらいかも。

→ **MVCで。理由は[JavaFX](https://docs.oracle.com/javase/8/javafx/api/toc.htm)のクラス群を参考にすることにより、[JavaFX](https://docs.oracle.com/javase/8/javafx/api/toc.htm)の勉強にもなる。**

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
* UTなに使う？[Jasmine](http://jasmine.github.io)？[Mocha](http://mochajs.org)？
* パッケージ管理は[npm](https://www.npmjs.com)+[bower](http://bower.io)で。→ **で。**
* タスク実行は[Grunt](http://gruntjs.com)ではなく[gulp](http://gulpjs.com)使おうか。→ **[gulp](http://gulpjs.com)使う。**
* リポジトリ共有なのでissue管理はどうしよう？ → **一旦Issuesを使う。ただし、ブランチ名のタグを作って使う。**
* チャットはいらないよね。→ **必要になったら。**
