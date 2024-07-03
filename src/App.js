import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './productlist.js';
import CompareProducts from './CompareProducts.js';
import './App.css';

function App() {
  const [products, updateProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [url, setUrl] = useState('https://dummyjson.com/products');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    setError('');
    try {
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let productData = await res.json();
      let productArray = [];
      if (Array.isArray(productData)) {
        productArray = productData;
      } else if (productData && typeof productData === 'object') {
        let dataArray = Object.values(productData).find(Array.isArray);
        if (Array.isArray(dataArray)) {
          productArray = dataArray;
        } else {
          throw new Error('No array of products found in data');
        }
      } else {
        throw new Error('Invalid data format received from API');
      }
      updateProducts(productArray);
    } catch (error) {
      console.error('Error fetching the data:', error);
      setError('Failed to fetch data. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  function toggleSelectProduct(product) {
    setSelectedProducts(prevSelectedProducts => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter(p => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  }

  return (
    <Router>
      <div className="container">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
        />
        <button onClick={getProducts}>Fetch Products</button>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/compare">
                  <button disabled={selectedProducts.length === 0}>Compare Selected Products</button>
                </Link>

                {loading ? (
                  <h4>Fetching data...</h4>
                ) : error ? (
                  <h4>{error}</h4>
                ) : !Array.isArray(products) || products.length === 0 ? (
                  <h4>No products available</h4>
                ) : (
                  <div className="product-list">
                    {products.map((p, index) => (
                      <ProductList
                        {...p}
                        key={index}
                        onSelectProduct={() => toggleSelectProduct(p)}
                        selected={selectedProducts.includes(p)}
                      />
                    ))}
                  </div>
                )}
              </div>
            }
          />
          <Route path="/compare" element={<CompareProducts products={selectedProducts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
