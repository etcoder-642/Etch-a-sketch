// selecting elements
const container = document.querySelector(".container");


// a variable to identify the width and height of the element
const styles = window.getComputedStyle(container);
const width = parseInt(styles.width);
const height = parseInt(styles.height);

// for loop to generate a lot of div elements that will be fitted inside the canvas
const j = (width*height)/ (12*12)
console.log(j)
for(i=0;i<j;i++){
    let div = document.createElement("div")
    div.style.width = "10px";
    div.style.height = "10px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.5)";
    div.style.padding = '0';
    div.style.margin = "0"

    container.appendChild(div);

    div.addEventListener('mouseenter', ()=>{
        div.style.backgroundColor = "black"
    })
    
}


