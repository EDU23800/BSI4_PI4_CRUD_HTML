function receberParametro(){

	var html = document.URL;
	var parametro1 = getParameterByName("usuario");
	var parametro2 = getParameterByName("teste");
	alert(parametro1);
	alert(parametro2);

}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}