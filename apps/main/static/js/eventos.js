// function miEventoOnTrigger () {
// 	var objetoA = {};
// 	var objetoB = {};

// 	_.extend(objetoA, Backbone.Events);
// 	_.extend(objetoB, Backbone.Events);

// 	objetoA.on('devcode', function(mensaje, el){
// 		el.append("<h2>" + mensaje + "</h2>");
// 	});

// 	objetoB.once('devcode', function(mensaje, el){
// 		el.append("<h2>" + mensaje + "</h2>");
// 	});

// 	$("#ejemplo1").click(function(){
// 		objetoA.trigger('devcode', 'Mi evento A', $(this));
// 	});

// 	$("#ejemplo2").click(function(){
// 		objetoB.trigger('devcode', 'Mi evento B', $(this));
// 	});
// }

// function miEventoOnOff () {
// 	var objetoA = {};
// 	var objetoB = {};

// 	_.extend(objetoA, Backbone.Events);
// 	_.extend(objetoB, Backbone.Events);

// 	objetoA.on('devcode', function(mensaje){
// 		alert(mensaje);
// 	});

// 	objetoA.on('devcodeOff', function(mensaje){
// 		alert(mensaje);
// 		objetoA.off('devcodeOff');
// 	});

// 	$("#ejemplo1").click(function(){
// 		objetoA.trigger('devcode', 'Mi evento A1');
// 	});

// 	$("#ejemplo2").click(function(){
// 		objetoA.trigger('devcodeOff', 'Mi evento A2');
// 	});
// }

// function miEventoLisento () {
// 	var emisorA = {};
// 	var emisorB = {};
// 	var receptor = {};

// 	_.extend(emisorA, Backbone.Events);
// 	_.extend(emisorB, Backbone.Events);
// 	_.extend(receptor, Backbone.Events);

// 	receptor.listenTo(emisorA, 'devcode', function(mensaje){
// 		alert(mensaje);
// 	});

// 	receptor.listenToOnce(emisorB, 'devcode', function(mensaje){
// 		alert(mensaje);
// 	});

// 	$('#ejemplo1').click(function(){
// 		emisorA.trigger('devcode', 'Enviado desde emisor A');
// 	});

// 	$('#ejemplo2').click(function(){
// 		emisorB.trigger('devcode', 'Enviado desde emisor B');
// 	});
// }

// function miEventoStoplistening () {
// 	var emisorA = {};
// 	var emisorB = {};
// 	var receptor = {};

// 	_.extend(emisorA, Backbone.Events);
// 	_.extend(emisorB, Backbone.Events);
// 	_.extend(receptor, Backbone.Events);

// 	receptor.listenTo(emisorA, 'devcode', function(mensaje){
// 		alert(mensaje);
// 	});

// 	receptor.listenTo(emisorB, 'devcode', function(mensaje){
// 		alert(mensaje);
// 		receptor.stopListening(emisorB);
// 	});

// 	$('#ejemplo1').click(function(){
// 		emisorA.trigger('devcode', 'Enviado desde emisor A');
// 	});

// 	$('#ejemplo2').click(function(){
// 		emisorB.trigger('devcode', 'Enviado desde emisor B');
// 	});
// }

// function miEventoAll () {
// 	var objetoA = {};

// 	_.extend(objetoA, Backbone.Events);

// 	$("#ejemplo1").click(function(){
// 		objetoA.trigger('devcodeA', 'Hola Backbone A');
// 	});

// 	$("#ejemplo2").click(function(){
// 		objetoA.trigger('devcodeB', 'Hola Backbone B');
// 	});

// 	objetoA.on('all', function(evento, mensaje){
// 		alert(evento + " - " + mensaje);
// 	});

// 	objetoA.on('devcodeA', function(mensaje){
// 		console.log(mensaje);
// 	});
// }