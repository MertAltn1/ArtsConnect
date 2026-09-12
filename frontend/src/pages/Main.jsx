import Navbar from '/src/components/Navbar'
import ChatPanel from '/src/components/ChatPanel'
import { useEffect, useState } from 'react'
import { apiFetch } from '/src/api'

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

    async function deleteChat(chatId) {
        const response = await apiFetch(`/api/chats/${chatId}/messages/`, "DELETE")

        if(response.ok){
            setChats(chats.filter((chat) => chat.id !== chatId))  /* silineni cikar */
            setSelected(null)   /* panel bosalsin */
        }
    }

    return (
        <div className='mainPage'>
            <Navbar
                setToken={setToken}
                user={user}
                chats={chats}
                setChats={setChats}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPanel selected={selected} user={user} deleteChat={deleteChat}/>
        </div>
    )
}

export default Main