const router = require('express').Router();
// const blogs = require('../models/blogs');

router.use('/login', require('./login'));
router.use('/signup', require('./registration'));
router.use('/blog', require('./blog'));
router.get('/', (req, res) => {
  if (req.session.user) return res.render('index', { user: req.session.user });
  res.render('index');
});
router.get('/logout', async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
});

module.exports = router;
