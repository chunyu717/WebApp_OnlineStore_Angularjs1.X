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

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var multer  = require('multer'); 
//var upload = multer({ dest: 'src/assets/images' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/images')
    },
    filename: function (req, file, cb) {
		var ext = require('path').extname(file.originalname);
		ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
        cb(null, file.fieldname + '-' + Date.now() + ext);
  }
})

var upload = multer({ 
	storage: storage
	/*
	dest: 'src/assets/images',
	onFileUploadData: function (file, data, req, res) {
		
	},
	onFileUploadComplete: function (file, req, res) {
	  var fileimage = file.name;
	  req.middlewareStorage = {
		fileimage : fileimage//,
		//otherKey : otherValue
	  }
	}
	*/
 }).single('file')

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


//app.post('/api/photo/upload', upload.single('avatar'), function (req, res, next) {
app.post('/api/photo/upload', function (req, res, next) {
	//console.log('check!');
	//var fileimage = req.middlewareStorage.fileimage;
	upload(req, res, function (err) {
		//console.log('fileimage=' + req.file.filename);
		if (err) {
		  // An error occurred when uploading
		  return res.status(500).json({ success: false, data: err});
		  
		}
		res.json({ success: true, fileimage : req.file.filename }) ; 
		// Everything went fine
	  })
  
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})


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
		var password =   Base64.decode(request.query.password) ;
		
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


app.post('/api/removeProduct',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	
	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		var productId =   request.query.productId ;
		//console.log('productId=' + productId);
		
		var results = [];
		client.query("DELETE FROM products WHERE id=($1)", [productId], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			response.json({ success: true, update : 'ok' }) ; 

		  });
	});
});

app.post('/api/addProduct',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";
	
	var name =   request.body.name ;
	var pricing =   request.body.pricing ;
	var icon =   request.body.icon ;
	var category =   request.body.category ;
	var short_description =   request.body.short_description ;
	var long_description =   request.body.long_description ;
	var icon =   request.body.fileimage ;
	
	var created_at = new Date();
	
	//console.log('resp.data.fileimage=' + fileimage);
	//console.log('category=' + category);
	//console.log('created_at=' + created_at);
	
	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
	  //client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		
		var results = [];
		client.query("INSERT INTO products(name, pricing, icon, category, short_description, long_description, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)", [name,pricing,icon,category,short_description,long_description,created_at], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			response.json({ success: true, insert : 'ok' }) ; 

		  });
	});
});

app.post('/api/updateProduct',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";
	
	var id =   request.body.id ;
	var name =   request.body.name ;
	var pricing =   request.body.pricing ;
	var category =   request.body.category ;
	var short_description =   request.body.short_description ;
	var long_description =   request.body.long_description ;
	
	var updated_at = new Date();
	
	//console.log('resp.data.fileimage=' + fileimage);
	//console.log('category=' + category);
	//console.log('created_at=' + created_at);
	
	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
	  //client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		
		var results = [];
		client.query("UPDATE products SET name=$1, pricing=$2, category=$3, short_description=$4, long_description=$5, updated_at=$6 WHERE id=$7", [name,pricing,category,short_description,long_description,updated_at,id], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			response.json({ success: true, update : 'ok' }) ; 

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

app.get('/api/productDetail',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		var id =   request.query.id ;
		var results = [];
		client.query("SELECT * FROM products WHERE id=($1)", [id], function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}

			response.writeHead(200, { 'Content-Type': 'text/html' });

			var html = '<!DOCTYPE html><html><head><title>My Title</title></head><body>';
			html += 'Some more static content';
			html += 'Some more static content';
			html += 'Some more static content';
			html += 'Some dynamic content';
			html += '</body></html>';

			response.end(html, 'utf-8');
		  });
	});
})


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

app.get('/api/getAllProducts',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		
		var results = [];
		client.query("SELECT * FROM products ORDER BY id DESC", function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			
			return response.json(result.rows);
		  });
	});
})

app.get('/api/getMembers',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		
		var results = [];
		client.query("SELECT * FROM hosen where user_type=1 ORDER BY id", function(err, result) {
			done();

			if(err) {
			  return response.status(500).json({ success: false, data: err});
			}
			
			
			return response.json(result.rows);
		  });
	});
})


app.get('/api/getAllProducts',function(request, response){ 
    var pg = require('pg');
	var conString = "postgres://nodejs:nodejs@localhost/nodejs";

	pg.connect(conString, function(err, client, done) {

	  if(err) {
          done();
          return response.status(500).json({ success: false, data: err});
      }
		
		var results = [];
		client.query("SELECT * FROM products ORDER BY id", function(err, result) {
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

var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
};
	
server.listen(8888,"0.0.0.0",function(){
//server.listen(8888,"122.116.108.112",function(){
//server.listen(8888,"10.144.171.57",function(){
    console.log('server run at http://127.0.0.1:8888/ ');
});





