import { useState } from 'react';
import { useRequestStore } from '../store/requestStore';

export default function AddRequest() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [requestedBy, setRequestedBy] = useState('');
  const addRequest = useRequestStore((state) => state.addRequest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRequest({
      item,
      quantity: parseInt(quantity) || 1,
      requested_by: requestedBy,
      status: 'Pending',
    });
    setItem('');
    setQuantity('1');
    setRequestedBy('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Add New Request
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Item Name</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Requested By</label>
          <input
            type="text"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Request
        </button>
      </form>
    </div>
  );
}
