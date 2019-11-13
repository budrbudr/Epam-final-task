let selectedItems = [0, 0];

document.addEventListener("click", function(e){
    if(e.target.className.match(/best-offer--add-to-bag/)){
        addToBag(bestOffer.left[selectedItems[0]], "next");
        addToBag(bestOffer.right[selectedItems[1]], "prev");
    }
    if(e.target.className.match(/slider-top/)){
        if(e.target.className.match(/left/)){
            changeItems.call(e.target, "left", -1);
        } else {
            changeItems.call(e.target, "right", -1);
        }
    }
    if(e.target.className.match(/slider-bottom/)){
        if(e.target.className.match(/left/)){
            changeItems.call(e.target, "left", 1);
        } else {
            changeItems.call(e.target, "right", 1);
        }
    }
});

// changes content in best-offer right when script loads
changeItems.call(document.getElementsByClassName("best-offer--left--slider-top")[0], "left", 0);
changeItems.call(document.getElementsByClassName("best-offer--right--slider-top")[0], "right", 0);

// filtering elements
let sortedArray = _.map(catalog, function(o){
    if(o.category === "women" && o.fashion.toLowerCase() === "casual style"){
        return o;
    }
});
// removing undefined items
sortedArray = _.without(sortedArray, undefined);

// sorting by date (new first)
sortedArray = _.sortBy(sortedArray, function(o) {
    return -(new Date(o.dateAdded));
});


sortedArray = sortedArray.slice(0, 4);

let itemsItself = document.getElementsByClassName("new-arrivals--items-itself")[0];

// appending items
sortedArray.forEach(function(i){
    let item = document.createElement("div");
    item.classList.add("new-arrivals--item");
    item.classList.add("button");
    item.classList.add("item-link");

    let imageHolder = document.createElement("div");
    imageHolder.classList.add("new-arrivals--image-holder");
    imageHolder.style.backgroundImage = 'url(' + i.preview[0] + ')';
    item.appendChild(imageHolder);

    let name = document.createElement("span");
    name.classList.add("new-arrivals--name");
    name.textContent = i.title;
    item.appendChild(name);

    let price = document.createElement("span");
    price.classList.add("new-arrivals--price");
    price.classList.add("prices");
    price.textContent = i.price;
    item.appendChild(price);

    if(i.hasNew === true){
        let newElement = document.createElement("div");
        newElement.classList.add("new-arrivals--new");
        newElement.classList.add("active");
        newElement.textContent = "NEW";
        item.appendChild(newElement);
    }

    itemsItself.appendChild(item);

    if(i !== sortedArray.length - 1){
        let gap = document.createElement("div");
        gap.classList.add("new-arrivals--gap");
        itemsItself.appendChild(gap);
    }
});


function changeItems(side, direction){
    side === "left" ? selectedItems[0] += direction : selectedItems[1] += direction;

    // not letting counter go too much
    if(selectedItems[0] === bestOffer.left.length){
        selectedItems[0] = 0;
    } else if(selectedItems[0] < 0) {
        selectedItems[0] = bestOffer.left.length - 1;
    }

    if(selectedItems[1] === bestOffer.right.length){
        selectedItems[1] = 0;
    } else if(selectedItems[1] < 0) {
        selectedItems[1] = bestOffer.right.length - 1;
    }

    // finding values
    // let imgSrc;
    // let price;
    // let name;
    // let hasNew;
    let item;
    side === "left" ? item = catalog[findItem(bestOffer.left[selectedItems[0]])] : item = catalog[findItem(bestOffer.right[selectedItems[1]])];

    //changing values
    let imageElement = this.parentElement.getElementsByClassName("best-offer--image-holder")[0];
    imageElement.style.backgroundImage = 'url(' + item.preview[0] + ')';
    let nameElement = this.parentElement.getElementsByClassName("best-offer--name")[0];
    nameElement.textContent = item.title;
    let priceElement = this.parentElement.getElementsByClassName("best-offer--price")[0];
    priceElement.textContent = item.price;
    let newElement = this.parentElement.getElementsByClassName("best-offer--new")[0];
    newElement.classList.remove("active");

    //changing "new" attribute
    if(item.hasNew === true){
        newElement.classList.add("active");
    }

    // updating prices
    let totalPrice = [];
    let discountedPrice;
    let discount = bestOffer.discount;
    totalPrice.push(catalog[findItem(bestOffer.left[selectedItems[0]])].price);
    totalPrice.push(catalog[findItem(bestOffer.right[selectedItems[1]])].price);
    discountedPrice = (totalPrice[0] * (1 - (discount / 100))) + (totalPrice[1] * (1 - (discount / 100)));
    discountedPrice = (Math.floor(discountedPrice * 100)) / 100;
    totalPrice = totalPrice[0] + totalPrice[1];
    document.getElementsByClassName("best-offer--prev-price")[0].textContent = totalPrice;
    document.getElementsByClassName("best-offer--total-price")[0].textContent = discountedPrice;
    document.getElementsByClassName("best-offer--prev-price--bottom")[0].textContent = totalPrice;
    document.getElementsByClassName("best-offer--total-price--bottom")[0].textContent = discountedPrice;
}

