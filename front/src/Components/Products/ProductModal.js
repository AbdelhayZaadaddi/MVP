import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ProductDetail from './ProductDetail';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ProductModal = ({ open, handleClose, productId }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={style}>
        <ProductDetail id={productId} />
      </Box>
    </Modal>
  );
};

export default ProductModal;
