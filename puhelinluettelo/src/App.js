import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] =useState('')
  const [showAll, setShowAll] = useState(false)
  const [search, setSearch] =useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')
  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    console.log(search)
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    console.log(id)
    console.log(name)
    const accepted = window.confirm(`Delete ${name}?`)
    if (accepted) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
 
    }
 
  }
 
  const getId = () => {
    let suurin = 0
    for (let index = 0; index < persons.length; index++) {
      if (persons[index].id > suurin) {
        suurin = persons[index].id
      }
        
      }
      return(suurin +1)
      
    }
   


  const addPerson = (event) => {
    event.preventDefault()
    
    if (checkName) {
      window.alert(`${newName} is already added to phonebook`);
      setNewNumber('')
      setNewName('')
    }
    
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: getId(),
      }
      
      personService
        .create(personObject)
        .then(response => {
          console.log(newName)
          setPersons(persons.concat(personObject))
          setNewNumber('')
          setNewName('')
        })
    }
  }


  const checkName = persons.some(persons => persons.name.toLowerCase() === newName.toLowerCase())

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>Add new</h2>
      <Form
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
        
      <h2>Numbers</h2>
      <div>
          <ul>{personsToShow.map((person,i) => <Person key={i} person={person} handleDelete={handleDelete} />)}</ul>
        </div>
    </div>
  )

}

export default App