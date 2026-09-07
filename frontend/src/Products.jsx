function Products({ products, addToCart }) {
  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;