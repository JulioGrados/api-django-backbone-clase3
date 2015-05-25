define([
  'underscore',
  'backbone',
  'models/noticiaModel'
], function(_, Backbone, noticiaModel){

  var noticiasCollection = Backbone.Collection.extend({
      
      model: noticiaModel,
	  url: '/api/noticias/',
     
  });

  return noticiasCollection;

});