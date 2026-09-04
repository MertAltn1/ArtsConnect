import '../App.css'
import AddUser from './AddUser'
import UserProfile from './UserProfile'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { apiFetch } from '../api'
import { PhotoCameraOutlined, PersonAddAlt1, PersonOutlined, LogoutOutlined } from '@mui/icons-material';

const Navbar = ( {setToken, user, chats, setChats, setSelected } ) => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null)
    const [search, setSearch] = useState("");
    const [showAddUser, setShowAddUser] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const shownPhoto = photo || user?.profile_photo /*yeni foto var mı */

    async function uploadPhoto(x){
        const file = x.target.files[0]
        if(!file) return

        const token = localStorage.getItem("token")

        const formData = new FormData()
        formData.append("profile_photo", file)

        const response = await fetch("http://127.0.0.1:8000/api/profile-photo/", {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`
            },
            body: formData
        })
        const result = await response.json()

        if(response.ok){
            setPhoto(result.profile_photo)
        }
    }

    async function logout(){
        await apiFetch("/api/logout/", "POST", {})

        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    }

    return (
        <div className='navBar'>
            <div>
                <div style={{display:"flex",  gap:'8px', padding:'16px 20px'}}>
                    <img className='navLogo' src={logo} alt="ArtsConnect" />
                    <span id='appName'>ArtsConnect</span>
                </div>
                <div className='profilPart'>
                    <div className='profilPhotoBox'>
                        {shownPhoto ? (
                            <img
                                className="profilPhoto"
                                src={`http://127.0.0.1:8000${shownPhoto}`}
                                alt="Profile"
                            />
                            ) : (
                            <div className="profilPhoto"></div>
                            )}
                        <label className='photoButton' htmlFor='photoInput'>
                            <PhotoCameraOutlined />
                        </label>
                        <input
                            id="photoInput"
                            type="file"
                            accept="image/*"
                            onChange={uploadPhoto}
                            hidden
                        />
                    </div>
                    <span>{user?.username}</span>
                    <p className='roleText'>{user?.role}</p>
                </div>

                <div className='bottomDiv'>
                    <div style={{borderTop:'1px solid #003153'}}>

                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <input 
                            type="search" 
                            placeholder='Search'
                            className='searchChat'
                            value={search}
                            onChange={(x) => setSearch(x.target.value)}
                        />
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <p className='sectionTitle'>CONVERSATIONS</p>
                        <button className='iconButton' onClick={() => setShowAddUser(true)}><PersonAddAlt1 /></button>
                    </div>
                </div>
            </div>

            <div className="chatList">
                {chats
                .filter((chat)=>
                    chat.user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((chat) => (
                    <div
                        className="chatItem"
                        key={chat.id}
                        onClick={()=>setSelected(chat)}
                    >
                        {chat.user.profile_photo ? (
                            <img
                                className="chatPhoto"
                                src={`http://127.0.0.1:8000${chat.user.profile_photo}`}
                                alt={chat.user.username}
                            />
                        ) : (
                            <div className="chatPhoto"></div>
                        )}
                        <div>
                            <div><p>{chat.user.username}</p></div>
                            <p className='roleText'>{chat.user.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='navBottom'>
                <button className='iconButton' onClick={()=>setShowProfile(true)}><PersonOutlined/>Profile</button>
                <button className='logoutButton' onClick={logout}><LogoutOutlined/>Logout</button>
            </div>

            {showAddUser && (
                <AddUser setShowAddUser={setShowAddUser} chats={chats} setChats={setChats} />
            )}
            {showProfile && <UserProfile userId={user.id} setShowProfile={setShowProfile} />}
        </div>
    )
}

export default Navbar