var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');
var path = require('path');
var api_key = "key-99008ae76504df2a720c17c9735ad0fa";
var domain = "elektronet.ee";
var mailgun = require('mailgun-js')({apiKey:api_key, domain: domain});

var storage = multer.diskStorage({
    destination: path.join(__dirname, '../../client/uploads'),
    filename: function(req, file, cb){
        var extArray = file.mimetype.split('/');
        var extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + Date.now() + '.' + extension)
    }
})
var upload = multer({storage:storage});


var User = require('../models/user.js');
var Product = require('../models/product.js');
var Picture = require('../models/picture.js');
var Info = require('../models/contactInfo.js');


router.post('/more', function(req, res){
    var moreToCustomer = {
        from: "Elektronet team<info@elektronet.ee>",
        to: req.body.email,
        subject: "We have received your question!",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Notification confirmation</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px;">Hello '+req.body.name+',</td></tr>\
                <tr><td style="padding-bottom:30px;">We have received your email. We are handling your request and will answer you in 24 hours.</td></tr>\
                <tr><td>All the best,</td></tr>\
                <tr><td>Elektronet team</td></tr>\
            </table>\
            </body>\
            </html>'
    }
    var moreToShop = {
        from: "Toote küsimuse liides<info@elektronet.ee>",
        to: "oskarmartinco@gmail.com, wpihor@gmail.com, ivo.laur@elektronet.ee",
        subject: "Toote kohta on lisandunud küsimus",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Toote kohta on küsitud küsimus</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px; font-size: 26px;">Toote jälgimise nimekirja on lisandunud uus klient</td></tr>\
                <tr><td><b>Kliendi email:</b> '+req.body.email+'</td></tr>\
                <tr><td><b>Kliendi nimi:</b> '+req.body.name+'</td></tr>\
                <tr><td><b>Toode:</b> '+req.body.item+'</td></tr>\
                <tr><td><b>Küsimus:</b> '+req.body.question+'</td></tr>\
            </table>\
            </body>\
            </html>'
    }
    mailgun.messages().send(moreToCustomer, function(err, body){
        console.log(body);
    })
    mailgun.messages().send(moreToShop, function(err, body){
        console.log(body);
        if(err){
            res.json({
                msg: "there was error sending mail"
            });
        }else{
            res.json({
                msg: "mail was sent"
            })
        }
    });
})
router.post('/stock', function(req, res){
    var stockToCustomer = {
        from: "Elektronet team<info@elektronet.ee>",
        to: req.body.email,
        subject: "We have been notified!",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Notification confirmation</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px;">Hello Customer,</td></tr>\
                <tr><td style="padding-bottom:30px;">We have added your email to our system. You will be notified when the selected item is available again.</td></tr>\
                <tr><td>Have a good day,</td></tr>\
                <tr><td>Elektronet team</td></tr>\
            </table>\
            </body>\
            </html>'
    }
    var stockToShop = {
        from: "Lisavaru liides<info@elektronet.ee>",
        to: "oskarmartinco@gmail.com, wpihor@gmail.com, ivo.laur@elektronet.ee",
        subject: "Uus toote jälgimise soov",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Lisandunud on uus toote jälgimise soov</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px; font-size: 26px;">Toote jälgimise nimekirja on lisandunud uus klient</td></tr>\
                <tr><td><b>Kliendi email:</b> '+req.body.email+'</td></tr>\
                <tr><td><b>Toode:</b> '+req.body.item+'</td></tr>\
            </table>\
            </body>\
            </html>'
    }

    mailgun.messages().send(stockToCustomer, function(err, body){
        console.log(body);
    })
    mailgun.messages().send(stockToShop, function(err, body){
        console.log(body);
        if(err){
            res.json({
                msg: "there was error sending mail"
            });
        }else{
            res.json({
                msg: "mail was sent"
            })
        }
    });
});

