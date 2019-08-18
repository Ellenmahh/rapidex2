<?php

	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
	ini_set('default_charset','UTF-8');	
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	
	include_once 'conexao.php';
	
	$id_turma = $_POST['id_turma'];
	
	$sql = $dbcon->query("select materia.id_materia, materia.nome_materia 
				from tbl_materia as materia
				JOIN tbl_materia_turma as mt
				ON mt.id_materia = materia.id_materia
				JOIN tbl_turma as turma
				ON turma.id_turma = mt.id_turma
				WHERE turma.id_turma = $id_turma;");
	
	if(mysqli_num_rows($sql) > 0){
		
		$lista = [];
		
		while($dados = $sql->fetch_array()){
			
			$obj = array("id_materia" => $dados['id_materia'] , "nome_materia" => $dados['nome_materia']);
						
			$lista[] = $obj;
		}
		
		echo json_encode($lista);
		
		
	}

?>


