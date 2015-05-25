define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/noticiasView',
  'routes/rutas'
], function($, _, Backbone,  noticiasView, rutas){

  var startAplication = function(){
  	
  	rutasApp = new rutas();

  	new noticiasView();

    Backbone.history.start();
  };

  return { 
    startAplication: startAplication
  };
  
});

