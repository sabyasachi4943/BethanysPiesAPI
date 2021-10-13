// Bring in the express server and create application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// Use the express Router object
let router = express.Router();

// COnfigure middleware to support JSON data parsing in request object
app.use(express.json());

// synchronous type of call
// let pies =  pieRepo.get();

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  // res.status(200).json({
  //   "status": 200,
  //   "statusText": "OK",
  //   "message": "All pies retrieved.",
  //   "data": pies
  // });

  pieRepo.get(function (data) {
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved.",
        "data": data
      });
  }, function(err){
    next(err);
  });
});

// Create GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  };

  pieRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "ALL pies retrieved.",
      "data": data
    });
  }, function (err) {
    next(err);
  });
});


// Create GET/id to return a single pie
router.get('/:id', function(req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved.",
        "data": data
      });
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function(err){
    next(err);
  });
});

router.post('/', function(req, res, next) {
  pieRepo.insert(req.body, function(data) {
    res.status(201).json({
      "status": 201,
      "statusText": "Created",
      "message": "New Pie Added.",
      "data": data
    });
  }, function(err) {
    next(err);
  });
});


// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
var server = app.listen(8080, function () {
  console.log('Node server is running on http://localhost:8080..');
});

