import '../App.css'
import ChatSettings from './ChatSettings'
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import { MoreVert, Search, AttachFile, InsertEmoticon, Send, HorizontalRule } from '@mui/icons-material';

const ChatPanel = ( {selected, user} ) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSettings, setShowSettings] = useState(false)
    const [wallpaper, setWallpaper] = useState("#F2F6FA")

    async function sendMessage() {
        if(!newMessage.trim()) return; /* empty mesaj */

        const response = await apiFetch(`/api/chats/${selected.id}/messages/`, "POST", {
            content: newMessage
        })

        const data = await response.json();
        if(response.ok){
            setMessages([...messages, data]) /* ... eksi mesjaları koru sona ele */
            setNewMessage("")
        }
    }

    useEffect(()=>{
        if(!selected) return

        async function getMessages() {
            const response = await apiFetch(`/api/chats/${selected.id}/messages/`)

            const data = await response.json()
            setMessages(data)
        }

        getMessages()
    }, [selected])

    if(!selected){
        return (
            <div className="chatArea chatEmpty">
                <img className="chatEmptyLogo" src={logo} alt="ArtsConnect" />
                <span className="chatEmptyName">ArtsConnect</span>
            </div>
        )
    }

    return (
        <div className="chatArea">
            <div className="chatHeader">
                <div className="chatHeaderLeft">
                    {selected.user.profile_photo ? (
                        <img
                            className="chatPhoto"
                            src={`http://127.0.0.1:8000${selected.user.profile_photo}`}
                            alt={selected.user.username}
                        />
                    ) : (
                        <div className="chatPhoto"></div>
                    )}
                    <span>{selected.user.username}</span>
                </div>
                    
                <div className="chatHeaderRight">
                    <button className='iconButton'><Search /></button>
                    <div className='posFix'>
                        <button className='iconButton' 
                            onClick={()=>setShowSettings(!showSettings)}><MoreVert/>
                        </button>
                        {showSettings && <ChatSettings setWallpaper={setWallpaper}/>}
                    </div>
                    
                </div>
            </div>

            <div className="messageList" style={{ background: wallpaper}}>
                {messages.map((message) => (
                    <div
                        className={message.sender === user?.username ? "messageMine" : "messageOther"}
                        key={message.id}
                    >
                        <div>{message.content}</div>
                        <small>{new Date(message.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</small>
                    </div>
                ))}
            </div>
            <div className="messageInput">
                <button><AttachFile /></button>
                <input
                    type="text"
                    value={newMessage}
                    placeholder="Type a message..."
                    onChange={(x) => setNewMessage(x.target.value)}
                />
                <button><InsertEmoticon/></button>

                <button onClick={sendMessage} className='sendMessage'><Send/></button>
            </div>
        </div>
    )
}

export default ChatPanel
