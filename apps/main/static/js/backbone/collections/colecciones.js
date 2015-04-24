var noticasCollection = Backbone.Collection.extend({
	model: noticiaModel,
	url: '/api/noticias/',
	// ordenar: 'user',

	// initialize: function () {
	// 	console.log("Se creo una instancia de colección");
	// 	this.on('add', this.onAgregoModelo, this);
	// 	this.on('remove', this.onEliminoModelo, this);
	// 	this.on('reset', this.onActualizoColeccion, this);
	// },

	// comparator: function (item) {
	// 	return item.get(this.ordenar);
	// },

	// ordenarPorAtributo: function (atributo) {
	// 	this.ordenar = atributo;
	// 	this.sort();
	// },

	// filtroPalabra: function (pal) {
	// 	filter = this.filter(function(model){
	// 		return model.get('comment').indexOf(pal) != -1;
	// 	});

	// 	return filter;
	// },

	// onAgregoModelo: function (model, collection, options) {
	// 	console.log("Se agregado un modelo a la colección");
	// },

	// onEliminoModelo: function (model, collection, options) {
	// 	console.log("Se elimino modelo");
	// },

	// onActualizoColeccion: function (collection, options) {
	// 	console.log("Se actualizo la colección");
	// }
});

var noticiasTodas = new noticasCollection();
//noticias.fetch();
