/* ==========================================
   PRODUCTS PAGE
========================================== */

let filteredProducts = [...PRODUCTS];

const productsContainer = document.querySelector("#productsContainer");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const sortProducts = document.querySelector("#sortProducts");

/* ==========================================
   Render Products
========================================== */

function renderProducts(products) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (products.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-products">
                <h3>محصولی پیدا نشد</h3>
            </div>
        `;

        return;

    }

    products.forEach(product => {

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
                        ${product.price} تومان
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

renderProducts(filteredProducts);

/* ==========================================
   Search
========================================== */

if (searchInput) {

    searchInput.addEventListener("input", () => {

        filterProducts();

    });

}

/* ==========================================
   Category Filter
========================================== */

if (categoryFilter) {

    categoryFilter.addEventListener("change", () => {

        filterProducts();

    });

}

/* ==========================================
   Sort
========================================== */

if (sortProducts) {

    sortProducts.addEventListener("change", () => {

        filterProducts();

    });

}

/* ==========================================
   Main Filter Function
========================================== */

function filterProducts() {

    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const category = categoryFilter ? categoryFilter.value : "all";

    const sort = sortProducts ? sortProducts.value : "default";

    filteredProducts = PRODUCTS.filter(product => {

        const matchKeyword =
            product.name.toLowerCase().includes(keyword);

        const matchCategory =
            category === "all" ||
            product.category === category;

        return matchKeyword && matchCategory;

    });

    switch (sort) {

        case "cheap":

            filteredProducts.sort((a, b) => a.price - b.price);

            break;

        case "expensive":

            filteredProducts.sort((a, b) => b.price - a.price);

            break;

        case "new":

            filteredProducts.sort((a, b) => b.id - a.id);

            break;

        default:

            filteredProducts.sort((a, b) => a.id - b.id);

            break;

    }

    renderProducts(filteredProducts);

}


