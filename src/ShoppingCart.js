import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

function ShoppingCart({ product, cartCount, setCartCount }) {
  const deleteItem = () => {
    setCartCount(0);
  };

  return (
    <div className="shoppingCart">
      <h1>Cart</h1>
      {cartCount === 0 ? (
        <p className="cartEmpty">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-added-product">
            <img
              className="cart-thumbnail"
              src="./images/image-product-1-thumbnail.jpg"
              alt="product thumbnail"
            />
            <div className="cart-product-info">
              <p className="cart-product-title">{product.name}</p>
              <p className="cart-product-price">
                ${product.price} x {cartCount}{" "}
                <span className="cart-total-price">
                  ${(product.price * cartCount).toFixed(2)}
                </span>
              </p>
              <RiDeleteBin5Fill
                className="cart-delete-btn"
                onClick={deleteItem}
              />
            </div>
          </div>
          <button className="cart-checkout-btn">Checkout</button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
