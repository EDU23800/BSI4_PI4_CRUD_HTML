var mydb = AbrirDB();

function addPerfil() {

	myTransactionSQL("CREATE TABLE IF NOT EXISTS ts_usuario (id_usuario  INTEGER PRIMARY KEY ASC,"+
		"ds_nome CHAR(20),"+
		"ds_sobrenome CHAR (50)," +
		"ds_email CHAR(20)," +
		"ds_senha CHAR(20), " +
		"ds_telefone INTEGER, " +
		"ds_celular INTEGER, " +
		"dt_nascimento DATETIME)");    

	if (mydb) {
        //pegar os valores digitados pelo usuário
        var nome = document.getElementById("fname").value;
        var sobrenome = document.getElementById("lname").value;
        var email = document.getElementById("email").value;

        //Test to ensure that the user has entered both a make and model
        if (nome !== "" && sobrenome !== "" && email !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
	            mydb.transaction(function (t) {
	                //t.executeSql("INSERT INTO TS_USUARIO (nome, sobrenome, email) VALUES (?, ?, ?)", [nome, sobrenome, email],
	                t.executeSql("INSERT INTO TS_USUARIO (DS_NOME, DS_SOBRENOME, DS_EMAIL) VALUES (?,?,?)", [nome, sobrenome,email],
	                function(){}, 
                    function(){
                        console.log("Erro no insert no banco");
                    });
	            });

        
            SelectDB("SELECT * FROM TS_USUARIO ", mydb);

        } else {
            alert("Campos de preenchimento obrigatório.");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function clica2(){
	myTransactionSQL("DROP TABLE IF EXISTS TS_USUARIO");
}








// Método de click //
//function clica2(){ 
//	//myTransactionSQL("DROP TABLE TS_USUARIO");
//	myTransactionSQL( 'CREATE TABLE IF NOT EXISTS TS_USUARIO( ID_USUARIO INT AUTO_INCREMENT, DS_USUARIO CHAR(20))');

	//myTransactionSQL("delete from TS_USUARIO");
	//myTransactionSQL( 'INSERT INTO TS_USUARIO (ID_USUARIO,DS_USUARIO) VALUES (2,"Ivan")');
	//myObject = mySelectDB( 'SELECT * FROM TS_USUARIO');
	//$query4=mysql_query("select * from TS_USUARIO");
	//$result4=mysql_query($query4);
	//console.log(myObject);
//}

// Abre o banco de dados com suas denifições padrões
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
//function myOpenDataBase(){
	
	//return( window.openDatabase("KraftStoff", "1.0", "CRUD - SENAC", 200000) );

//
// Executa comandos que necessitam de retorno (select)
// Parametro:
//			query: Syntax da query a ser realizada
//			db: objeto data base ( não obrigatório )
// Retorno: Default //
//function mySelectDB( query, db){

	// Verica se o banco foi passado como parametro, do contrário, ignora
	//if (db == null || db == undefined) {
   //     db = myOpenDataBase();
   // }

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
	//db.transaction(function (tx) {		
	//	tx.executeSql(
	//		query,
	//		[],
	//		teste,
	//		function (error) {
    //        	console.log("Erro na comunicação com o banco de dados: " + error.message + "\n	Syntax: " + query);
    //    	}
	//	);
	//});
	// console.log("Isso aqui:" + myResults);
//}

//function teste( tx, results){
//	var len = results.rows.length, i;
//	for (i = 0; i < len; i++) {
//		console.log(results.rows.item(i)id_perfil+ "|" + results.rows.item(i).perfil);
//	}
//	return( results );
//}
