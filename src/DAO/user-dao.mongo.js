const User = require('./models/user.model');

class UserDAO {
    async fetchUser(userId) {
        try {
            return await User.findOne({ _id: userId }).exec();
        } catch (error) {
            throw new Error('Failed to fetch user from the database');
        }
    }
  
    async updateUserShoppingCart(userId, cartId) {
        try {
            await User.updateOne({ _id: userId }, { cart: cartId }).exec();
        } catch (error) {
            throw new Error('Failed to update user shopping cart in the database');
        }
    }
}

module.exports = UserDAO;

