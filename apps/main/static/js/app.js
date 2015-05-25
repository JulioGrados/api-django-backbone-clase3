define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/noticiasView',
  'routes/rutas'
], function($, _, Backbone, noticiasView, rutas){
  var initialize = function(){
    rutasApp = new rutas();

    new noticiasView();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});