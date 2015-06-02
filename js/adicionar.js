var mydb = AbrirDB();
CreateTable_Abastecimento();

var resultado = [];
var ID_USUARIO = tratarTipoRetorno( getParameterByName("usuario"), "N" );

function addAbastecimento() {


	if (mydb) {

        //pegar os valores digitados pelo usuário
        var vl_porlitro = getValueElement("vl_porlitro", "N");
        var qt_litro = getValueElement("qt_litro", "N");
        var quilometragem = getValueElement("quilometragem", "N");
        var bandeiraposto = getValueElement("bandeiraposto", "C");
        var apelidoposto = getValueElement("apelidoposto", "C");
        var numerobomba = getValueElement("numerobomba", "C");
        var idUsuario = getParameterByName("usuario");
        var dtAbastecimento = new Date().getDay() + "/" + new Date().getMonth() + "/2015"

        mydb.transaction(function (t) {
            t.executeSql(
            "INSERT INTO TB_ABASTECIMENTO (VL_PORLITRO, QT_LITRO, QT_KMATUAL, DS_BANDEIRAPOSTO, DS_APELIDOPOSTO, DS_NUMEROBOMBA,DT_ABASTECIMENTO,ID_USUARIO) VALUES (?,?,?,?,?,?,?,?)",
            [vl_porlitro, qt_litro, quilometragem, bandeiraposto, apelidoposto, numerobomba, dtAbastecimento, idUsuario],

            function(){}, 
            function(){
                console.log("Erro ao inserir no banco");
            });
        });

        window.open( "adicionar.html?usuario=" + idUsuario, "_self" );

    }


}