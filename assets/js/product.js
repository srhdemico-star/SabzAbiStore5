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

   breadcrumbProduct.style.color = "red";
breadcrumbProduct.style.fontWeight = "900";

}

/* ==============================
   Long Description
============================== */

const descriptionTab = document.querySelector("#description p");

if (descriptionTab) {

    descriptionTab.textContent = product.description;

}
