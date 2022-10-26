const Router = require('express')
const router = new Router()
const subscriptionController = require('../controller/subscription.controller')
const authToken = require("../middleware/auth");
const checkAdmin = require("../utils/checkAdmin");

router.post('/subscription', authToken, checkAdmin, subscriptionController.createSubscription)
router.get('/subscription', authToken, subscriptionController.getSubscriptions)
router.get('/subscription/:id', authToken, subscriptionController.getSubscription)
router.put('/subscription', authToken, checkAdmin, subscriptionController.updateSubscription)
router.delete('/subscription/:id', authToken, checkAdmin, subscriptionController.deleteSubscription)
router.put('/subscription/user', authToken, subscriptionController.updateUserSubscription)

module.exports = router