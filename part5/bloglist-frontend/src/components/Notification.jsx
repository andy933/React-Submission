const Notification = ({message}) => {
    if (message.includes('wrong')) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else if (message.includes('new')) {
        return (
            <div className="added">
                {message}
            </div>
        )
    }
}

export default Notification