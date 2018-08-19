const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('O71X1VWWN1', 'ce75961aec6fc1017d31a198ecb7047a');
const index = client.initIndex('angularzuleikav1');



router.get('/', (req, res, next) => {
  if (req.query.query) {
    index.search({
      query: req.query.query,
      page: req.query.page,
    }, (err, content) => {
      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query
      });
    });
  }
});


module.exports = router;
