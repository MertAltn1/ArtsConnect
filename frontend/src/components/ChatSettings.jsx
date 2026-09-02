import {Wallpaper,Delete,HighlightOff} from '@mui/icons-material';

const ChatSettings = ({ setWallpaper }) => {

    return (
        <div className="chatSettings">
            <div className='Item' onClick={()=>setWallpaper("grey")}>
                <Wallpaper/><p>Set Wallpaper</p>
            </div>
            <div className='Item'><HighlightOff/><p>Clear History</p></div>
            <div className='Item'><Delete/><p style={{color:'red'}}>Delete Chat</p></div>
        </div>
    )
}

export default ChatSettings