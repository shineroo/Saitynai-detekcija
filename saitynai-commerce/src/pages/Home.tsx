function navigate(url: string){
    window.location.href = url;
}



async function auth(){                                                                        
    const response = await fetch('http://localhost:8080/api/request',{method:'post'});

    const data = await response.json();
    console.log(data);
    navigate(data.url);
  
}

export default function Home() {
    return <>
        <h1>main page</h1>

        <a>i'd like to go to another page please</a>
        <br/>


    </>
}