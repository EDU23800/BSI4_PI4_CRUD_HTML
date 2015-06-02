//Script para criação do banco de dados na tela PERFIL
var mydb = AbrirDB();

function addAbastecimento() {

	myTransactionSQL("CREATE TABLE IF NOT EXISTS ts_abastecimento (id_abastecimento  INTEGER PRIMARY KEY ASC,"+
		"vl_porlitro INTEGER,"+
		"qt_litro INTEGER," +
		"dt_quilometragem INTEGER," +
		"ds_bandeiraposto CHAR(30), " +
		"ds_apelidoposto CHAR(50), " +
		"ds_numerobomba INTEGER"+
		"id_usuario FOREING KEY ASC ,)");  //necessário confirmar sintaxe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

	if (mydb) {
        //pegar os valores digitados pelo usuário
        var vl_porlitro = document.getElementById("vl_porlitro").value;
        var qt_litro = document.getElementById("qt_litro").value;
        var quilometragem = document.getElementById("quilometragem").value;
        var bandeiraposto = document.getElementById("bandeiraposto").value;
        var apelidoposto = document.getElementById("apelidoposto").value;
        var numerobomba = document.getElementById("numerobomba").value;

        //Test to ensure that the user has entered both a make and model
        if (nome !== "" && sobrenome !== "" && email !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
	            mydb.transaction(function (t) {
	                //t.executeSql("INSERT INTO TS_USUARIO (nome, sobrenome, email) VALUES (?, ?, ?)", [nome, sobrenome, email],
	                t.executeSql("INSERT INTO TS_ABASTECIMENTO (VL_PORLITRO, QT_LITRO, DT_QUILOMETRAGEM, DS_BANDEIRAPOSTO, DS_APELIDOPOSTO, DS_NUMEROBOMBA) VALUES (?,?,?,?,?,?)", [vl_porlitro, qt_litro, quilometragem, bandeiraposto, apelidoposto, numerobomba],
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


