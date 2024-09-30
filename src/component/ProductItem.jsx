import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
 const ProductItem = () => {
  const [product, setProducts] = useState([]);
  let { id } = useParams();
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white"></div>

      <div className="relative">
        <img className="" src={product.imagePath} alt={product.name} />
      </div>

      <div className="px-6 py-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-xl mb-2">{product.name}</h2>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              product.available
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {product.available ? "Available" : "Out of Stock"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <div className="mb-4">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Quantity:</span> {product.quantity}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Release Date:</span>{" "}
            {new Date(product.releaseDate).toLocaleDateString()}
          </p>
        </div>
        <p className="text-gray-900 font-bold text-xl mb-4">₹{product.price}</p>
      </div>
    </>
  );
};
export default ProductItem;