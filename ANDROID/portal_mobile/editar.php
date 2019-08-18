<?php
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	ini_set('default_charset','UTF-8');
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	$_REQUEST = array_map(utf8_decode, $_REQUEST);

	include_once 'conexao_local.php';
	
	$email=$_POST['email'];
	$idAluno=$_POST['idAluno'];

	$sql = $dbcon->query("UPDATE tbl_aluno SET email = '$email' where id_aluno = $idAluno");
	echo"edit_ok";


?>


