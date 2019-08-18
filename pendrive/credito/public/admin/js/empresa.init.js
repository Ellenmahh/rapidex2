Empresa = {
    init: function(){
        Post.deletar();
        Post.dzRemove();
    },
    deletar: function(){
        $(".clickDeletar").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            
            $.ajax({
                url: $(this).attr('href'),
                data: {deletar: true},
                type: 'post',
                dataType: 'json',
                success: function(json){
                    if(json.success){
                        if(json.redirect){
                            window.location.href = json.redirect;
                        }
                    } else {
                        alert(json.msg);
                    }
                }
            });
        });
    },
    dzRemove: function(){
        $(".dropzoneLogo .dz-remove.dz-exist").click(function(){
            var codi = $(this).data("codi");
            $("#dropzone").append('<input type="hidden" name="fotoLogoRemove[]" value="'+codi+'" />');
            $(this).parents(".dz-preview").remove();
            if($(".dz-preview").length <=0){
                $("#logo-upload").removeClass("dz-started");
            }
        });
        
        $(".dropzoneFile .dz-remove.dz-exist").click(function(){
            var codi = $(this).data("codi");
            $("#dropzone").append('<input type="hidden" name="fotoCapaRemove[]" value="'+codi+'" />');
            $(this).parents(".dz-preview").remove();
            if($(".dz-preview").length <=0){
                $("#demo-upload").removeClass("dz-started");
            }
        });
    }
}

Empresa.init();