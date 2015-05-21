var app = app || {};

app.noticiasView = Backbone.View.extend({
	el: '#app',

	events: {
		'click #news': 'noticiasNews',
		'click #sports': 'noticiasDeporte',
		'click #actualidad': 'noticiasActualidad',
		'click #mundo': 'noticiasMundo',
		'click .preguntar': 'agregarPregunta'
	},

	initialize: function () {
		app.noticiasTodas.on('add', this.onAgregoNoticia);
		app.noticiasTodas.fetch();
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
		Backbone.history.navigate('', {trigger:true});

		$('#agregar-preg').html('');
		$('#region-preguntas').hide();

		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#sports").addClass('activate');
		filter = app.noticiasTodas.filter(function(model){
			return model.get('category').name === 'sports';
		});
		this.mostrarCategoria(filter);
	},

	noticiasActualidad: function () {
		Backbone.history.navigate('', {trigger:true});

		$('#agregar-preg').html('');
		$('#region-preguntas').hide();

		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#actualidad").addClass('activate');
		filter = app.noticiasTodas.filter(function(model){
			return model.get('category').name === 'actualidad';
		});
		this.mostrarCategoria(filter);
	},

	noticiasMundo: function () {
		Backbone.history.navigate('', {trigger:true});

		$('#agregar-preg').html('');
		$('#region-preguntas').hide();

		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#mundo").addClass('activate');
		filter = app.noticiasTodas.filter(function(model){
			return model.get('category').name === 'mundo';
		});
		this.mostrarCategoria(filter);
	},

	noticiasNews: function () {
		Backbone.history.navigate('', {trigger:true});

		$('#agregar-preg').html('');
		$('#region-preguntas').hide();

		$('.noticia-item').html('');
		$('.noticias-items').html('');
		this.removeSelect(); $("#news").addClass('activate');
		app.noticiasTodas.forEach(function(modelo, index, collection){
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
	},

	agregarPregunta: function () {
		console.log(window.notaDetalle);
		app.preguntasTodas.create({
			comment: $('#ing-pregunta').val(),
			notice: window.idNoticia,
			user: 1
		});
		$('#ing-pregunta').val('')
	}
});

var mostrarNoticiaMain = Backbone.View.extend({
	template: _.template($("#tplNoticiaMain").html()),

	events: {
		'click .btn-ver-mas': 'verDetalle'
	},

	initialize: function () {
		
		var self = this;
		app.rutasApp.on('route:notas', function(){
			self.render();
			app.rutasApp.off('route:notas');
		});

		app.rutasApp.on('route:noticiasDetalle', function(){
			self.render();
			app.rutasApp.off('route:noticiasDetalle');
		});
	},

	render: function () {
		
		if( window.nota === "noticias" ){
			this.$el.html(this.template(this.model.toJSON()));
		} else {
			if(window.notaDetalle == this.model.get('id')){

				$('.noticia-item').html('');
				$('.noticias-items').html('');
				//
				if (this.model.get('description') !== undefined ) {
					this.model.fetch();
				}
				window.notaDetalle = '';
				//
				
				var noticia = new detalleNoticia({model: this.model});
				$('.noticia-item').append(noticia.render().$el);
			}
		}
		return this;
	},

	verDetalle: function () {
		Backbone.history.navigate('noticias/' + this.model.get('id'), {trigger: true});
	}
});

var mostrarNoticiaOtras = Backbone.View.extend({
	template: _.template($("#tplNoticiaOtras").html()),

	events: {
		'click .btn-ver-mas': 'verDetalle'
	},

	initialize: function () {
		
		var self = this;
		app.rutasApp.on('route:notas', function(){
			self.render();
			app.rutasApp.off('route:notas');
		});

		app.rutasApp.on('route:noticiasDetalle', function(){
			
			self.render();

			app.rutasApp.off('route:noticiasDetalle');
		});
	},

	render: function () {
		
		if( window.nota === "noticias" ){
			this.$el.html(this.template(this.model.toJSON()));
		} else {
			if(window.notaDetalle == this.model.get('id')){
				
				$('.noticia-item').html('');
				$('.noticias-items').html('');
				//
				if (this.model.get('description') !== undefined ) {
					this.model.fetch();
				}
				//
				window.notaDetalle = '';
				var noticia = new detalleNoticia({model: this.model});
				$('.noticia-item').append(noticia.render().$el);

			}
		}
		return this;
	},

	verDetalle: function () {
		Backbone.history.navigate('noticias/' + this.model.get('id'), {trigger: true});
	}
});

var detalleNoticia = Backbone.View.extend({
	template: _.template($("#tplDetalleNoticia").html()),

	initialize: function() {
		
		$('#agregar-preg').html('')
		$('#region-preguntas').show();
		window.idNoticia = this.model.get('id');
		var notaID = this.model.get('id');

		app.preguntaModel = Backbone.Model.extend({
			urlRoot: 'api/noticias/' + notaID + '/comentarios/',

			defaults:{
				id: null,
				comment: 'Agregar comentario'
			}
		});

		var preguntasCollection = Backbone.Collection.extend({
			model: app.preguntaModel,
			url: 'api/noticias/' + notaID + '/comentarios/'
		});

		if(this.model.get('preguntas') !== undefined) {

			app.preguntasTodas = new preguntasCollection();
			app.preguntasTodas = this.model.get('preguntas');
			
			$("#agregar-preg").html('');
			app.preguntasTodas.forEach(function(modelo, index, collection){
				var pregunta = new preguntaNoticia({model: modelo});
				$("#agregar-preg").append(pregunta.render().$el);
			});

		} else {

			app.preguntasTodas = new preguntasCollection();

			app.preguntasTodas.fetch();

			this.model.set({preguntas: app.preguntasTodas});
		}
		app.preguntasTodas.on('add', this.onAgregoPregunta);
		app.preguntasTodas.on('remove', this.onEliminoPregunta);
		//
		this.model.on('change', this.render, this);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	onAgregoPregunta: function (modelo) {
		var pregunta = new preguntaNoticia({model: modelo});
		$("#agregar-preg").append(pregunta.render().$el);
	},

	onEliminoPregunta: function (model, collection, options) {
		$("#agregar-preg").html('');
		collection.forEach(function(modelo){
			var pregunta = new preguntaNoticia({model: modelo});
			$("#agregar-preg").append(pregunta.render().$el);
		});
	}
});

var preguntaNoticia = Backbone.View.extend({
	template: _.template($("#tplPregunta").html()),

	events: {
		'click #eliminar-preg': 'eliminarPregunta',
		'click #editar-preg': 'editarPregunta',
		'click #guardar-edit': 'guardarCambios'
	},

	initialize: function () {

		this.model.on('change', this.render, this);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	eliminarPregunta: function () {
		this.model.destroy();
	},

	editarPregunta: function () {
		$('#editar-' + this.model.get('id')).show();
	},

	guardarCambios: function () {
		this.model.set({comment: $('#ing-pregunta').val()});
		this.model.save();
		$('#ing-pregunta').val('')
	}
});

