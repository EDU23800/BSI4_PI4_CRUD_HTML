var mydb = AbrirDB();
CreateTable_Abastecimento();

var resultado = [];
var ID_USUARIO = tratarTipoRetorno( getParameterByName("usuario"), "N" );

function addAbastecimento() {

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

window.onload = carregarUsuarios(resultado, ID_USUARIO , CarregarDadosPerfil);

function perfilSalvar() {

    CreateTable_Veiculo();

    //pegar os valores digitados pelo usuário
    var nome = getValueElement("nome", "C");
    var sobrenome = getValueElement("sobrenome", "C");
    var email = getValueElement("email", "C");
    var telefone = getValueElement("telefone", "C");
    var celular = getValueElement("celular", "C");
    var nascimento = getValueElement("nascimento", "D");
    var login = getValueElement("login", "C");
    var senha = getValueElement("senha", "C");
    var confirma_senha = getValueElement("confirma_senha", "C");


    if ( nome == "" )
    {
        warning("Nome do perfil não preenchido");
        return;
    }

    else if (sobrenome == "")
    {
        warning("Sobrenomenome do perfil não preenchido");
        return;
    }

    else if (email == "")
    {
        warning("E-mail é de preenchiento automárica.");
        return;
    }else if (login == "")
    {
        warning("Preencha um usuário válido.");
        return;
    }else if (senha == "")
    {
        warning("Senha não informada.");
        return;

    }else if (confirma_senha == "")
    {
        warning("Preencha um usuário válido.");
        return;
    }


    //pegar os valores digitados pelo usuário
    var marca = getValueElement("marca", "C");
    var anomodelo = getValueElement("anomodelo", "C");
    var anofabricacao = getValueElement("anofabricacao", "N");
    var tamanhotanque = getValueElement("tamanhotanque", "N");
    var potencia = getValueElement("potencia", "N");
    var cor = getValueElement("cor", "C");


    mydb.transaction(function (t) {
        t.executeSql(
            "INSERT INTO TS_USUARIO (DS_NOME, DS_SOBRENOME, DS_EMAIL,DS_TELEFONE, DS_CELULAR, DS_LOGIN, DS_SENHA,DT_NASCIMENTO) VALUES (?,?,?,?,?,?,?,?)", 
            [nome, sobrenome, email, telefone, celular, login, senha,nascimento],
            function(){}, 
            function(){
                console.log("Erro ao inserir na tabela de usuário");
            });

        t.executeSql(
            "INSERT INTO TB_VEICULO (DS_MARCA, NR_ANOMODELO, NR_ANOFABRICACAO, QT_TAMANHOTANQUE, NR_POTENCIA, DS_COR, ID_USUARIO) VALUES (?,?,?,?,?,?, (SELECT ID_USUARIO FROM TS_USUARIO ORDER BY ID_USUARIO DESC LIMIT 1 ) )",
            [marca, anomodelo,anofabricacao, tamanhotanque, potencia, cor],
            function(){}, 
            function(){
                console.log("Erro ao inserir na tabela de veiculo");
            });
    });

    abrirTelaInicial();

}


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

// Carrega o ultimo usuário cadastrado e passa como parametro para a tela principal
// Parametros: S/N
// Retorno: S/N //
function abrirTelaInicial(){

    var cQuery = "SELECT ID_USUARIO FROM TS_USUARIO ORDER BY ID_USUARIO DESC LIMIT 1"; 
    func = function( itemUsuario ){
         window.open( "index.html?usuario=" + itemUsuario.ID_USUARIO, "_self" );
         // window.location.href("index.html");
    };
    
    mydb.transaction( function(tx) {

        tx.executeSql(
            cQuery, 
            [],
            function (tx, results) {
                var len = results.rows.length, i;
                item= results.rows.item(i);
                func(item);
            },
          function(){
            console.log( "Erro de sintax ao carregar os usuário.");
          });
    });
    
}

function teste(){

    window.open( "index.html?","_self" );   

}