"use strict";

/* ==========================================
   PRODUCTS PAGE
========================================== */

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

let currentProducts = [...PRODUCTS];

function renderProducts(list) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    list.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <span class="product-badge">ویژه</span>

            <button class="wishlist">❤</button>

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

            <div class="product-info">

                <div class="rating">
                    ★★★★★
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">

                    <span class="price-title">
                        شروع از
                    </span>

                    <span>
                        ${Number(product.price).toLocaleString("fa-IR")} تومان
                    </span>

                </div>

                <a href="product.html?id=${product.id}" class="btn-product">

                    مشاهده محصول

                </a>

            </div>

        </div>

        `;

    });

}

renderProducts(currentProducts);

/* ==========================================
   FILTER
========================================== */

function updateProducts() {

    let result = [...PRODUCTS];

    /* ---------- Search ---------- */

    if (searchInput && searchInput.value.trim() !== "") {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        result = result.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

        );

    }

    /* ---------- Category ---------- */

    if (categoryFilter && categoryFilter.value !== "all") {

        result = result.filter(product =>

            product.category === categoryFilter.value

        );

    }

    /* ---------- Sort ---------- */

    if (sortProducts) {

        switch (sortProducts.value) {

            case "cheap":

                result.sort((a, b) => a.price - b.price);

                break;

            case "expensive":

                result.sort((a, b) => b.price - a.price);

                break;

            case "new":

                result.sort((a, b) => b.id - a.id);

                break;

        }

    }

    renderProducts(result);

}

/* ==========================================
   Events
========================================== */

if (searchInput) {

    searchInput.addEventListener("input", updateProducts);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", updateProducts);

}

if (sortProducts) {

    sortProducts.addEventListener("change", updateProducts);

}

