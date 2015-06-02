var mydb = AbrirDB();
var resultado = [];
selebd();

function testar(){
	console.log( resultado.length);	
	// myTransactionSQL("DROP TABLE TS_USUARIO");
	myTransactionSQL("Create table if not exists TS_USUARIO ( ID_USUARIO INTEGER PRIMARY KEY ASC, DS_LOGIN CHAR(20), DS_SENHA CHAR(20), DS_ASSINATURA CHAR(30))");
	myTransactionSQL( "INSERT INTO TS_USUARIO (DS_LOGIN,DS_SENHA) VALUES( 'edu23800', '123' )")

}

function logar(){

	var usuario = document.getElementById("usuario").value;
	var senha = document.getElementById("senha").value;

	// usuário digitado
	if(usuario.length == 0 ){
		warning( "Usuário é de preenchimento obrigatório." );
		return;	
	}

	// senha
	if(senha.length == 0 ){
		warning( "Senha não informada." );
		return;	
	}

	// verifica se o usuário e senha digitado está correto
	var encontrou= false;
	i = 0;
	while( i<resultado.length && ! encontrou){
		item = resultado[i];
		if( item.DS_LOGIN == usuario && item.DS_SENHA == senha ){
			encontrou= true;
		}
		i++;
	}

	if( ! encontrou )
	{
		warning("Usuário inválido.");
		return;
	}

	myTransactionSQL("update TS_USUARIO SET ");
	
	window.open( "Index.html?usuario="+item.ID_USUARIO, "_self");

}

function selebd(){

	var d = new Date();
	var second = d.getSeconds();


	myTransactionSQL("Create table if not exists TS_USUARIO ( ID_USUARIO INTEGER, DS_LOGIN CHAR(20), DS_SENHA CHAR(20))");

	cQuery = "select * from TS_USUARIO";	
	mydb.transaction( function(tx) {

		tx.executeSql(
			cQuery, 
			[],
			function (tx, results) {
			  var len = results.rows.length, i;

			  for (i = 0; i < len; i++) {
			  	item= results.rows.item(i);

			    resultado.push(item);

		  	  }
		  	},
		  function(){
		  	console.log( "Erro de sintax");
		  });
	});
	
}