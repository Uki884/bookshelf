// expressモジュールを読み込む
const express = require("express");

//ルート読み込み
const routes = require("./routes");

// expressアプリを生成する
const app = express();

// クライアントから送られてきたjsonデータを取得できるようにする
var bodyParser = require("body-parser");

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(8000, () => console.log("Listening on port 3000"));