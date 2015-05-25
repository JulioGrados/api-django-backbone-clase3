define([
  'jquery',
  'underscore',
  'backbone',
  'collections/noticiasCollection',
  'views/noticiaMain/noticiaViewMain',
  'views/noticiaOtras/noticiaOtraView'
], function($, _, Backbone, noticiasCollection, noticiaViewMain, noticiaOtraView) {
  	
	var noticiasView = Backbone.View.extend({
		el: '#app',

		events: {
			'click #news': 'noticiasNews',
			'click #sports': 'noticiasDeporte',
			'click #actualidad': 'noticiasActualidad',
			'click #mundo': 'noticiasMundo',
			'click .preguntar': 'agregarPregunta'
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

			noticiasTodas = new noticiasCollection();
			noticiasTodas.on('add', this.onAgregoNoticia);
			noticiasTodas.fetch();
		},

		onAgregoNoticia: function (modelo, collection, options) {
			if (modelo.get('main')=== true) {
				var noticia = new noticiaViewMain({model: modelo});
				$(".noticia-item").append(noticia.render().$el);
			} else {
				var noticia = new noticiaOtraView({model: modelo});
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
			filter = noticiasTodas.filter(function(model){
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
			filter = noticiasTodas.filter(function(model){
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
			filter = noticiasTodas.filter(function(model){
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
			noticiasTodas.forEach(function(modelo, index, collection){
				if (modelo.get('main')=== true) {
					var noticia = new noticiaViewMain({model: modelo});
					$(".noticia-item").append(noticia.render().$el);
				} else {
					var noticia = new noticiaOtraView({model: modelo});
					$(".noticias-items").append(noticia.render().$el);
				}		
			});
		},

		mostrarCategoria: function (filter) {
			filter.forEach(function(modelo, index, collection){
				var noticia = new noticiaOtraView({model: modelo});
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
			preguntasTodas.create({
				comment: $('#ing-pregunta').val(),
				notice: window.idNoticia,
				user: 1
			});
			$('#ing-pregunta').val('')
		}
		
	});

	return noticiasView;

});
