const canvas = document.getElementById("canvas");

const sizeInput = document.getElementById("ex-in");
const outputDiv = document.getElementById("ex-out");
const textInput = document.querySelector("#text input");
const createButton = document.querySelector("#text button");

//KAKAO Brain API 엔드포인트
const KAKAO_BRAIN_API_URL = "https://api.kakaobrain.com/v2/inference/karlo/t2i";
const REST_API_KEY = "f4daf48df7ebe7f67aa7af07a888179f";

document.addEventListener async ("click", () => {
    console.log("버튼이 클릭되었습니다");
});
//사진 크기 조절 이벤트

/**
 * 사진 생성
 */



/**
 * 사진 확대
 */