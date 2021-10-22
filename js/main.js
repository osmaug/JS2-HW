"use strict";

class ProductList{
    constructor(container='.products-list'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            this.allProducts.push(item);
             block.insertAdjacentHTML("beforeend",item.render());
        }
    }

    summary() {
        let sum = 0;
        for(let product of this.goods){
            sum += product.price;
        }
    }
}

class ProductItem {
    constructor(product){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
    }
    render(){
           return `<div class="product-card"
           data-id="${this.id}">
                <img class="product-card-img" src="./img/${this.title}.png" width=200px>
                <h3 class="product-card-title">${this.title}</h3>
                <p class="product-card-price">${this.price}</p>
                <button class="buy-button"><span>Купить</span></button>
            </div>`
    }
}

let list = new ProductList();
list.render();
console.log(list.summary()); //почему-то сумму даёт undefined

class Basket {
    addGoods() {
 
    }
    removeGoods() {

    }
    changeGoods() {

    }
    
    render(){
        
    }
}

class ElementBasket {
    render(){}

}
