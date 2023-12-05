export const saveImg = (src) => {
	fetch("/save-image", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ image: src })
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("이미지 저장 완료:", data.message);
		})
		.catch((error) => console.error("이미지 저장 오류:", error));
};

export const imgGen = (text) => {
	return new Promise((resolve, reject) => {
		fetch("/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ prompt: text })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data.images[0].image);
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};

export const toBase64 = (src) => {
	return new Promise((resolve, reject) => {
		fetch("/encode-image", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ imageUrl: src })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data.image);
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};

export const imgNsfw = (src) => {
	return new Promise((resolve, reject) => {
		fetch("/nsfw", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ images: src })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data.results[0].nsfw_content_detected);
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};

export const imgScale = (size, src) => {
	return new Promise((resolve, reject) => {
		fetch("/scaleUp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ image: src, size: size })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data.images[0]);
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};

export const imgChange = (src) => {
	return new Promise((resolve, reject) => {
		fetch("/change", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ image: src })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data.images[0].image);
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};