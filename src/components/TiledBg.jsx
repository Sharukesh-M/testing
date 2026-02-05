import bg from "../assets/images/avengers-bg.jpg.jpeg";
import "./tiledBg.css";

const ROWS = 6;
const COLS = 6;

export default function TiledBg() {
  const tiles = [];

  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const index = col * ROWS + row;
      const delay = index * 0.15;

      tiles.push(
        <div
          key={`${col}-${row}`}
          className="tile"
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

  return <div className="tiled-bg">{tiles}</div>;
}
