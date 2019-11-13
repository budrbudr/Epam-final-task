window.onload = function() {

    // fallback for lodash
    if (typeof _ !== "function") {
        let myScript = document.createElement("script");
        myScript.setAttribute("src", "scripts/lodash.min.js");
        document.getElementsByTagName("body")[0].insertBefore(myScript, document.getElementsByTagName("body")[0].firstChild);
    }

    // menu for mobile view
    let menuBurger = document.getElementsByClassName("header--burger")[0];
    let menuCross = document.getElementsByClassName("header--cross")[0];
    let modalMenu = document.getElementsByClassName("modal-menu")[0];
    menuBurger.addEventListener("click", function(){
       this.classList.remove("active");
       menuCross.classList.add("active");
       modalMenu.classList.add("active");
    });
    menuCross.addEventListener("click", function(){
        this.classList.remove("active");
        menuBurger.classList.add("active");
        modalMenu.classList.remove("active");
    });


    // search block for tablet view
    let tabletSearch = document.getElementsByClassName("header--search--tablet")[0];
    let tabletSearchInput = document.getElementsByClassName("header--search--tablet-input")[0];
    tabletSearch.addEventListener("click", function() {
        if(this.classList.contains("active") && tabletSearch.value === ""){
            this.classList.remove("active");
        } else {
            this.classList.add("active");
            tabletSearchInput.focus();
        }
    });
    tabletSearchInput.addEventListener("blur", function() {
        if(this.value === ""){
            tabletSearch.classList.remove("active");
        }
    });
    updateBag();

    // event listeners for basic links
    let itemsItselfElements = document.getElementsByClassName("item-link");
    if(itemsItselfElements){
        for(let i = 0; i < itemsItselfElements.length; i++){
            itemsItselfElements[i].addEventListener("click", function(){location.href='item-details.html'});
        }
    }


    let catalogItselfElements = document.getElementsByClassName("catalog-link");
    if(catalogItselfElements){
        for(let i = 0; i < catalogItselfElements.length; i++){
            catalogItselfElements[i].addEventListener("click", function(){location.href='items-catalog.html'});
        }
    }



    document.addEventListener("click", function(e){
        if(e.target.className.match(/header--main-logo/)){
            location.href='index.html';
        }
    });

};

// gets id and returns index number in catalog array
function findItem(id){
    for(let i = 0; i < window.catalog.length; i++){
        if(id === window.catalog[i].id){
            return i;
        }
    }
}

function addToBag(id, connectedTo, size,  color) {
    let bagList = [];
    if (localStorage.getItem("sBagList")) {
        bagList = JSON.parse(localStorage.getItem("sBagList"));
    }
    bagList.push({
        id: id,
        connectedTo: connectedTo,
        size: size,
        color: color
    });

    localStorage.setItem("sBagList", JSON.stringify(bagList));

    updateBag();
}

function calcBagTotal(){
    let total = [];
    let discount;
    let tempBagList = JSON.parse(localStorage.getItem("sBagList"));
    let tempTotal = 0;

    for(let i = 0; i < tempBagList.length; i++){
        total.push(catalog[findItem(tempBagList[i].id)].price);
        if(tempBagList[i].connectedTo === "prev" && tempBagList[i - 1].connectedTo === "next"){
            discount = bestOffer.discount;
            total[i] = total[i] * (1 - (discount / 100));
            total[i - 1] = total[i - 1] * (1 - (discount / 100));
        }
    }

    // getting actual total
    for(let i = 0; i < total.length; i++){
        tempTotal += total[i];
    }
    tempTotal = (Math.floor(tempTotal * 100)) / 100;
    return tempTotal;
}

// updates html element bag at the top right
function updateBag(){
    let element = document.getElementsByClassName("header--bag")[0];
    let amount;

    if(localStorage.getItem("sBagList")){
        let quantity = JSON.parse(localStorage.getItem("sBagList"));
        if(quantity.length !== 0){
            quantity = quantity.length;
            amount = calcBagTotal();
            element.textContent = "Bag £" + amount + " ("+ quantity + ")";
            return;
        }
    }
    element.textContent = "Bag (0)";
}
