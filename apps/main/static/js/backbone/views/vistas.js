var noticiasView = Backbone.View.extend({
	el: '#app',

	events: {
		'click #news': 'noticiasNews',
		'click #sports': 'noticiasDeporte',
		'click #actualidad': 'noticiasActualidad',
		'click #mundo': 'noticiasMundo'
	},

	initialize: function () {
		noticiasTodas.on('add', this.onAgregoNoticia);
		noticiasTodas.fetch();
	},

	onAgregoNoticia: function (modelo, collection, options) {
		if (modelo.get('main')=== true) {
			var noticia = new mostrarNoticiaMain({model: modelo});
			$(".noticia-item").append(noticia.render().$el);
		} else {
			var noticia = new mostrarNoticiaOtras({model: modelo});
			$(".noticias-items").append(noticia.render().$el);
		}
	},

	noticiasDeporte: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#sports").addClass('activate');
		filter = noticiasTodas.filter(function(model){
			return model.get('category').name === 'sports';
		});
		this.mostrarCategoria(filter);
	},

	noticiasActualidad: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#actualidad").addClass('activate');
		filter = noticiasTodas.filter(function(model){
			return model.get('category').name === 'actualidad';
		});
		this.mostrarCategoria(filter);
	},

	noticiasMundo: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#mundo").addClass('activate');
		filter = noticiasTodas.filter(function(model){
			return model.get('category').name === 'mundo';
		});
		this.mostrarCategoria(filter);
	},

	noticiasNews: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#news").addClass('activate');
		noticiasTodas.forEach(function(modelo, index, collection){
			if (modelo.get('main')=== true) {
				var noticia = new mostrarNoticiaMain({model: modelo});
				$(".noticia-item").append(noticia.render().$el);
			} else {
				var noticia = new mostrarNoticiaOtras({model: modelo});
				$(".noticias-items").append(noticia.render().$el);
			}		
		});
	},

	mostrarCategoria: function (filter) {
		filter.forEach(function(modelo, index, collection){
			var noticia = new mostrarNoticiaOtras({model: modelo});
			$(".noticias-items").append(noticia.render().$el);
		});
	},

	removeSelect: function () {
		$("#news").removeClass('activate');
		$("#sports").removeClass('activate');
		$("#actualidad").removeClass('activate');
		$("#mundo").removeClass('activate');
	}
});

var mostrarNoticiaMain = Backbone.View.extend({
	template: _.template($("#tplNoticiaMain").html()),

	events: {
		'click .btn-ver-mas': 'verDetalle'
	},

	initialize: function () {
		$('#agregar-preg').html('');
		$('#region-preguntas').hide();
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	verDetalle: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.model.fetch();
		var noticia = new detalleNoticia({model: this.model});
		$('.noticia-item').append(noticia.render().$el);
	}
});

var mostrarNoticiaOtras = Backbone.View.extend({
	template: _.template($("#tplNoticiaOtras").html()),

	events: {
		'click .btn-ver-mas': 'verDetalle'
	},

	initialize: function () {
		$('#agregar-preg').html('');
		$('#region-preguntas').hide();
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	verDetalle: function () {
		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.model.fetch();
		var noticia = new detalleNoticia({model: this.model});
		$('.noticia-item').append(noticia.render().$el);
	}
});

var detalleNoticia = Backbone.View.extend({
	template: _.template($("#tplDetalleNoticia").html()),

	initialize: function() {
		$('#agregar-preg').html('')
		$('#region-preguntas').show();
		window.idNoticia = this.model.get('id');

		//
		var preguntaModel = Backbone.Model.extend({
			urlRoot: 'api/noticias/' + window.idNoticia + '/comentarios'
		});

		var preguntasCollection = Backbone.Collection.extend({
			model: preguntaModel,
			url: 'api/noticias/' + window.idNoticia + '/comentarios'
		});

		var preguntasTodas = new preguntasCollection();
		//

		preguntasTodas.fetch();
		preguntasTodas.on('add', this.onAgregoPregunta);
		this.model.on('change', this.render, this);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	onAgregoPregunta: function (modelo, collection, options) {
		var pregunta = new preguntaNoticia({model: modelo});
		$("#agregar-preg").append(pregunta.render().$el);
	}
});

var preguntaNoticia = Backbone.View.extend({
	template: _.template($("#tplPregunta").html()),

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var appView = new noticiasView();