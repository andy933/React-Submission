const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    else if (message.includes('add')) {
        return (
            <div className = 'action'>
                {message}
            </div>
        )
    }
    else if (message.includes('remove')) {
        return (
            <div className = 'action'>
                {message}
            </div>
        )
    }
    else if (message.includes('fail')) {
        return (
            <div className = 'error'>
                {message}
            </div>
        )
    }
}

export default Notification