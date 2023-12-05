import { imgScale, imgGen, imgChange, imgNsfw, toBase64, saveImg } from "./api.js";
/**
 * app.js: 생성버튼 클릭이벤트, 확대버튼 클릭이벤트, 변환버튼 클릭이벤트, 이미지저장 클릭이벤트
 * api.js: 이미지 생성 함수 & 인코딩 처리 함수, 이미지 확대 함수, 이미지 변환 함수, NSFW 체크 함수, 이미지 저장 함수
 * util.js: 편지지
 */

const textInput = document.getElementById("text").querySelector(".input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const nsfwButton = document.getElementById("nsfwBtn");
const changeButton = document.getElementById("changeBtn");
const multiflyButton = document.getElementById("multifly2");

let encodedImageSrc = "";

//이미지 확대 버튼 클릭 이벤트
multiflyButton.addEventListener("click", async () => {
	if (encodedImageSrc != "") {
		let upscaleImage = new Image();
		
		upscaleImage.onload = () => {
			canvas.width = upscaleImage.width;
			canvas.height = upscaleImage.height;

			ctx.drawImage(upscaleImage, 0, 0, upscaleImage.width, upscaleImage.height);
		};

		upscaleImage.src = await imgScale(2, encodedImageSrc);
		encodedImageSrc = await toBase64(upscaleImage.src);
	} else {
		alert("확대할 이미지가 존재하지 않습니다.");
	}
});

// 이미지 생성 버튼 클릭 이벤트 
genButton.addEventListener("click", async () => {
	const text = textInput.value;
	if (text != "") {
		let createdImage = new Image();

		createdImage.onload = () => {
			canvas.width = createdImage.width;
			canvas.height = createdImage.height;

			// 캔버스에 이미지를 그립니다.
			ctx.drawImage(createdImage, 0, 0, createdImage.width, createdImage.height);
		};

		createdImage.src = await imgGen(text);
		encodedImageSrc = await toBase64(createdImage.src);
	} else {
		alert("키워드를 입력해주세요");
	}
});

//이미지 변환 버튼 클릭이벤트
changeButton.addEventListener("click", async () => {

	if (encodedImageSrc != "") {
		let changedImage = new Image();

		changedImage.onload = () => {
			canvas.width = changedImage.width;
			canvas.height = changedImage.height;

			// 캔버스에 이미지를 그립니다.
			ctx.drawImage(changedImage, 0, 0, changedImage.width, changedImage.height);
		};

		changedImage.src = await imgChange(encodedImageSrc);
		encodedImageSrc = await toBase64(changedImage.src);
	} else {
		alert("변환할 이미지가 없습니다.");
	}
});

//이미지 Nsfw & 저장버튼 클릭이벤트
nsfwButton.addEventListener("click", async () => {
	if (encodedImageSrc != "") {
		let isNsfw = await imgNsfw(encodedImageSrc);

		if (isNsfw) {
			alert("폭력적/선정적 컨텐츠입니다");
		} else {
			if (confirm("폭력적/선정적 컨텐츠가 아닙니다. 사진을 저장하시겠습니까?")) {
				saveImg(encodedImageSrc);
				alert("사진이 저장되었습니다.");
			}
		}
	}
});