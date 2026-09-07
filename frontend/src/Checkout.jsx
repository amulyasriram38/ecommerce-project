function Checkout({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = (e) => {
    e.preventDefault();

    alert("Order placed successfully! 🎉");
    setCart([]);
  };

  return (
    <div
      style={{
        width: "450px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      <h3>Order Summary</h3>

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <hr />

      <h3 style={{ textAlign: "right" }}>
        Total: ₹{total}
      </h3>

      <form onSubmit={handleOrder}>
        <input
          type="text"
          placeholder="Full Name"
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Address"
          required
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
          style={inputStyle}
        />

        <select required style={inputStyle}>
          <option value="">Select Payment Method</option>
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

export default Checkout;