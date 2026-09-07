function Cart({ cart, setCart, goToCheckout }) {
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  padding: "8px 15px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "right" }}>
            Total: ₹{total}
          </h3>

          <div style={{ textAlign: "right" }}>
            <button
              onClick={goToCheckout}
              style={{
                padding: "12px 25px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;