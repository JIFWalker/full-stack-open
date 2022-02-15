import React from 'react'
import { useSelector } from 'react-redux'


const UserData = () => {
    const users = useSelector(state => state.userList)
    const userList = users.map(user => {
        return(
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>)})

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td> </td>
                        <td><b>Blogs Created</b></td>
                    </tr>
                    {userList}
                </tbody>
            </table>
        </div>
    )
}


export default UserData