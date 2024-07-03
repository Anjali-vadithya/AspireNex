import React from 'react';
import { Link } from 'react-router-dom';
import './CompareProducts.css';

function CompareProducts({ products }) {
  if (!products.length) {
    return <h4>No products selected for comparison.</h4>;
  }

  return (
    <div className="comparison-table">
      <h3>Product Comparison</h3>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            {products.map((product, index) => (
              <th key={index}>{product.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            {products.map((product, index) => (
              <td key={index}>
                {product.image ? (
                  <img src={product.image} alt={product.title} width="50" />
                ) : (
                  'No image'
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>Price</td>
            {products.map((product, index) => (
              <td key={index}>{product.price}</td>
            ))}
          </tr>
          <tr>
            <td>Category</td>
            {products.map((product, index) => (
              <td key={index}>{product.category}</td>
            ))}
          </tr>
          {/* Add more rows as needed for additional attributes */}
        </tbody>
      </table>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default CompareProducts;
