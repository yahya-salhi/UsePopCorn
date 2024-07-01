/* eslint-disable react/prop-types */
import { useState } from "react";

function Box({ children, el }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (children || el)}
    </div>
  );
}

export default Box;
