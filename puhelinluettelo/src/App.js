import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: '' }
  ]) 
  const [newName, setNewName] = useState('')

  const checkName = persons.some(persons => persons.name === newName)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    console.log(newName)
    if (checkName) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    console.log('button clicked', event.target)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

//tästä tuu mittään

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <p>{person.name}</p>)}
      </ul>
    </div>
  )

}

export default App