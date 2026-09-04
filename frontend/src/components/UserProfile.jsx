import '../App.css'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { apiFetch } from '../api'

const UserProfile = ({ userId, setShowProfile }) => {
    const [person, setPerson] = useState(null);

    useEffect(()=>{
        async function getPerson() {
            const response = await apiFetch(`/api/users/${userId}/`)
            const data = await response.json()
            if(response.ok){
                setPerson(data)
            }
        }
        getPerson()
    },[userId])

    
    return (
        <div className='profileOverlay'>
            <div className='profileBox'>
                <div className='profileHeader'>
                    <h2>Profile</h2>
                    <button
                        className='iconButton'
                        onClick={() => setShowProfile(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className='profileTop'>
                    {person?.profile_photo ? (
                        <img className="profilPhoto" src={`http://127.0.0.1:8000${person.profile_photo}`} alt={person.username} />
                    ) : (
                        <div className="profilPhoto"></div>
                    )}

                    <div className='profileTopText'>
                        <span className='profileName'>{person?.username}</span>
                        <p className='roleText'>{person?.role}</p>
                        <small>{person?.department}</small>
                    </div>
                </div>

                <div className='profileDetails'>
                    <p><span className='profileLabel'>Role:</span> {person?.role}</p>
                    <p><span className='profileLabel'>Department:</span> {person?.department}</p>
                    <p><span className='profileLabel'>Contact:</span> {person?.email}</p>

                    <p><span className='profileLabel'>Team:</span></p>

                    <div className='teamList'>
                        {person?.team?.map((member) => (
                            <div className='teamItem' key={member.id}>
                                {member.profile_photo ? (
                                    <img className="teamPhoto" src={`http://127.0.0.1:8000${member.profile_photo}`} alt={member.username} />
                                ) : (
                                    <div className="teamPhoto"></div>
                                )}

                                <span>{member.username}</span>
                                <small>{member.role}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
