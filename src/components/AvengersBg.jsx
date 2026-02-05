import bg from "../assets/images/avengers-bg.jpg.jpeg";
import "./avengersBg.css";

const COLS = 16;
const ROWS = 9;

export default function AvengersBg() {
  const tiles = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col;
      const delay = index * 0.04; // sequential fade

      tiles.push(
        <div
          key={index}
          className="avengers-tile"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
  }

  return (
    <div className="avengers-bg">
      {tiles}
    </div>
  );
}
