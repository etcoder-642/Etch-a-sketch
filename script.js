// selecting elements
const container = document.querySelector(".container");
const content = document.querySelector('.content')
const noLines = document.querySelector('.nolines')
const firstChild = document.querySelector('.first-child');
const secondChild = document.querySelector('.second-child');
const thirdChild = document.querySelector('.third-child');
const colorMode = document.querySelector('.colorMode');
const blackMode = document.querySelector('.blackMode');
const greenMode = document.querySelector('.greenMode');


// a variable to identify the width and height of the element
let styles = window.getComputedStyle(container);
let width = parseInt(styles.width);
let height = parseInt(styles.height);

function defaultProperties(){
    container.style.width = '320px'
    container.style.height = '320px'

    noLines.style.backgroundColor = 'white'
    noLines.style.color = 'black'
    
    firstChild.style.backgroundColor = 'white'
    firstChild.style.color = 'black'

    secondChild.style.backgroundColor = 'white'
    secondChild.style.color = 'black'

    thirdChild.style.backgroundColor = 'white'
    thirdChild.style.color = 'black'

}

// random color generating function

let opacity = 0.005;
function randomColor(){
 // Generate random RGB values
 const r = Math.floor(Math.random() * 256);
 const g = Math.floor(Math.random() * 256);
 const b = Math.floor(Math.random() * 256);

 // Ensure opacity doesn't go beyond 1
 if (opacity > 1) opacity = 1;

 const color = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;
 opacity += 0.001; // Increase opacity by 0.1 each time
 return color;
}

let greenOpacity = 0.1;
function getGreenColor(){
    if(greenOpacity>1) greenOpacity = 1;
    let newColor = `rgba(0, 255, 0, ${greenOpacity})`
    greenOpacity += 0.001;

    return newColor;
}

// an event listener to identify and respond when the buttons are clicked

document.addEventListener('click',(e)=>{
    let target = e.target.className
    if(target.includes('first-child')){ 
        defaultProperties();
        mainEngine(16);

        //changing background permanently
        firstChild.style.backgroundColor = 'black'
        firstChild.style.color = 'white'
    
    }else if(target.includes('second-child')){
        defaultProperties();
        mainEngine(32);        

        secondChild.style.backgroundColor = 'black'
        secondChild.style.color = 'white'
    
    }else if(target.includes('third-child')){
        defaultProperties();
        mainEngine(64);

        thirdChild.style.backgroundColor = 'black'
        thirdChild.style.color = 'white'

    }else if(target.includes('custom')){
        content.innerHTML = "";
        defaultProperties();
        let customInput = document.createElement('input')
        let customButton = document.createElement('button')
        customButton.textContent = "Set"

        content.appendChild(customInput)
        content.appendChild(customButton)
        customInput.focus()

        customInput.setAttribute('type', 'number')
        customInput.setAttribute('placeholder', 'Enter a Number')
        customButton.addEventListener('click', ()=>{
            if((customInput.value)>128){
                alert("This is too big! Choose a smaller one!")
            }else if((customInput.value)<5){
                alert("Oops! This number is too small")
            }else {
                mainEngine((customInput.value))
            }
            // computing the new Width and height
            let newWidth = width - (width%(customInput.value))
            let newHeight = height - (height%(customInput.value))

            // setting the new width and height
            container.style.width = `${newWidth}px`
            container.style.height = `${newHeight}px`
        })
    }else if(target.includes('clear-grid')){
        location.reload()
    }
})


function mainEngine(value) {
    // clearing the ground before starting the actual work
    container.innerHTML = '';

    // generating the grid
    let j = (width*height)/ (value*value)
    let r = value-2 // this is to accomodate for the border since the border is 1 px it decreases 2px from the value considering both sides

    for(i=0;i<j;i++){
        let div = document.createElement("div")
        div.style.border = '1px dotted rgba(0, 0, 0, 0.5)';
        div.style.width = `${r}px`;
        div.style.height = `${r}px`;
        div.style.padding = '0';
        div.style.margin = "0"
    
        container.appendChild(div);

        
        // tracked variables or flags
        let isDrawing = false;   
        let isColorModeActive = false; 
        let isGreenModeActive = false;
        
        // default properties for the black Mode
        blackMode.style.backgroundColor = 'black';
        blackMode.style.color = 'white'

        // things that will happen when the color Mode button is clicked
        colorMode.addEventListener('click',()=>{
            colorMode.style.backgroundColor = 'black';
            colorMode.style.color = 'white'

            blackMode.style.backgroundColor = 'white';
            blackMode.style.color = 'black'

            greenMode.style.backgroundColor = 'white';
            greenMode.style.color = 'black'

            isColorModeActive = true
            isGreenModeActive = false;
        })    

        // things that will happen when the black Mode button is clicked
        blackMode.addEventListener('click',()=>{
            colorMode.style.backgroundColor = 'white';
            colorMode.style.color = 'black'

            blackMode.style.backgroundColor = 'black';
            blackMode.style.color = 'white'

            greenMode.style.backgroundColor = 'white';
            greenMode.style.color = 'black'

            isColorModeActive = false
            isGreenModeActive = false
        })

        // things that will happen when the green Mode button is clicked
        greenMode.addEventListener('click',()=>{
            greenMode.style.backgroundColor = 'black';
            greenMode.style.color = 'white'

            blackMode.style.backgroundColor = 'white';
            blackMode.style.color = 'black'

            colorMode.style.backgroundColor = 'white';
            colorMode.style.color = 'black'

            isGreenModeActive = true;
            isColorModeActive = false
        })

        // making the trace happen when the mouse is hold in its place

        document.addEventListener('mousedown', ()=>{
            isDrawing = true;
            div.addEventListener('mouseenter',()=>{
                // checking whether the button is released before drawing and whether the colorMOde is on before chossing colors
                if(isDrawing === true && isColorModeActive === false && isGreenModeActive === false){
                    div.style.backgroundColor = `black`;
                }else if(isDrawing === true && isColorModeActive === true && isGreenModeActive === false){
                    div.style.backgroundColor = `${randomColor()}`
                }else if(isDrawing === true && isColorModeActive === false && isGreenModeActive === true){
                    div.style.backgroundColor = `${getGreenColor()}`                    
                }
            })    
            document.addEventListener('mouseup',()=>{
                isDrawing = false;
            })
        })

        // the button to erase the trace

        document.addEventListener('click',(e)=>{
            let divTarget = e.target.className
            if(divTarget.includes('clear-trace')){
                div.style.backgroundColor = 'white'
            }
        })

        // the no lines function which erases the grid lines
        noLines.addEventListener('click',()=>{
            noLines.style.backgroundColor = 'black';
            noLines.style.color = 'white';
            div.style.border = 'none'
            div.style.width = `${r+2}px`;
            div.style.height = `${r+2}px`;    
        })

    }
}

