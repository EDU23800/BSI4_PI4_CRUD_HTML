var ID_USUARIO = getParameterByName("usuario");

function abrirPerfil(){

	window.open( "perfil.html?usuario=" + ID_USUARIO,"_self" );

}
