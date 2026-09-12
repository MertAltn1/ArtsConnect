import '/src/App.css'
import { useState } from 'react'

const TopicList = ({ topics, selectedTopic, setSelectedTopic, unreadTopics, setUnreadTopics }) => {
    const [newTopic, setNewTopic] = useState("")

    return (
        <div className="topicList">
            {topics.map((topic) => (
                <button
                    className={topic === selectedTopic ? "topicItem topicActive" : "topicItem"}
                    key={topic}
                    onClick={() => {
                        setSelectedTopic(topic)
                        setUnreadTopics(unreadTopics.filter((t) => t !== topic))  /* okundu */
                    }}
                >
                    {topic === "" ? "General" : topic}
                    {unreadTopics.includes(topic) && <span className="unreadDot"></span>}
                </button>
            ))}

            <input
                className="topicInput"
                placeholder="+ Topic"
                value={newTopic}
                onChange={(x) => setNewTopic(x.target.value)}
                onKeyDown={(x) => {
                    if(x.key === "Enter" && newTopic.trim()){
                        setSelectedTopic(newTopic)
                        setNewTopic("")
                    }
                }}
            />
        </div>
    )
}

export default TopicList
