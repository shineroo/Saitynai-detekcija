export default function Navbar() {
    const role = localStorage['role']
    const picture = localStorage['picture']
    
    function handleSignOut() {
        localStorage.clear();
        window.location.href = '/';
    };

    return <nav className="navvy">
        <a href="/" className="site-title">Detekcija</a>
        <ul>
            {role == "admin" && 
                <li>
                    <a href="/admin">Admin Panel</a>
                </li>
            }
            <li>
                <a href="/catalog" >Catalog</a>
            </li>
            <li>
                <a href="/contacts">Contacts</a>
            </li>
            <li>
                <a href="/privacy">Privacy Policy</a>
            </li>
            {role && ( //role is set           
            <li>    
                <a href="/profile">Profile</a>            
                <img src={picture} referrerPolicy="no-referrer" height={30}/>
            </li>
            )}
            {role ? ( //role is set           
            <li>    
                <a onClick={handleSignOut}>Sign out</a>
            </li>
            ) : ( // role is not set
            <li>                
                <a href="login">Sign In</a>
            </li>    
            )}
        </ul>
    </nav>
}