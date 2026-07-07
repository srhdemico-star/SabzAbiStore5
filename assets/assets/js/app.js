/* =====================================
SabzAbi Store V2
Main JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

if (window.scrollY > 30) {

header.classList.add("scrolled");

} else {

header.classList.remove("scrolled");

}

});

/* ==========================
Back To Top
========================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

if (window.scrollY > 400) {

topButton.classList.add("show");

} else {

topButton.classList.remove("show");

}

});

topButton.addEventListener("click", () => {

window.scrollTo({

top:0,

behavior:"smooth"

});

});

});

/* ==========================
Live Product Search
========================== */

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

const desc=card.querySelector("p").innerText.toLowerCase();

if(title.includes(value) || desc.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ==========================
Wishlist
========================== */

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach((button,index)=>{

const key = "wishlist_" + index;

if(localStorage.getItem(key)==="true"){

button.classList.add("active");

button.innerHTML="❤";

}

button.addEventListener("click",()=>{

button.classList.toggle("active");

if(button.classList.contains("active")){

button.innerHTML="❤";

localStorage.setItem(key,"true");

}else{

button.innerHTML="♡";

localStorage.removeItem(key);

}

});

});

/* ==========================
Contact Form Validation
========================== */

const contactForm = document.querySelector(".contact-form form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const inputs=this.querySelectorAll("input, textarea");

let valid=true;

inputs.forEach(input=>{

if(input.hasAttribute("required") && input.value.trim()===""){

input.style.border="2px solid #ef4444";

valid=false;

}else{

input.style.border="1px solid #d1d5db";

}

});

if(valid){

alert("✅ پیام شما با موفقیت ثبت شد.");

this.reset();

}

});

}


/* ==========================
Product Gallery
========================== */

const mainImage = document.querySelector(".product-gallery > img");

const thumbnails = document.querySelectorAll(".thumbs img");

if (mainImage && thumbnails.length > 0) {

    thumbnails.forEach((thumb) => {

        thumb.addEventListener("click", () => {

            // تغییر عکس اصلی
            mainImage.src = thumb.src;

            // حذف کلاس active از همه
            thumbnails.forEach((t) => {
                t.classList.remove("active");
            });

            // فعال کردن عکس انتخاب شده
            thumb.classList.add("active");

        });

    });

}

/* ==========================
Animation On Scroll
========================== */

const animatedItems = document.querySelectorAll(

".feature-card,.product-card,.category-card,.counter-box,.highlight-card"

);

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:0.15

});

animatedItems.forEach(item=>{

observer.observe(item);

});


/* ==========================
Counter Animation
========================== */

const counters=document.querySelectorAll(".counter-box h2");

counters.forEach(counter=>{

const updateCounter=()=>{

const target=parseInt(counter.innerText);

const current=+counter.getAttribute("data-count")||0;

const increment=Math.ceil(target/80);

if(current<target){

const value=current+increment;

counter.setAttribute("data-count",value);

counter.innerText=value+"+";

requestAnimationFrame(updateCounter);

}else{

counter.innerText=target+"+";

}

};

updateCounter();

});


/* ==========================
Console
========================== */

console.log(

"SabzAbi Store V2 Loaded Successfully 🚀"

);

