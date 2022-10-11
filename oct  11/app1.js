const chalk = require('chalk')
const get = require('./notes.js')
//validator is used for the validation in correct format
// const validator = require('validator')

// const result = get()

// console.log(result)


// console.log(validator.isEmail('priya@example.com'))
// console.log(validator.isURL('https//:mead.io'))

// msg = chalk.green('Success')
// console.log(msg)
const yargs = require('yargs')


// Customize yargs version
yargs.version('1.1.0')

// Create add 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('Adding a new note!')
    }
})

// Create remove 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing the note')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out all notes')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note')
    }
})

console.log(yargs.argv)