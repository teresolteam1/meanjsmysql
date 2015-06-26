/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
 
exports.signin = function(req, res) {
    res.render('/', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
    });
};
exports.intax = function(req, res) {
        req.login(user, function(err){
        if(err) return next(err);
        res.render('/users');
      });
    // res.render('users/intax', {
    //     title: '',
    // });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.account_name + '}');
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res,next) {
  // console.log("hey em in session function");
  // passport.authenticate('local', { successRedirect: '/intax',
  //                         failureRedirect: '/'}, function(err, user, info) {
  //     if(err) {
  //        return res.render('/users/signup', {title: 'Sign In', errorMessage: err.message});
  //     } 

  //     if(!user) {
  //        return res.render('/', {title: 'Sign In', errorMessage: info.message});
  //     }
  //     return req.logIn(user, function(err) {
  //        if(err) {
  //           return res.render('/', {title: 'Sign In', errorMessage: err.message});
  //        } else {
  //           return res.redirect('/intax');
  //        }
  //     });
  //  })(req, res, next);
    passport.authenticate('local', function(err, user, info) {
      
    if (err || !user) {
      res.status(405).send(info);
    } else {
      // Remove sensitive data before login
      // user.password = undefined;
      // user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          console.log(info);
          res.json(user,info);
        }
      });
    }
  })(req, res, next);
   // res.redirect('/intax');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var message = null;

    var user = db.account.build(req.body);

    user.provider = 'local';
    user.salt = user.makeSalt();
    //user.account_password = bcrypt.hashSync(req.body.password);
   // console.log(user.salt);
    user.account_password = user.encryptPassword(req.body.account_password);
    //console.log(user.account_password);
    console.log('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');
    
    user.save().success(function(){
      req.login(user, function(err){
        if(err) return next(err);
        res.redirect('/');
      });
    }).error(function(err){
      res.render('users/signup',{
          message: message,
          user: user
      });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    account.find({where : { id: id }}).success(function(user){
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    }).error(function(err){
      next(err);
    });
};
