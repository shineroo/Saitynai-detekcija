

export async function Authenticate(email: string, password: string) {
    const response = await fetch('http://localhost:8080/api/auht/login', {
        method: 'Post',
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    });
    if (!response.ok) {
        throw new Error('response was not ok');
    }
    const data = await response.json();
    return data;
}

export async function GoogleOAuth() {
    const response = await fetch('http://localhost:8080/api/request',{method:'post'});

    const data = await response.json();
    console.log(data);
    window.location.href = data.url;
}

export async function Fetch() {

}