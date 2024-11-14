import React, { useState } from "react";
import Button from "./Button";

const ProductsContainer = (props) => {
  const [count, setCount] = useState(0);

  function sumarProducto() {
    setCount(count + 1);
  }

  function restarProducto() {
    setCount(count - 1);
  }

  return (
    <div className="bg-lightblue p-4 rounded-md">
      <h2>Lista de Productos</h2>
      <p>Carrito: {count}</p>
      <hr />

      <Button text="Sumar" handleClick={sumarProducto} />
      <Button color="red" text="Restar" handleClick={restarProducto} />

      <div className="row mt-4">
        {props.children}
      </div>
    </div>
  );
};

export default ProductsContainer;
