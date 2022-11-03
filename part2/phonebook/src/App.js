import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const notify = (msg, type = 'info') => {
    setMessage({ msg, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setNewName('');
    setNewNumber('');

    const existingPerson = persons.find((p) => p.name === nameObject.name);

    if (existingPerson) {
      const ok = window.confirm(
        `${existingPerson.name} is already added to phonebook, update the number?`
      );
      if (ok) {
        personsService
          .update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((savedPerson) => {
            setPersons(
              persons.map((p) => (p.id === existingPerson.id ? savedPerson : p))
            );
            notify(`Updated info of ${savedPerson.name}`);
          })
          .catch((error) => {
            notify(
              `the person '${existingPerson.name}' was had already been from the server`,
              'alert'
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });

        return;
      }
    }

    personsService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      notify(`Added ${returnedPerson.name}`);
    });
  };

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const deletePerson = (id) => {
    const toDelete = persons.find((p) => p.id === id);
    const ok = window.confirm(`Delete ${toDelete.name}`);
    if (ok) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        notify(`Deleted ${toDelete.name}`);
      });
    }
  };

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        handleChange={({ target }) => setFilter(target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