router.post('/order', function(req, res){
    var orderNumber = "EE" + String(Math.floor(Math.random()*(99999-1)+1));
    console.log(orderNumber);
    var parseList = req.body.products;
    var htmlBuilder = "";
    for(i = 0; i < parseList.length; i++){
        console.log(i);
        console.log(parseList[i]);
        htmlBuilder += "<tr><td><b>Item name:</b> "+ parseList[i]['name']+" , <b>Item quantity:</b> "+ parseList[i]['quant'] +"</td></tr>";
        console.log(htmlBuilder);
    }
    console.log("this is the builder: " + htmlBuilder);
    var orderToCustomer = {
        from: "Elektronet team<info@elektronet.ee>",
        to: req.body.email,
        subject: "We have received your order!",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Order confirmation</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px;">Hello '+req.body.firstName+',</td></tr>\
                <tr><td style="padding-bottom:30px;">Thank you for your order. Your confirmation code is '+orderNumber+'</td></tr>\
                <tr><td>Your order is currently being processed. We will provide you a invoice for pre payment. All the</td></tr>\
                <tr><td>selected goods and transportation method will be added to this document.</td></tr>\
                <tr><td>When paying the invoice, please refer to the mentioned confirmation code. Items will be shipped</td></tr>\
                <tr><td style="padding-bottom:30px;">after cleared payment.</td></tr>\
                <tr><td>Have a great day,</td></tr>\
                <tr><td>Elektronet team</td></tr>\
            </table>\
            </body>\
            </html>'
    }
    var orderToShop = {
        from: "Tellimise liides<info@elektronet.ee>",
        to: "oskarmartinco@gmail.com, wpihor@gmail.com, ivo.laur@elektronet.ee",
        subject: "Tehtud on uus tellimus",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Uus tellimus</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px; font-size: 26px;">Tehtud on uus tellimus</td></tr>\
                <tr><td style="padding-bottom:30px;">Tellimuse informatsioon:</td></tr>\
                <tr><td><b>Tellimuse kood:</b> '+orderNumber+'</td></tr>\
                <tr><td><b>Isiku eesnimi:</b> '+req.body.firstName+'</td></tr>\
                <tr><td><b>Isiku perekonnanimi:</b> '+req.body.lastName+'</td></tr>\
                <tr><td><b>Isiku email:</b> '+req.body.email+'</td></tr>\
                <tr><td><b>Isiku telefoninumber:</b> '+req.body.phone+'</td></tr>\
                <tr><td><b>Ettevõte:</b> '+req.body.company+'</td></tr>\
                <tr><td><b>VAT number:</b> '+req.body.vatNumber+'</td></tr>\
                <tr><td><b>Tänav:</b> '+req.body.street+'</td></tr>\
                <tr><td><b>Korter/majaosa:</b> '+req.body.apartment+'</td></tr>\
                <tr><td><b>Maakond:</b> '+req.body.state+'</td></tr>\
                <tr><td><b>Postiindeks:</b> '+req.body.zip+'</td></tr>\
                <tr><td style="padding-bottom: 30px;"><b>Lisainformatsioon:</b> '+req.body.notes+'</td></tr>\
                <tr><td style="padding-bottom: 30px;"><b>Tooted:</b></td></tr>\
                '+htmlBuilder+'\
                <tr><td style="padding-bottom: 30px"></td></tr>\
            </table>\
            </body>\
            </html>'
    }

    mailgun.messages().send(orderToCustomer, function(err, body){
        console.log(body);
    })
    mailgun.messages().send(orderToShop, function(err, body){
        console.log(body);
        if(err){
            res.json({
                msg: "there was error sending mail"
            });
        }else{
            res.json({
                msg: "mail was sent",
                number: orderNumber
            })
        }
    });
});
router.post('/contact', function(req, res){
    var feedBackToCustomer = {
        from: "Elektronet team<info@elektronet.ee>",
        to: req.body.email,
        subject: "Your message has been delivered to us!",
        html: '<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Confirmation on message delivery</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td style="padding-bottom:30px;">Hello '+req.body.name+'</td></tr>\
                <tr><td style="padding-bottom:30px;">We have received your email. We are handling your request and will answer you in 24 hours.</td></tr>\
                <tr><td>All the best,</td></tr>\
                <tr><td>Elektronet team</td></tr>\
            </table>\
            </body>\
            </html>'
    }
    var feedBackToShop = {
        from: "Tagasiside liides<info@elektronet.ee>",
        to: "oskarmartinco@gmail.com, wpihor@gmail.com, ivo.laur@elektronet.ee, mail@jkniest.de",
        subject:"Uus tagasiside elektronet.ee kaudu",
        html:'<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv="Content-Type" content="text/html; chraset=UTF-8"/>\
                <title>Tagasiside elektronet.ee kaudu</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\
            </head>\
            <body style="margin:0; padding:0;">\
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border:none;">\
                <tr><td><b>Isiku nimi: </b>'+req.body.name+'</td></tr>\
                <tr><td><b>Isiku email: </b>'+req.body.email+'</td></tr>\
                <tr><td><b>Teema: </b>'+req.body.subject+'</td></tr>\
                <tr><td><b>Sõnum: </b>'+req.body.message+'</td></tr>\
            </table>\
            </body>\
            </html>'

    }
    mailgun.messages().send(feedBackToCustomer, function(err, body){
        console.log(body);
    })
    mailgun.messages().send(feedBackToShop, function(err, body){
        console.log(body);
        if(err){
            res.json({
                msg: "there was error sending mail"
            });
        }else{
            res.json({
                msg: "mail was sent"
            })
        }
    });
});

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});
router.post('/add', function(req, res){
	Product.create({
		name: req.body.name,
		priceMethod: req.body.priceMethod,
		currency: req.body.currency,
		price: req.body.price,
		information: req.body.information,
        quantity: parseInt(req.body.quantity),
        serial: req.body.serial,
		picture: req.body.pictureArray,
        mainImage: req.body.mainImage,
        keyword: req.body.keywords
	}, function(err, product){
		if(err) res.send(err);
		return res.status(200).json({
			status: "product added"
		});
	});
});
router.post('/update', function(req, res){
    Product.findOne({
        _id: req.body.id
    }, function(err, product){
        if(err)console.log(err);
        console.log(product);
        product.update({
            name: req.body.name,
            price: req.body.price,
            information: req.body.information,
            quantity: parseInt(req.body.quant),
            currency: req.body.currency,
            picture: req.body.pictureArray,
            mainImage: req.body.mainImage,
            keyword: req.body.keywords
        }, function(err, callback){
            if(err)console.log(err);
            res.json({
                msg: "product was updated"
            })
        })
    })
})
router.get('/all', function(req, res){
	Product.find(function(err, products){
		if(err) res.send(err);
		res.json(products);
	});
});
router.post('/delete/:id', function(req, res){
    console.log(req.params.id);
	Product.findOne({
		_id: req.params.id
	}, function(err, product){
		if(err)res.send(err);
		product.remove(function(err){
			console.log("Product was deleted successfully");
		})
		Product.find(function(err, products){
			if(err) console.log(err);
			res.json(products);
		})
	})
})
router.get('/product/:id', function(req, res){
    Product.findOne({
        _id: req.params.id
    }, function(err, product){
        if(err) res.send(err);
        res.json(product);
    })
});
router.post('/update', function(req, res){

	Product.findOne({
		name: req.body.name
	}, function(err, product){
		if(err)res.send(err);
		product.update({
			price: req.body.price,
			information: req.body.information,
		},function(err){
			console.log(err)
		})
		Product.find(function(err, products){
			if(err) console.log(err);
			res.json(products);
		})
	})
})

