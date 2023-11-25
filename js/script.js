const products = [
    {
        name: 'Affisch',
        category: 'Konst',
        price: 150,
        rating: 5.0,
        image: {
                src: 'assets/QaD-300x300-square.jpg',
                alt: 'The Dogmen-affisch',
                title: 'Quick&Dirty'
            }       
    },
    {
        name: 'T-shirt XL',
        category: 'Kläder',
        price: 250,
        rating: 2.5,
        image: {
                src: 'assets/Dogmen_tisha-300x300-square.jpg',
                alt: 'The Dogmen-affisch',
                title: 'Quick&Dirty'
            }       
    },
];


//Amount
const amount = 0;


const prodContainer = document.querySelector('#productContainer');
//console.log(prodContainer);

for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const sum = amount * product.price;
    //Rating
    const productRating = `${product.rating}`;
    const productRatingSuffix = productRating * 10;
    console.log(productRatingSuffix);


    prodContainer.innerHTML += `
        <article>
        <img class="productImage" src="${product.image.src}" alt="${product.image.alt}" width="300" height="300" loading="lazy" >
        <h3 class="productName">${product.name}</h3>
        <p class="productCategory"><span>Kategori: </span>${product.category}</p>
        <h4 class=productPrice><span>Pris: </span>${product.price}:-</h4>
        <div>
            <span class="material-symbols-outlined">indeterminate_check_box</span>            
            <span class="material-symbols-outlined">add_box</span>
        </div>
        <p class="amount">${amount + ' st' + ' ' + sum}:-</p>
        <div class="productRating productRating-${productRatingSuffix}" aria-label="Rating ${product.rating}">
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
        </div>

        </article>
    `;

}
