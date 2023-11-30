/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
const textInput = document.getElementById("text").querySelector(".iput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const genButton = document.getElementById("genBtn");
const changeButton = document.getElementById("changeBtn");
const multiflyButton = document.getElementById("multifly2");
const saveButton = document.getElementById("saveBtn");

const img = new Image();
let base64Image = "";

saveButton.addEventListener("click", ()=> {
	if(base64Image){
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
	}
});

multiflyButton.addEventListener("click", () => {
	imgScale(2);
});

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
};

const imgScale = (size) => {
	console.log(base64Image);
	if(img.src != ""){
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