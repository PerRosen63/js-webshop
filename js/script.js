'use strict';

/**
 * Product object array
 */

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


/* Variables */

const prodContainer = document.querySelector('#productContainer'); //products container
const cartContainer = document.querySelector('#cartContainer'); //cart container

const sendBtn = document.querySelector('#submitBtn'); //send button


/**
 * Timeout 15min inactivity
 */

let timeOut = setTimeout(customerMsg, 1000 * 60 * 15);

function customerMsg() {
    alert('Tiden har gått ut! Du måste börja om.');
    location.reload();
}

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

/**
 * Background effect on plus minus delete
 */

function effect() {
    cartContainer.animate({backgroundColor:['#ff0000', '#000000']},{duration:800,fill:'forwards'});
}

/*Minus button product and cart*/

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id
    if (products[index].amount > 0) {
    products[index].amount -= 1;
    effect();
    printProducts();
    printCartProducts();
    }
};

/*Plus button product and cart*/

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount += 1;
    effect();
    printProducts();
};  

/*Remove from cart button*/

function resetAmount(e) {
    const index = e.currentTarget.dataset.id
    products[index].amount = 0;
    effect();
    printProducts();
    printCartProducts();
}; 


/**
 *Toggles between invoice or card payment options
 */

const radioInvoiceCard = document.querySelectorAll('input[name="payoption"]'); //Payment option radio buttons
const invoiceOption = document.querySelector('#persNumberOption'); //Payment option invoice div
const cardOption = document.querySelector('#cardNumberOption'); //Payment option card div

let selectedPaymentOption = 'card'; //default

radioInvoiceCard.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPayment);
});

