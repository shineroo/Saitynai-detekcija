import { useEffect, useState } from "react"
import { Userdata } from "../types/types"

export default function ProfileView() {
    const [users, setUser] = useState<Userdata[]>([]);
    

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8080/api/users/${localStorage['id']}`);
            if (!response.ok) {
                throw new Error('response was not ok');
            }
            const data = await response.json();
            setUser(data.data);
        }

        fetchUser();        
    }, []) 

    return <>
        {users.map((user) => (
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
                </ul>
            </div>
        ))}
        
    </>
}