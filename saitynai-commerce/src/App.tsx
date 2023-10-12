import React, { useState } from 'react';
import CategoryButtons from './components/CategoryButtons';
import ProductButtons from './components/ProductButtons';
import ReviewButtons from './components/ReviewButtons';

function App() {
  const [response, setResponse] = useState({ status: 0, data: null });
  

  const handleResponse = (response: any) => {
    setResponse(response);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 15, paddingLeft: 10}}>
        <label>so damn scuffed (for now!)</label>
        <div style={{ flex: '0 0 50%', flexDirection: 'column'}}>
        <CategoryButtons 
          handleResponse={handleResponse} 
        /> <br/>
        <ProductButtons 
          handleResponse={handleResponse}
        /> <br/>
        <ReviewButtons
          handleResponse={handleResponse}
        />
        
      </div>
      <div style={{ flex: '1', marginRight: '50%'}}>
        <p>Response: {response.status}</p>
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;