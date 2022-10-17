fs = require('fs')
fs.writeFileSync('notes.txt','hello world')
fs.appendFile("notes.txt", " i am text", (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("File Contents of file after append:",
        fs.readFileSync("notes.txt", "utf8"));
    }
  });
//command argument it store  the input
  const command = process.argv[2]
// process is object it contains all methods 
  console.log(process.argv)
  
  if (command === 'add') {
      console.log('Adding note!')
  } else if (command === 'remove') {
      console.log('Removing note!')
  }



