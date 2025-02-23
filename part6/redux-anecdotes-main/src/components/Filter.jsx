//import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = (props) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value 
    //event.target.filter.value = ''
    //dispatch(filterChange(filter))
    dispatch({ type: 'filterType/createFilter', payload: filter })
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        <form>
            filter <input name='filter' onChange={handleChange} />
        </form>
    </div>
  )
}

export default Filter