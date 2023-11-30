/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".iput");
const sizeInput = document.getElementById("ex-in");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const defScaleButton = document.getElementById("origin");
const mulScaleButton = document.getElementById("multifly2");
let imgEncode;
const img = new Image();

genButton.addEventListener("click", () => {
	const text = textInput.value;
	const size = sizeInput.value;
	imgGen(text, size);
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
			imgEncode = data.imgaes[0].id;
			img.src = data.images[0].image; // JSON 응답 구조에 따라 조정 필요
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

/**
 * 기본 이미지 크기
 */
defScaleButton.addEventListener("click", () => {
	const size = 2;
	imgScale(size);
});

/**
 * 이미지 확대
 */
mulScaleButton.addEventListener("click", () => {
	const size = 4;
	imgScale(size);
});

const imgScale = (size) => {
	const images = [imgEncode];
	fetch("/upscale", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ images : images, scale: size })
	})
		.then((upscaleResponse) => upscaleResponse.json())
		.then((upscaleData) => {
			img.src = upscaleData.images[0]; // JSON 응답 구조에 따라 조정 필요
			// 확대된 이미지가 로드된 후 캔버스에 그리기
			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);
			};
		})
		.catch((error) => console.error(error));
};
