/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('../models/User');
var _ = require('underscore');

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

exports.location = function(rs){
console.log("i am in location function");

console.log(rs.user);

new Model.tracker({account_id: rs.user.id}).fetch().then(function(data){
           // var user1 = data1;
           console.log(data.attributes.tracker_id);
new Model.tracker_data({tracker_id1: data.attributes.tracker_id}).fetch().then(function(data1){

            console.log(data1);
            console.log(data1.attributes.tracker_data_location);
            //return done(null, user, user1);
          });
});
           // new Model.person({person_id: user.person_id}).fetch().then(function(data1){
           //  var user1 = data1;
           //  console.log("in passport");
           // return done(null, user, user1);
          //});
};
/**
 * Session
 */
exports.session = function(req, res,next) {

    passport.authenticate('local', function(err, user, info) {
      
    if (err || !user) {
      console.log("here");
      res.status(405).send(info);
      
    } else {

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          //console.log(user);

//var has = _.extend(user, info);
        //  var has = user + info;
        console.log(info);
        console.log(user);
        res.send(user);
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
    user.account_password = user.encryptPassword(req.body.account_password);
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
