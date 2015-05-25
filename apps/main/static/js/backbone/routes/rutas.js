var app = app || {};

var rutas = Backbone.Router.extend({
	routes: {
		'': 'notas',
		'noticias/:id': 'noticiasDetalle'
	},

	notas: function () {
		window.nota = "noticias";
	},

	noticiasDetalle: function (id) {
		window.nota = "detalle";
		window.notaDetalle = id;
	}

});

app.rutasApp = new rutas();

//Backbone.history.navigate('noticias');