let carts = document.querySelectorAll(".add-cart");

let deleteButton = document.body.querySelectorAll("delete")

let news = document.getElementById('news');

//Allows Bootstrap popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})
 
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


//Hidden optons for site
$('#emailError').hide();
let hidden = document.getElementsByClassName('.hiddenBasketWarning')
let hiddenDiv = document.getElementsByClassName('.hideOptions')
$(".hiddenBasketWarning").hide();
$("#hideOptions").hide();


//Products array contains products for sale in indivdual objects
let products = [
   {
      name: "Nike Shoes",
      tag: "jonathan-borba-zfPOelmDc-M-unsplash.jpg",
      price: 15,
      inCart: 0
   },
   {
      name: "Womens' Vest",
      tag: "wander-fleur-fSN3Q_imqrA-unsplash.jpg",
      price: 10,
      inCart: 0
   },
   {
      name: "Straps",
      tag: "bruce-mars-WGN6ZEFEZbs-unsplash.jpg",
      price: 20,
      inCart: 0
   },
   {
      name: "Gym Leggins",
      tag: "benjamin-klaver-zAtTuN6Ykok-unsplash.jpg",
      price: 40,
      inCart: 0
   },
   {
      name: "Think Bars",
      tag: "spenser-sembrat-RNrnTwC4Htg-unsplash.jpg",
      price: 12,
      inCart: 0
   },
   {
      name: "Crave Bars",
      tag: "the-organic-crave-company-gkjwrtieE98-unsplash.jpg",
      price: 14,
      inCart: 0
   },
   {
      name: "XL Bars",
      tag: "hybrid-storytellers-tLnNc1HVckE-unsplash.jpg",
      price: 14,
      inCart: 0
   },
   {
      name: "Hemp Oil",
      tag: "hempcrew-GnxiLNEkwuA-unsplash.jpg",
      price: 22,
      inCart: 0
   },
   {
      name: "Resistance Bands",
      tag: "kelly-sikkema-IZOAOjvwhaM-unsplash.jpg",
      price: 18,
      inCart: 0
   },
   {
      name: "KettleBell",
      tag: "heidi-erickson-CPSjcuuV8E8-unsplash.jpg",
      price: 40,
      inCart: 0
   },
   {
      name: "Weight Plates",
      tag: "victor-freitas-JbI04nYfaJk-unsplash.jpg",
      price: 50,
      inCart: 0
   },
   {
      name: "Dumbells",
      tag: "vd-photography-H-qxKCedhcc-unsplash.jpg",
      price: 28,
      inCart: 0
   }
   ,
   {
      name: "Huel Meal Replacment",
      tag: "joseph-greve-Tivp5fYe4Ng-unsplash.jpg",
      price: 18,
      inCart: 0
   },
   {
      name: "Nature Zen",
      tag: "nature-zen-awBT427pSKE-unsplash.jpg",
      price: 22,
      inCart: 0
   },
   {
      name: "94 Shake",
      tag: "edgar-chaparro-NBA8YVru_9E-unsplash.jpg",
      price: 30,
      inCart: 0
   }, {
      name: "CTRL Shake",
      tag: "ctrl-a-meal-replacement-03e4RajfFAE-unsplash.jpg",
      price: 40,
      inCart: 0
   },




];



//loops through cart buttons to add items to cart
for (let i = 0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
      cartNumber(products[i]);
      totalCost(products[i]);
   })
}

//gets items number of items in cart from localstorage
function onLoadCart() {
   let productNumber = localStorage.getItem('cartNumber');
   if (productNumber) {
      document.querySelector('.cart span').textContent = productNumber;

   }
}

//sets products in localStorage, with each item going into its own object
function setItems(products) {
   let cartItems = localStorage.getItem("inCartProducts")
   cartItems = JSON.parse(cartItems);
   console.log("my cart is", cartItems)

   if (cartItems != null) {
      if (cartItems[products.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [products.tag]: products
         }
      }
      cartItems[products.tag].inCart += 1;
   } else {
      products.inCart = 1
      cartItems = {
         [products.tag]: products
       }
   }
   localStorage.setItem("inCartProducts", JSON.stringify(cartItems))
   let span = document.getElementById("totalCost");
       let lsTotal = localStorage.getItem("totalCost");
console.log(lsTotal);
}


//check if products exists, if not ,set local storage
function cartNumber(products) {
   let productNumber = localStorage.getItem('cartNumber');
    productNumber = parseInt(productNumber);

   if (productNumber) {
      localStorage.setItem('cartNumber', productNumber + 1)
      document.querySelector('.cart span').textContent = productNumber + 1;
   } else {
      localStorage.setItem('cartNumber', 1)
      document.querySelector('.cart span').textContent = 1;
   }
   setItems(products)

}
//calcualtes total cost from localStorage, if it exists.
function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');

   console.log("the price is", product.price)
   console.log(typeof cartCost)


   if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price)
   } else {
      localStorage.setItem("totalCost", product.price)
   }
}


//Display cart products on cart page, from localStorage.
function displaycart() {
   let cartItems = localStorage.getItem("inCartProducts");
   cartItems = JSON.parse(cartItems);
   let lsTotal = localStorage.getItem("totalCost");
   let productContainer = document.querySelector(".products");
   let paymentContainer = document.querySelector(".paymentContainer");
   if (cartItems && productContainer) {

      Object.values(cartItems).map(item => {
         productContainer.innerHTML += ` <div> <div class="product"> 
         <img height="100px" width="100px" src = "images/${item.tag}">
         <span class class= "name"> ${item.name.substring(0, 10)} </span> 
         <span class="price"> $${item.price} </span>
         
         <span class="quantity">  ${item.inCart}  
         
         </span>
         
         <span>$${item.inCart * item.price}</span>
         
        </div>

        

         `;
      });

      productContainer.innerHTML += `
      <div class="basketTotalContainer"> 
      <h3 class="basketTotalTitle"> Basket Total</h3>
      <h4 class="basketTotal"> $${lsTotal} </h4>
      </div>
   
      `
 }

$('.hideThis').hide();
}

let getN = JSON.parse(localStorage.getItem("inCartProducts"));




//Initialies the empty cart Button, hiding elements from page and localStorage .
$(document).on('click', '.click', function (e) {
   console.log("clicked")
   $(this).parent().remove();
   localStorage.removeItem("cartNumber")
   localStorage.removeItem("totalCost")
   localStorage.removeItem("inCartProducts");
   window.location.reload();
})


if (localStorage.getItem("cartNumber") == null) {
   $(".products").hide();
   $(".click").hide();
   $(".paymentContainer").hide();
   $("#paypal").hide();
   $(".productsContainer").hide();
   $(".hiddenBasketWarning").show();
   $("#hideOptions").show();
}


//Ensures that a valid email address is entered in newletter sign up.
news.addEventListener('click', function() {
    
let emailField  = document.getElementById('emailField')
      console.log('clicked');
let email = emailField.value;
      if (email.indexOf( '@' && '.') > -1 ){
         
         $('#emailField').hide();
        $('#news').hide();
        let newsh1 = document.getElementById('newsh1');
        newsh1.innerHTML = "Youre now signed up!"
        $('#emailError').hide();

         
      }else{
         $('#emailError').show();
         }
       })

onLoadCart();
displaycart();


let totalPrice = JSON.parse(localStorage.getItem('totalCost'));
console.log(typeof (totalPrice))


//initialises the paypal buttons so a customer can pay
paypal.Buttons({

   createOrder: function (data, actions) {
      return actions.order.create({
         purchase_units: [{
            amount: {
               value: totalPrice,

            },
         }]
      })
   }
}).render('#paypal')



