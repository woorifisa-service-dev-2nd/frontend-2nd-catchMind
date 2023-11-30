/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".iput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const changeButton = document.getElementById("changeBtn");
const defScaleButton = document.getElementById("origin");
const mulScaleButton = document.getElementById("multifly2");
const img = new Image();
let base64Image;

genButton.addEventListener("click", () => {
	console.log(img.src=="");
	const text = textInput.value;
	imgGen(text);
});

changeButton.addEventListener("click", ()=>{

	imgChange();
});

const imgGen = (text) => {
	fetch("/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ prompt: text })
	})
		.then((response) => response.json())
		.then((data) => {
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

const imgChange = () => {
	if(img.src != ""){
		console.log("이미지 변환 실행");
		fetch("/change", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ image: img.src })
		})
			.then((response) => response.json())
			.then((data) => {
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
	}
};

/**
 * 기본 이미지 크기
 */
defScaleButton.addEventListener("click", () => {
	if (img.src != "") {
		const size = 2;
		imgScale(size);
	} else {
		console.log("이미지가 존재하지 않습니다.");
	}
});

/**
 * 이미지 확대
 */
mulScaleButton.addEventListener("click", () => {
	if (img.src != "") {
		const size = 4;
		imgScale(size);
	} else {
		console.log("이미지가 존재하지 않습니다.");
	}
});

const imgScale = (size) => {
	fetch("/upscale", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ images : img, scale: size })
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