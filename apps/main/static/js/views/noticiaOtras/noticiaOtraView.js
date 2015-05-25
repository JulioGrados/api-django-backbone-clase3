define([
  'jquery',
  'underscore',
  'backbone',
  'views/detalleNoticia/detalleNoticiaView',
  'tpl!views/noticiaOtras/template/tplNoticiasOtras.tpl'
], function($, _, Backbone, detalleNoticiaView, tplNoticiasOtras) {
  	
	var noticiaOtraView = Backbone.View.extend({
		template: tplNoticiasOtras,

		events: {
			'click .btn-ver-mas': 'verDetalle'
		},

		initialize: function () {
			
			var self = this;
			rutasApp.on('route:notas', function(){
				self.render();
				rutasApp.off('route:notas');
			});

			rutasApp.on('route:noticiasDetalle', function(){
				self.render();
				rutasApp.off('route:noticiasDetalle');
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
					
					var noticia = new detalleNoticiaView({model: this.model});
					$('.noticia-item').append(noticia.render().$el);
				}
			}
			return this;
		},

		verDetalle: function () {
			Backbone.history.navigate('noticias/' + this.model.get('id'), {trigger: true});
		}
	});

	return noticiaOtraView;

});
