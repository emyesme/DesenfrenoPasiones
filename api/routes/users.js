var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let dataArray = [
    {name: "ja", age: 12},
    {name: "je", age: 14},
    {name: "ji", age: 13}
  ]

  res.json({
    data: dataArray
  })
});

module.exports = router;
