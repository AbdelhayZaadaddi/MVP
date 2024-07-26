import React, { useState } from 'react';
import ProductDetail from './ProductDetail';

const ParentComponent = () => {
  const [isProductDetailVisible, setProductDetailVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showProductDetail = (id) => {
    setSelectedProductId(id);
    setProductDetailVisible(true);
  };

  const hideProductDetail = () => {
    setProductDetailVisible(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <button onClick={() => showProductDetail(1)}>Show Product 1</button>
      <button onClick={() => showProductDetail(2)}>Show Product 2</button>

      {isProductDetailVisible && (
        <div className="modal-overlay" onClick={hideProductDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProductDetail id={selectedProductId} onClose={hideProductDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
