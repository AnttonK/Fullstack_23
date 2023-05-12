import { useLayoutEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [search, setSearch] = useState('')

  const checkName = persons.some(persons => persons.name === newName)

  const addPerson = (event) => {
    event.preventDefault()
   
    if (checkName) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
    console.log(newName)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    console.log('button clicked', event.target)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
 
  const personsToShow = showAll
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>Add new person</h2>
      <Form addPerson ={addPerson} newName={newName}
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person,i) => <Person key={i} person = {person}/>)}
      </ul>
    </div>
  )

}

export default App