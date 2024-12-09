/**
 * Image credit:
 * https://www.georgethegeographer.co.uk/Base_maps/World_7colour_unnamed.jpg
 * 
 * SVG credit:
 * https://en.m.wikipedia.org/wiki/File:Continents.svg
 * 
 */


const svg = document.getElementById("continent-svg");
svg.addEventListener("click", e => {
    const { target } = e;
    if (target.tagName === "path") {
        const continent = target.getAttribute("data-continent");
        alert(`You clicked on ${continent}`);
    }
});






