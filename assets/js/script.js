/**
 * Image credit:
 * https://www.georgethegeographer.co.uk/Base_maps/World_7colour_unnamed.jpg
 */

console.log("Hello from script.js");

const canvas = document.getElementById("continent-canvas");
const ctx = canvas.getContext("2d");
const wrapper = document.getElementById("wrapper");
const colorsContinents = {
    "rgb(255, 204, 0)": "North America",
    "rgb(51, 204, 51)": "South America",
    "rgb(255, 79, 79)": "Europe",
    "rgb(154, 0, 0)": "Africa",
    "rgb(153, 0, 205)": "Asia",
    "rgb(255, 255, 103)": "Australia",
    "rgb(0, 153, 255)": "Antarctica"
}

let intrinsicWidth = null;
let intrinsicHeight = null;


const img = new Image();
img.src = "assets/images/continents-map.jpg";
img.onload = () => {
    intrinsicWidth = img.width;
    intrinsicHeight = img.height;
    const width = intrinsicWidth * 0.5;
    const height = intrinsicHeight * 0.5;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
};

canvas.addEventListener("click", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgbString = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    if (colorsContinents[rgbString]) {
        const continentClicked = colorsContinents[rgbString];
        alert(`You clicked on ${continentClicked}`);
    }

    //console.log(rgb);
});

function handleResize(e) {
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const scaleFactor = Math.min(wrapperWidth / intrinsicWidth, 1);
    const renderedWidth = intrinsicWidth * scaleFactor;
    const renderedHeight = intrinsicHeight * scaleFactor;
    canvas.width = renderedWidth;
    canvas.height = renderedHeight;
    ctx.drawImage(img, 0, 0, renderedWidth, renderedHeight);

}

window.addEventListener("resize", handleResize);


