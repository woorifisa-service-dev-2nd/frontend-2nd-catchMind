//편지 열기
const open_letter = () => {
	document.getElementsByClassName("letter-close")[0].style.display = "none";
	document.getElementsByClassName("letter-open")[0].style.display = "flex";
};