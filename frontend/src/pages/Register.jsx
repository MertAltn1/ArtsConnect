import '/src/App.css'
import { useState } from 'react'
import { Link } from 'react-router'
import logo from '/src/assets/logo.png'
import { useNavigate } from 'react-router'
import { apiFetch } from '/src/api'
import AlertMessage from '/src/components/AlertMessage'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    async function register(){
        const data = {
            username,
            email,
            password,
            confirm_password,
            role
        };

        const response = await apiFetch("/api/register/", "POST", data);
        const result = await response.json();
        console.log(result)

        if(response.ok) {
            alert("Registration successful. Please login ")
            navigate("/")
        }else {
            setMessage(result.errors?.__all__?.[0] || "Registration failed.");
        }
    }

    return (
        <div className="authPage">
            <div className='authBox'>
                <div className='authItem'>
                    <img className='authLogo' src={logo} alt="ArtsConnect" />
                </div>

                <div className='authItem'>
                    <div className='authTitle'>Register for ArtsConnect</div>
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
                        className={message.includes("username") ? "inputError" : ""}
                    />
                </div>

                <div className='authItem'>
                    <input 
                        type="text" 
                        value={role}
                        placeholder='Enter your role'
                        onChange={(x)=>setRole(x.target.value)}
                        className={message.includes("role") ? "inputError" : ""}
                    />
                </div>

                <div className='authItem'>
                    <input 
                        type="email" 
                        value={email}
                        placeholder='Enter your email address'
                        onChange={(x)=>setEmail(x.target.value)}
                        className={message.includes("email") ? "inputError" : ""}
                    />
                </div>

                <div className='authItem'>
                    <input 
                        type="password" 
                        value={password}
                        placeholder='Enter your password'
                        onChange={(x)=>setPassword(x.target.value)}
                        className={message.includes("Passwords") ? "inputError" : ""}
                    />
                </div>

                <div className='authItem'>
                    <input 
                        type="password" 
                        value={confirm_password}
                        placeholder='Confirm your password'
                        onChange={(x)=>setConfirm(x.target.value)}
                        className={message.includes("Passwords") ? "inputError" : ""}
                    />
                </div>

                <div className='authItem'>
                    <button className='authButton' onClick={register}>SIGN UP</button>
                </div>

                <div className='authItem authText'>
                    Already have an account?
                    <Link className='authLink' to="/">Please Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Register