const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 1, title: 'Mouse', price: 20},
    {id: 1, title: 'Keyboard', price: 200},
    {id: 1, title: 'Gamepad', price: 50},
];

const renderProduct = product => {
    return  `<div class="product-card">
                <img src="./img/${product.title}.png" width=200px>
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-button">Купить</button>
            </div>`
}

const renderPage = list => {
    document.querySelector('.products-list').innerHTML = list.map(item => renderProduct(item)).join('');
}

renderPage(products);