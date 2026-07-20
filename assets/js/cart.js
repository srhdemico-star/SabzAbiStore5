let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// اضافه کردن محصول
function addToCart(product) {

    let item = cart.find(
        p => p.id === product.id
    );

    if(item){
        item.quantity++
    } else {
        cart.push({
            ...product,
            quantity:1
        });
    }

    saveCart();

    alert("محصول به سبد خرید اضافه شد");
    updateCartCount();
}


// تعداد سبد خرید
function updateCartCount(){

    let count = cart.reduce(
        (sum,item)=> sum + item.quantity,
        0
    );

    let cartCount = document.querySelector("#cartCount");
    if(cartCount){
        cartCount.innerText = count;
    }
}


// نمایش سبد خرید
function showCart(){

    let box = document.querySelector("#cartItems");

    if(!box) return;


    if(cart.length === 0){

        box.innerHTML =
        "<p>سبد خرید شما خالی است</p>";

        return;
    }


    box.innerHTML = "";


    cart.forEach((item,index)=>{

        box.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <h3>${item.name}</h3>

            <p>
            ${Number(item.price).toLocaleString("fa-IR")} تومان
            </p>

            <div class="cart-actions">

    <button
        class="qty-btn"
        onclick="decreaseQty(${index})">

        −

    </button>

    <span class="qty-number">

        ${item.quantity}

    </span>

    <button
        class="qty-btn"
        onclick="increaseQty(${index})">

        +

    </button>

    <button
        class="remove-btn"
        onclick="removeItem(${index})">

        🗑 حذف

    </button>

</div>


        </div>

        `;

    });

}


// تغییر تعداد
function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    updateCartCount();

    showCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    updateCartCount();

    showCart();

}



// حذف محصول
function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCartCount();

    showCart();

}



document.addEventListener(
"DOMContentLoaded",
()=>{

updateCartCount();

showCart();

});
