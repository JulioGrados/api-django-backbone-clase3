require.config({
  baseUrl: 'static/js',
  paths: {
    jquery: 'vendor/jquery',
    json2: "vendor/json2",
    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone',
    text: "vendor/text",
    tpl: "vendor/underscore-tpl"
  },
  shim: {
  	underscore: {
  		exports: "_"
  	},
  	
  	backbone: {
  		deps: ["jquery", "underscore", "json2"],
  		exports: "Backbone"
  	},

  	tpl: ["text"]
  }

});

require(['app'], function(App){
  App.initialize();
});