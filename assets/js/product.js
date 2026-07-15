/* ======================================
   SabzAbi Store
   product.js
====================================== */

"use strict";

/* ==============================
   Get Product ID
============================== */

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

/* ==============================
   Find Product
============================== */

const product = PRODUCTS.find(item => item.id === productId);

/* ==============================
   Product Not Found
============================== */

if (!product) {

    document.body.innerHTML = `

        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-size:24px;
            font-family:IRANSans;
        ">

            محصول پیدا نشد.

        </div>

    `;

    throw new Error("Product Not Found");

}
