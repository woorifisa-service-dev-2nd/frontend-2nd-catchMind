/**
 * api 연결 및 서버 설정
 */

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//Base64 인코딩 함수
const imageToString(img) => {
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const EncodedImg = canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, '');
    return EncodedImg;
};

const stringToImage = (base64String) => {
    const img = new Image();
    img.src = `data:image/png`
}


const REST_API_KEY = "f4daf48df7ebe7f67aa7af07a888179f";

app.use(express.static("public"));
app.use(express.json());

//index.html을 기본화면으로 세팅
app.get("/", (req, res) => res.sendFile("index.html"));

/**
 * 이미지 생성
 */
app.post("/create-image", function(req, res) {
    const KAKAO_BRAIN_API_URL = "https://api.kakaobrain.com/v2/inference/karlo/t2i";
    request = require("request");

    const options = {
        KAKAO_BRAIN_API_URL,
        form: req.body,
        headers: {
            "Content-Type": "application/json",

        }
    }
})

// 서버 인스턴스를 3000번 포트에서 대기하도록 명시
const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${3000}`));
