import '../App.css'
import CloseIcon from '@mui/icons-material/Close';

const ChatWallpaper = ({ setWallpaper, setShowWallpaper }) => {
    const colors = ["#080808", "#e8f4ec", "#fde8e8", "#233D54"]

    return (
        <div className='profileOverlay'>
            <div className='profileBox'>
                <div className='profileHeader'>
                    <h2>Wallpaper</h2>
                    <button
                        className='iconButton'
                        onClick={() => setShowWallpaper(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className='colorList'>
                    {colors.map((color) => (
                        <div
                            className='colorItem'
                            key={color}
                            style={{ background: color }}
                            onClick={() => {
                                setWallpaper(color)
                                setShowWallpaper(false)
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatWallpaper
