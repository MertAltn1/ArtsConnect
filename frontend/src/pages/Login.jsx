import '../App.css'
import { useState } from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router'
import { apiFetch } from '../api'
import AlertMessage from '../components/AlertMessage'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    async function sentPOST(){
        const data = {
            username,
            password
        };

        const response = await apiFetch("/api/login/", "POST", data);
        const result = await response.json();

        if(response.ok) {
            localStorage.setItem("token", result.token)
            setToken(result.token)
            navigate("/Main")
        }else {
            setMessage(result.error)
        }
    }

    return (
        <div className="authPage">
            <div className='authBox'>
                <div className='authItem'>
                    <img className='authLogo' src={logo} alt="ArtsConnect" />
                </div>

                <div className='authItem'>
                    <div className='authTitle'>Login for ArtsConnect</div>
                </div>
                
                <div className='authItem'>
                    <AlertMessage message={message} type="error" />
                </div>   

                <div className='authItem'>
                    <input 
                        type="text" 
                        value={username}
                        placeholder='Enter your username'
                        onChange={(x)=>setUsername(x.target.value)}
                    />
                </div>

                <div className='authItem'>
                    <input 
                        type="password" 
                        value={password}
                        placeholder='Enter your password'
                        onChange={(x)=>setPassword(x.target.value)}
                    />
                </div>                               

                <div className='authItem' >
                    <button className='authButton' onClick={sentPOST}>LOGIN</button>
                </div>

                <div className='authItem authText'>
                    Don't have an account?
                    <Link className='authLink' to="/register">Sign up</Link>
                </div>

            </div>
        </div>
    )
}

export default Login