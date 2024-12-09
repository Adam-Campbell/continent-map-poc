/**
 * Image credit:
 * https://www.georgethegeographer.co.uk/Base_maps/World_7colour_unnamed.jpg
 */

/**
 * rgb colors mapped to continents
 */
const colorsContinents = {
    "rgb(255, 204, 0)": "North America",
    "rgb(51, 204, 51)": "South America",
    "rgb(255, 79, 79)": "Europe",
    "rgb(154, 0, 0)": "Africa",
    "rgb(153, 0, 205)": "Asia",
    "rgb(255, 255, 103)": "Australia",
    "rgb(0, 153, 255)": "Antarctica"
}

/**
 * References to elements
 */
const canvas = document.getElementById("continent-canvas");
const ctx = canvas.getContext("2d");
const wrapper = document.getElementById("wrapper");

/**
 * Global variables to hold images natural dimensions
 */
let intrinsicWidth = null;
let intrinsicHeight = null;

/**
 * Load image into memory, store natural dimensions and render canvas
 */
const img = new Image();
img.src = "assets/images/continents-map.jpg";
img.onload = () => {
    intrinsicWidth = img.width;
    intrinsicHeight = img.height;
    renderCanvas();
};

/**
 * Render image to canvas, with size calculated based on width of wrapper div 
 */
function renderCanvas() {
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    // Calculate scale factor for transforming intrinsic dimensions to rendered dimensions.
    // Ensure that maximum scale factor is 1 to prevent image being rendered larger than its natural size.
    const scaleFactor = Math.min(wrapperWidth / intrinsicWidth, 1);
    // Calculate rendered dimensions
    const renderedWidth = intrinsicWidth * scaleFactor;
    const renderedHeight = intrinsicHeight * scaleFactor;
    // Set canvas dimensions and draw image
    canvas.width = renderedWidth;
    canvas.height = renderedHeight;
    ctx.drawImage(img, 0, 0, renderedWidth, renderedHeight);
}

/**
 * Add event listener to canvas that retrieves the pixel color of the clicked location, and if that
 * color corresponds to a continent, show an alert with the name of the continent.
 */
canvas.addEventListener("click", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgbString = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    alert(rgbString);
    // Only show alert if the color matches a continent
    //if (colorsContinents[rgbString]) {
    //    const continentClicked = colorsContinents[rgbString];
    //    alert(`You clicked on ${continentClicked}`);
    //}

});


// Add event listener to window that re-renders the canvas when the window is resized
window.addEventListener("resize", renderCanvas);


