export let homeButton = document.createElement("img");
export let infoButton = document.createElement("img");
homeButton.setAttribute("id", "home");
infoButton.setAttribute("id", "info");
homeButton.setAttribute("src", "./resource/home.png");
infoButton.setAttribute("src", "./resource/info.png");
homeButton.setAttribute("width", "40px");
infoButton.setAttribute("width", "40px");
homeButton.setAttribute("height", "40px");
infoButton.setAttribute("height", "40px");
homeButton.addEventListener("click", returnHome);
infoButton.addEventListener("click", info);

function returnHome() {
    location.href = location.href = "http://localhost:3000/main";
}

function info() {
    alert("develped by Mediazen AI Solution team");
}