define([
  'jquery',
  'underscore',
  'backbone',
  'views/preguntaNoticia/preguntaView',
  'tpl!views/detalleNoticia/template/tplDetalleNoticia.tpl'
], function($, _, Backbone, preguntaView, tplDetalleNoticia) {
  	
	var detalleNoticiaView = Backbone.View.extend({
		template: tplDetalleNoticia,

		initialize: function() {
			
			$('#agregar-preg').html('')
			$('#region-preguntas').show();
			window.idNoticia = this.model.get('id');
			var notaID = this.model.get('id');

			preguntaModel = Backbone.Model.extend({
				urlRoot: 'api/noticias/' + notaID + '/comentarios/',

				defaults:{
					id: null,
					comment: 'Agregar comentario'
				}
			});

			var preguntasCollection = Backbone.Collection.extend({
				model: preguntaModel,
				url: 'api/noticias/' + notaID + '/comentarios/'
			});

			if(this.model.get('preguntas') !== undefined) {

				preguntasTodas = new preguntasCollection();
				preguntasTodas = this.model.get('preguntas');
				
				$("#agregar-preg").html('');
				preguntasTodas.forEach(function(modelo, index, collection){
					var pregunta = new preguntaView({model: modelo});
					$("#agregar-preg").append(pregunta.render().$el);
				});

			} else {

				preguntasTodas = new preguntasCollection();

				preguntasTodas.fetch();

				this.model.set({preguntas: preguntasTodas});
			}
			preguntasTodas.on('add', this.onAgregoPregunta);
			preguntasTodas.on('remove', this.onEliminoPregunta);
			//
			this.model.on('change', this.render, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		onAgregoPregunta: function (modelo) {
			var pregunta = new preguntaView({model: modelo});
			$("#agregar-preg").append(pregunta.render().$el);
		},

		onEliminoPregunta: function (model, collection, options) {
			$("#agregar-preg").html('');
			collection.forEach(function(modelo){
				var pregunta = new preguntaView({model: modelo});
				$("#agregar-preg").append(pregunta.render().$el);
			});
		}
	});

	return detalleNoticiaView;

});
