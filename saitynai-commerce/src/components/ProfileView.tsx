import { useEffect, useState } from "react"
import { Userdata } from "../types/types"

export default function ProfileView() {
    const [users, setUser] = useState<Userdata[]>([]);
    const [googleAccount, setGoogleAccount] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8080/api/users/${localStorage['id']}`);
            if (!response.ok) {
                throw new Error('response was not ok');
            }
            
            const data = await response.json();
            setUser(data.data);
        }

        if (localStorage['token'] == null) {
            fetchUser();  
        } else {
            setGoogleAccount(true);
        }
              
    }, []) 

    return <>
        {!googleAccount &&
            users.map((user) => (
                <div>
                    
                    <ul>
                        <li>
                            Name: {user.given_name} {user.family_name}
                        </li>
                        <li>
                            Email: {user.email}
                        </li>
                        <li>
                            Password: *******
                        </li>
                        <li>
                            <a href="/profile/edit">Change Information</a>
                        </li>
                    </ul>
                </div>
            ))
        }
        {googleAccount &&
            <div>
                <img src={localStorage['picture']} referrerPolicy="no-referrer" height={100}/> 
                <ul>
                    <li>
                        Name: {localStorage['name']}
                    </li>
                </ul>
            </div>
        }
        
    </>
}