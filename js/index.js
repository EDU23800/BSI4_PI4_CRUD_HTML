var ID_USUARIO = getParameterByName("usuario");

function abrirPerfil(  ){

	window.open( "perfil.html?usuario=" + ID_USUARIO,"_self" );

}

function abrirAbastecimento(){

	window.open( "adicionar.html?usuario=" + ID_USUARIO,"_self" );

}