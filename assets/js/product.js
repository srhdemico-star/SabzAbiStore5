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
