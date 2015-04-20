var noticiaModel = Backbone.Model.extend({
	urlRoot: '/api/noticias/1/comentarios/',
	resumen: "Es nuestro resumen",
	defaults: {
		comment: "Agregar comentario",
		user: "Agregar usuario",
		notice: "Agregar noticia",
		id: null
	},

	initialize: function (attr) {
		console.log("Se creo una nueva instancia");
		this.on('change', this.onCambioAtributo, this);
		this.on('change:user', this.onCambioUser, this);
		this.on('invalid', this.onValidar, this);
	},

	obtenertoString: function () {
		console.log("user convertido a string: " + this.attributes.user);
	},

	onCambioAtributo: function (model, options) {
		console.log("Se cambio un atributo");
	},

	onCambioUser: function (model, options) {
		console.log("Se a cambiado a user" + this.attributes.user);
	},

	validate: function (attrs, options) {
		if(attrs.user != undefined && !_.isNumber(attrs.user)){
			return "No es un numero";
		}
	},

	onValidar: function (model, error) {
		alert(error);
	}
});

var noticia = new noticiaModel({id:4});