// expressモジュールを読み込む
import express from 'express';

// ルート読み込み
import bodyParser from 'body-parser';
import routes from './routes/index';

// クライアントから送られてきたjsonデータを取得できるようにする

// expressアプリを生成する
const app = express();

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on ${port}`));
