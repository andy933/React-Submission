import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
    .get(baseUrl)
    .then(response => {
        setResources(response.data)
        console.log(resources)
    })
  }, [])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource).then(setResources(resources.concat(resource)))
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}