function switchPayment(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');
    
    selectedPaymentOption = e.target.value;
} 

  
/**
 * Product print
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

    if ((day == 5 && hours >= 15) || (day == 6) || (day == 0) || (day == 1 && hours <= 3))  {
            price = Math.round(price * 11.5/10); 
        } 

    /*Sum variable*/

    let sum = amount * price;

    /*Mängdrabatt 10% vid 10 eller fler/vara*/
    if (amount > 9) {
        sum = sum * 0.9; //10% discount
    }

    /*Rating*/

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
 * Cart
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

            if ((day == 5 && hours >= 15) || (day == 6) || (day == 0) || (day == 1 && hours <= 3))  {
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
    const cartFooterDiscountCode = document.querySelector('#cartFooterDiscountCode');
    const cartFooterSumTot = document.querySelector('#cartFooterSumTot');

    cartFooterAmount.innerHTML = footerAmount;
    cartIconCircle.innerHTML = footerAmount;
    cartFooterSum.innerHTML = Math.round(footerSum);
    cartIconSum.innerHTML = Math.round(footerSum);

/*Rabatt 10% mellan 4.00 och 10.00 måndagar*/
    const today = new Date();
    const hours = today.getHours();
    const day = today.getDay();

    if (hours >= 4 && hours < 10 && day == 1) {
        cartFooterDiscount.innerHTML = Math.round(footerSum * 0.1);
        footerSum = footerSum * 0.9;    
    } else {
        cartFooterDiscount.innerHTML = 0;
    }

/*Gratis frakt*/
    if (footerAmount > 0 && footerAmount < 15) {
        cartFooterShipFee.innerHTML = Math.round(footerSum * 1/10 + 25);
        footerSum = footerSum * 11/10 + 25;
    } else {
        cartFooterShipFee.innerHTML = 0;
    }

/*Rabattkod*/
    const discountCode = document.querySelector('#discountcode'); 
            
        if (discountCode.value === 'rabatt') {
            cartFooterDiscountCode.innerHTML = '5% ' + Math.round(footerSum * 0.05);    
            footerSum = footerSum * 0.95;
        }   else {
            cartFooterDiscountCode.innerHTML = 0;
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

    /*Inaktivera Faktura över 800:-*/

    const invoiceOption = document.querySelector('#persNumberOption'); //Payment option invoice div
    const personalId = document.querySelector('#persNumberInput'); //personal number
    const radioBtnInvoice = document.querySelector('#invoice');

    if (footerSum > 801) {
        radioBtnInvoice.disabled = true;
        personalId.disabled = true;
    } else {
        radioBtnInvoice.disabled = false;
        personalId.disabled = false;
    } 

    /**
     * Order button and confirmation of order
     */

    const confSection = document.querySelector('#confSection');
    sendBtn.addEventListener('click', sendOrder);

    const confSumTot = document.querySelector('#confSumTot');
    const confAmount = document.querySelector('#confAmount');

    function sendOrder() {
        confSection.classList.remove('hidden');
    
        const fNameValue = fName.value;
        const confName = document.querySelector('#foreName');
        confName.innerHTML = fNameValue;
        confAmount.innerHTML = footerAmount;
        confSumTot.innerHTML = Math.round(footerSum);
    }

}

/**
 * Lägg till rabatt
 */
    const discountBtn = document.querySelector('#discountBtn');

    discountBtn.addEventListener('click', discountInput);

    function discountInput() {
        printCartProducts();
    };

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

const personalId = document.querySelector('#persNumberInput'); //personal number

const cardNumber = document.querySelector('#cardNumberInput'); //card number
const cardMonthYear = document.querySelector('#monthyear'); //month/year
const cardCvc = document.querySelector('#cvc'); //cvc

const checkOne = document.querySelector('#checkone');
const checkTwo = document.querySelector('#checktwo');

// Warnings
const warningfName = document.querySelector('#fNameWarning');
const warninglName = document.querySelector('#lNameWarning');
const warningAddress = document.querySelector('#addressWarning');
const warningPostNumber = document.querySelector('#postNumberWarning');
const warningCity = document.querySelector('#cityWarning');
const warningPortCode = document.querySelector('#portcodeWarning');
const warningPhone = document.querySelector('#phoneWarning');
const warningEmail = document.querySelector('#emailWarning');

const warningPersNumber = document.querySelector('#persNumberOption span');//Invoice
const warningCardNumber = document.querySelector('#cardNumberOption span');//Card
const warningCardMonthYear = document.querySelector('#monthyear span');//Card
const warningCardCvc = document.querySelector('#cvc+span');//Card


/* Event listeners to activate order button */

fName.addEventListener('input', activateButton);
lName.addEventListener('input', activateButton);
address.addEventListener('input', activateButton);
postNumber.addEventListener('input', activateButton);
city.addEventListener('input', activateButton);
portCode.addEventListener('input', checkPortCode); // not required
phoneNumber.addEventListener('input', activateButton);
eMail.addEventListener('input', activateButton);

personalId.addEventListener('input', activateButton);//Invoice persnr
cardNumber.addEventListener('input', activateButton);//Card nr
//cardMonthYear.addEventListener('input', activateButton);//Card MonthYear
cardCvc.addEventListener('input', activateButton);//Card cvc
checkOne.addEventListener('click', activateButton ); //agree box

/* Regex check */
const nameRegEx = new RegExp(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/); //check Förnamn Efternamn Postort
const addressRegEx = new RegExp(/[A-Za-z\u0080-\uFFFF -]{2,}/); //check address
const postNumberRegEx = new RegExp(/^\d{3} \d{2}$/); //check postnumber
const portCodeRegEx = new RegExp(/^[0-9]+$/); //Number only - port code
const phoneNumberRegEx = new RegExp(/^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/); //check phonenumber
const eMailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); //check emailaddress

const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/); //Check Personnummer
const cardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); //Check Mastercard


function checkfName() {
    return nameRegEx.exec(fName.value);    
};
function checklName() {
    return nameRegEx.exec(lName.value);    
};
function checkAddress() {
    return addressRegEx.exec(address.value);    
};
function checkPostNumber() {
    return postNumberRegEx.exec(postNumber.value);    
};
function checkCity() {
    return nameRegEx.exec(city.value);    
};


/*Port code not required*/
function checkPortCode() {
    portCodeRegEx.exec(portCode.value);    
    console.log(portCodeRegEx.exec(portCode.value));
    if (portCodeRegEx.exec(portCode.value) === null) {
        warningPortCode.innerHTML = 'Felaktig portkod!'; 
    }  else {
        warningPortCode.innerHTML = '';  
    }  
    
};

