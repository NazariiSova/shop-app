import React, { useState } from 'react';
import { Product } from '../../types/interfaces';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { id: number; name: string; quantity: number; count: number }[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  if (!isOpen) return null;

  const openConfirmModal = (productId: number) => {
    setSelectedProductId(productId);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProductId !== null) {
      onRemoveFromCart(selectedProductId);
    }
    setConfirmOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <p>{item.name}</p>
                  <p>
                    Quantity: {item.quantity} / {item.count}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.min(item.quantity + 1, item.count))
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => openConfirmModal(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isConfirmOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to remove this item?</p>
            <button className="remove-btn" onClick={confirmDelete}>
              Yes
            </button>
            <button className="close-btn" onClick={() => setConfirmOpen(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
