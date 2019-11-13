let itemToDisplay = catalog[findItem("80d32566-d81c-4ba0-9edf-0eceda3b4360")];
let mainPreview = document.getElementsByClassName("item-wrapper--left-main")[0];
let smallPreviews = document.getElementsByClassName("item-wrapper--left-previews--preview");
let selectedColor = 0;
let selectedSize = 0;

document.addEventListener("click", function(e){
    if(e.target.className.match(/item-wrapper--left-previews--preview/)){
        changeMainPreview.call(e.target);
    }
    if(e.target.className.match(/item-wrapper--add-to-bag/)){
        addToBag("80d32566-d81c-4ba0-9edf-0eceda3b4360", null, itemToDisplay.sizes[selectedSize], itemToDisplay.colors[selectedColor]);
    }
    if(e.target.className.match(/item-wrapper--right--color-button--first/)){
        selectedColor = 0;
        changeColor.call(e.target);
    }
    if(e.target.className.match(/item-wrapper--right--color-button--second/)){
        selectedColor = 1;
        changeColor.call(e.target);
    }
    if(e.target.className.match(/item-wrapper--right--size-button--first/)){
        selectedSize = 0;
        changeSize.call(e.target);
    }
    if(e.target.className.match(/item-wrapper--right--size-button--second/)){
        selectedSize = 1;
        changeSize.call(e.target);
    }
    if(e.target.className.match(/item-wrapper--right--size-button--third/)){
        selectedSize = 2;
        changeSize.call(e.target);
    }

});

// displaying initial images
for(let i = 0; i < itemToDisplay.preview.length; i++){
    smallPreviews[i].style.backgroundImage = "url(" + itemToDisplay.preview[i] + ")";
}

mainPreview.style.backgroundImage = "url(" + itemToDisplay.preview[0] + ")";

function changeMainPreview(){
    let previewNumber;
    // hiding all black layers over small previews
    for(let i = 0; i < smallPreviews.length; i++){
        smallPreviews[i].getElementsByClassName("item-wrapper--layer")[0].classList.remove("active");
    }

    this.getElementsByClassName("item-wrapper--layer")[0].classList.add("active");

    if(this.className.match(/first/)){
        previewNumber = 0;
    } else if(this.className.match(/second/)){
        previewNumber = 1;
    } else {
        previewNumber = 2;
    }

    mainPreview.style.backgroundImage = "url(" + itemToDisplay.preview[previewNumber] + ")";
}

function changeColor(){
    let colorButtons = document.getElementsByClassName("item-wrapper--right--color-button");
    for(let i = 0; i < colorButtons.length; i++){
        colorButtons[i].classList.remove("selected");
    }
    this.classList.add("selected");
}

function changeSize(){
    let sizeButtons = document.getElementsByClassName("item-wrapper--right--size-button");
    for(let i = 0; i < sizeButtons.length; i++){
        sizeButtons[i].classList.remove("selected");
    }
    this.classList.add("selected");
}