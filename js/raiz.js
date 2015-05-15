function clica(){
	//	db = AbrirDB();
		var oDB = AbrirDB();
		oDB.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
			tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
			  var len = results.rows.length, i;
			  for (i = 0; i < len; i++) {
			    console.log(results.rows.item(i).text);
			}
		});
	});
}

function clica_Old() {
	SelectDB( "Create table1 (a int, b char( 20 ) )");
}

// Função responsável pela realização de consultas a base de dados
// Parametros: Recebe a query para consuta
// Retorno: Retorna um array como resultado ou Null quando não tiver informação //
function SelectDB( cQuery ){

	var oDB = AbrirDB();
	oDB.transaction( function(tx) {
		tx.executeSql(cQuery);
		tx.executeSql('SELECT * FROM table1', [], function (tx, results) {
		  var len = results.rows.length, i;
		  for (i = 0; i < len; i++) {
		    alert(results.rows.item(i).text);
		  }
		});
    });	    
}

// Função responsável pela abertura da database 
// Parametros: Não possui
// Retorno: retorna o objeto de coneção do banco //
function AbrirDB(){
	var db = openDatabase('krafStoff', '1.0', 'base de dados local', 2 * 1024 * 1024);
	return( db );
}




/*oTransaction.executeSql(
                    "INSERT INTO table1 (A, B, C, D) VALUES (?,?,?,?) ", 
                    [res.A, res.B, res.C, res.D], 
                    function(){
                        onSuccess(dfd.resolve);
                    }, 
                    function(){
                        onError(dfd.resolve);
                    }
                );
                )*/