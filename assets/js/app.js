/* ==========================================
SabzAbi Store
Main JavaScript V1
========================================== */

"use strict";

/* ==========================
Current Year
========================== */

const yearElement = document.getElementById("year");

if(yearElement){

yearElement.textContent =
new Date().getFullYear();

}

/* ==========================
Back To Top
========================== */

const backTop =
document.querySelector(".back-to-top");

window.addEventListener("scroll",()=>{

if(!backTop) return;

if(window.scrollY>350){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

if(backTop){

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/* ==========================
Sticky Header Effect
========================== */

const header =
document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(!header) return;

if(window.scrollY>40){

header.style.boxShadow =
"0 12px 35px rgba(0,0,0,.12)";

}else{

header.style.boxShadow =
"0 5px 18px rgba(0,0,0,.08)";

}

});

/* ==========================
Smooth Anchor
========================== */

document.querySelectorAll('a[href^="#"]')

.forEach(link=>{

link.addEventListener("click",function(e){

const target =
document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================
Fade Animation On Scroll
========================== */

const fadeElements =
document.querySelectorAll(

".product-card,.counter-box,.mission-card,.why-card,.faq-item,.contact-info,.contact-form"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},

{

threshold:.15

}

);

fadeElements.forEach(item=>{

observer.observe(item);

});

/* ==========================
Contact Form Validation
========================== */

const form =
document.querySelector("form");

if(form){

form.addEventListener(

"submit",

function(e){

e.preventDefault();

const required =
form.querySelectorAll(

"[required]"

);

let valid = true;

required.forEach(input=>{

if(

input.value.trim()===""

){

valid=false;

input.style.borderColor="#ef4444";

}else{

input.style.borderColor="#16a34a";

}

});

if(valid){

alert(

"پیام شما با موفقیت ثبت شد. از تماس شما سپاسگزاریم."

);

form.reset();

}

}

);

}

/* ==========================
Image Hover Effect
========================== */

document

.querySelectorAll(".product-card img")

.forEach(img=>{

img.addEventListener(

"mouseenter",

()=>{

img.style.transform="scale(1.05)";

img.style.transition=".35s";

}

);

img.addEventListener(

"mouseleave",

()=>{

img.style.transform="scale(1)";

}

);

});

/* ==========================
Mobile Navigation
========================== */

const menuButton =
document.querySelector(".menu-toggle");

const navigation =
document.querySelector("nav");

if(menuButton && navigation){

menuButton.addEventListener("click",()=>{

navigation.classList.toggle("open");

menuButton.classList.toggle("active");

});

}

/* ==========================
Loading Animation
========================== */

window.addEventListener("load",()=>{

const loader =
document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});

/* ==========================
Product Search
========================== */

const searchInput =
document.getElementById("searchProduct");

const categoryFilter =
document.getElementById("categoryFilter");

const cards =
document.querySelectorAll(".product-card");

function filterProducts(){

if(!searchInput || !categoryFilter) return;

const keyword =
searchInput.value.toLowerCase();

const category =
categoryFilter.value;

cards.forEach(card=>{

const title =
card.querySelector("h3")
.textContent.toLowerCase();

const type =
card.dataset.category;

const show =

title.includes(keyword) &&

(category==="all" ||

type===category);

card.style.display =

show ? "block" : "none";

});

}

if(searchInput){

searchInput.addEventListener(

"keyup",

filterProducts

);

}

if(categoryFilter){

categoryFilter.addEventListener(

"change",

filterProducts

);

}

/* ==========================
Console Message
========================== */

console.log(

"%cSabzAbi Store V1 Ready 🚀",

"color:#0f766e;font-size:16px;font-weight:bold;"

);

/* ==========================
End JavaScript
================================ */