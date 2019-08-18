<?php
	ini_set('default_charset','UTF-8');
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	$_REQUEST = array_map(utf8_decode, $_REQUEST);

	include_once 'conexao_local.php';
	
	
	$nome = $_GET['nome'];
	$email = $_GET['email'];
	$senha = $_GET['senha'];
	
	$sql1 = $dbcon->query("SELECT * FROM tbLogin WHERE email='$email'");

	if(mysqli_num_rows($sql1) > 0){
		
		echo"email_erro";
		
		
	}else{
		
		//echo"vai continuar";
		$sql2 = $dbcon->query("INSERT INTO tbLogin(nome, email, senha)values('$nome', '$email', '$senha')");
		
		
		if($sql2){
			
			echo"registro_ok";
			
			
			
		}else{
			
			echo"registro_erro";
			
			
		}
		
		
	}


?>

