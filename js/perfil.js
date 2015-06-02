//Script para criação do banco de dados na tela PERFIL
var mydb = AbrirDB();

function addPerfil() {

	myTransactionSQL("CREATE TABLE IF NOT EXISTS ts_usuario (id_usuario  INTEGER PRIMARY KEY ASC,"+
		"ds_nome CHAR(20),"+
		"ds_sobrenome CHAR (50)," +
		"ds_email CHAR(20)," +
		"ds_telefone INTEGER, " +
		"ds_celular INTEGER, " +
		"dt_nascimento DATETIME"+
		"ds_login VARCHAR (30) "+
		"ds_senha VARCHAR (30) "+
		"ds_confirma_senha VARCHAR (30),)");    

	if (mydb) {
        //pegar os valores digitados pelo usuário
        var nome = document.getElementById("fname").value;
        var sobrenome = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        var telefone = document.getElementById("telefone").value;
        var celular = document.getElementById("celular").value;
        var nascimento = document.getElementById("nascimento").value;
        var login = document.getElementById("login").value;
        var senha = document.getElementById("email").value;
        var confirma_senha = document.getElementById("confirma_senha").value;

        //Test to ensure that the user has entered both a make and model
        if (nome !== "" && sobrenome !== "" && email !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
	            mydb.transaction(function (t) {
	                //t.executeSql("INSERT INTO TS_USUARIO (nome, sobrenome, email) VALUES (?, ?, ?)", [nome, sobrenome, email],
	                t.executeSql("INSERT INTO TS_USUARIO (DS_NOME, DS_SOBRENOME, DS_EMAIL,ds_telefone, DS_CELULAR, DT_NASCIMENTO, DS_LOGIN, DS_SENNHA, DS_CONFIRMASENHA) VALUES (?,?,?,?,?,?,?,?,?)", [nome, sobrenome,email, telefone, celular, nascimento, login, senha, confirma_senha],
	                function(){}, 
                    function(){
                        console.log("Erro no insert no banco");
                    });
	            });

        
            SelectDB("SELECT * FROM TS_USUARIO ", mydb);
            //-------------criação e insert na tabela carro-------------


     myTransactionSQL("CREATE TABLE IF NOT EXISTS ts_veiculo (id_veiculo  INTEGER PRIMARY KEY ASC,"+
		"ds_marca CHAR(20),"+
		"ds_anomodelo INTEGER," +
		"nr_anofabricacao INTEGER," +
		"qt_tamanhotanque INTEGER, " +
		"nr_potencia INTEGER, " +
		"ds_cor CHAR (30)"+
		"id_usuario FOREING KEY ASC"+ // necessário confirmar sintaxe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		"CONSTRAINT tb_usuario FOREIGN KEY(id_usuario) REFERENCES id_usuario,)");    

		if (mydb) {
	        //pegar os valores digitados pelo usuário
	        var marca = document.getElementById("marca").value;
	        var anomodelo = document.getElementById("anomodelo").value;
	        var anofabricacao = document.getElementById("anofabricacao").value;
	        var tamanhotanque = document.getElementById("tamanhotanque").value;
	        var potencia = document.getElementById("potencia").value;
	        var cor = document.getElementById("cor").value;

	        //Test to ensure that the user has entered both a make and model
	        if (nome !== "" && sobrenome !== "" && email !== "") {
	            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
		            mydb.transaction(function (t) {
		                //t.executeSql("INSERT INTO TS_USUARIO (nome, sobrenome, email) VALUES (?, ?, ?)", [nome, sobrenome, email],
		                t.executeSql("INSERT INTO TS_VEICULO (DS_MARCA, DS_ANOMODELO, NR_ANOFABRICACAO, QT_TAMANHOTANQUE, NR_POTENCIA, DS_COR) VALUES (?,?,?,?,?,?)", [marca, anomodelo,anofabricacao, tamanhotanque, potencia, cor],
		                function(){}, 
	                    function(){
	                        console.log("Erro no insert no banco");
	                    });
		       		});


            //--------------------------------------------------------------

        } else {
            alert("Campos de preenchimento obrigatório.");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function clica2(){
	myTransactionSQL("DROP TABLE IF EXISTS TS_USUARIO");
	myTransactionSQL("DROP TABLE IF EXISTS TS_VEICULO");
}





















/*function receberParametro(){

	var html = document.URL;
	var parametro1 = getParameterByName("usuario");
	var parametro2 = getParameterByName("teste");
	alert(parametro1);
	alert(parametro2);

}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}*/


