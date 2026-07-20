/* ======================================
   SabzAbi Store
   Product.js
====================================== */

"use strict";

/* گرفتن id از آدرس */

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

/* پیدا کردن محصول */

const product = PRODUCTS.find(item => item.id === productId);

/* اگر محصول نبود */

if (!product) {

    document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-size:28px;
            font-family:Vazirmatn;
        ">
            محصول پیدا نشد
        </div>
    `;

    throw new Error("Product Not Found");

}

/* ==============================
   انتخاب المنت‌های صفحه
============================== */

const title = document.querySelector(".product-title");

const brand = document.querySelector(".product-brand");

const image = document.querySelector("#mainProductImage");

const newPrice = document.querySelector(".new-price");

const description = document.querySelector(".short-description");

/* ==============================
   نمایش اطلاعات محصول
============================== */

document.title = product.name + " | SabzAbi Store";

title.textContent = product.name;

brand.textContent = product.brand;

image.src = product.image;

image.alt = product.name;

newPrice.textContent = product.price + " تومان";

description.textContent = product.description;

/* ==============================
   Breadcrumb
============================== */

const breadcrumbProduct = document.querySelector("#breadcrumbProduct");

if (breadcrumbProduct) {

    breadcrumbProduct.textContent = product.name;


}


/* ==============================
   Related Products
============================== */

const relatedContainer = document.querySelector("#relatedProducts");

if (relatedContainer) {

    const relatedProducts = PRODUCTS
        .filter(item => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    relatedContainer.innerHTML = "";

    relatedProducts.forEach(item => {

        relatedContainer.innerHTML += `

        <div class="product-card">

            <img src="${item.image}" alt="${item.name}" loading="lazy">

            <h3>${item.name}</h3>

            <p class="price">${item.price} تومان</p>

            <a href="product.html?id=${item.id}" class="btn-small">

                مشاهده محصول

            </a>

        </div>

        `;

    });

}

/* ======================================
   Quantity
====================================== */

const quantityInput = document.getElementById("quantity");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

if (quantityInput && plusBtn && minusBtn) {

    plusBtn.addEventListener("click", () => {

        quantityInput.value = Number(quantityInput.value) + 1;

    });

    minusBtn.addEventListener("click", () => {

        if (Number(quantityInput.value) > 1) {

            quantityInput.value = Number(quantityInput.value) - 1;

        }

    });

}


/* ======================================
   Quantity Controls
====================================== */

const quantityInput = document.getElementById("quantity");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

if (quantityInput && plusBtn && minusBtn) {

    plusBtn.addEventListener("click", () => {

        let value = parseInt(quantityInput.value, 10) || 1;
        quantityInput.value = value + 1;

    });

    minusBtn.addEventListener("click", () => {

        let value = parseInt(quantityInput.value, 10) || 1;

        if (value > 1) {
            quantityInput.value = value - 1;
        }

    });

    quantityInput.addEventListener("change", () => {

        let value = parseInt(quantityInput.value, 10);

        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        }

    });

}


/* ======================================
   Add To Cart (LocalStorage)
====================================== */

const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const cartItem = {

            id: product.id,

            name: product.name,

            brand: product.brand,

            image: product.image,

            price: product.price,

            color: selectedColor || product.color,

            storage: selectedStorage || "512GB",

            quantity: parseInt(quantityInput.value, 10)

        };

        const existingItem = cart.find(item =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.storage === cartItem.storage
        );

        if (existingItem) {

            existingItem.quantity += cartItem.quantity;

        } else {

            cart.push(cartItem);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        showToast("✅ محصول به سبد خرید اضافه شد.");

        console.log(cart);

    });

}

/* ======================================
   Toast
====================================== */

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerHTML = `<span>${message}</span>`;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ======================================
   Buy Now
====================================== */

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {

    buyNowBtn.addEventListener("click", () => {

        let cart = [];

        const item = {

            id: product.id,

            name: product.name,

            brand: product.brand,

            image: product.image,

            price: product.price,

            quantity: parseInt(quantityInput.value, 10)

        };

        cart.push(item);

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "cart.html";

    });

}

