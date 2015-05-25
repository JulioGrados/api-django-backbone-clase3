define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!views/preguntaNoticia/template/tplPregunta.tpl'
], function($, _, Backbone, tplPregunta) {
  	
	var preguntaView = Backbone.View.extend({
		template: tplPregunta,

		events: {
			'click #eliminar-preg': 'eliminarPregunta',
			'click #editar-preg': 'editarPregunta',
			'click #guardar-edit': 'guardarCambios'
		},

		initialize: function () {
			$.ajaxSetup({ 
			    beforeSend: function(xhr, settings) {
			         function getCookie(name) {
			             var cookieValue = null;
			             if (document.cookie && document.cookie != '') {
			                 var cookies = document.cookie.split(';');
			                 for (var i = 0; i < cookies.length; i++) {
			                     var cookie = jQuery.trim(cookies[i]);
			                     // Does this cookie string begin with the name we want?
			                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
			                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
			                     break;
			                 }
			             }
			         }
			         return cookieValue;
			         }
			         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
			             // Only send the token to relative URLs i.e. locally.
			             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
			         }
			     } 
			});

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

	return preguntaView;

});
