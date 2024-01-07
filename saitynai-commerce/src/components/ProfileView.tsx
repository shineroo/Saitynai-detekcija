import { useEffect, useState } from "react"
import { Userdata } from "../types/types"

export default function ProfileView() {
    const [users, setUser] = useState<Userdata[]>([]);
    const [googleAccount, setGoogleAccount] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8080/api/users/${localStorage['id']}`);
            if (!response.ok) {
                throw new Error('response was not ok');
            }
            
            const data = await response.json();
            if (data.data.length > 0) {
                setUser(data.data);
                setGoogleAccount(false);
            }            
        }

        fetchUser(); 
              
    }, []) 

    return <>
        {!googleAccount &&
            users.map((user) => (
                <div style={{height: "100%"}}>                    
                    <ul className="profile-view">
                        <li>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"/>
                        </li>
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
            <div style={{height: "100%"}}>                    
                <ul className="profile-view">
                    <li>
                        <img src={localStorage['picture']}/>
                    </li>
                    <li>
                        Name: {localStorage['name']}
                    </li>
                </ul>
            </div>
        }
        
    </>
} // https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg