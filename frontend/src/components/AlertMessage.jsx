const AlertMessage = ({ message, type }) => {
    if (!message) return null;

    return (
        <div className={`alertMessage ${type}`}>
            {message}
        </div>
    )
}

export default AlertMessage