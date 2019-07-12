const router = require('express').Router();
const userModel = require('../../models/user');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

let urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res) => {
  res.render('login');
});

router.post('/', urlencodeParser, async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  if (!email || !pass)
    return res.render('login', { isError: true, errorMsg: 'Missing data' });
  let userData = await userModel.loginUser(email);
  if (!userData)
    return res.render('login', { isError: true, errorMsg: 'Wrong user data' });
  let comparePass = await bcrypt.compare(pass, userData.pass);
  if (comparePass) {
    req.session.user = userData.id.toString();
    return res.redirect('/');
  } else {
    return res.render('login', { isError: true, errorMsg: 'Wrong password' });
  }
});
module.exports = router;
