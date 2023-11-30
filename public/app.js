/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".iput");
const sizeInput = document.getElementById("ex-in");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");

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
			const img = new Image();
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

document.querySelector("#ex-in").addEventListener("input", (e) => {
	document.querySelector("#ex-out").innerHTML = e.target.value;
});
