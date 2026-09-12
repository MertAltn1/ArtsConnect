import '/src/App.css'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const ChatWallpaper = ({ wallpaper, setWallpaper, setShowWallpaper }) => {
    const colors = ["#F2F6FA", "#080808", "#e8f4ec", "#fde8e8", "#233D54"]  /* ilki varsayilan */

    return (
        <div className='profileOverlay'>
            <div className='profileBox wallpaperBox'>
                <div className='profileHeader'>
                    <h2>Wallpaper</h2>
                    <button
                        className='iconButton'
                        onClick={() => setShowWallpaper(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <p className='wallpaperHint'>Choose a background for this chat</p>

                <div className='colorList'>
                    {colors.map((color) => (
                        <div
                            className={color === wallpaper ? "colorItem colorActive" : "colorItem"}
                            key={color}
                            style={{ background: color }}
                            onClick={() => {
                                localStorage.setItem("wallpaper", color)  /* yenilenince kaybolmasin */
                                setWallpaper(color)
                                setShowWallpaper(false)
                            }}
                        >
                            {color === wallpaper && (
                                <span className="colorCheckBadge">
                                    <CheckIcon className="colorCheck" />
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatWallpaper
