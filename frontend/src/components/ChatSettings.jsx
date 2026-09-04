import {Wallpaper,Delete,HighlightOff} from '@mui/icons-material';

const ChatSettings = ({ setShowWallpaper, setShowSettings, deleteChat }) => {

    return (
        <div className="chatSettings">
            <div className='Item' onClick={()=>{
                setShowWallpaper(true)
                setShowSettings(false)   /* menu acik kalmasin */
            }}>
                <Wallpaper/><p>Set Wallpaper</p>
            </div>
            <div className='Item'><HighlightOff/><p>Clear History</p></div>
            <div className='Item' onClick={deleteChat}>
                <Delete/><p style={{color:'red'}}>Delete Chat</p>
            </div>
        </div>
    )
}

export default ChatSettings