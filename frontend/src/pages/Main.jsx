import Navbar from '../components/Navbar'
import ChatPanel from '../components/ChatPanel'
import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

const Main = ( {setToken,user} ) => {
    const [chats, setChats] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(()=>{
        async function getChats() {
            const response = await apiFetch("/api/chats/");
            const data = await response.json()
            setChats(data) 
        }

        getChats()
    }, [])
    return (
        <div className='mainPage'>
            <Navbar 
                setToken={setToken} 
                user={user}
                chats={chats}
                setChats={setChats}
                setSelected={setSelected}
            />
            <ChatPanel selected={selected} user={user}/>
        </div>
    )
}

export default Main