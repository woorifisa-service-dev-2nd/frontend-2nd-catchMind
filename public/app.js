/* eslint-disable no-unused-vars */
/**
 * 이미지 생성 기능 구현
 */
const inputText = "A cute cat";
const genButton = "";
const imgSrc = document.getElementById("myImage");
/**
 * 이미지 생성 버튼을 눌렀을 때 이미지 생성 api를 호출하도록
 */
genButton.addEventListener("click", ()=>{
    
});

const imgGen = (text)=>{
	const body = JSON.stringify({ prompt: text });

	const url = "/generate";
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ query: text }),
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			imgSrc.imgSrc = data.imgaes.imgae;
		})
		.catch((error) => console.error(error));
};
