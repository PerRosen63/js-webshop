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

/*Timeout 15min*/
/* let timeOut = setTimeout(customerMsg, 1000 * 60 * 15);

function customerMsg() {
    alert('Tiden har gått ut! Du måste börja om.');
    location.reload();
} */

/**
 * Sort
 */
const selectProduct = document.querySelector('#sort');

selectProduct.addEventListener('change', sortProduct);

function sortProduct() {
    if (selectProduct.value === 'produkt') {
        const sorted = products.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
    }
    if (selectProduct.value === 'kategori') {
        const sorted = products.sort((a, b) => {
            if (a.category < b.category) {
              return -1;
            }
            if (a.category > b.category) {
              return 1;
            }
            return 0;
          });
    }
    if (selectProduct.value === 'pris') {
        products.sort((product1, product2) =>
        product1.price - product2.price
        );
    }
    if (selectProduct.value === 'betyg') {
        products.sort((product1, product2) =>
        product2.rating - product1.rating
        );     
    }
    console.table(products);
    printProducts();
}; 

/*Minus-knapp*/

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id
    if (products[index].amount > 0) {
    products[index].amount -= 1;
    printProducts();
    printCartProducts();
    }
};

/*Plus-knapp*/

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount += 1;
    printProducts();
};  

/*Ta bort artikel från varukorg*/

function resetAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount = 0;
    printProducts();
    printCartProducts();
}; 
    
/**
 * Produktutskrift
 */

function printProducts() {
    prodContainer.innerHTML = ''; //töm dokument

    for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const amount = product.amount;
    let price = product.price;
    
    /*refaktorera kod se Munkshop3 - Specialregler YT 15min !!!*/

    /*Osynligt helgpåslag 15% mellan fredag 15.00 och 02.59 måndagar*/
    const today = new Date();
    const hours = today.getHours();
    const day = today.getDay();

    if ((day == 0 && hours >= 15) || (day == 1) || (day == 2) || (day == 3 && hours <= 3))  {
            price = Math.round(price * 11.5/10); 
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
        <p class="amount">${amount + ' st' + ' ' + Math.round(sum)}:-</p>
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

            if ((day == 0 && hours >= 15) || (day == 1) || (day == 2) || (day == 3 && hours <= 3))  {
                price = Math.round(price * 11.5/10); 
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
                <p class="sum"><i class="discount">${amount > 9 ? ' Rabatt 10%! ' : ''}</i><span>Delsumma: </span> ${Math.round(sum)}:-</p>
                <button data-id="${j}" class="cartDelete material-symbols-outlined">cancel</button>
                
            </article>
            `             
        }
        
    });
    const cartFooterAmount  = document.querySelector('#cartFooterAmount');
    const cartIconCircle = document.querySelector('#cartIconCircle');
    const cartFooterSum = document.querySelector('#cartFooterSum');
    const cartIconSum = document.querySelector('#cartIconSum');
    const cartFooterDiscount = document.querySelector('#cartFooterDiscount')
    const cartFooterShipFee = document.querySelector('#cartFooterShipFee');
    const cartFooterSumTot = document.querySelector('#cartFooterSumTot');

    cartFooterAmount.innerHTML = footerAmount;
    cartIconCircle.innerHTML = footerAmount;
    cartFooterSum.innerHTML = Math.round(footerSum);
    cartIconSum.innerHTML = Math.round(footerSum);

/*Rabatt 10% mellan 3.00 och 10.00 måndagar*/
    const today = new Date();
    const hours = today.getHours();
    const day = today.getDay();

    if (hours >= 11 && hours < 18 && day == 2) {
        cartFooterDiscount.innerHTML = Math.round(footerSum * 0.1);
        footerSum = footerSum * 0.9;    
    }

/*Gratis frakt*/
    if (footerAmount > 0 && footerAmount < 15) {
        console.log(footerSum);
        cartFooterShipFee.innerHTML = Math.round(footerSum * 1/10 + 25);
        footerSum = footerSum * 11/10 + 25;
    } else {
        cartFooterShipFee.innerHTML = 0;
    }

/*Totalsumma*/
    cartFooterSumTot.innerHTML = Math.round(footerSum);


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


/**
 * Form
 */

/* Variables */
const fName = document.querySelector('#fname');
const lName = document.querySelector('#lname');
const address = document.querySelector('#address');
const postNumber = document.querySelector('#postnumber');
const city = document.querySelector('#postort');
const portCode = document.querySelector('#portkod');
const phoneNumber = document.querySelector('#tel');
const eMail = document.querySelector('#email');

const radioInvoiceCard = document.querySelectorAll('input[name="payoption"]'); //Payment option
const invoiceOption = document.querySelector('#persNumber'); //Payment option
const cardOption = document.querySelector('#cardNumber'); //Payment option
const personalId = document.querySelector('#persNumberInput'); //Payment option

const checkOne = document.querySelector('#checkone');
const checkTwo = document.querySelector('#checktwo');
const discountCode = document.querySelector('#discountCode');
const sendBtn = document.querySelector('#submitBtn');




// Warnings
const warningfName = document.querySelector('#fname span');
const warningPersNumber = document.querySelector('#persNumber span');


//Toggles between invoice or card payment options

radioInvoiceCard.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPayment)
});

function switchPayment() {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');
}

/* Event listeners */

fName.addEventListener('change', activateButton);
fName.addEventListener('focusout', activateButton);
personalId.addEventListener('change', activateButton);
personalId.addEventListener('focusout', activateButton);

/* Regex check */
const fNameRegEx = new RegExp(/^[a-zA-Z\u0080-\u00FF]+$/);
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);

function checkfName() {
    return fNameRegEx.exec(fName.value);
};
function checkPersonalId() {
    return personalIdRegEx.exec(personalId.value);
};

/**
 * Activate button if fields are correct
 */

function activateButton () {

/*Validate persnr*/

    sendBtn.setAttribute('disabled', '');

    if (checkfName() === null) {
        console.log('hej');
        warningfName.innerHTML = 'Felaktigt namn!';
        return;
    } else {
        warningfName.innerHTML = '';
    }
  /*   if (checkPersonalId() === null) {
        warningPersNumber.innerHTML = 'Felaktigt personnummer!';
        return;
    } else {
        warningPersNumber.innerHTML = '';
    } */

    sendBtn.removeAttribute('disabled');
};


