Configuracao = {
    init: function(){
        Configuracao.novoUser();
        Configuracao.removeUser();
        Configuracao.salvarPerfil();
    },
    novoUser: function(){
        $("#novoUser").submit(function(){
            var self = $(this);
            $.ajax({
                url: self.attr("action"),
                data: self.serialize(),
                type: "post",
                dataType: "json",
                success: function(json){
                    if(json.success){
                        alert("Usuário cadastrado com sucesso!");
                        self.find("input").val("");
                        $("ul#usuario-list").append('<li>'+json.data.nome+'<div class="pull-right"><a class="remove" data-codi="'+json.data.codi+'"><i class="fa fa-times"></i> remover</a></div></li>');
                    } else {
                        if(json.error){
                            $.each(json.error, function(index, obj){
                                $.each(obj, function(el, msg){
                                    var findEl = self.find("input[name='"+index+"["+el+"]']"),
                                    findElMaisSmall = $("input[name='"+index+"["+el+"]'] + small");
                                    
                                    findEl.addClass("error");
                                    if(findElMaisSmall.size() > 0)
                                        findElMaisSmall.html(msg);
                                    else
                                        $("<small>"+msg+"</small>").insertAfter(findEl);
                                });
                            });
                        }
                    }
                }
            });
            return false;
        });
    },
    removeUser: function(){
        $("#usuario-list").on('click', 'a.remove', function(){
            var self = $(this),
                codi = self.data("codi");
                
            if(confirm("Tem certeza que deseja remover este usuário?")){
                $.ajax({
                    url: './removeUsuario/',
                    data: { codi : codi },
                    type: "post",
                    dataType: "json",
                    success: function(json){
                        if(json.success){
                            self.parents("li").remove();
                        }
                    }
                });
            }
        });
    },
    salvarPerfil: function(){
       $("#editarPerfil").submit(function(){
           var self = $(this);
           
           $.ajax({
                url: self.attr("action"),
                data: self.serialize(),
                type: "post",
                dataType: "json",
                success: function(json){
                   if(json.success){
                       alert(json.msg);
                       self.find("input[type='password']").val("");
                   } else {
                        if(json.error){
                            $.each(json.error, function(index, obj){
                                $.each(obj, function(el, msg){
                                    var findEl = self.find("input[name='"+index+"["+el+"]']"),
                                    findElMaisSmall = $("input[name='"+index+"["+el+"]'] + small");
                                    
                                    findEl.addClass("error");
                                    if(findElMaisSmall.size() > 0)
                                        findElMaisSmall.html(msg);
                                    else
                                        $("<small>"+msg+"</small>").insertAfter(findEl);
                                });
                            });
                        }
                   }
               }
           });
           return false;
       }); 
    }
}

Configuracao.init();