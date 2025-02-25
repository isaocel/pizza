export default function CountButton() {
  return (
    <div class="increment-decrement-container">
      <div class="increment-decrement-button">
        <button class="decrement">-</button>
      </div>
      <div class="counter-container">
        <span class="counter">0</span>
      </div>
      <div class="increment-decrement-button">
        <button class="increment">+</button>
      </div>
    </div>
  );
}
