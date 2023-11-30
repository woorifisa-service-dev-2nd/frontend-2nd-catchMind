/**
 * api 연결 및 서버 설정
 */

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

//index.html을 기본화면으로 세팅
app.get('/', (req, res) => res.sendFile('index.html'));

// 서버 인스턴스를 3000번 포트에서 대기하도록 명시
const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${3000}`));