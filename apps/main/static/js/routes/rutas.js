define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
	
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

	return rutas;

});
