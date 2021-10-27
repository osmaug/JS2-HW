"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
    constructor(container='.products-list'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => {
                 this.goods = data;
                 this.render()
            });
    }

    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            this.allProducts.push(item);
             block.insertAdjacentHTML("beforeend",item.render());
        }
    }
}

class ProductItem {
    constructor(product){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
    }
    render(){
           return `<div class="product-card"
           data-id="${this.id}">
                <img class="product-card-img" src="./img/${this.title}.png" width=200px>
                <h3 class="product-card-title">${this.title}</h3>
                <p class="product-card-price">${this.price} рублей</p>
                <button class="buy-button"><span>Купить</span></button>
            </div>`
    }
}

let list = new ProductList();

// class Basket {
//     addGoods() {
 
//     }
//     removeGoods() {

//     }
//     changeGoods() {

//     }
    
//     render(){
        
//     }
// }

// class ElementBasket {
//     render(){}

// }


class basket {
    constructor(container = '.basket-block') {
        this.container = container;
        this.goods = [];
        this._clickBasket();
        this._getBasketItem()
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            });
    }


    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new BasketItem();
            block.insertAdjacentHTML('beforeend', item.render(product));
        }

    }

    _clickBasket() {
        document.querySelector(".button-basket").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}

class BasketItem {
  
    render(product) {
        return `<div class="basket-item" data-id="${product.id_product}">
                    <div class="product-bio">
                        <img src="${product.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${product.product_name}</p>
                            <p class="product-quantity">Quantity: ${product.quantity}</p>
                            <p class="product-single-price">$${product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${product.quantity * product.price}</p>
                        <button class="del-btn" data-id="${product.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let bask = new basket();