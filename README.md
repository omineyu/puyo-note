# ぷよのーと

ここには、ぷよのーとの開発に関する情報を記します。

ぷよのーと  
https://puyo-note.com/  
https://puyo-note.com/manual

## 概要

ぷよのーとは、ぷよ図(ぷよぷよの連鎖の図)を管理できるWebサイトです。  
ぷよ図を再生し、連鎖をシミュレートすることもできます。

- ぷよのーとはAngularで開発しています。
- ぷよ図はブラウザのIndexedDBに保存されます。
- バックエンドは存在しません。

## ディレクトリ構成

以下に、ぷよのーとのソースコードのディレクトリ構成概要を示します。

```
src/
    app/
        puyo-diagrams/                  ... ぷよ図モジュール(ぷよ図管理のモジュール)のディレクトリ
            components/                 ... ぷよ図モジュールのコンポーネント一式
            models/                     ... ぷよ図モジュールのモデル一式(※1)
            services/                   ... ぷよ図モジュールのサービス一式(※2)
            puyo-diagrams.module.ts     ... ぷよ図モジュール
        puyo-note-manual/               ... ぷよのーとマニュアルモジュールのディレクトリ
            components/                 ... ぷよのーとマニュアルモジュールのコンポーネント一式
            puyo-note-manual.module.ts  ... ぷよのーとマニュアルモジュール
        utils/                          ... ユーティリティ
        app.module.ts                   ... ルートモジュール
    assets/
        images/                         ... 画像ファイル一式
```

(※1) ここでいうモデルとは、コンポーネントに依存しない純粋なデータおよびロジックのことです。  
(※2) ここでいうサービスとは、モデルを管理するインタフェースを提供するもののことです。
