function authMiddleware (req, res, next) {
    try {
        if (req.session.user) return next ()
        res.redirect('/login')
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(401).json({ error: error })
    }
}

module.exports = authMiddleware