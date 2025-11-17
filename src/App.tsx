import { useState } from 'react';
import RequestsList from './components/RequestsList';
import AddRequest from './components/AddRequest';

function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <header
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          PPE Request Manager
        </h1>
      </header>
      <nav
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          gap: '0',
        }}
      >
        <button
          onClick={() => setActiveTab('list')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: activeTab === 'list' ? '#2563eb' : '#fff',
            color: activeTab === 'list' ? '#fff' : '#000',
            cursor: 'pointer',
            fontWeight: activeTab === 'list' ? 'bold' : 'normal',
          }}
        >
          Requests List
        </button>
        <button
          onClick={() => setActiveTab('add')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: activeTab === 'add' ? '#2563eb' : '#fff',
            color: activeTab === 'add' ? '#fff' : '#000',
            cursor: 'pointer',
            fontWeight: activeTab === 'add' ? 'bold' : 'normal',
          }}
        >
          Add Request
        </button>
      </nav>
      <main>{activeTab === 'list' ? <RequestsList /> : <AddRequest />}</main>
    </div>
  );
}

export default App;
