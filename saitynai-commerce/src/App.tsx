import React, { useState } from 'react';
import CreateCategoryButton from './components/CreateCategoryButton';

function App() {
  const [categoryResponse, setCategoryResponse] = useState({ status: 0, data: null });

  const handleCreateCategory = (response: any) => {
    setCategoryResponse(response);
  };

  return (
    <div>
      <CreateCategoryButton onCreateCategory={handleCreateCategory} />
      <p>Response: {categoryResponse.status}</p>
      <pre>{JSON.stringify(categoryResponse.data, null, 2)}</pre>
      {/* Add more buttons/components here */}
    </div>
  );
}

export default App;