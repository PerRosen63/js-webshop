'use strict';

const products = [
    {
        name: 'Affisch',
        category: 'Konst',
        price: 150,
        rating: 5.0,
        amount: 0,
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
        amount: 0,
        image: {
                src: 'assets/Dogmen_tisha-300x300-square.jpg',
                alt: 'T-shirt Quick&Dirty',
                title: 'T-shirt Quick&Dirty'
            }       
    },
    {
        name: 'T-shirt L',
        category: 'Kläder',
        price: 250,
        rating: 3,
        amount: 0,
        image: {
                src: 'assets/Dogmen_tisha-300x300-square.jpg',
                alt: 'T-shirt Quick&Dirty',
                title: 'T-shirt Quick&Dirty'
            }       
    },
    {
        name: 'T-shirt M',
        category: 'Kläder',
        price: 250,
        rating: 3.5,
        amount: 0,
        image: {
                src: 'assets/Dogmen_tisha-300x300-square.jpg',
                alt: 'T-shirt Quick&Dirty',
                title: 'T-shirt Quick&Dirty'
            }       
    },
    {
        name: 'T-shirt SM',
        category: 'Kläder',
        price: 250,
        rating: 4.5,
        amount: 0,
        image: {
                src: 'assets/Dogmen_tisha-300x300-square.jpg',
                alt: 'T-shirt Quick&Dirty',
                title: 'T-shirt Quick&Dirty'
            }       
    },
    {
        name: 'Trendig bag',
        category: 'Accessoarer',
        price: 200,
        rating: 4.5,
        amount: 0,
        image: {
                src: 'assets/dogmen_vaska-300x300-square.jpg',
                alt: 'Väska Quick&Dirty',
                title: 'Väska Quick&Dirty'
            }       
    },
    {
        name: 'Quick&Dirty (10")',
        category: 'Musik',
        price: 225,
        rating: 5,
        amount: 0,
        image: {
                src: 'assets/cropped-QaD_rugged-300x300-square.jpg',
                alt: 'Skiva Quick&Dirty',
                title: 'Skiva Quick&Dirty'
            }       
    },
    {
        name: 'Baltic Depression (7")',
        category: 'Musik',
        price: 120,
        rating: 5,
        amount: 0,
        image: {
                src: 'assets/baltic04-300x300-square.jpg',
                alt: 'Skiva Baltic Depresssion',
                title: 'Skiva Baltic Depresssion'
            }       
    },
    {
        name: 'Good Television (7")',
        category: 'Musik',
        price: 120,
        rating: 5,
        amount: 0,
        image: {
                src: 'assets/goodtv_cover-300x300-square.jpg',
                alt: 'Skiva Baltic Depresssion',
                title: 'Skiva Baltic Depresssion'
            }       
    },
    {
        name: 'Tavla (signerad)',
        category: 'Konst',
        price: 1500,
        rating: 4.0,
        amount: 0,
        image: {
                src: 'assets/dogmen_tavla-300x300-square.jpg',
                alt: 'The Dogmen-affisch',
                title: 'Quick&Dirty'
            }       
    }
];


const prodContainer = document.querySelector('#productContainer');
const cartContainer = document.querySelector('#cartContainer');

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id
    if (products[index].amount > 0) {
    products[index].amount -= 1;
    printProducts();
    printCartProducts();
    }
};


function increaseAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount += 1;
    printProducts();
};  

function resetAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount = 0;
    //printProducts();
    printCartProducts();
    console.log(index);
}; 
    


function printProducts() {
    prodContainer.innerHTML = ''; //töm dokument

    for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const amount = product.amount;

    if (amount > 3) {
        console.log('hej');
    }

    const sum = amount * product.price;

    //Rating
    const productRating = product.rating;
    const productRatingSuffix = productRating * 10;
    
    prodContainer.innerHTML += `
        <article>
        <img class="productImage" src="${product.image.src}" alt="${product.image.alt}" width="300" height="300" loading="lazy" >
        <h3 class="productName">${product.name}</h3>
        <p class="productCategory"><span>Kategori: </span>${product.category}</p>
        <h4 class=productPrice><span>Pris: </span>${product.price}:-</h4>
        <div class="amountContainer">
            <button data-id="${i}" class="minus material-symbols-outlined">indeterminate_check_box</button>            
            <button data-id="${i}" class="plus material-symbols-outlined">add_box</button>
        </div>
        <p class="amount">${amount + ' st' + ' ' + sum}:-</p>
        ${/*Add class suffix for styling of stars*/''}
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

    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus'); 

    minusButtons.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);    
    });

    plusButtons.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });

    printCartProducts();

};

function printCartProducts() {
    cartContainer.innerHTML = '';
    
    let footerSum = 0;
    let footerAmount = 0;
    
    products.forEach((product, j) => {
        if (product.amount > 0) {
            const amount = product.amount;
            const sum = amount * product.price;
            footerSum += sum;
            footerAmount += amount;
            cartContainer.innerHTML += `
            <article class="cartRow">
                <h4>${product.name}</h4>
                <div class="cartAmountContainer">
                    <button data-id="${j}" class="cartMinus material-symbols-outlined">indeterminate_check_box</button>            
                    <p class="amount">${amount + ' st'}</p>
                    <button data-id="${j}" class="cartPlus material-symbols-outlined">add_box</button>
                </div>
                <p class=productPrice><span>Pris: </span>${product.price}:-</p>
                <p class="sum"><span>Delsumma: </span> ${sum}:-</p>
                <button data-id="${j}" class="cartDelete material-symbols-outlined">cancel</button>
            </article>
            ` 
        }
    });
    const cartFooterAmount  = document.querySelector('#cartFooterAmount');
    const cartFooterSum = document.querySelector('#cartFooterSum');

    cartFooterAmount.innerHTML = footerAmount;
    cartFooterSum.innerHTML = footerSum;


    const cartMinusButtons = document.querySelectorAll('.cartMinus');
    const cartPlusButtons = document.querySelectorAll('.cartPlus'); 
    const cartDeleteButtons = document.querySelectorAll('.cartDelete')

    cartMinusButtons.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);    
    });

    cartPlusButtons.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });

    cartDeleteButtons.forEach(btn => {
        btn.addEventListener('click', resetAmount);
    });

}

printProducts();
