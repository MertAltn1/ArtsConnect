import '/src/App.css'
import ChatSettings from '/src/components/ChatSettings'
import ChatWallpaper from '/src/components/ChatWallpaper'
import UserProfile from '/src/components/UserProfile'
import EmojiPanel from '/src/components/EmojiPanel'
import TopicList from '/src/components/TopicList'
import logo from '/src/assets/logo.png'
import useDebounce from '/src/hooks/useDebounce'
import { useEffect, useRef, useState } from 'react'
import { apiFetch, API_URL, WS_URL } from '/src/api'
import { MoreVert, Search, AttachFile, InsertEmoticon, Send } from '@mui/icons-material';

const ChatPanel = ( {selected, user, deleteChat} ) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSettings, setShowSettings] = useState(false)
    const [wallpaper, setWallpaper] = useState(localStorage.getItem("wallpaper") || "#F2F6FA")
    const [showWallpaper, setShowWallpaper] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [socket, setSocket] = useState(null)
    const [selectedTopic, setSelectedTopic] = useState("")   /* "" = Genel */
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [unread, setUnread] = useState([])   /* okunmamis mesaji olan konular */

    const topicRef = useRef(selectedTopic)

    useEffect(() => {
        topicRef.current = selectedTopic   /* onmessage guncel konuyu buradan okusun */
    }, [selectedTopic])

    const searchText = useDebounce(search, 300)  /* her harfte listeyi cizmesin */

    const messageTopics = messages.map((m) => m.topic)

    /* "" hep dursun, yeni yazilan konu da mesaji yokken gorunsun */
    const topics = [...new Set(["", selectedTopic, ...messageTopics])]

    function sendMessage() {
        if(!newMessage.trim()) return; /* empty mesaj */

        socket.send(JSON.stringify({ content: newMessage, topic: selectedTopic }))

        setNewMessage("")   /* ekrana basmayi websocket yapiyor */
    }

    useEffect(()=>{
        if(!selected) return

        async function getMessages() {
            const response = await apiFetch(`/api/chats/${selected.id}/messages/`)

            const data = await response.json()
            setMessages(data)
        }

        getMessages()
        setSelectedTopic("")   /* sohbet degisince Genel'e don */
        setUnread([])          /* isaretler yeni sohbete tasinmasin */
    }, [selected])

    useEffect(()=>{
        if(!selected) return

        const token = localStorage.getItem("token")
        const ws = new WebSocket(`${WS_URL}/ws/chat/${selected.id}/${token}/`)

        ws.onmessage = (x) => {
            const message = JSON.parse(x.data)
            setMessages((old) => [...old, message])  /* eski liste React'ten gelsin */

            if(message.topic !== topicRef.current){  /* bakmadigim konuya geldi */
                setUnread((old) => [...old, message.topic])
            }
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
                            src={`${API_URL}${selected.user.profile_photo}`}
                            alt={selected.user.username}
                        />
                    ) : (
                        <div className="chatPhoto"></div>
                    )}
                    <span>{selected.user.username}</span>
                </div>
                    
                <div className="chatHeaderRight">
                    {showSearch && (
                        <input
                            className='searchMessage'
                            placeholder='Search in chat'
                            value={search}
                            onChange={(x) => setSearch(x.target.value)}
                        />
                    )}
                    <button className='iconButton' onClick={()=>setShowSearch(!showSearch)}>
                        <Search />
                    </button>
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

            <TopicList
                topics={topics}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                unread={unread}
                setUnread={setUnread}
            />

            {showProfile && (
                <UserProfile userId={selected.user.id} setShowProfile={setShowProfile} />
            )}

            {showWallpaper && (
                <ChatWallpaper setWallpaper={setWallpaper} setShowWallpaper={setShowWallpaper} />
            )}

            <div className="messageList" style={{ background: wallpaper}}>
                {messages
                .filter((m) => m.topic === selectedTopic)
                .filter((m) => m.content.toLowerCase().includes(searchText.toLowerCase()))
                .reverse()   /* kutu ters oldugu icin liste de ters basiliyor */
                .map((message) => (
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