/* if (checkPortCode() === null ) {
    if (portCode.value !== '') {
        warningPortCode.innerHTML = 'Felaktig portkod!';
    }        
} else {
    warningPortCode.innerHTML = '';  
}; */



/****************************************************/

function checkPhoneNumber() {
    return phoneNumberRegEx.exec(phoneNumber.value);    
};
function checkEmail() {
    return eMailRegEx.exec(eMail.value);    
};

function checkPersonalId() {
    return personalIdRegEx.exec(personalId.value);
};
function checkCardNumber() {
    return cardNumberRegEx.exec(cardNumber.value);
};

/**
 * Activate button if fields are correct
 */

function activateButton () {

    sendBtn.setAttribute('disabled', '');

    let hasErrors = false;

    if (!checkfName() ) {
        hasErrors = true;
        if (fName.value !== '') {
        warningfName.innerHTML = 'Felaktigt förnamn!';
        }
    } else {
        warningfName.innerHTML = '';  
    }

    if (!checklName() ) {
        hasErrors = true;
        if (lName.value !== '') {
            warninglName.innerHTML = 'Felaktigt efternamn!';
        }        
    } else {
        warninglName.innerHTML = '';  
    }

    if (!checkAddress() ) {
        hasErrors = true;
        if (address.value !== '') {
            warningAddress.innerHTML = 'Felaktig adress!';
        }        
    } else {
        warningAddress.innerHTML = '';  
    }

    if (!checkPostNumber() ) {
        hasErrors = true;
        if (postNumber.value !== '') {
            warningPostNumber.innerHTML = 'Felaktigt postnummer!';
        }        
    } else {
        warningPostNumber.innerHTML = '';  
    }

    if (!checkCity() ) {
        hasErrors = true;
        if (city.value !== '') {
            warningCity.innerHTML = 'Felaktigt ortnamn!';
        }        
    } else {
        warningCity.innerHTML = '';  
    }

    /*  if (!checkPortCode() ) {
        hasErrors = true;
        if (portCode.value !== '') {
            warningPortCode.innerHTML = 'Felaktig portkod!';
        }        
    } else {
        warningPortCode.innerHTML = '';  
    }*/

    if (!checkPhoneNumber() ) {
        hasErrors = true;
        if (phoneNumber.value !== '') {
            warningPhone.innerHTML = 'Felaktigt telefonnummer!';
        }        
    } else {
        warningPhone.innerHTML = '';        
    }

    if (!checkEmail() ) {
        hasErrors = true;
        if (eMail.value !== '') {
            warningEmail.innerHTML = 'Felaktig e-postadress!';
        }        
    } else {
        warningEmail.innerHTML = '';        
    } 

    if (selectedPaymentOption === 'invoice') {
        sendBtn.setAttribute('disabled', '');
        if (!checkPersonalId() ) {
            hasErrors = true;
            if (personalId.value !== '') {
                warningPersNumber.innerHTML = 'Felaktigt personnummer!';
            }        
        } else {
            warningPersNumber.innerHTML = '';        
        }  
    }  

    if (selectedPaymentOption === 'card') {
        if (!checkCardNumber() ) {
            hasErrors = true;
            if (cardNumber.value !== '') {
                warningCardNumber.innerHTML = 'Felaktigt kortnummer!';
            }        
        } else {
            warningCardNumber.innerHTML = '';        
        }
        if (cardCvc.value.length !== 3) {
            hasErrors = true;
            if (cardCvc.value !== '') {
                warningCardCvc.innerHTML = 'Felaktigt CVC-nummer!';
            } 
        } else {
            warningCardCvc.innerHTML = '';        
        }
    }
    if (!hasErrors && checkOne.checked) {
        sendBtn.removeAttribute('disabled');
    }
};

/**
 * Reset buttons
 */

const resetBtn = document.querySelector('#resetBtn');
const closeConf = document.querySelector('#closeConf');

resetBtn.addEventListener('click', resetPage);
closeConf.addEventListener('click', resetPage);

function resetPage() {
    window.scrollTo(0, 0);
    location.reload();
};

/**
 * Footer year
 */

document.querySelector('#year').innerHTML = new Date().getFullYear();


