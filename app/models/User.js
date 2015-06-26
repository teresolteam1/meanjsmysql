var DB = require('../../config/sequelize').DB;

var accounts = DB.Model.extend({
   tableName: 'accounts',
   idAttribute: 'id',
});
var person = DB.Model.extend({
   tableName: 'person',
   idAttribute: 'person_id',
});

module.exports = {
   accounts: accounts,
   person: person
};
// /**
// 	* User Model
// 	*/

// var crypto = require('crypto');
// var bcrypt = require('bcrypt-nodejs');

// module.exports = function(sequelize, DataTypes) {

// var DB = require('./db').DB;

// var accounts = DB.Model.extend({
//    tableName: 'accounts',
//    idAttribute: 'id',
// },

// 	// var account = sequelize.define('account', 

// 	// 	{
// 	// 		account_name: DataTypes.STRING,
// 	// 		account_password: DataTypes.STRING

// 	// 	},

// 		{
// 			instanceMethods: {
// 				authenticate: function(password){
// 					return bcrypt.compareSync(password, this.account_password);
// 				},
// 				encryptPassword: function(password) {
// 					console.log(password);
// 					var a = bcrypt.hashSync(password); 
// 					return a;
// 				}
// 			}
// 			// associate: function(models) {
// 			// 	User.hasMany(models.Article);
// 			// }
// 		}

// 	);

// 	return accounts;
// };