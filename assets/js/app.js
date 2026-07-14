/* ===========================================================
   SabzAbi Store
   app.js FINAL V3
   Author: OpenAI
===========================================================*/

"use strict";

/* ======================================
   Shortcuts
====================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* ======================================
   DOM Ready
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    initBackToTop();

    initSmoothScroll();

    initCurrentMenu();

});


/* ======================================
   Sticky Header
====================================== */

function initHeader() {

    const header = $(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}


/* ======================================
   Active Menu
====================================== */

function initCurrentMenu() {

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    $$("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

}


/* ======================================
   Smooth Scroll
====================================== */

function initSmoothScroll() {

    $$('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(

                this.getAttribute("href")

            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}


/* ======================================
   Back To Top
====================================== */

function initBackToTop() {

    const btn = document.createElement("button");

    btn.className = "back-to-top";

    btn.innerHTML = "↑";

    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            btn.classList.add("show");

        } else {

            btn.classList.remove("show");

        }

    });

    btn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ======================================
   Products Search
====================================== */

/* ======================================
   Products Filter + Search + Sort
====================================== */

function updateProducts() {

    const search =
        ($("#searchInput")?.value || "")
        .toLowerCase();

    const category =
        $("#categoryFilter")?.value || "all";

    const sort =
        $("#sortProducts")?.value || "default";

    const grid = $(".products-grid");

    if (!grid) return;

    let cards = [...$$(".product-card")];



    cards.forEach(card => {

        const title =
            card.querySelector("h3")
            ?.innerText
            .toLowerCase() || "";

        const matchSearch =
            title.includes(search);

        const matchCategory =
            category === "all"
            || card.dataset.category === category;

        card.style.display =
            (matchSearch && matchCategory)
                ? ""
                : "none";

    });



    let visible =
        cards.filter(card =>
            card.style.display !== "none"
        );



    switch (sort) {

        case "cheap":

            visible.sort((a,b)=>

                Number(a.dataset.price)

                -

                Number(b.dataset.price)

            );

            break;



        case "expensive":

            visible.sort((a,b)=>

                Number(b.dataset.price)

                -

                Number(a.dataset.price)

            );

            break;



        case "new":

            visible.sort((a,b)=>

                Number(b.dataset.id)

                -

                Number(a.dataset.id)

            );

            break;

    }



    visible.forEach(card=>{

        grid.appendChild(card);

    });



    checkEmptyProducts();

}



function initProductSearch(){

    $("#searchInput")

    ?.addEventListener(

        "keyup",

        updateProducts

    );

}



function initCategoryFilter(){

    $("#categoryFilter")

    ?.addEventListener(

        "change",

        updateProducts

    );

}



function initProductSort(){

    $("#sortProducts")

    ?.addEventListener(

        "change",

        updateProducts

    );

}


/* ======================================
   Empty Result
====================================== */

function checkEmptyProducts() {

    const cards = [...$$(".product-card")];

    const visible = cards.filter(card => {

        return card.style.display !== "none";

    });

    let empty = $("#emptyProducts");

    if (!empty) {

        empty = document.createElement("div");

        empty.id = "emptyProducts";

        empty.className = "empty-products";

        empty.innerHTML = "محصولی پیدا نشد.";

        $(".products-section")?.appendChild(empty);

    }

    empty.style.display =

        visible.length === 0

            ? "block"

            : "none";

}


/* ======================================
   Init Product Page
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initProductSearch();

    initCategoryFilter();

    initProductSort();

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (category) {

        const filter = document.getElementById("categoryFilter");

        if (filter) {

            filter.value = category;

            updateProducts();

        }

    }

});

/* ======================================
   Product Gallery
====================================== */

function initProductGallery() {

    const mainImage = $("#mainProductImage");

    const thumbs = $$(".thumb");

    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach((thumb) => {

        thumb.addEventListener("click", () => {

            thumbs.forEach(item => {

                item.classList.remove("active");

            });

            thumb.classList.add("active");

            mainImage.src = thumb.src;

            mainImage.alt = thumb.alt || "Product Image";

        });

    });

}


/* ======================================
   Quantity
====================================== */

function initQuantity() {

    const minus = $("#minus");

    const plus = $("#plus");

    const input = $("#quantity");

    if (!minus || !plus || !input) return;

    minus.addEventListener("click", () => {

        let value = parseInt(input.value);

        if (value > 1) {

            input.value = value - 1;

        }

    });

    plus.addEventListener("click", () => {

        let value = parseInt(input.value);

        input.value = value + 1;

    });

}


/* ======================================
   Wishlist
====================================== */

function initWishlist() {

    const btn = $(".wishlist");

    if (!btn) return;

    btn.addEventListener("click", () => {

        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {

            btn.innerHTML = "❤️ به علاقه‌مندی اضافه شد";

        } else {

            btn.innerHTML = "❤ علاقه‌مندی";

        }

    });

}


/* ======================================
   Add To Cart
====================================== */

function initCartButton() {

    const btn = $(".add-cart");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const oldText = btn.innerHTML;

        btn.disabled = true;

        btn.innerHTML = "✅ به سبد خرید اضافه شد";

        setTimeout(() => {

            btn.disabled = false;

            btn.innerHTML = oldText;

        }, 2000);

    });

}


