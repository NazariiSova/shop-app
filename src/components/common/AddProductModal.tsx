import React, { useState } from 'react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    count: number;
    weight: string;
    imageUrl: string;
    size: { width: number; height: number };
    comments: any[];
  }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState<number | ''>('');
  const [weight, setWeight] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');

  const handleAdd = () => {
    if (!name || !count || !weight || !imageUrl || !width || !height) {
      alert('All fields are required!');
      return;
    }

    onAddProduct({
      name,
      count: Number(count),
      weight,
      imageUrl,
      size: { width: Number(width), height: Number(height) },
      comments: [],
    });
    onClose();
    setName('');
    setCount('');
    setWeight('');
    setImageUrl('');
    setWidth('');
    setHeight('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Count:
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <label>
          Weight:
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Width:
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <button onClick={handleAdd}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductModal;
