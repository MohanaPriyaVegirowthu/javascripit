module.exports = app =>{
const UserBookSubscription = require('../controllers/user_Booksubscriptions_controller')
var router = require('express').Router();
//const VerifyToken = require('../config/verifyToken');

	router.post("/", UserBookSubscription.create);
	router.get('/', UserBookSubscription.findAll); 
	router.get('/:id', UserBookSubscription.findOne); 
	router.put("/:id", UserBookSubscription.update);
	router.delete("/:id", UserBookSubscription.delete);
    router.get("/getSubscriptionCount", UserBookSubscription.getSubscriptionCount);
	app.use('/api/Subscription',router)    
}