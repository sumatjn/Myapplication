var express = require('express');
var cityRouter = express.Router()

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"





function Router(menu){
    cityRouter.route('/')
    .get(function(req,res){

		mongodb.connect(url,function(err,dc){
			if(err){
			  res.status(501).send('Error While Connecting')
			}else{
			  const dbo = dc.db("restaurants");
			  dbo.collection('city').find({}).toArray((err,data) =>{
				if(err){
				  res.status(501).send('Error While fetching')
				}else{
				  res.render('city',{title:'City Page',menu:menu,city:data})
				  //city-city.ejs
				}
			  })
			}
		  })
      //res.render('city',{title:'City Page',menu,city:city})
  })
  
  cityRouter.route('/details/:id')
    .get(function(req,res){
      //res.send('city details')
      var {id} = req.params
      mongodb.connect(url,function(err,dc){
        if(err){
          res.status(501).send('Error While Connecting')
        }else{
          const dbo = dc.db("restaurants"); //database name
          dbo.collection('city').findOne({_id:parseInt(id)},(err,data) =>{
            if(err){
              res.status(501).send('Error While fetching')
            }else{
			  res.render('CityDetails',{menu:menu,details:data})
			  //CityDetails-CityDetails.ejs
            }
          })
        }
      })
  });
  return cityRouter
}


module.exports = Router;