import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const addName = (event) => {
    event.preventDefault() // cancel the effect of reloading page
    const NameObject = {
      name: newName, // no need to add braces {} in here
      number: newNumber
    }
    const exist = persons.filter(person => person.name === NameObject.name)
    const find = persons.find(person => person.name === NameObject.name)
    const id = persons.indexOf(find)+1 // getindex to change a specific position data
    console.log(exist)
    if (exist.length > 0) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        personService.update(id, NameObject)
        .then(returnPersons => {setPersons(persons.map(person => person.id !== id ? person : returnPersons))})
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from server`)  
          setTimeout(() => {setMessage(null)}, 5000)       
        })
      }     
    }
    else {
      personService.create(NameObject)
      .then(returnPersons => {
        setPersons(persons.concat(returnPersons)); setMessage(`Added ${newName}`); 
        setTimeout(() => {setMessage(null)}, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.remove(id).then(setPersons(persons.filter(p => p.id !== id)))
    }
  }
  // bug: should set name in the button callback function instead of this one

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

/*   {persons.filter(person => person.name === filterName).map((person, i) => 
    <p key={i}>{person.name} {person.number}</p>)}  */ //completely equal with filter then map

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Number</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(persons => 
      <Persons key = {persons.id} persons={persons} filterName={filterName} 
      deletePersonOf={() => deletePersonOf(persons.id, persons.name)} />)}
      
    </>
  )
  // *** case insensitive can achieve by setting both comparsion variable to low case with toLowerCase()
}

export default App
