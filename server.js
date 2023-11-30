/* eslint-disable no-unused-vars */
// fetch 모듈 불러오기 코드 삭제
const express = require("express");
const app = express();

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

app.post("/change", (req, res) => {
	const image = req.body.image;
	console.log(req.body);

	const url = "https://api.kakaobrain.com/v2/inference/karlo/variations";

	console.log("Target img src:", req.body);

	const request = require("request");

	const options = {
		url,
		headers: {
			"Authorization": `KakaoAK ${REST_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({"image": image})
        
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

app.post("/scaleUp", (req, res) => {
	const image = req.body.image;
	const size = req.body.size;
	console.log(req.body);

	const url = "https://api.kakaobrain.com/v2/inference/karlo/upscale";

	//console.log("Received data from the client:", req.body);

	const request = require("request");

	const options = {
		url,
		headers: {
			"Authorization": `KakaoAK ${REST_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({"images": [image], "scale": size})
        
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

app.post("/encode-image", (req, res) => {
	const imageUrl = req.body.imageUrl;
	const request = require("request");

	request.get({ url: imageUrl, encoding: null }, (error, response, body) => {
		if (error) {
			console.error(error);
			return res.status(500).send("Error fetching image");
		}

		const base64Image = Buffer.from(body).toString("base64");
		res.json({ image: base64Image });
	});
});

const fs = require("fs");
const path = require("path");

app.post("/save-image", (req, res) => {
	const imageBase64 = req.body.image;
	const timestamp = new Date().toISOString().replace(/:/g, "-").replace(/\..+/, "");
	const filename = `savedImage_${timestamp}.png`;
	const imagePath = path.join(__dirname, "saved", filename);

	fs.writeFile(imagePath, imageBase64, "base64", (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send({ message: "이미지 저장 실패" });
		}
		res.send({ message: "이미지 저장 성공" });
	});
});

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${port}`));
