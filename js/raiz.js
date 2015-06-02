// Função responsável pela abertura da database 
// Parametros: Não possui
// Retorno: retorna o objeto de coneção do banco //
function AbrirDB(){
	var db = openDatabase('krafStoff', '1.0', 'base de dados local', 2 * 1024 * 1024);
	return( db );
}

// Executa o comando no banco( insert, create, etc)
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
function myTransactionSQL( query, db ){
	 
	if (db == null || db == undefined) {
        
        db = AbrirDB();
    }

	 db.transaction(
        function (tx) {
            tx.executeSql( query);
        },
        function (error) {

            console.log("Erro na comunicação com o banco de dados: " + error.message + "\n	Syntax: " + query);
        },
        function () {}
    );

}

// Função responsável pela exibição de alarmes do sistema
// Parametros: Recebe uma stirng com a mensagem a ser exibida
// Retorno: default //
function warning( mensagem ){
	alert(mensagem);
}

// // Função responsável pela realização de consultas a base de dados
// // Parametros: Recebe a query para consuta
// // Retorno: Retorna um array como resultado ou Null quando não tiver informação //
// function SelectDB( cQuery, oDB ){

// 	if (oDB == null || oDB == undefined) {
        
//         oDB = AbrirDB();
//     }

// 	oDB.transaction( function(tx) {
// 		tx.executeSql(
// 			cQuery, 
// 			[],
// 			function (tx, results) {
// 			  var len = results.rows.length, i;
// 			  resultado = results;
// 			  for (i = 0; i < len; i++) {
// 			    console.log( i + ": " + results.rows.item(i).ID_USUARIO);
// 		  	  }
// 		  	},
// 		  function(){
// 		  	console.log( "problemas na select " + err.mesage);
// 		  });
// 	});

// 	console.log( resultado.length);

// }