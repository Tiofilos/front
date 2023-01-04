fetch("https://multitierproduct.herokuapp.com/products")
  .then((data) => {
    return data.json();
  })
  .then((completedata) => {
    let data1 = "";
    completedata.map((values) => {
      data1 += `<div class="product-box">
        <img src=${values.imageUrl} alt="image" class="product-img">
        <h2 class="product-title">${values.name}</h2>
        <span class="price">€${values.price}</span>
        <i class='bx bx-shopping-bag add-cart' onclick="saveToCart('${values.name}', '${values.price}', '${values.imageUrl}', '${values._id}')"></i>
        </div>`;
    });
    document.getElementById("shop-content").innerHTML = data1;
  })
  .catch((err) => {
    console.log(err);
  });

//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

const saveToCart = (name, price, imageUrl, _id) => {
  console.log(name);
  const newObj = [{ name, price, imageUrl, _id }];
  const result = JSON.parse(localStorage.getItem("cartItem"));
  if (result) {
    const itExist = result.find((item) => item._id === _id);
    console.log(itExist);

    if (itExist) {
      alert("item already exist in the cart");
      return;
    }
    const newArray = [...result, newObj[0]];
    localStorage.setItem("cartItem", JSON.stringify(newArray));
    return;
  }
  alert("item successfully added");
  localStorage.setItem("cartItem", JSON.stringify(newObj));
  location.reload();
};

const getToCart = () => {
  const result = JSON.parse(localStorage.getItem("cartItem"));
  if (result) {
    let data = "";
    result.map((values) => {
      data += `<div class="cart-box">
              <img src=${values.imageUrl} alt="image" class="cart-img">
            <div class="detail-box">
              <div class="cart-product-title">${values.name}</div>
               <div class="cart-price">€${values.price}</div>
              <input type="number" value="1" class="cart-quantity">
              </div>
              <i class='bx bxs-trash-alt cart-remove' onclick="deleteFromCart('${values._id}')"></i>
               </div>`;
    });
    document.getElementById("cart-content").innerHTML = data;
  }
  return;
};

const deleteFromCart = (id) => {
  const result = JSON.parse(localStorage.getItem("cartItem"));
  const newResult = result.filter((item) => item._id === id);
  localStorage.setItem("cartItem", JSON.stringify(newResult));
  alert("item successfully deleted");
  location.reload();
  return;
};

const getTotalPriceCart = () => {
  const result = JSON.parse(localStorage.getItem("cartItem"));
  let finalPrice = 0;
  result.map((item) => {
    finalPrice = finalPrice + parseInt(item.price);
  });

  console.log("gettotalPrice", finalPrice);
  return finalPrice;
};

const totalPriceWithVAT = () => {
  const vatPrice =
    getTotalPriceCart() && getTotalPriceCart() - getTotalPriceCart() * 0.2;
    document.getElementsByClassName("vat-price")[0].innerText = "€" + vatPrice;
  console.log(vatPrice);
  return vatPrice;
};
getToCart();
getTotalPriceCart();
totalPriceWithVAT();


