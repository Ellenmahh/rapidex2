<?php

	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	ini_set('default_charset','UTF-8');
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	
	
	$cpf = "";
	$respostaAluno = "";
	include_once 'conexao_local.php';
	$cpf=$_POST['cpf'];
	$respostaAluno=$_POST['respostaAluno'];
	
	
	$sql = $dbcon->query("select ra.respostaAluno, a.nome, a.cpf, a.senha,a.foto, p.nomePergunta from tbl_aluno as a inner join tblrespostaaluno as ra on a.id_aluno = ra.id_aluno inner join tblPergunta as p on p.idPergunta = ra.idPergunta where cpf  = $cpf and ra.respostaAluno = '".$respostaAluno."'");
	
	
	if(mysqli_num_rows($sql) > 0){
		echo"cpf_ok";
		echo",";
		while($dados = $sql->fetch_array()){
			
			echo utf8_encode ($dados['senha']);
			echo",";
			echo utf8_encode ($dados['nome']);
			echo",";
			echo utf8_encode ($dados['cpf']);
			echo",";
			echo utf8_encode ($dados['foto']);
		}	
		
		
	}else{
		
		echo"cpf_erro";
		
		
	}

	
	
	
	
	
	
	
?>	