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


// Função responsável pelo armazenamento dos usuários registrados no banco de dados
// Parametros: S/N
// Retorno: S/N //
function carregarUsuarios( restultado, ID_USUARIO, callback ){

    restultado = null;
    var d = new Date();
    var second = d.getSeconds();


    CreateTable_Usuario();

    if(ID_USUARIO != undefined && ID_USUARIO != null && ID_USUARIO > 0 )
        cQuery = "SELECT USU.ID_USUARIO,USU.DS_EMAIL,USU.DS_LOGIN,USU.DS_NOME,USU.DS_SOBRENOME,USU.DS_SENHA,USU.DS_TELEFONE,    USU.DS_CELULAR,"+
                 "VEI.DS_MARCA,VEI.DS_COR,VEI.NR_ANOMODELO,VEI.NR_ANOFABRICACAO,VEI.NR_POTENCIA,VEI.QT_TAMANHOTANQUE "+
                 "FROM TS_USUARIO AS USU "+ 
                 " LEFT JOIN TB_VEICULO AS VEI ON VEI.ID_USUARIO = USU.ID_USUARIO "+
                 "WHERE USU.ID_USUARIO = " + ID_USUARIO;
    else
        cQuery = "select * from TS_USUARIO ORDER BY ID_USUARIO";

    mydb.transaction( function(tx) {

        tx.executeSql(
            cQuery, 
            [],
            function (tx, results) {
              var len = results.rows.length, i;

              for (i = 0; i < len; i++) {
                item= results.rows.item(i);

                resultado.push(item);
                
                if( typeof callback == "function" ){
                    callback(item);
                }
              }
            },
          function(){
            console.log( "Erro de sintax ao carregar os usuário.");
          });
    });
    
}


// Função responsável pelo armazenamento dos usuários registrados no banco de dados
// Parametros: S/N
// Retorno: S/N //
function ValidarUsuario(usuario, assinatura, usuarios ){

    var encontrou= false;
    if( isNaN( usuario ) )
    {
        // verifica se o usuário e senha digitado está correto
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

    }
}


// Estrutura da tabela usuário
function CreateTable_Usuario(){
    myTransactionSQL("CREATE TABLE IF NOT EXISTS TS_USUARIO (ID_USUARIO INTEGER PRIMARY KEY ASC,"+
        "DS_NOME CHAR(20),"+
        "DS_SOBRENOME CHAR (50)," +
        "DS_EMAIL CHAR(20)," +
        "DS_TELEFONE CHAR(20), " +
        "DS_CELULAR CHAR(20), " +
        "DT_NASCIMENTO DATETIME,"+
        "DS_LOGIN CHAR (30), "+
        "DS_SENHA CHAR (30) )");
}

// Estrutura da tabela de veículos
function CreateTable_Veiculo(){
    myTransactionSQL("CREATE TABLE IF NOT EXISTS TB_VEICULO (ID_VEICULO INTEGER PRIMARY KEY ASC,"+
        "DS_MARCA CHAR(20),"+
        "NR_ANOMODELO INTEGER," +
        "NR_ANOFABRICACAO INTEGER," +
        "QT_TAMANHOTANQUE INTEGER, " +
        "NR_POTENCIA DECIMAL( 5, 2 ), " +
        "DS_COR CHAR (30),"+
        "ID_USUARIO INTEGER,"+
        "CONSTRAINT TS_USUARIO FOREIGN KEY(ID_USUARIO) REFERENCES ID_USUARIO )");
}

// Estrutura da tabela de abastecimento
function CreateTable_Abastecimento(){
    myTransactionSQL("CREATE TABLE IF NOT EXISTS ts_abastecimento (ID_ABASTECIMENTO INTEGER PRIMARY KEY ASC,"+
        "VL_PORLITRO DECIMAL( 5, 3 ),"+
        "QT_LITRO DECIMAL( 5,3 )," +
        "DT_QUILOMETRAGEM DATETIME," +
        "DS_BANDEIRAPOSTO CHAR(30), " +
        "DS_APELIDOPOSTO CHAR(50), " +
        "DS_NUMEROBOMBA CHAR(10),"+
        "CONSTRAINT TS_USUARIO FOREIGN KEY(ID_USUARIO) REFERENCES ID_USUARIO )");
}

// Recebe os dados de um elemento
function getValueElement( campo, tipo ){

    var value = document.getElementById(campo).value;
    return tratarTipoRetorno(value, tipo);   

}

function tratarTipoRetorno(value, tipo){
    
    if( value != undefined )
        return value;
    
    switch(tipo) {
        case "C":
            return "";
            break;
        case "N":
            return 0;
            break;
        case "D":
        case "T":
            return null;
            break;
        default:
            return undefined;
    }
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function Esperar( miliseconds ){
    
    var now = new Date().getTime(); 
    while(new Date().getTime() < now + miliseconds ){   }

}