<?php
	ini_set('default_charset','UTF-8');
	header("Content-Type: text/html; charset=ISO-8859-1", true);
	header("Content-Type: text/html; charset=UTF-8", true);
	$_REQUEST = array_map(utf8_decode, $_REQUEST);

	session_start(); 
	if($_SERVER['REQUEST_METHOD']=='POST'){
		$image = "";


		$id_aluno = $_POST['id_aluno'];
		 
		$image = $_POST['foto'];
		 
		 include_once 'dbConnect_local.php';
		 
		 $path = "uploads/".$id_aluno.".jpg";
			 
		 $actualpath = "http://sample-env-4.5ragbgqcqd.us-west-2.elasticbeanstalk.com/".$path;	
			 
		 $sql = "update tbl_aluno set foto = '$actualpath' where id_aluno =".$id_aluno;	
		 if(mysqli_query($con, $sql)){
			 file_put_contents($path,base64_decode($image));
			 echo "Successfully Uploaded";
		 }else {
			 echo "Deu erro";
			 
		 }

	}else{
		echo "Error";
	}
 
 ?>