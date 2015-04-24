var noticiaModel = Backbone.Model.extend({
	urlRoot: '/api/noticias/',
	defaults: {
		author: {
			name: ''
		},

		description: '',
		created: '',
		fecha: ''
	},

	initialize: function () {
		this.on('change:created', this.onFecha, this);
	},

	onFecha: function (model) {
		var fechaNueva = new Date(model.get('created'));
		model.set({fecha: fechaNueva.toString()});
	}
});

var noticia = new noticiaModel({id:4});