
<script>
var array = ["Gui Ferreira Code","Dicas de Programação","Você aprende Praticando"];

var busca = "a";

for(var key in array){

document.write(array[key].indexOf(busca)+"<br>"); // resultado será: 11,3 e 5.

}
</script>