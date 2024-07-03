import React from 'react';

function ProductList({ title, image, price, category, onSelectProduct, selected }) {
  return (
    <div className="card">
      {image ? (
        <img src={image} alt={title} />
      ) : (
        <div>No image available</div>
      )}
      <h4>{price}</h4>
      <h1>{title}</h1>
      <p>Category: {category}</p>
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelectProduct}
      />
      <label>Select for comparison</label>
    </div>
  );
}

export default ProductList;
