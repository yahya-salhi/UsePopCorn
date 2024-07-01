import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StartRating from "./StartRating";

const size = {
  fontSize: 48,
};
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div className="">
//       <StartRating color="blue" maxRating={10} onsetRating={setMovieRating} />
//       <p style={size}>this Movie was rated {movieRating} starts</p>
//     </div>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StartRating
      maxRating={5}
      message={["bad", "ok", "nice", "awsome", "great"]}
    />
    <StartRating className="test" size={24} color="green" defaultRating={3} />
    <Test /> */}
    {/* <Test /> */}
    {/* <StartRating
      maxRating={5}
      message={["bad", "ok", "nice", "awsome", "great"]}
    /> */}
  </React.StrictMode>
);
