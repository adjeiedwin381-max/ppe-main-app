import { useEffect } from 'react';
import { useRequestStore } from '../store/requestStore';

export default function RequestsList() {
  const { requests, loading, loadRequests, updateStatus } = useRequestStore();

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        PPE Requests
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Item</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Quantity</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Requested By</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{request.item}</td>
              <td style={{ padding: '10px' }}>{request.quantity}</td>
              <td style={{ padding: '10px' }}>{request.requested_by}</td>
              <td style={{ padding: '10px' }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor:
                      request.status === 'Pending'
                        ? '#fef3c7'
                        : request.status === 'Approved'
                        ? '#dbeafe'
                        : '#d1fae5',
                    color:
                      request.status === 'Pending'
                        ? '#92400e'
                        : request.status === 'Approved'
                        ? '#1e40af'
                        : '#065f46',
                  }}
                >
                  {request.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => updateStatus(request.id)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                  }}
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {requests.length === 0 && (
        <p style={{ padding: '20px', color: '#666' }}>No requests found</p>
      )}
    </div>
  );
}
