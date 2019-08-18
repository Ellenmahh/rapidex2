var req;

// FUNÇÃO PARA BUSCA NOTICIA
function buscarNoticias(valor) {

// Verificando Browser
if(window.XMLHttpRequest) {
   req = new XMLHttpRequest();
}
else if(window.ActiveXObject) {
   req = new ActiveXObject("Microsoft.XMLHTTP");
}

// Arquivo PHP juntamente com o valor digitado no campo (método GET)
var url = "index.php?valor="+valor;

// Chamada do método open para processar a requisição
req.open("Get", url, true);

// Quando o objeto recebe o retorno, chamamos a seguinte função;
req.onreadystatechange = function() {

	// Exibe a mensagem "Buscando Noticias..." enquanto carrega
	if(req.readyState == 1) {
		document.getElementById('').innerHTML = 'Buscando Noticias...';
	}

	// Verifica se o Ajax realizou todas as operações corretamente
	if(req.readyState == 4 && req.status == 200) {

	// Resposta retornada pelo index.php
	var resposta = req.responseText;

	// Abaixo colocamos a(s) resposta(s) na div resultado
	document.getElementById('').innerHTML = resposta;
	}
}
req.send(null);
}
// FUNÇÃO PARA EXIBIR NOTICIA
function exibirConteudo(id) {

// Verificando Browser
if(window.XMLHttpRequest) {
   req = new XMLHttpRequest();
}
else if(window.ActiveXObject) {
   req = new ActiveXObject("Microsoft.XMLHTTP");
}

// Arquivo PHP juntamento com a id da noticia (método GET)
var url = "exibir.php?Id="+Id;

// Chamada do método open para processar a requisição
req.open("Get", url, true);

// Quando o objeto recebe o retorno, chamamos a seguinte função;
req.onreadystatechange = function() {

	// Exibe a mensagem "Aguarde..." enquanto carrega
	if(req.readyState == 1) {
		document.getElementById('tblexibir').innerHTML = 'Aguarde...';
	}

	// Verifica se o Ajax realizou todas as operações corretamente
	if(req.readyState == 4 && req.status == 200) {

	// Resposta retornada pelo exibir.php
	var resposta = req.responseText;

	// Abaixo colocamos a resposta na div conteudo
	document.getElementById('tblexibir').innerHTML = resposta;
	}
}
req.send(null);
}
