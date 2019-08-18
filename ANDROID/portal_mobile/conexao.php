<?php
	$host = $_SERVER['RDS_HOSTNAME'];
	$usuario = $_SERVER['RDS_USERNAME'] ;
	$senha = $_SERVER['RDS_PASSWORD'];
	$banco = $_SERVER['RDS_DB_NAME'];
	

	
	$dbcon = new MySQLi("$host", "$usuario", "$senha", "$banco");
	
	
	if($dbcon->connect_error){
		
		echo"conexao_erro";
		
		
	}/*else{
		
		echo"conexao_ok";
		
		
	}*/


?>