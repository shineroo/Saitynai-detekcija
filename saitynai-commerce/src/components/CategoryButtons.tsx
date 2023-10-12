import React, { useState, ChangeEvent } from 'react';
import Input from './Input';

// what the fuck. i mean this kind of makes sense but there is most definetly an easier way of doing this
// or maybe not, this is the best i can come up with regardless and its not horrible i think
function CategoryButtons(props: any) {
  const [inputValue, setInputValue] = useState("");
  const [idValue, setIdValue] = useState("");

  const apiUrl = 'http://localhost:3001/api/categories';

  const handleApiCall = async (method: string, urlExtension = '', bodyData: { name: string,} | null = null) => {
    try {
      const requestOptions = {
        method: method, // GET, PUT, POST, DELETE
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyData ? JSON.stringify(bodyData) : null, // null if null, json stringified if not.
      };
      
      // url extension so it goes to apiUrl (/api/categories/) and appends url extension
      // which is either empty or relevant info like id or ?page=x
      const response = await fetch(`${apiUrl}/${urlExtension}`, requestOptions); 
  
      if (!response.ok) {
        props.handleResponse({ status: response.status, data: null });
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      props.handleResponse({ status: response.status, data: result });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state in App with the value from MyComponent
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdValue(event.target.value); // Update the state in App with the value from MyComponent
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <button onClick={() => handleApiCall('POST', '', { name: inputValue })}>Create a new category</button>
        <button onClick={() => handleApiCall('GET', `?page=${parseInt(idValue)}`)}>Get multiple categories</button>
        <button onClick={() => handleApiCall('PUT', `${idValue}`, { name: inputValue })}>Update category</button>
        <button onClick={() => handleApiCall('DELETE', `${idValue}`)}>Delete category</button>
        <button onClick={() => handleApiCall('GET', `${idValue}`)}>Get category info</button>
      </div>

      <Input
        type="text"
        label="value"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="value"
      /> 
      <Input
        type="text"
        label="id"
        value={idValue}
        onChange={handleIdChange}
        placeholder="id"
      /> 
    </div>
  );
}

export default CategoryButtons;
