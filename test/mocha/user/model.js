/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../../app');
var db = require('../../../app/models/User');


//Globals
var account;
var account2;

//The tests
describe('<Unit Test>', function() {
    describe('Model test:', function() {
        before(function(done) {
            done();
        });

        describe('account model', function() {
            it('should be able to connect with accounts model', function(done) {
                new db.accounts().fetch().then(function(use) {
                    done();

                });
            });
        });
        describe('person model', function() {
            it('should be able to connect with person model', function(done) {
                new db.person().fetch().then(function(use) {
                    done();

                });
            });
        });
        describe('tracker model', function() {
            it('should be able to connect with tracker model', function(done) {
                new db.tracker().fetch().then(function(use) {
                    done();

                });
            });
        });
        describe('tracker_data model', function() {
            it('should be able to connect with tracker_data model', function(done) {
                new db.tracker_data().fetch().then(function(use) {
                    done();

                });
            });
        });
        describe('model roles', function() {
            it('should be able to connect with roles model', function(done) {
                new db.role().fetch().then(function(use) {
                    done();

                });
            });
        });
        describe('model abc', function() {
            it('should be able to connect with abc models', function(done) {
                new db.abc().fetch().then(function(use) {
                    done();

                });
            });
        });

        after(function(done) {
            done();
        });
    });
});