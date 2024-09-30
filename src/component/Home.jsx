import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Fetch images from both server and external URLs
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              let imageUrl;

              // Check if product has imagePath or needs to fetch from server
              if (product.imagePath) {
                imageUrl = product.imagePath; // External image URL
              } else {
                // Fetch image from the server
                const imageResponse = await fetch(
                  `http://localhost:8080/api/products/${product.id}/image`
                );
                const imageBlob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(imageBlob);
              }

              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product:", product.id, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img className="" src={product.imageUrl} alt={product.name} />
              </div>
            </Link>
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
              <p className="text-gray-700 text-base mb-4">
                {product.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Release Date:</span>{" "}
                  {new Date(product.releaseDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-4">
                ₹{product.price.toLocaleString()}
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