router.post('/product/picture', upload.single('file'), function(req, res){
	console.log(req.file);
	Picture.create({
		picture: req.file.path
	})
	var str = req.file.path;

    var correctPath = str.replace(/\/data02\/virt61426\/domeenid\/www.elektronet.ee\/elektron\/elektronet\/client\//, '../');
    console.log(correctPath);
    //var correct = str.replace('C:\\xampp\\htdocs\\elektronetfinal\\client\\','../');
    //var correctPath = correct.replace(/\\/g, '/');

    // TODO: This should not be pushed into github
    // correctPath = str.replace('/Users/jkniest/Documents/Development/webstate/elektronet/client/', '../');
    // TODO: End

	res.json(correctPath);
})
router.post('/info/info/add', function(req, res){
    console.log(req.body);
    Info.create({
        title: req.body.title,
        info: req.body.info
    }, function(err, info){
        if(err) res.send(err);
        res.json(info)
    })
})
router.post('/info/get', function(req, res){
    Info.findOne({
        title: 'test'
    },function(err, info){
        if(err) res.send(err);
        res.json(info);
    })
})
router.post('/info', function(req, res){

    Info.findOne({
        title: 'test'
    }, function(err, info){
        console.log(info);
        if(err) res.send(err);
        info.update({
            info: req.body.info
        }, function(err, test){
            if(err) res.send(err);
            console.log(test);
            res.json({
                status: "Contact info was updated"
            })
        })
    })
})

module.exports = router;
