const router = require('express').Router();
const userModel = require('../../models/user');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

let urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res) => {
  res.render('registration');
});
router.post('/', urlencodeParser, async (req, res) => {
  let data = req.body;
  if (data.email && data.name && data.pass) {
    let emailStatus = await userModel.checkUserEmail(data.email);

    if (!emailStatus) return res.send('email exist');
    data.pass = await bcrypt.hash(data.pass, 10);
    userModel.createUser(data);
    res.redirect('/');
  }
});

module.exports = router;
