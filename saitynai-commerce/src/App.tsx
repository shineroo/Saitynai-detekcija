
import './App.css'

function navigate(url: string){
  window.location.href = url;
}

async function auth(){
  const response =await fetch('http://localhost:3001/api/request',{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function App() {


  return (
    <>
<h1>epiccc</h1>
<h3>Google OAuth! AND IT WORKS!!! PROBABLY!</h3>

<button className="btn-auth"  type="button" onClick={()=> auth()}>
            <img className="btn-auth-img" src={"freepngimg.com/download/google/66274-school-google-pearl-button-up-sign-middle.png"} alt='google sign in'/>
            </button>
    </>
  )
}

export default App