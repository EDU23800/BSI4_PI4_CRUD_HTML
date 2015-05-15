// Método de click //
function clica2(){ 
	myTransactionSQL( 'CREATE TABLE IF NOT EXISTS TS_USUARIO( ID_USUARIO INT, DS_USUARIO CHAR(20))');
	//myTransactionSQL("delete from TS_USUARIO");
	//myTransactionSQL( 'INSERT INTO TS_USUARIO (ID_USUARIO,DS_USUARIO) VALUES (2,"Ivan")');
	myObject = mySelectDB( 'SELECT * FROM TS_USUARIo');
	console.log(myObject);
}

// Executa o comando no banco( insert, create, etc)
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
function myTransactionSQL( query, db ){
	 
	 if (db == null || db == undefined) {
        
        db = myOpenDataBase();
     }

	 db.transaction(
        function (tx) {
            tx.executeSql( query);
        },
        function (error) {

            console.log("Erro na comunicação com o banco de dados: " + error.message + "\n	Syntax: " + query);
        },
        function () {
        }
    );

}

// Abre o banco de dados com suas denifições padrões
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
function myOpenDataBase(){
	
	return( window.openDatabase("KraftStoff", "1.0", "CRUD - SENAC", 200000) );

}

// Executa comandos que necessitam de retorno (select)
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
function mySelectDB( query, db){

	// Verica se o banco foi passado como parametro, do contrário, ignora
	if (db == null || db == undefined) {
        db = myOpenDataBase();
    }

	// db.transaction(function (tx) {		
	// 	tx.executeSql(
	// 		query,
	// 		[],
	// 		function (tx, results) {	
	// 			var len = results.rows.length, i;
	// 			for (i = 0; i < len; i++) {
	// 				console.log(results.rows.item(i).ID_USUARIO+ "|" + results.rows.item(i).DS_USUARIO);
	// 			}
	// 			return( results );
	// 		}
	// 		,function (error) {
 //            	console.log("Erro na comunicação com o banco de dados: " + error.message + "\n	Syntax: " + query);
 //        	}
	// 	);
	// });
	db.transaction(function (tx) {		
		tx.executeSql(
			query,
			[],
			teste,
			function (error) {
            	console.log("Erro na comunicação com o banco de dados: " + error.message + "\n	Syntax: " + query);
        	}
		);
	});
	// console.log("Isso aqui:" + myResults);
}

function teste( tx, results){
	var len = results.rows.length, i;
	for (i = 0; i < len; i++) {
		console.log(results.rows.item(i).ID_USUARIO+ "|" + results.rows.item(i).DS_USUARIO);
	}
	return( results );
}