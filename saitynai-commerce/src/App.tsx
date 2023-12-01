import React, { useState } from 'react';
import './App.css'

function navigate(url: string){
  window.location.href = url;
}

async function auth(){                                                                        
  const response =await fetch('https://commerce-backend-api.azurewebsites.net/api/request',{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function App() {
  const [responseData, setResponseData] = useState<any>(null); // State to hold response data

  async function test() {
    try {
      const response = await fetch('https://commerce-backend-api.azurewebsites.net/', {
        method: 'GET'
      });

      const data = await response.json();
      console.log(data);
      setResponseData(data); // Set response data in state
    } catch (error) {
      console.error('Error fetching data??:', error);
      setResponseData(null); // Reset response data on error
    }
  }

  return (
    <>
      <h1>epiccc</h1>
      <h3>Google OAuth! AND IT WORKS!!! PROBABLY!</h3>

      <button className="btn-auth"  type="button" onClick={()=> auth()}>
      <img className="btn-auth-img" src={"freepngimg.com/download/google/66274-school-google-pearl-button-up-sign-middle.png"} alt='google sign in'/>
      </button>

      {responseData}

      {/* Button to invoke test function */}
      <button className="btn-auth" type="button" onClick={test}>
        Test API Call
      </button>
    </>
  )
}

export default App