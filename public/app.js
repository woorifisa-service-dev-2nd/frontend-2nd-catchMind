/* eslint-disable no-unused-vars */

/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const nsfwButton = document.getElementById("nsfwBtn");
const changeButton = document.getElementById("changeBtn");
const multiflyButton = document.getElementById("multifly2");

const img = new Image();
let base64Image = "";

/**
 * CSS 편지 애니메이션
 */
function open_letter() {
	document.getElementsByClassName("letter-close")[0].style.display = "none";
	document.getElementsByClassName("letter-open")[0].style.display = "block";
}

multiflyButton.addEventListener("click", () => {
	imgScale(2);
});

genButton.addEventListener("click", () => {
	console.log(img.src == "");
	const text = textInput.value;
	imgGen(text);
});

changeButton.addEventListener("click", () => {

	imgChange();
});

nsfwButton.addEventListener("click", () => {
	imgNsfw();
});

const saveImg = () => {
	fetch("/save-image", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ image: base64Image })
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("이미지 저장 완료:", data.message);
		})
		.catch((error) => console.error("이미지 저장 오류:", error));
};

const imgGen = (text) => {
	if(textInput.value != "") {
		fetch("/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ prompt: text })
		})
			.then((response) => response.json())
			.then((data) => {
				img.src = data.images[0].image; 

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
	} else {
		alert("제시어를 입력하지 않았습니다.");
	}
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

const imgNsfw = () => {

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

					if (confirm("폭력적/선정적 컨텐츠가 아닙니다. 사진을 저장하시겠습니까?")) {
						saveImg();
						alert("사진이 저장되었습니다.");
					}
				} else {
					alert("폭력적/선정적 컨텐츠입니다");
				}		
			})
			.catch((error) => console.error(error));
	} else {
		alert("이미지가 없습니다!");
	}
};

const imgScale = (size) => {
	console.log(base64Image);
	if (img.src != "") {
		console.log("이미지 확대");
		fetch("/scaleUp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ image: base64Image, size: size })
		})
			.then((response) => response.json())
			.then((data) => {
				img.src = data.images[0]; // JSON 응답 구조에 따라 조정 필요

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

const imgChange = () => {
	if (img.src != "") {
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
				img.src = data.images[0].image;
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
