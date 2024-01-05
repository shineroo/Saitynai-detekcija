import { useEffect } from "react";

function extractTokenFromURL() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('t');
}

// this is gonna need some work
export default function Auth(props: any) {
    useEffect(() => {
        const token = extractTokenFromURL();
        if(token) {
            try {                
                localStorage['token'] = token;
            } catch (erorr) {
                console.log("failed to decode")
            }            
        }         
        userAuthenticated();
    }, [])

    const userAuthenticated = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/authenticated', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage['token']}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('response was not ok');
            }
            const data = await response.json();
            localStorage['picture'] = data.picture;
            localStorage['name'] = data.name;
            localStorage['role'] = data.role;
            console.log(data);
            window.location.href = "/";
        } catch (error) {
            console.error('what the fuck: ', error);
        }
    }

    return <>
    get authorised playa 
    </>
}