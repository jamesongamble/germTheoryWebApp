var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'),
    path        = require('path'); // our custom middleware for jwt

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var locationRouter = express.Router();


  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + './../../client')); 
  app.use("/mobile", express.static(__dirname + "./../../mobile/www"));

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/locations', locationRouter); // location router for all generalizedlocation data

  // app.get('/mobile', function(req, res){
  //   console.log("trying");
  //   res.status(200).sendFile(path.resolve(__dirname + "./../../mobile/www/index.html"));
  // });

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/locations', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../locations/locationRoutes.js')(locationRouter);
};
