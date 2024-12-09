/**
 * Image credit:
 * https://www.georgethegeographer.co.uk/Base_maps/World_7colour_unnamed.jpg
 * 
 * SVG credit:
 * https://en.m.wikipedia.org/wiki/File:Continents.svg
 * 
 */

/**
 * Known pixel locations for each continent
 */
const continentPixelLocations = {
    "North America": { x: 346, y: 365 },
    "South America": { x: 531, y: 700 },
    "Europe": { x: 934, y: 316 },
    "Africa": { x: 900, y: 556 },
    "Asia": { x: 1206, y: 351 },
    "Australia": { x: 1422, y: 762 },
    "Antartica": { x: 868, y: 1093 },
};

/**
 * Object mapping rgb strings to continent names
 */
let colorsContinents = {};

/**
 * Global variables to hold images natural dimensions
 */
let intrinsicWidth = null;
let intrinsicHeight = null;


/**
 * References to elements
 */
//const canvas = document.getElementById("continent-canvas");
//const ctx = canvas.getContext("2d");
//const wrapper = document.getElementById("wrapper");



/**
 * Load image into memory, store natural dimensions and render canvas
 */
//const img = new Image();
//img.src = "assets/images/continents-map.jpg";
//img.onload = () => {
//    intrinsicWidth = img.width;
//    intrinsicHeight = img.height;
//    populateContinentColors(img);
//    renderCanvas();
//};

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
 * Finds the color of the clicked pixel and displays the corresponding continent name in an alert
 * @param {*} e 
 */
function handleCanvasClick(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgbString = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    console.log(rgbString);
    if (colorsContinents[rgbString]) {
        const continentClicked = colorsContinents[rgbString];
        alert(`You clicked on ${continentClicked}`);
    }
}

/**
 * Uses an offscreen canvas to read the pixel color at known locations for each continent and adds an entry 
 * to the colorsContinents object, with the rgb string as the key and the continent name as the value.
 * @param {*} img 
 */
function populateContinentColors(img) {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = img.width;
    offscreenCanvas.height = img.height;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCtx.drawImage(img, 0, 0);
    for (let continent in continentPixelLocations) {
        const { x, y } = continentPixelLocations[continent];
        const pixel = offscreenCtx.getImageData(x, y, 1, 1).data;
        const rgbString = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        console.log(continent, rgbString);
        colorsContinents[rgbString] = continent;
    }
}



// Add event listener to canvas that listens for clicks
//canvas.addEventListener("click", handleCanvasClick);

// Add event listener to window that re-renders the canvas when the window is resized
//window.addEventListener("resize", renderCanvas);






const continentsMeta = {
    "north-america": {
        pretty: "North America",
        color: "red",
    },
    "south-america": {
        pretty: "South America",
        color: "green",
    },
    "europe": {
        pretty: "Europe",
        color: "blue",
    },
    "africa": {
        pretty: "Africa",
        color: "yellow",
    },
    "asia": {
        pretty: "Asia",
        color: "purple",
    },
    "Oceania": {
        pretty: "Oceania",
        color: "orange",
    },
}

const continentMapObject = document.getElementById("continent-map");

continentMapObject.addEventListener("load", function () {
    // Get the SVG document inside the object
    const svgDoc = continentMapObject.contentDocument;
    const svg = svgDoc.querySelector("svg");
    svg.addEventListener("click", e => {
        //console.log(e.target, e.currentTarget);
        const { target } = e;
        if (target.tagName === "path") {
            const continent = target.getAttribute("data-continent");
            alert(`You clicked on ${continent}`);
        }
    });
});



