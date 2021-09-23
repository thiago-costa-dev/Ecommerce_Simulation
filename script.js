const productsSection = document.querySelector('#products');
const cartAside = document.querySelector('#cart');

const products = [{
        name: 'notebook',
        img: 'notebook.jpg',
        price: 2578.56
    },
    {
        name: 'cellphone',
        img: 'cellphone.jpg',
        price: 1254.2
    },
    {
        name: 'tea',
        img: 'tea.jpg',
        price: 0.57
    },
    {
        name: 'coffe',
        img: 'coffe.jpg',
        price: 1.23
    },
    {
        name: 'table',
        img: 'table.jpg',
        price: 152.3
    },
    {
        name: 'honey',
        img: 'honey.jpg',
        price: 4.52
    },
    {
        name: 'chocolate',
        img: 'chocolate.jpg',
        price: 1.2
    }
];

const productsInCart = {};

products.forEach((product, index) => {
    setProduct(product.name, product.img, product.price, index);
    productsInCart[index] = 0;
});


function setProduct(name, img, price, productIndex) {
    const product = document.createElement('div');
    product.setAttribute('class', 'product');

    const nameProduct = document.createElement('h2');
    nameProduct.innerText = name;
    product.appendChild(nameProduct);

    const pictureProduct = document.createElement('img');
    pictureProduct.setAttribute('src', `img/${img}`);
    product.appendChild(pictureProduct);

    const priceProduct = document.createElement('p');
    priceProduct.innerText = `$ ${price.toFixed(2)}`;
    product.appendChild(priceProduct);

    const buyButton = document.createElement('button');
    buyButton.innerText = 'Buy';
    buyButton.setAttribute('name', productIndex);
    buyButton.addEventListener('click', addToCart);
    product.appendChild(buyButton);

    productsSection.appendChild(product);
}

function addToCart(event) {
    const newProd = document.createElement('div');
    newProd.setAttribute('class', 'new_prod');

    productsInCart[event.target.getAttribute('name')]++;

    const productQuantity = productsInCart[event.target.getAttribute('name')];
    const productPrice = products[event.target.getAttribute('name')].price;
    const result = productQuantity * productPrice;

    if (productsInCart[event.target.getAttribute('name')] === 1) {
        const pictureLink = `img/${products[event.target.getAttribute('name')].img}`;
        const newProdPicture = document.createElement('img');
        newProdPicture.setAttribute('src', pictureLink);
        newProd.appendChild(newProdPicture);

        const quantity = document.createElement('p');
        quantity.innerText = `${productQuantity} x U$ ${productPrice.toFixed(2)} = U$ ${result.toFixed(2)}`
        quantity.setAttribute('id', `prod_${event.target.getAttribute('name')}`)
        newProd.appendChild(quantity);

        cartAside.appendChild(newProd);
    } else {
        const prodId = `#prod_${event.target.getAttribute('name')}`;
        document.querySelector(prodId).innerText = `${productQuantity} x U$ ${productPrice.toFixed(2)} = U$ ${result.toFixed(2)}`;
    }

    let amount = 0;
    for (let i = 0; i < products.length; i++) {
        amount += products[i].price * productsInCart[i];
    }

    const amountResult = document.querySelector('#cart > h3');
    amountResult.innerText = `Amount = U$ ${amount.toFixed(2)}`;

    cartAside.scroll(0, cartAside.scrollHeight);
}
