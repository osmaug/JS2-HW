"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        basketItems: [],
        filtered: [],
        imgBasket: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.basketItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);
                           this.basketItems.push(prod)
                       }
                    }
                })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.filtered.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.basketItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});


// class ProductList{
//     constructor(container='.products-list'){
//         this.container = container;
//         this.goods = [];
//         this.allProducts = [];
//         this._getProducts()
//             .then(data => {
//                  this.goods = data;
//                  this.render()
//             });
//     }

//     _getProducts(){
      
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//             const item = new ProductItem(product);
//             this.allProducts.push(item);
//              block.insertAdjacentHTML("beforeend",item.render());
//         }
//     }
// }

// class ProductItem {
//     constructor(product){
//         this.title = product.product_name;
//         this.id = product.id_product;
//         this.price = product.price;
//     }
//     render(){
//            return `<div class="product-card"
//            data-id="${this.id}">
//                 <img class="product-card-img" src="./img/${this.title}.png" width=200px>
//                 <h3 class="product-card-title">${this.title}</h3>
//                 <p class="product-card-price">${this.price} рублей</p>
//                 <button class="buy-button"><span>Buy Now</span></button>
//             </div>`
//     }
// }

// let list = new ProductList();

// // class Basket {
// //     addGoods() {
 
// //     }
// //     removeGoods() {

// //     }
// //     changeGoods() {

// //     }
    
// //     render(){
        
// //     }
// // }

// // class ElementBasket {
// //     render(){}

// // }


// class Basket {
//     constructor(container = '.basket-block') {
//         this.container = container;
//         this.goods = [];
//         this._clickBasket();
//         this._getBasketItem()
//             .then(data => {
//                 this.goods = [...data.contents];
//                 this.render()
//             });
//     }


//     _getBasketItem() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new BasketItem();
//             block.insertAdjacentHTML('beforeend', item.render(product));
//         }

//     }

//     _clickBasket() {
//         document.querySelector(".button-basket").addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//     }
// }

// class BasketItem {
  
//     render(product) {
//         return `<div class="basket-item" data-id="${product.id_product}">
//                     <div class="product-bio">
//                         <img src="${product.img}" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${product.product_name}</p>
//                             <p class="product-quantity">Quantity: ${product.quantity}</p>
//                             <p class="product-single-price">$${product.price} each</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">$${product.quantity * product.price}</p>
//                         <button class="del-btn" data-id="${product.id_product}">&times;</button>
//                     </div>
//                 </div>`
//     }
// }

// let bask = new Basket();