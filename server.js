/* eslint-disable no-unused-vars */
/**
 * api 연결 및 서버 설정
 */

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const REST_API_KEY = "f4daf48df7ebe7f67aa7af07a888179f";

// localhost:3000/detectLangs로 요청 시 동작할 핸들러
app.post("/generate", (req, res) => {
	const request = require("request");

	const text = req.body.prompt;

	const url = "https://api.kakaobrain.com/v2/inference/karlo/t2i" ;

	console.log("Received data from the client:", req.body);
	// res.status(200).send('Data received successfully');

	const options = {
		url, // url: url과 같음
		form: { "prompt": text},
		headers: { "Authorization": `KakaoAK ${REST_API_KEY}`,
			"Content-Type": "application/json" }
	};
	// 실제로 POST 요청 전송 부분
	request.post(options, (error, response, body) => {

		if (!error && response.statusCode == 200) {
			res.send(body);
		} else {
			res.status(response.statusCode).end();
			console.log("error = " + response.statusCode);
		}
	});
});

//index.html을 기본화면으로 세팅
app.get("/", (req, res) => res.sendFile("index.html"));

// 서버 인스턴스를 3000번 포트에서 대기하도록 명시
const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${3000}`));