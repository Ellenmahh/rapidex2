<?php

	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	ini_set('default_charset','UTF-8');	
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	
	include_once 'conexao_local.php';
	
	$id_aluno = $_GET['id_aluno'];
	$id_materia = $_GET['id_materia'];
	
	$sql = $dbcon->query("select nota.valor_nota as nota,
		materia.nome_materia,
        professor.nome_professor
		from tbl_aluno as aluno JOIN tbl_professor as professor
		JOIN tbl_nota_aluno as nt ON nt.id_aluno = aluno.id_aluno
		JOIN tbl_nota as nota ON nota.id_nota = nt.id_nota
		JOIN tbl_materia as materia ON materia.id_materia = nota.id_materia
        JOIN tbl_professor_materia as pm ON pm.id_professor = professor.id_professor and pm.id_materia = materia.id_materia
        where aluno.id_aluno = $id_aluno and materia.id_materia = $id_materia;");
	
	if(mysqli_num_rows($sql) > 0){
		
		$lista = [];
		
		while($dados = $sql->fetch_array()){
			
			$obj = array("nota" => $dados['nota'] , "nome_professor" => $dados['nome_professor']); 
						
			$lista[] = $obj;
		}
		
		echo json_encode($lista);
			
	} else {
		
		echo("erro");
	}


?>


