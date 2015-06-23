'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongojs');
var cors = require('cors');

var app = express();
var db = mongo('ecommerce', ['products']);
app.use(bodyParser.json());
app.use(cors());

app.route('/api/products')
	.get(function(req, res){
		db.productsfind()
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
			res.status(500).send('you need to send an id');
		} else {
			db.products.update( function(err, response){
				if(err){
					res.status(500).json(err);
				} else {
					res.json(response);
				}
			})
		}
		res.send('DELETED')
	})

	.delete(function(req, res){
		db.products.remove()
	})

app.listen(8888, function(){
	console.log('Listening.....');
});
