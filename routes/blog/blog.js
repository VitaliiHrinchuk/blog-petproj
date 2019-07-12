const router = require('express').Router();
const bodyParser = require('body-parser');
const blogModel = require('../../models/blogs');

let urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res) => {
  res.render('blog-post');
});
router.post('/create', urlencodeParser, async (req, res) => {
  let data = req.body;
  if (
    data.title &&
    data.subtitle &&
    data.text &&
    // data.img &&
    data.tag
  ) {
    data.image = 'No image';
    data.author_id = 2;
    await blogModel.putBlog(data);
    res.send('ok');
  } else {
    res.render('blog-create', { isError: true, errorMsg: 'Missing data' });
  }
});
router.get('/create', async (req, res) => {
  res.render('blog-create');
});
module.exports = router;
