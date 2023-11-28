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
    printProducts();
    printCartProducts();
}; 
    
/**
 * Produkter
 */

function printProducts() {
    prodContainer.innerHTML = ''; //töm dokument

    for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const amount = product.amount;
    let price = product.price;
    
    

    /*Osynligt helgpåslag 15% mellan fredag 15.00 och 02.59 måndagar*/
    const today = new Date();
    const hours = today.getHours();
    const day = today.getDay();

    if (hours >= 11 && hours < 16 && day == 2) {
        price = price * 11.5/10; 
    }  

    //let sum = amount * product.price;
    let sum = amount * price;
    /*Mängdrabatt 10% vid 10 eller fler/vara*/
    if (amount > 9) {
        sum = sum * 0.9; //10% discount
    }

    //Rating
    const productRating = product.rating;
    const productRatingSuffix = productRating * 10;
    
    prodContainer.innerHTML += `
        <article>
        
        <img class="productImage" src="${product.image.src}" alt="${product.image.alt}" width="300" height="300" loading="lazy" >
        <h3 class="productName">${product.name}</h3>
        <p class="productCategory"><span>Kategori: </span>${product.category}</p>
        <h4 class=productPrice><span>Pris: </span>${price}:-</h4>
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

/**
 * Varukorg
 */

function printCartProducts() {
    cartContainer.innerHTML = '';
    
    let footerSum = 0;
    let footerAmount = 0;
    
    products.forEach((product, j) => {
        if (product.amount > 0) {
            const amount = product.amount;

            let price = product.price;

            /*Osynligt helgpåslag 15% mellan fredag 15.00 och 02.59 måndagar*/
            const today = new Date();
            const hours = today.getHours();
            const day = today.getDay();

        if (hours >= 11 && hours < 16 && day == 2) {
            price = price * 11.5/10; 
        } 

            /*Mängdrabatt 10% vid 10 eller fler/vara*/
            let sum = amount * price;
            if (amount > 9) {
                sum = sum * 0.9; //10% discount    
            }

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
                <p class=productPrice><span>Pris: </span>${price}:-</p>
                <p class="sum"><i class="discount"></i><span>Delsumma: </span> ${sum}:-</p>
                <button data-id="${j}" class="cartDelete material-symbols-outlined">cancel</button>
                
            </article>
            ` 
            /*Rabatt-text*/
            const discount = document.querySelector('.discount');
            if (amount > 9) {
                discount.innerHTML += ' Rabatt 10%! ';   
            }
             
        }
        
    });
    const cartFooterAmount  = document.querySelector('#cartFooterAmount');
    const cartFooterSum = document.querySelector('#cartFooterSum');
    const cartFooterDiscount = document.querySelector('#cartFooterDiscount')
    const cartFooterShipFee = document.querySelector('#cartFooterShipFee');
    const cartFooterSumTot = document.querySelector('#cartFooterSumTot');

    cartFooterAmount.innerHTML = footerAmount;
    cartFooterSum.innerHTML = footerSum;

/*Rabatt 10% mellan 3.00 och 10.00 måndagar*/
    const today = new Date();
    const hours = today.getHours();
    const day = today.getDay();

    if (hours >= 11 && hours < 16 && day == 2) {
        cartFooterDiscount.innerHTML = footerSum * 0.1;
        footerSum = footerSum * 0.9;    
    }

/*Mängdrabatt*/
    if (footerAmount > 0 && footerAmount < 15) {
        console.log(footerSum);
        cartFooterShipFee.innerHTML = footerSum * 1/10 + 25;
        footerSum = footerSum * 11/10 + 25;
    } else {
        cartFooterShipFee.innerHTML = 0;
    }

/*Totalsumma*/
    cartFooterSumTot.innerHTML = footerSum;


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



