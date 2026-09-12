import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

import '/src/App.css'
import useDebounce from '/src/hooks/useDebounce'
import { apiFetch, mediaUrl } from '/src/api'

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
            const alreadyExists = chats.some((chat) => chat.id === data.id)
            if(!alreadyExists){
                setChats([data, ...chats])   /* yeni sohbet uste */
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
                            {found.profile_photo ? (
                                <img
                                    className="chatPhoto"
                                    src={mediaUrl(found.profile_photo)}
                                    alt={found.username}
                                />
                            ) : (
                                <div className="chatPhoto"></div>
                            )}
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
