const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  //if (true) return null

  return (
    <div>
      { 
        notification && (
        <div style={style}>
          {notification}
        </div>
        )
      }
    </div>
  )
}

export default Notification
/* import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      { 
        notification && (
        <div style={style}>
          {notification}
        </div>
        )
      }
    </div>
  )
}

export default Notification */