// JavaScript Document


function agregarNoticia(titulo, contenido,link,pag){
	"use strict";
	var title = $("<h5/>", {
	  "class": "col col-12 mt-3",
	  html: $("<h4/>",{
		"class": "mont",
	  	html:titulo
	  })
	});

	var p = $("<div/>",{
	  "class": "col col-12 col-md-8",
	  html: $("<p/>",{
		"class":"rale",
	  	html:contenido
	  })
	});
	
	var a = $("<div/>",{
	  "class": "col col-12 col-md-8",
	  html: $("<a/>",{
		"class":"lato",
		  "href":link,
	  	html:pag
	  })
	});

	var div = $( "<div/>", {
	  "class": "row"
	});

	title.appendTo(div);
	p.appendTo(div);
	a.appendTo(div);
	div.appendTo( "#noticias" );
}

function cargarNoticias(texto) {
	"use strict";
	var count=0;
	$.ajax({
		type: "GET",
		url: "../data/noticias.xml",
		dataType: "xml",
		success: function(xml){
			if(texto.length===0){
				$("#noticias").text("No hay resultados");
			}
			else{
				$(xml).find('item').each(function(){
				var titulo = $(this).find('titulo').text();
				var contenido = $(this).find('contenido').text();
				var link = $(this).find('url').text();
				var pag = $(this).find('pag').text();
				if(titulo.includes(texto) || contenido.includes(texto)){
					agregarNoticia(titulo, contenido,link,pag);
					count++;
				}
				
				});
			}
			
			if (count===0){
				$("#noticias").text("No hay resultados");
			}
		},
		error: function() {
		alert("Error al procesar el xml");
		}
	});
}

function datoBusqueda(){
	"use strict";
	var parameters=location.search.substring(1).split("&");
	var temp=parameters[0].split("=");
	return temp[1];
}

$(document).ready(function(){
	"use strict";
	var texto=datoBusqueda().toString();
	cargarNoticias(texto);
});