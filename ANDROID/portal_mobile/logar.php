<?php

	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	ini_set('default_charset','UTF-8');
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	
	$cpf = "";
	$senha = "";
	
	include_once 'conexao_local.php';
	
	$cpf=$_POST['cpf'];
	$senha=$_POST['senha'];

	$sql = $dbcon->query("select aluno.*, turma.nome_turma, curso.nome_curso from tbl_aluno as aluno inner join tbl_turma as turma on turma.id_turma = aluno.id_turma 
	inner join tbl_curso as curso on curso.id_curso = turma.id_curso WHERE cpf ='$cpf' and senha='$senha';");
	
	if(mysqli_num_rows($sql) > 0){
		session_start();
		echo"login_ok";
		echo",";
		while($dados = $sql->fetch_array()){
			
			if($dados['foto'] == null){
				echo utf8_encode ($dados['id_aluno']);
				echo",";
				echo utf8_encode ($dados['email']);
				echo",";
				echo utf8_encode ($dados['nome_curso']);
				echo",";
				echo utf8_encode ($dados['matricula']);
				echo",";
				echo utf8_encode ($dados['nome']);
				echo",";	
				echo utf8_encode ($dados['dt_nasc']);
				echo",";
				echo utf8_encode ($dados['cpf']);
				echo",";
				echo utf8_encode ($dados['id_turma']);
				echo",";
				echo utf8_encode ($dados['nome_turma']);
				echo",";
				echo utf8_encode ($dados['senha']);
				echo",";
				echo utf8_encode ($dados['genero']);
				echo",";
				echo utf8_encode ($dados['email_institucional']);
				echo",";
				echo "http://www.leadsndeals.com/images/bill.png";
			}else{
				
				echo utf8_encode ($dados['id_aluno']);
				echo",";
				echo utf8_encode ($dados['email']);
				echo",";
				echo utf8_encode ($dados['nome_curso']);
				echo",";
				echo utf8_encode ($dados['matricula']);
				echo",";
				echo utf8_encode ($dados['nome']);
				echo",";	
				echo utf8_encode ($dados['dt_nasc']);
				echo",";
				echo utf8_encode ($dados['cpf']);
				echo",";
				echo utf8_encode ($dados['id_turma']);
				echo",";
				echo utf8_encode ($dados['nome_turma']);
				echo",";
				echo utf8_encode ($dados['senha']);
				echo",";
				echo utf8_encode ($dados['genero']);
				echo",";
				echo utf8_encode ($dados['email_institucional']);
				echo",";
				echo $dados['foto'];
			}
			
			
			
		}
		
		
	}else{
		
		echo"login_erro";
		
	}
	
	


?>


