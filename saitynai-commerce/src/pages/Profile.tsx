export default function Profile() {
    return <>
        {localStorage['name']}
        {localStorage['picture']}
        {localStorage['role']}
    </>
}