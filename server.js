var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);




app.use(express.static('dist'));


var session = require('client-sessions');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


app.all('*', function(req, res,next) {

    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };


    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
		//res.sendStatus(403);
		//res.status(403).json({ success: false, data: 'gg'});
        next();
    }


});

app.post('/api/authenticate',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
	  //client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		var username =   request.query.username ;
		var password =   request.query.password ;
		//console.log('username = ' + username ) ; 
		var results = [];
		client.query("SELECT * FROM hosen WHERE username=($1)", [username], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			//console.log('result.rows[0].password=' + result.rows[0].username);
			//console.log('result.rows[0].password=' + result.rows[0]);
			if ( result.rows[0] !== undefined && result.rows[0].password === password ){ 
				request.session.user = username;
				response.json({ success: true, auth : 'ok' }) ; 
			}else{
				request.session.reset();
				response.json({ success: true, auth : 'fail' }) ; 
			}

		  });
	});
});

app.post('/api/logout',function(request, response){ 
    request.session.reset();
	response.json({ success: true, logout : 'ok' }) ; 
});


app.post('/api/createUser',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          console.log(err);
          return response.status(500).json({ success: false, data: err});
        }
	  //client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		var username =   request.query.username ;
		var password =   request.query.password ;
		
		var email =   request.query.email ;
		var address =   request.query.address ;
		var mobile =   request.query.mobile ;
		
		var results = [];
		var query = client.query("INSERT INTO hosen(username, password) VALUES (($1),($2),($3),($4),($5),($6),($7))", [username,password], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});	//console.error('error running query', err);
			}
			response.json({ create : 'ok' }) ; 
		  });
		
	});
});


app.post('/api/itemReview',function(request, response){ 
	var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
	
		var username =   request.query.username ;
		var id =   request.query.id ;
		
		var results = [];
		client.query("UPDATE products SET rating_count=rating_count +1 WHERE id=($1)", [id], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			response.json({ success: true, update : 'ok' }) ; 

		  });
	});
});

app.get('/api/getAccessoryProducts',function(request, response){
	//if (request.session && request.session.user) {
		var pg = require('pg');
		var conString = "postgres://nodejs:nodejs@localhost/nodejs";

		pg.connect(conString, function(err, client, done) {

		  if(err) {
			  done();
			  return response.status(500).json({ success: false, data: err});
		  }
			
			var results = [];
			client.query("SELECT * FROM products where category='accessory' ORDER BY id", function(err, result) {
				done();

				if(err) {
				  return response.status(500).json({ success: false, data: err});
				}				
				return response.json(result.rows);
			  });
		});
	//} else {
		//return response.status(403).json({ success: false, data: '403'});
	//}
});

app.get('/api/groupBuying',function(request, response){
	if (request.session && request.session.user) {
		var pg = require('pg');
		var conString = "postgres://nodejs:nodejs@localhost/nodejs";

		pg.connect(conString, function(err, client, done) {

		  if(err) {
			  done();
			  return response.status(500).json({ success: false, data: err});
		  }
			
			var results = [];
			client.query("SELECT * FROM products where category='accessory' ORDER BY id", function(err, result) {
				done();

				if(err) {
				  return response.status(500).json({ success: false, data: err});
				}				
				return response.json(result.rows);
			  });
		});
	} else {
		return response.status(403).json({ success: false, data: '403'});
	}
});


app.get('/api/getShoesProducts',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";
	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		
		var results = [];
		client.query("SELECT * FROM products where category='shoes' ORDER BY id", function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			
			return response.json(result.rows);
			//console.log('result.rows[0].password=' + result.rows[0].username);
			/*
			console.log('result.rows[0].password=' + result.rows[0]);
			if ( result.rows[0] !== undefined && result.rows[0].password === password ) 
				response.json({ success: true, auth : 'ok' }) ; 
			else
				response.json({ success: true, auth : 'fail' }) ; 
			*/

		  });
	});
})

app.get('/api/getClothesProducts',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		
		var results = [];
		client.query("SELECT * FROM products where category='clothes' ORDER BY id", function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			
			return response.json(result.rows);
		  });
	});
})


/*
app.post('/api/authenticate2',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          console.log(err);
          return response.status(500).send(json({ success: false, data: err}));
        }
	  //client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		var username =   request.query.username ;
		var password =   request.query.password ;
		
		var results = [];
		var query = client.query("SELECT * FROM hosen WHERE username=($1)", [username]);
		
		console.log('query=' + query);
		
		query.on('row', function(row) {
			//console.log('row=' + row.username);
			if(row.password === password)
				results.push({auth : 'ok'});
			else
				results.push({auth : 'fail'});
            //results.push(row);s

        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
			//console.log('results=' + results[0].username);
            return response.json(results);
        });	
	});
});

*/

server.listen(8888,"0.0.0.0",function(){
//server.listen(8888,"122.116.108.112",function(){
//server.listen(8888,"10.144.171.57",function(){
    console.log('server run at http://127.0.0.1:8888/ ');
});





