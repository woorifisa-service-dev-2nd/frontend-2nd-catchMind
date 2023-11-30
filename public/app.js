/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".iput");
const sizeInput = document.getElementById("ex-in");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const nsfwButton = document.getElementById("nsfwBtn");
const img = new Image();
var base64Image = "";

genButton.addEventListener("click", () => {
	const text = textInput.value;
	const size = sizeInput.value;
	imgGen(text, size);
});

nsfwButton.addEventListener("click", () => {
	imgNsfw(img);
});

const imgGen = (text, size) => {
	fetch("/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ prompt: text })
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			img.src = data.images[0].image; // JSON 응답 구조에 따라 조정 필요

			toBase64(img.src);

			img.onload = () => {
				// 캔버스 크기를 이미지 크기에 맞춥니다.
				canvas.width = img.width;
				canvas.height = img.height;
    
				// 캔버스에 이미지를 그립니다.
				ctx.drawImage(img, 0, 0, img.width, img.height);

			};
		})
		.catch((error) => console.error(error));
};
const toBase64 = (src) => {
	fetch("/encode-image", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ imageUrl: src })
	})
		.then((response) => response.json())
		.then((data) => {
			base64Image = data.image;
		});
};

const imgNsfw = (img) => {

	if(img.src != "") {
		console.log("nsfw 실행");

		fetch("/nsfw", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ images: base64Image })
		})
			.then((response) => response.json())
			.then((data) => {
				const result =  data.results[0].nsfw_content_detected;
				console.log(data);
				console.log(result);
				if (result !== "true") {
					alert("폭력적/선정적 컨텐츠가 아닙니다");
				} else {
					alert("폭력적/선정적 컨텐츠입니다");
				}		
			})
			.catch((error) => console.error(error));
	} else {
		alert("이미지가 없습니다!");
	}
};

document.querySelector("#ex-in").addEventListener("input", (e) => {
	document.querySelector("#ex-out").innerHTML = e.target.value;
});