/* ======================================
   Product Init
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initProductGallery();

    initQuantity();

    initWishlist();

    initCartButton();

});

/* ======================================
   Reveal Animation On Scroll
====================================== */

function initRevealAnimation() {

    const elements = $$(
        ".section-header, .product-card, .why-card, .contact-card, .about-content, .cta-box"
    );

    if (elements.length === 0) return;


    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });


    elements.forEach(el => {

        el.classList.add("reveal");

        observer.observe(el);

    });

}



/* ======================================
   Button Ripple Effect
====================================== */

function initRippleButtons() {

    const buttons = $$(
        ".btn, .btn-outline, button"
    );


    buttons.forEach(button => {


        button.addEventListener("click", function(e) {


            const ripple = document.createElement("span");


            ripple.className = "ripple";


            const rect = this.getBoundingClientRect();


            ripple.style.left = `${e.clientX - rect.left}px`;


            ripple.style.top = `${e.clientY - rect.top}px`;


            this.appendChild(ripple);



            setTimeout(() => {

                ripple.remove();

            }, 600);


        });


    });


}




/* ======================================
   Counter Animation
====================================== */

function initCounters() {


    const counters = $$(".counter-box h2");


    if (counters.length === 0) return;



    counters.forEach(counter => {


        const text = counter.innerText;


        const number = parseInt(
            text.replace(/\D/g, "")
        );


        if (!number) return;



        let current = 0;


        const step = Math.ceil(
            number / 60
        );



        const timer = setInterval(() => {


            current += step;



            if (current >= number) {


                current = number;


                clearInterval(timer);


            }



            counter.innerText =
                current + "+";



        }, 30);



    });


}




/* ======================================
   Toast Message
====================================== */

function showToast(message) {


    let toast = $("#toast");


    if (!toast) {


        toast = document.createElement("div");


        toast.id = "toast";


        document.body.appendChild(toast);


    }



    toast.innerText = message;


    toast.classList.add("active");



    setTimeout(() => {


        toast.classList.remove("active");


    }, 2500);



}




/* ======================================
   Format Price
====================================== */

function formatPrice(price) {


    return Number(price)
        .toLocaleString("fa-IR")
        + " تومان";


}





/* ======================================
   Debounce Helper
====================================== */

function debounce(func, delay = 300) {


    let timer;


    return (...args) => {


        clearTimeout(timer);


        timer = setTimeout(() => {


            func(...args);


        }, delay);


    };


}





/* ======================================
   FINAL INIT
====================================== */

document.addEventListener("DOMContentLoaded", () => {


    initRevealAnimation();


    initRippleButtons();


    initCounters();



});