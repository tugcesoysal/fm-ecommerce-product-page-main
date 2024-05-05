import { useState, useEffect, useRef } from "react";
import "./App.css";
import ShoppingCart from "./ShoppingCart";
import GalleryView from "./GalleryView";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

function App() {
  const product = {
    name: "Fall Limited Edition Sneakers",
    company: "Sneaker Company",
    description: `These low-profile sneakers are your perfect casual wear companion.
      Featuring a durable rubber outer sole, they’ll withstand everything
      the weather can offer.`,
    discount: 50,
    oldPrice: (250.0).toFixed(2),
    get price() {
      return ((parseFloat(this.oldPrice) * this.discount) / 100).toFixed(2);
    },
    images: [
      "./images/image-product-1.jpg",
      "./images/image-product-2.jpg",
      "./images/image-product-3.jpg",
      "./images/image-product-4.jpg",
    ],
    thumbnails: [
      "./images/image-product-1-thumbnail.jpg",
      "./images/image-product-2-thumbnail.jpg",
      "./images/image-product-3-thumbnail.jpg",
      "./images/image-product-4-thumbnail.jpg",
    ],
  };

  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [galleryViewOpen, setGalleryViewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartRef = useRef(null);

  const countPlus = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const countMinus = () => {
    if (count === 0) {
      return;
    }
    setCount((prevCount) => prevCount - 1);
  };

  const toggleShoppingCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const addToCart = () => {
    setCartCount(count);
    setCount(0);
  };

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handleGalleryView = () => {
    if (window.innerWidth < 600) {
      return;
    }
    setGalleryViewOpen(true);
    setCartIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePrevious = () => {
    setMainImageIndex((mainImageIndex) => {
      return (mainImageIndex - 1 + 4) % 4;
    });
  };

  const handleNext = () => {
    setMainImageIndex((mainImageIndex) => {
      return (mainImageIndex + 1) % 4;
    });
  };

  return (
    <div className="App">
      {galleryViewOpen && (
        <GalleryView
          product={product}
          setGalleryViewOpen={setGalleryViewOpen}
        />
      )}
      {cartIsOpen && (
        <div ref={cartRef}>
          <ShoppingCart
            product={product}
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
        </div>
      )}
      <div className={galleryViewOpen || menuOpen ? "layout" : ""}></div>
      <header>
        <GiHamburgerMenu
          onClick={() => setMenuOpen(true)}
          className="mobile icon-menu icon"
        />
        <img src="./images/logo.svg" className="logo" alt="brand logo" />

        <nav className="desktop">
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        {menuOpen && (
          <div className="menu active ">
            <IoMdClose
              className="menu-close icon"
              onClick={() => setMenuOpen(false)}
            />
            <ul>
              <li>Collections</li>
              <li>Men</li>
              <li>Women</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        )}
        <div className="profile-div">
          <button onClick={toggleShoppingCart} className="nav-cart-btn">
            <MdOutlineShoppingCart className="icon nav-icon-cart" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>{" "}
          <img
            src="./images/image-avatar.png"
            className="avatar "
            alt="profile"
          />
        </div>
      </header>
      <main>
        <section className="gallery">
          <GrFormPrevious
            onClick={handlePrevious}
            className="main-previous icon mobile"
          />
          <GrFormNext onClick={handleNext} className="main-next icon mobile" />
          <img
            src={product.images[mainImageIndex]}
            className="main-image"
            alt="product"
            onClick={handleGalleryView}
          />

          <div className="thumbnails desktop">
            {product.thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className={
                  index === mainImageIndex
                    ? "activeImageDiv thumbnailDiv"
                    : "thumbnailDiv"
                }
              >
                <img
                  src={thumbnail}
                  className={
                    index === mainImageIndex
                      ? "activeImage thumbnail"
                      : "thumbnail"
                  }
                  alt="product thumbnail"
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="product-info">
          <h3 className="product-company">{product.company}</h3>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="price-div">
            <h2 className="price">
              ${product.price}{" "}
              <span className="discount-span">{product.discount}%</span>
            </h2>
            <p className="old-price">${product.oldPrice}</p>
          </div>
          <div className="button-div">
            <div className="minus-plus-buttons">
              <FaMinus className="minus-btn" onClick={countMinus} />
              <p className="count">{count}</p>
              <FaPlus className="plus-btn" onClick={countPlus} />
            </div>
            <button onClick={addToCart} className="add-to-cart">
              <MdOutlineShoppingCart className="icon-cart icon" />
              Add to cart
            </button>
          </div>
        </section>
      </main>
      <footer>
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/tugcesoysal"
        >
          Tugce Soysal
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
