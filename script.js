// selecting elements
const container = document.querySelector(".container");
const content = document.querySelector('.content')

// for loop to generate a lot of div elements that will be fitted inside the canvas

document.addEventListener('click',(e)=>{
    let target = e.target.className
    if(target.includes('first-child')){ 
        mainEngine(16);
    }else if(target.includes('second-child')){
        mainEngine(32);        
    }else if(target.includes('third-child')){
        mainEngine(64);
    }else if(target.includes('custom')){
        content.innerHTML = "";
        let customInput = document.createElement('input')
        let customButton = document.createElement('button')
        customButton.textContent = "Set"

        content.appendChild(customInput)
        content.appendChild(customButton)
        customInput.focus()

        customInput.setAttribute('type', 'number')
        customInput.setAttribute('placeholder', 'Enter a Number')
        customButton.addEventListener('click', ()=>{
            if(typeof (customInput.value) != 'number'){
                alert("You haven't entered a number.")
            }else if(parseInt(customInput.value)>64){
                alert("This is too big! Choose a smaller one!")
            }else{
                mainEngine(parseInt(customInput.value))
            }
        })
    }
})

function mainEngine(value) {
    // clearing the ground before starting the actual work
    container.innerHTML = '';

    // sets the width and height of the grid
    let f = 16*value
    container.style.width = `${f}px`
    container.style.height = `${f}px`
 
    // a variable to identify the width and height of the element
    let styles = window.getComputedStyle(container);
    let width = parseInt(styles.width);
    console.log(width + ' - this is the width')
    let height = parseInt(styles.height);

    // generating the grid
    let j = (width*height)/ (16*16)
    console.log(j + ' - this is j')
    for(i=0;i<j;i++){
        let div = document.createElement("div")
        div.style.width = "14px";
        div.style.height = "14px";
        div.style.border = "1px solid rgba(0, 0, 0, 0.5)";
        div.style.padding = '0';
        div.style.margin = "0"
    
        container.appendChild(div);

        // making the trace happen when hovered    
        div.addEventListener('mouseenter', ()=>{
            div.style.backgroundColor = "black"
        })
    }
}

