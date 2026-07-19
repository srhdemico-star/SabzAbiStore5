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
        item.qty++;
    } else {
        cart.push({
            ...product,
            qty:1
        });
    }

    saveCart();

    alert("محصول به سبد خرید اضافه شد");
    updateCartCount();
}


// تعداد سبد خرید
function updateCartCount(){

    let count = cart.reduce(
        (sum,item)=> sum + item.qty,
        0
    );

    let cartCount = document.querySelector("#cart-count");

    if(cartCount){
        cartCount.innerText = count;
    }
}


// نمایش سبد خرید
function showCart(){

    let box = document.querySelector("#cart-items");

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
            ${item.price.toLocaleString()} تومان
            </p>

            <input 
            type="number"
            value="${item.qty}"
            min="1"
            onchange="changeQty(${index},this.value)"
            >

            <button onclick="removeItem(${index})">
            حذف
            </button>

        </div>

        `;

    });

}


// تغییر تعداد
function changeQty(index,value){

    cart[index].qty = Number(value);

    saveCart();

    showCart();

}


// حذف محصول
function removeItem(index){

    cart.splice(index,1);

    saveCart();

    showCart();

}



document.addEventListener(
"DOMContentLoaded",
()=>{

updateCartCount();

showCart();

});
