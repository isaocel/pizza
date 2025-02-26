import { useState } from "react";

export default function CountButton({ handleChange }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    handleChange({ target: { name: "quantity", value: count + 1 } });
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      handleChange({ target: { name: "quantity", value: count - 1 } });
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
        <span className="counter">{count}</span>
      </div>
      <div className="increment-decrement-button">
        <button className="increment" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}
