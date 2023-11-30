/* eslint-disable no-unused-vars */
// fetch 모듈 불러오기 코드 삭제
const express = require("express");
const app = express();

// 나머지 서버 코드는 동일하게 유지

app.use(express.static("public"));
app.use(express.json());

const REST_API_KEY = "f4daf48df7ebe7f67aa7af07a888179f";

app.post("/generate", (req, res) => {
	const text = req.body.prompt;
	console.log(req.body);

	const url = "https://api.kakaobrain.com/v2/inference/karlo/t2i";

	console.log("Received data from the client:", req.body);

	const request = require("request");

	const options = {
		url,
		headers: {
			"Authorization": `KakaoAK ${REST_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({"prompt": text})
        
	};

	request.post(options, (error, response, body) => {

		if (!error && response.statusCode == 200) {
			res.send(body);
		} else {
			res.status(response.statusCode).end();
			console.log("error = " + response.statusCode);
		}
	});
});

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${port}`));
