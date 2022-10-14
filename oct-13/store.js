

const fs = require('fs')

// const book ={
//     title:'Ego is the Enemy',
//     author:'Ryan Holiday'

// }

// const bookJSON = JSON.stringify(book)
// // console.log(bookJSON)


// // const parseData = JSON.parse(bookJSON)
// // console.log(parseData.author)


// fs.writeFileSync('store.json',bookJSON)


const dataBuffer= fs.readFileSync('store.json')
console.log(dataBuffer)
console.log(dataBuffer.toString())

const dataJSON =dataBuffer.toString()
const data =  JSON.parse(dataJSON)
console.log(data)