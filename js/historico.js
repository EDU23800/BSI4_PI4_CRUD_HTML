//select básico
function carregarAbastecimentos( restultado, ID_ABASTECIMENTO, callback ){

    restultado = null;
    var d = new Date();
    var second = d.getSeconds();


    CreateTable_Abastecimento();

//    if(ID_ABASTECIMENTO != undefined && ID_ABASTECIMENTO != null && ID_ABASTECIMENTO > 0 )
//        cQuery = "SELECT USU.ABASTECIMENTO,USU.DS_EMAIL,USU.DS_LOGIN,USU.DS_NOME,USU.DS_SOBRENOME,USU.DS_SENHA,USU.DS_TELEFONE,    USU.DS_CELULAR,"+
//                 "VEI.DS_MARCA,VEI.DS_COR,VEI.NR_ANOMODELO,VEI.NR_ANOFABRICACAO,VEI.NR_POTENCIA,VEI.QT_TAMANHOTANQUE "+
 //                "FROM TS_ABASTECIMENTO AS ABAS "+;

        //cQuery = "select abas."         

//    else
        cQuery = "select * from TS_ABASTECIMENTO ORDER BY ID_ABASTECIMENTO";

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
            console.log( "Erro de sintax ao carregar os dados do histórico.");
          });
    });
    
}




function CarregarDadosHistorico( itemAbastecimento ){

	// Dados pessoais
	document.getElementById("vl-_por_litro").value = tratarTipoRetorno(itemAbastecimento.vl-_por_litro,"N" );
	document.getElementById("qt_litro").value = tratarTipoRetorno(itemAbastecimento.qt_litro,"N" );
	document.getElementById("qt_quilometragem").value = tratarTipoRetorno(itemAbastecimento.qt_quilometragem,"N" );
	document.getElementById("ds_bandeiraposto").value = tratarTipoRetorno(itemAbastecimento.ds_bandeiraposto,"C" );
	document.getElementById("ds_apelidoposto").value = tratarTipoRetorno(itemAbastecimento.ds_apelidoposto,"C" );
	document.getElementById("ds_numerobomba").value = tratarTipoRetorno(itemAbastecimento.ds_numerobomba,"C" );
}
