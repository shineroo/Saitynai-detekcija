import React, {useState} from 'react';
import Message from './Message';
import ListGroup from './components/ListGroup';

function App(){
  const [data, setData] = useState(null);

  const fetchDataFromAPI = async (link: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${link}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={() => fetchDataFromAPI("categories")}>Fetch Data</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}


export default App;