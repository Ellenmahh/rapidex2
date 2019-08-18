<?php
	$host = "localhost";
	$usuario = "root";
	$senha = "bcd127";
	$banco = "dbportalmobile";
	
	$dbcon = new MySQLi("$host", "$usuario", "$senha", "$banco");
	
	
	if($dbcon->connect_error){
		
		echo"conexao_erro";
		
		
	}/*else{
		
		echo"conexao_ok";
		
		
	}*/


?>