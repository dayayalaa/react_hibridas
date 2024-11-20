import React from "react";

const Spinner = () => {
  const spinnerStyle = {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "conic-gradient(#0000 10%, #2b3d1a)",
    WebkitMask: "radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0)",
    mask: "radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0)",
    animation: "spinner-zp9dbg 1.2s infinite linear",
  };

  const keyframes = `
    @keyframes spinner-zp9dbg {
      to {
        transform: rotate(1turn);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle}>
        <span className="sr-only "> Cargando ... </span>
      </div>
    </>
  );
};

export default Spinner;
