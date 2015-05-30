//criação das tabelas

db.transaction(function(transaction){
	transaction.executeSql("CREATE TABLE IF NOT EXISTS tb_usuario (" +"id_usuario INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
	"ds_nome TEXT NOT NULL, ds_sobrenome TEXT NOT NULL "+"ds_email TEXT NOT NULL"+"
	ds_senha TEXT NOT NULL"+" ds_telefone INTEGER NOT NULL"+" ds_celular INTEGER NOT NULL"+" dt_nascimento DATE NOT NULL);"); 

});

db.transaction(function(transaction){
	transaction.executeSql("CREATE TABLE IF NOT EXISTS tb_veiculo (" +"id_veiculo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
	"ds_marca TEXT NOT NULL "+" ds_modelo TEXT NOT NULL"+" nr_anofabricacao INTEGER NOT NULL"+"
	qt_tamanhotanque INTEGER NOT NULL"+"nr_potencia INTEGER NOT NULL"+"ds_cor TEXT NOT NULL"+" 
	id_usuario INTEGER UNSIGNED NOT NULL "+" CONSTRAINT tb_usuario FOREIGN KEY(id_usuario) REFERENCES id_usuario"+");"); 

});



db.transaction(function(transaction){
	transaction.executeSql("CREATE TABLE IF NOT EXISTS tb_abastecimento (" +"id_combustivel INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
	"ds_tipocombustivel TEXT NOT NULL );"); 

});



db.transaction(function(transaction){
	transaction.executeSql("CREATE TABLE IF NOT EXISTS tb_abastecimento (" +"id_abastecimento INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
	"vl_porlitro INTEGER NOT NULL "+" qt_litro INTEGER NOT NULL"+" qt_quilometragem INTEGER NOT NULL"+" 
	ds_bandeiraposto TEXT NOT NULL "+"
	ds_apelidoposto TEXT NOT NULL"+" id_usuario INTEGER UNSIGNED NOT NULL "+" 
	CONSTRAINT tb_usuario FOREIGN KEY(id_usuario) REFERENCES id_usuario"+" id_abastecimento INTEGER NOT NULL"+"
	CONSTRAINT tb_abastecimento FOREIGN KEY(id_abastecimento) REFERENCES id_abastecimento "+");"); 

});

