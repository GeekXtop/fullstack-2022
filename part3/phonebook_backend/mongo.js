const mongoose = require('mongoose')
require('dotenv').config()

// const Person = require('./models/person.js')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://geekxtop:${password}@cluster0.omyigex.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  Person.findOne({ name: process.argv[3] }).then((person) => {
    if (person) {
      console.log(`number: ${person.number}`)
    } else {
      console.log('not found')
    }
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}
