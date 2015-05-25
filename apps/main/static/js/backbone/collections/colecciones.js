var app = app || {};

var noticasCollection = Backbone.Collection.extend({
	model: app.noticiaModel,
	url: '/api/noticias/',
});

app.noticiasTodas = new noticasCollection();

