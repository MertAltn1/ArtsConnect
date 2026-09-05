import '../App.css'
import ChatSettings from './ChatSettings'
import ChatWallpaper from './ChatWallpaper'
import UserProfile from './UserProfile'
import EmojiPanel from './EmojiPanel'
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react'
import { apiFetch, WS_URL } from '../api'
import { MoreVert, Search, AttachFile, InsertEmoticon, Send, HorizontalRule } from '@mui/icons-material';

const ChatPanel = ( {selected, user, deleteChat} ) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSettings, setShowSettings] = useState(false)
    const [wallpaper, setWallpaper] = useState("#F2F6FA")
    const [showWallpaper, setShowWallpaper] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [socket, setSocket] = useState(null)

    function sendMessage() {
        if(!newMessage.trim()) return; /* empty mesaj */

        socket.send(JSON.stringify({ content: newMessage }))

        setNewMessage("")   /* ekrana basmayi websocket yapiyor */
    }

    function addEmoji(emoji) {
        setNewMessage(newMessage + emoji);
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

    useEffect(()=>{
        if(!selected) return

        const token = localStorage.getItem("token")
        const ws = new WebSocket(`${WS_URL}/ws/chat/${selected.id}/${token}/`)

        ws.onmessage = (x) => {
            const message = JSON.parse(x.data)
            setMessages((eski) => [...eski, message])  /* eski liste React'ten gelsin */
        }

        setSocket(ws)

        return () => ws.close()   /* sohbet degisince baglantiyi kapat */
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
                <div className="chatHeaderLeft" onClick={()=>setShowProfile(true)}>
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
                        {showSettings && (
                            <ChatSettings
                                setShowWallpaper={setShowWallpaper}
                                setShowSettings={setShowSettings}
                                deleteChat={()=>deleteChat(selected.id)}
                            />
                        )}
                    </div>
                    
                </div>
            </div>

            {showProfile && (
                <UserProfile userId={selected.user.id} setShowProfile={setShowProfile} />
            )}

            {showWallpaper && (
                <ChatWallpaper setWallpaper={setWallpaper} setShowWallpaper={setShowWallpaper} />
            )}

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
                <div className='posFix'>
                    <button onClick={()=>setShowEmoji(!showEmoji)}><InsertEmoticon/></button>
                    {showEmoji && (
                        <EmojiPanel onEmojiSelect={(emoji)=>setNewMessage(newMessage + emoji)} />
                    )}
                </div>

                <button onClick={sendMessage} className='sendMessage'><Send/></button>
            </div>
        </div>
    )
}

export default ChatPanel
