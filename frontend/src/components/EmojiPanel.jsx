const EmojiPanel =({ onEmojiSelect }) =>{
    const emojis = ["😀", "😅", "👍", "👎","👏","🙏","🎉"]

    return (
        <div className="emojiPanel">
            {emojis.map((emoji)=>(
                <button
                    key={emoji}
                    className="emoji"
                    onClick={() => onEmojiSelect(emoji)}
                >
                    {emoji}
                </button>
            ))}
        </div>
    )
}

export default EmojiPanel