const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('Added'))  {
        return (        
            <div className='add'>
                {message}
            </div>
        )
    }

    if (message.includes('removed'))  {
        return (        
            <div className='error'>
                {message}
            </div>
        )
    }

    if (message.includes('fail')) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    return (
        <div >
            
        </div>
    )
}

export default Notification