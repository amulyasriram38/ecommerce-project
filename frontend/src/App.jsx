import { useMemo, useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    oldPrice: 799,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
  },
  {
    id: 2,
    name: "Premium Running Shoes",
    category: "Footwear",
    price: 999,
    oldPrice: 1599,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    id: 3,
    name: "Urban Travel Backpack",
    category: "Accessories",
    price: 799,
    oldPrice: 1299,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
  },
  {
    id: 4,
    name: "Minimal Classic Watch",
    category: "Accessories",
    price: 1299,
    oldPrice: 1999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1799,
    oldPrice: 2499,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
  },
  {
    id: 6,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 7,
    name: "Casual Denim Jacket",
    category: "Fashion",
    price: 1199,
    oldPrice: 1899,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700",
  },
  {
    id: 8,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 699,
    oldPrice: 999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const categories = ["All", "Fashion", "Footwear", "Electronics", "Accessories"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = (target) => {
    setPage(target);
    setSelectedProduct(null);
    setCheckoutDone(false);
    scrollTop();
  };

  return (
    <div className="store">

      {/* ================= HEADER ================= */}

      <header className="header">

        <div
          className="brand"
          onClick={() => navigate("home")}
        >
          <div className="brand-icon">M</div>

          <div>
            <h2>MyStore</h2>
            <span>SHOP SMART • LIVE BETTER</span>
          </div>
        </div>

        <div className="search-wrapper">

          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (page !== "products") setPage("products");
            }}
          />

          <button>⌕</button>

        </div>

        <div className="header-actions">

          <button
            className="header-link"
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button
            className="header-link"
            onClick={() => navigate("products")}
          >
            Products
          </button>

          <button
            className="cart-button"
            onClick={() => navigate("cart")}
          >
            🛒
            <span>Cart</span>
            {cartCount > 0 && (
              <b>{cartCount}</b>
            )}
          </button>

        </div>

      </header>


      {/* ================= ANNOUNCEMENT ================= */}

      <div className="announcement">
        🚚 Free delivery on orders above ₹999
        <span> | </span>
        🔒 Secure payments
        <span> | </span>
        ↩ Easy returns
      </div>


      {/* ================= HOME ================= */}

      {page === "home" && (
        <main>

          <section className="hero">

            <div className="hero-content">

              <span className="hero-badge">
                NEW COLLECTION 2026
              </span>

              <h1>
                Everything You Need.
                <br />
                <strong>All in One Place.</strong>
              </h1>

              <p>
                Discover premium products at unbeatable prices.
                Shop fashion, electronics, footwear and more.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-button"
                  onClick={() => navigate("products")}
                >
                  Shop Now →
                </button>

                <button
                  className="secondary-button"
                  onClick={() => navigate("products")}
                >
                  Explore Collection
                </button>

              </div>

              <div className="hero-features">

                <div>
                  <strong>10K+</strong>
                  <span>Happy Customers</span>
                </div>

                <div>
                  <strong>500+</strong>
                  <span>Products</span>
                </div>

                <div>
                  <strong>4.8★</strong>
                  <span>Average Rating</span>
                </div>

              </div>

            </div>

            <div className="hero-image">

              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                alt="Shopping"
              />

              <div className="floating-card">
                <span>🔥</span>
                <div>
                  <strong>Trending Now</strong>
                  <small>Up to 40% OFF</small>
                </div>
              </div>

            </div>

          </section>


          {/* CATEGORIES */}

          <section className="section">

            <div className="section-heading">

              <div>
                <span>SHOP BY CATEGORY</span>
                <h2>Find Your Style</h2>
              </div>

              <button onClick={() => navigate("products")}>
                View All →
              </button>

            </div>

            <div className="category-grid">

              {[
                ["👕", "Fashion"],
                ["👟", "Footwear"],
                ["🎧", "Electronics"],
                ["⌚", "Accessories"],
              ].map(([icon, name]) => (

                <button
                  className="category-card"
                  key={name}
                  onClick={() => {
                    setCategory(name);
                    navigate("products");
                  }}
                >
                  <span>{icon}</span>
                  <strong>{name}</strong>
                  <small>Explore Collection →</small>
                </button>

              ))}

            </div>

          </section>


          {/* FEATURED PRODUCTS */}

          <section className="section">

            <div className="section-heading">

              <div>
                <span>OUR COLLECTION</span>
                <h2>Featured Products</h2>
              </div>

              <button onClick={() => navigate("products")}>
                View All →
              </button>

            </div>

            <ProductGrid
              products={PRODUCTS.slice(0, 4)}
              addToCart={addToCart}
              setSelectedProduct={setSelectedProduct}
            />

          </section>


          {/* BENEFITS */}

          <section className="benefits">

            <div>
              <span>🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <small>On orders above ₹999</small>
              </div>
            </div>

            <div>
              <span>🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <small>100% secure checkout</small>
              </div>
            </div>

            <div>
              <span>↩</span>
              <div>
                <strong>Easy Returns</strong>
                <small>7 day return policy</small>
              </div>
            </div>

            <div>
              <span>💬</span>
              <div>
                <strong>24/7 Support</strong>
                <small>We're here to help</small>
              </div>
            </div>

          </section>

        </main>
      )}


      {/* ================= PRODUCTS ================= */}

      {page === "products" && (
        <main className="page-container">

          <div className="page-title">

            <span>COLLECTION</span>

            <h1>All Products</h1>

            <p>
              Discover products selected specially for you.
            </p>

          </div>


          <div className="filters">

            <div className="category-filters">

              {categories.map((item) => (

                <button
                  key={item}
                  className={
                    category === item ? "active-filter" : ""
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>

              ))}

            </div>

            <span>
              {filteredProducts.length} products
            </span>

          </div>


          {filteredProducts.length > 0 ? (

            <ProductGrid
              products={filteredProducts}
              addToCart={addToCart}
              setSelectedProduct={setSelectedProduct}
            />

          ) : (

            <div className="empty-box">
              <div>🔍</div>
              <h2>No products found</h2>
              <p>Try another search or category.</p>

              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>

          )}

        </main>
      )}


      {/* ================= CART ================= */}

      {page === "cart" && (
        <main className="page-container">

          <div className="page-title">
            <span>YOUR SHOPPING BAG</span>
            <h1>Shopping Cart</h1>
          </div>


          {cart.length === 0 ? (

            <div className="empty-box">

              <div className="empty-icon">🛒</div>

              <h2>Your cart is empty</h2>

              <p>
                Looks like you haven't added anything yet.
              </p>

              <button
                className="primary-button"
                onClick={() => navigate("products")}
              >
                Start Shopping →
              </button>

            </div>

          ) : (

            <div className="cart-layout">

              <div className="cart-items">

                {cart.map((item) => (

                  <div className="cart-item" key={item.id}>

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-info">

                      <span>{item.category}</span>

                      <h3>{item.name}</h3>

                      <strong>₹{item.price}</strong>

                      <div className="quantity">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          −
                        </button>

                        <b>{item.quantity}</b>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div className="cart-item-right">

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>


              <div className="summary">

                <h2>Order Summary</h2>

                <div>
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery}`}
                  </strong>
                </div>

                <hr />

                <div className="total-row">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <button
                  className="primary-button full"
                  onClick={() => navigate("checkout")}
                >
                  Proceed to Checkout →
                </button>

                <button
                  className="continue-button"
                  onClick={() => navigate("products")}
                >
                  ← Continue Shopping
                </button>

              </div>

            </div>

          )}

        </main>
      )}


      {/* ================= CHECKOUT ================= */}

      {page === "checkout" && (
        <main className="page-container">

          <div className="page-title">
            <span>SECURE CHECKOUT</span>
            <h1>Complete Your Order</h1>
          </div>


          {checkoutDone ? (

            <div className="success-box">

              <div>✓</div>

              <h1>Order Placed Successfully!</h1>

              <p>
                Thank you for shopping with MyStore.
              </p>

              <p>
                Your order has been confirmed.
              </p>

              <button
                className="primary-button"
                onClick={() => {
                  setCart([]);
                  navigate("home");
                }}
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            <div className="checkout-layout">

              <form
                className="checkout-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setCheckoutDone(true);
                }}
              >

                <h2>Delivery Information</h2>

                <div className="form-grid">

                  <input
                    required
                    placeholder="Full Name"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                  />

                </div>

                <input
                  required
                  placeholder="Phone Number"
                />

                <input
                  required
                  placeholder="Address"
                />

                <div className="form-grid">

                  <input
                    required
                    placeholder="City"
                  />

                  <input
                    required
                    placeholder="PIN Code"
                  />

                </div>


                <h2>Payment Method</h2>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  <span>💳</span>
                  <div>
                    <strong>Card / UPI</strong>
                    <small>Secure online payment</small>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                  />
                  <span>💵</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives</small>
                  </div>
                </label>

                <button
                  className="primary-button full"
                  type="submit"
                >
                  Place Order • ₹{total}
                </button>

              </form>


              <div className="summary">

                <h2>Your Order</h2>

                {cart.map((item) => (

                  <div className="checkout-item" key={item.id}>

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <strong>{item.name}</strong>
                      <small>
                        Qty: {item.quantity}
                      </small>
                    </div>

                    <b>
                      ₹{item.price * item.quantity}
                    </b>

                  </div>

                ))}

                <hr />

                <div>
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery}`}
                  </strong>
                </div>

                <div className="total-row">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

              </div>

            </div>

          )}

        </main>
      )}


      {/* ================= PRODUCT MODAL ================= */}

      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div>

              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <div className="rating">
                ★ {selectedProduct.rating}
              </div>

              <div className="modal-price">
                <strong>₹{selectedProduct.price}</strong>
                <del>₹{selectedProduct.oldPrice}</del>
              </div>

              <p>
                Premium quality product with modern design,
                reliable performance and excellent value.
              </p>

              <button
                className="primary-button full"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart 🛒
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">
          <div className="brand-icon">M</div>

          <div>
            <h2>MyStore</h2>
            <p>
              Your trusted destination for quality products.
            </p>
          </div>
        </div>

        <div>
          <h3>Shop</h3>
          <button onClick={() => navigate("products")}>
            All Products
          </button>
          <button onClick={() => navigate("products")}>
            Fashion
          </button>
          <button onClick={() => navigate("products")}>
            Electronics
          </button>
        </div>

        <div>
          <h3>Customer Care</h3>
          <button>Contact Us</button>
          <button>Returns</button>
          <button>Shipping</button>
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p>Get offers and new product updates.</p>

          <div className="newsletter">
            <input placeholder="Your email" />
            <button>→</button>
          </div>
        </div>

      </footer>

      <div className="copyright">
        © 2026 MyStore. All rights reserved.
      </div>

    </div>
  );
}


/* ================= PRODUCT GRID ================= */

function ProductGrid({
  products,
  addToCart,
  setSelectedProduct,
}) {
  return (
    <div className="product-grid">

      {products.map((product) => (

        <div className="product-card" key={product.id}>

          <div
            className="product-image"
            onClick={() => setSelectedProduct(product)}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="discount">
              {Math.round(
                ((product.oldPrice - product.price) /
                  product.oldPrice) *
                  100
              )}
              % OFF
            </span>

            <button
              className="quick-view"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
            >
              Quick View
            </button>

          </div>

          <div className="product-info">

            <span>{product.category}</span>

            <h3>{product.name}</h3>

            <div className="rating">
              ★ {product.rating}
            </div>

            <div className="price-row">

              <div>
                <strong>₹{product.price}</strong>
                <del>₹{product.oldPrice}</del>
              </div>

              <button
                onClick={() => addToCart(product)}
              >
                + Cart
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default App;