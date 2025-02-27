export default function CountButton({ handleChange, adet }) {
  const increment = () => {
    handleChange({ target: { name: "adet", value: adet + 1 } });
  };

  const decrement = () => {
    if (adet > 0) {
      handleChange({ target: { name: "adet", value: adet - 1 } });
    }
  };

  return (
    <div className="increment-decrement-container">
      <div className="increment-decrement-button">
        <button className="decrement" onClick={decrement}>
          -
        </button>
      </div>
      <div className="counter-container">
        <span className="counter">{adet}</span>
      </div>
      <div className="increment-decrement-button">
        <button className="increment" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}
