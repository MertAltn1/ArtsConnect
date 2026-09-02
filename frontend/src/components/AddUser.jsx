import '../App.css'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useDebounce from '../hooks/useDebounce'
import { apiFetch } from '../api'

const AddUser = ({ setShowAddUser, chats, setChats }) => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);

    const searchText = useDebounce(username, 300)

    useEffect(()=>{
        async function getUsers() {
            const response = await apiFetch(`/api/users/search/?username=${searchText}`)

            const data = await response.json()

            if(response.ok){
                setUsers(data)
            }
        }

        getUsers()
    }, [searchText])

    async function addUser(id){
        const response = await apiFetch("/api/chats/", "POST", {
            user_id: id
        })
        const data = await response.json()

        if(response.ok){
            const zatenVar = chats.some((chat) => chat.id === data.id)
            if(!zatenVar){
                setChats([...chats, data])
            }
            setShowAddUser(false)
        }
    }

    return (
        <div className='addUserOverlay'>
            <div className='addUserBox'>

                <div className='addUserHeader'>
                    <h2>Add New Contact</h2>

                    <button
                        className='iconButton'
                        onClick={() => setShowAddUser(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <input 
                    type="search" 
                    placeholder="Search by username"
                    className='addUserSearch'
                    value={username}
                    onChange={(x) => setUsername(x.target.value)}
                />

                <div className='addUserList'>
                    {users.map((found) => (
                        <div className='addUserItem' key={found.id}>
                            <div className='chatPhoto'></div>
                            <div>
                                <div>{found.username}</div>
                                <small>{found.role}</small>
                            </div>
                            <button className='addButton' onClick={() => addUser(found.id)}>Add</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AddUser
