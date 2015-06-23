'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongojs');
var cors = require('cors');

var app = express();
var db = mongo('ecommerce', ['products']);
app.use(bodyParser.json());
app.use(cors());

app.listen(8888, function(){
	console.log('Listening.....');
});

app.route('/api/products')
	.get(function(req, res){
		var query = {};
		if(req.query.id) {
			query._id = mongo.ObjectId(req.query.id);
		}
		if(req.query.title) {
			query.title = req.query.title;
		}
		db.products.find(query, function(err, response){
			if(err){
				res.status(500).json(err);
			} else {
				res.json(response);
			}
		});
	})

	.post(function(req, res) {
		res.send('it posted');
		db.products.save(req.body, function(err, response){
			if(err){
				res.status(500).json(err);
			} else {
				res.json(response);
			}
		});
	})

	.put(function(req, res){
		if(!req.query.id){
			 return res.status(500).send('you need to send an id');
		} 
		var query = {
			_id: mongo.ObjectId(req.query.id)
		};
			db.products.update(query, req.body, function(err, response){
				if(err){
					res.status(500).json(err);
				} else {
					res.json(response);
				}
			});
		res.send('PUTTED');
	})

	.delete(function(req, res){
		if(!req.query.id){
			res.status(500).send('what is the id?');
		} else {
		db.products.remove({
				_id: mongo.ObjectId(req.query.id)
			} , function(err, response){
				if(err){
					res.status(500).json(err);
				} else {
					res.json(response);
				}
			});
		}
		res.send('DELETED');
	});








