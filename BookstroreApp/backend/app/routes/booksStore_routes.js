module.exports = app =>{
const BooksStore = require('../controllers/booksStore_controller')
var router = require('express').Router();
//const VerifyToken = require('../config/verifyToken');

router.post("/", BooksStore.create);
router.get('/', BooksStore.findAll); 
router.get('/:id', BooksStore.findOne); 
router.put("/:id", BooksStore.update);
router.delete("/:id", BooksStore.delete);
router.put("/updateStatus/:id/:status", BooksStore.updateuserstatus);
app.use('/api/BooksStore',router)    
}