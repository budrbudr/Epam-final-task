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

appendToTopRow();
appendToBottomRow();

function appendToTopRow(){
    let catalogTopRow = document.getElementsByClassName("catalog--top")[0];
    let itemsToAppend = sortedArray.slice(0, 4);

    itemsToAppend.forEach(function(i){
        let item = document.createElement("div");
        item.classList.add("catalog--top--item");
        item.classList.add("catalog--item");
        item.classList.add("button");
        item.classList.add("item-link");

        let imageHolder = document.createElement("div");
        imageHolder.classList.add("item--image-holder");
        imageHolder.style.backgroundImage = 'url(' + i.preview[0] + ')';
        item.appendChild(imageHolder);

        let imageLayerHolder = document.createElement("div");
        imageLayerHolder.classList.add("item--image-holder--layer");
        imageHolder.appendChild(imageLayerHolder);

        let imageLayerTextHolder = document.createElement("span");
        imageLayerTextHolder.textContent = "View Item";
        imageLayerTextHolder.classList.add("item--image-holder--layer--text");
        imageLayerHolder.appendChild(imageLayerTextHolder);

        let name = document.createElement("span");
        name.classList.add("catalog--top--item--name");
        name.classList.add("item--name");
        name.textContent = i.title;
        item.appendChild(name);

        let price = document.createElement("span");
        price.classList.add("item--price");
        price.classList.add("prices");
        price.textContent = i.price;
        item.appendChild(price);

        if(i.hasNew === true){
            let newElement = document.createElement("div");
            newElement.classList.add("new--attribute");
            newElement.classList.add("active");
            newElement.textContent = "NEW";
            item.appendChild(newElement);
        }

        catalogTopRow.appendChild(item);
    });
}

function appendToBottomRow(){
    let catalogBottomRow = document.getElementsByClassName("catalog--bottom")[0];
    console.log(sortedArray);
    let itemsToAppend = sortedArray.splice(4, sortedArray.length - 4);

    itemsToAppend.forEach(function(i){
        let item = document.createElement("div");
        item.classList.add("catalog--bottom--item");
        item.classList.add("catalog--item");
        item.classList.add("button");
        item.classList.add("item-link");

        let imageHolder = document.createElement("div");
        imageHolder.classList.add("item--image-holder");
        imageHolder.style.backgroundImage = 'url(' + i.preview[0] + ')';
        item.appendChild(imageHolder);

        let imageLayerHolder = document.createElement("div");
        imageLayerHolder.classList.add("item--image-holder--layer");
        imageHolder.appendChild(imageLayerHolder);

        let imageLayerTextHolder = document.createElement("span");
        imageLayerTextHolder.textContent = "View Item";
        imageLayerTextHolder.classList.add("item--image-holder--layer--text");
        imageLayerHolder.appendChild(imageLayerTextHolder);

        let name = document.createElement("span");
        name.classList.add("item--name");
        name.textContent = i.title;
        item.appendChild(name);

        let price = document.createElement("span");
        price.classList.add("item--price");
        price.classList.add("prices");
        price.textContent = i.price;
        item.appendChild(price);

        if(i.hasNew === true){
            let newElement = document.createElement("div");
            newElement.classList.add("new--attribute");
            newElement.classList.add("active");
            newElement.textContent = "NEW";
            item.appendChild(newElement);
        }

        catalogBottomRow.appendChild(item);
    });
}