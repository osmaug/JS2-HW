const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = product => {
    return  `<div class="product-card">
                <img class="product-card-img" src="./img/${product.title}.png" width=200px>
                <h3 class="product-card-title">${product.title}</h3>
                <p class="product-card-price">${product.price} USD</p>
                <button class="buy-button"><span>Купить</span></button>
            </div>`
}

const renderPage = list => {
    document.querySelector('.products-list').innerHTML = list.map(item => renderProduct(item)).join(' ');
}

renderPage(products);