const { Router } = require('express')
const Users = require('../DAO/models/user.model')
const router = Router()
const passport = require ('passport')

router.post ('/', passport.authenticate('register', {failureRedirect: '/api/users/fail-Register'}),  async (req, res) => {
    try {
        res.status(201).json ({status: 'success', messae: 'Usuario' })
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get ('/fail-Register', (req, res) => {
    console.log ('Fallo registro')
    res.status(400).json({status: 'error',  error: 'bad Request' })
})

router.put('/', async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { cart: cartId } = req.body;
      
        await Users.updateOne({ _id: userId }, { cart: cartId });
      
        req.session.user.cart = cartId;
         
        res.status(200).json({ status: 'updated', message: 'Cart successfully updated' });
    } catch (error) {
        console.error('Failed to update user cart:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/user-cart', async (req, res) => {
    try {
        const { cart: cartId } = req.session;
        if (!cartId) {
            const { _id: userId } = req.user;
            const user = await Users.findOne({ _id: userId }).exec();
            const newCartId = user.cart;

            req.session.cart = newCartId;
            console.log('Retrieved cart id:', newCartId);
            res.status(200).json({ status: 'success', cartId: newCartId });
        }
    } catch (error) {
        console.error('Failed to retrieve user cart:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router