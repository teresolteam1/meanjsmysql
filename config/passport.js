
var passport = require('passport');
var _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var config = require('./config');
var Model = require('../app/models/User');
var bcrypt = require('bcrypt-nodejs');
var _ = require('underscore');
//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.account_name);
});

passport.deserializeUser(function(account_name, done) {
  //console.log("its refreshToken");
   new Model.accounts({account_name: account_name}).fetch().then(function(user) {
var data = user.toJSON();
          if(user){
          new Model.person({id: user.attributes.person_id}).fetch().then(function(user1) {
          var data1 = user1.toJSON();
          var alldata = _.extend(data, data1);
         // console.log(data);
         // console.log(alldata);
          done(null, alldata);
        }); }
          else
          {
            done("login again", null);
          }
      
   
     });
});
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {

//     // Auth Check Logic
  
//     db.account.find({where: {id: id}}).success(function(user){
//         console.log('Session: { id: ' + user.id + ', username: ' + user.account_name + ' }');
//         done(null, user);
//     }).error(function(err){
//         done(err, null);
//     });

// });

//Use local strategy
passport.use(new LocalStrategy(
    {

usernameField: 'email',
passwordField: 'password'
    },
    function(account_name, account_password, done) {

   new Model.accounts({account_name: account_name}).fetch().then(function(data) {
   // console.log("hey em in LocalStrategy function");
      var user = data;
      if(user === null) {//console.log("in passport");
         return done(null, false, {message: 'Invalid username'});
      } else {//console.log("in passport");
         user = data.toJSON();
         if(!bcrypt.compareSync(account_password, user.account_password)) {console.log("in passport");
            return done(null, false, {message: 'Invalid password'});
         } else {
           new Model.person({id: user.person_id}).fetch().then(function(data1){
            var user1 = data1.toJSON();
            //console.log("in passport");
            var has = _.extend(user1, user);
            return done(null, has);
          });
         }
      }
   });
}));
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   function(account_name, account_password, done) {
//        //console.log(account_password);
//     db.account.find({ where: { account_name: account_name }}).success(function(user) {
//       if (!user) {
//         done(null, false, { message: 'Unknown user' });
//       } else if (!user.authenticate(account_password)) {
//         //console.log(account_password);
//               done(null, false, { message: 'Invalid password'});
//       } 
//       else {
//         console.log('Login (local) : { id: ' + user.id + ', username: ' + user.account_name + ' }');
//         done(null, user);
//       }
//     }).error(function(err){
//       done(err);
//     });
//   }
// ));

//    Use twitter strategy
// passport.use(new TwitterStrategy({
//         consumerKey: config.twitter.clientID,
//         consumerSecret: config.twitter.clientSecret,
//         callbackURL: config.twitter.callbackURL
//     },
//     function(token, tokenSecret, profile, done) {
        
//         db.User.find({where: {twitterUserId: profile.id}}).success(function(user){
//             if(!user){
//                 db.User.create({
//                     twitterUserId: profile.id,
//                     name: profile.displayName,
//                     username: profile.username,
//                     provider: 'twitter'
//                 }).success(function(u){
//                     console.log('New User (twitter) : { id: ' + u.id + ', username: ' + u.username + ' }');
//                     done(null, u);
//                 });
//             } else {
//                 console.log('Login (twitter) : { id: ' + user.id + ', username: ' + user.username + ' }');
//                 done(null, user);
//             }
        
//         }).error(function(err){
//             done(err, null);
//         });
//     }
// ));


// // Use facebook strategy
// passport.use(new FacebookStrategy({
//         clientID: config.facebook.clientID,
//         clientSecret: config.facebook.clientSecret,
//         callbackURL: config.facebook.callbackURL
//     },
//     function(accessToken, refreshToken, profile, done) {

//         db.User.find({where : {facebookUserId: profile.id}}).success(function(user){
//             if(!user){
//                 db.User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     username: profile.username,
//                     provider: 'facebook',
//                     facebookUserId: profile.id
//                 }).success(function(u){
//                     console.log('New User (facebook) : { id: ' + u.id + ', username: ' + u.username + ' }');
//                     done(null, u);
//                 })
//             } else {
//                 console.log('Login (facebook) : { id: ' + user.id + ', username: ' + user.username + ' }');
//                 done(null, user);
//             }
//         }).error(function(err){
//             done(err, null);
//         })
//     }
// ));

// //Use google strategy
// passport.use(new GoogleStrategy({
//     returnURL: config.google.callbackURL,
//     realm: config.google.realm
//   },
//   function(identifier, profile, done) {
//     console.log(identifier);
//     console.log(profile);

//     db.User.find({where: {openId: identifier}}).success(function(user){
//         if(!user){
//             db.User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 username: profile.displayName.replace(/ /g,''),
//                 openId: identifier, 
//             }).success(function(u){
//                 console.log('New User (google) : { id: ' + u.id + ', username: ' + u.username + ' }');
//                 done(null, u);
//             })
//         } else {
//             console.log('Login (google) : { id: ' + user.id + ', username: ' + user.username + ' }');
//             done(null, user);
//         }
//     }).error(function(err){
//         done(err, null);
//     });
//   }
// ));

module.exports = passport;

