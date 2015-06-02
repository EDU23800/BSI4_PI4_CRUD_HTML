var mydb = AbrirDB();

function CarregarDadosPerfil( itemUsuario ){

	// Dados pessoais
	document.getElementById("nome").value = tratarTipoRetorno(itemUsuario.DS_NOME,"C" );
	document.getElementById("sobrenome").value = tratarTipoRetorno(itemUsuario.DS_SOBRENOME,"C" );
	document.getElementById("email").value = tratarTipoRetorno(itemUsuario.DS_EMAIL,"C" );
	document.getElementById("telefone").value = tratarTipoRetorno(itemUsuario.DS_TELEFONE,"C" );
	document.getElementById("celular").value = tratarTipoRetorno(itemUsuario.DS_CELULAR,"C" );
	document.getElementById("login").value = tratarTipoRetorno(itemUsuario.DS_LOGIN,"C" );
	document.getElementById("nascimento").value = tratarTipoRetorno(itemUsuario.DT_NASCIMENTO,"C" );
	
	// Dados do veículo
	document.getElementById("marca").value = tratarTipoRetorno(itemUsuario.DS_MARCA,"C" );
	document.getElementById("anomodelo").value = tratarTipoRetorno(itemUsuario.NR_ANOMODELO,"C" );
	document.getElementById("anofabricacao").value = tratarTipoRetorno(itemUsuario.NR_ANOFABRICACAO,"C" );
	document.getElementById("tamanhotanque").value = tratarTipoRetorno(itemUsuario.QT_TAMANHOTANQUE,"N" );
	document.getElementById("potencia").value = tratarTipoRetorno(itemUsuario.NR_POTENCIA,"C" );
	document.getElementById("cor").value = tratarTipoRetorno(itemUsuario.DS_COR,"C" );

}