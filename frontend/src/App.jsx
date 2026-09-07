import { useState } from "react";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Register from "./Register";
import Login from "./Login";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");

  const products = [
    {
      id: 1,
      name: "T-Shirt",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
    {
      id: 2,
      name: "Shoes",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
      id: 3,
      name: "Backpack",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    },
    {
      id: 4,
      name: "Watch",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD TO CART
  const addToCart = (product) => {
    setCart((previousCart) => [...previousCart, product]);
  };

  return (
    <div style={styles.page}>

      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>

        <div
          style={styles.logo}
          onClick={() => setPage("home")}
        >
          🛍️ MyStore
        </div>

        <div style={styles.navLinks}>

          <span
            style={styles.navItem}
            onClick={() => setPage("home")}
          >
            Home
          </span>

          <span
            style={styles.navItem}
            onClick={() => setPage("products")}
          >
            Products
          </span>

          <span
            style={styles.navItem}
            onClick={() => setPage("cart")}
          >
            Cart 🛒 ({cart.length})
          </span>

          <span
            style={styles.navItem}
            onClick={() => setPage("login")}
          >
            Login
          </span>

          <span
            style={styles.navItem}
            onClick={() => setPage("register")}
          >
            Register
          </span>

        </div>
      </nav>


      {/* ================= HOME ================= */}
      {page === "home" && (
        <>
          <section style={styles.hero}>

            <h1>Welcome to Our Store</h1>

            <p>
              Find the best products at the best prices.
            </p>

            <button
              style={styles.shopButton}
              onClick={() => setPage("products")}
            >
              Shop Now
            </button>

          </section>


          {/* SEARCH */}
          <div style={styles.searchBar}>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

            <button style={styles.searchButton}>
              Search
            </button>

          </div>


          <Products
            products={filteredProducts}
            addToCart={addToCart}
          />

        </>
      )}


      {/* ================= PRODUCTS ================= */}
      {page === "products" && (
        <>

          <div style={styles.searchBar}>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

            <button style={styles.searchButton}>
              Search
            </button>

          </div>


          <Products
            products={filteredProducts}
            addToCart={addToCart}
          />

        </>
      )}


      {/* ================= CART ================= */}
      {page === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          goToCheckout={() => setPage("checkout")}
        />
      )}


      {/* ================= CHECKOUT ================= */}
      {page === "checkout" && (
        <Checkout
          cart={cart}
          setCart={setCart}
        />
      )}


      {/* ================= LOGIN ================= */}
      {page === "login" && (
  <Login setPage={setPage} />
)}


      {/* ================= REGISTER ================= */}
      {page === "register" && (
        <Register />
      )}

    </div>
  );
}


/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },


  navbar: {
    backgroundColor: "#111",
    color: "white",
    padding: "18px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },


  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },


  navLinks: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontSize: "16px",
  },


  navItem: {
    cursor: "pointer",
  },


  hero: {
    margin: "30px 5%",
    padding: "70px 20px",
    textAlign: "center",
    borderRadius: "15px",
    background:
      "linear-gradient(120deg, #3b82f6, #6366f1)",
    color: "white",
  },


  shopButton: {
    marginTop: "20px",
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#00bfff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },


  searchBar: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "30px auto",
    padding: "0 20px",
  },


  searchInput: {
    width: "500px",
    padding: "13px 18px",
    border: "1px solid #ddd",
    borderRadius: "25px",
    fontSize: "16px",
  },


  searchButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

};

export default App;