'use strict'

var webdriverio = require('webdriverio');
var selenium = require('selenium-standalone');

describe('Test', function() {
  
  it('should work', function(done) {
    this.timeout(30000);

    var webdriverOptions = {
        desiredCapabilities: {
            browserName: 'safari'
        },
        logLevel: 'none'//'verbose'
    };

    selenium.start({
      seleniumArgs: []
    }, function(err, child){
    
        if(err){
          console.error(err);
          return done();
        }
    
        child.stderr.on('data', function(data){
            console.error(data.toString());
        });

        var client = webdriverio.remote(webdriverOptions);
    
        client.on('end', function(e) {
            setTimeout(function(){
              console.log('killing child');
                child.kill();
                done();
            }, 1000);
        });
        
        client
          .init()
          .url('https:/www.google.com')
          .executeAsync(function(done) {
            done('done');
          }).then(function(ret) {
              console.log(ret);
          })
          .catch(function(e) {
            console.error(e);
    	    })
          .end();
    });

  })
})
