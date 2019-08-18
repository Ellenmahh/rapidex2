Post = {
    init: function(){
        Post.deletar();
        Post.dzRemove();
    },
    deletar: function(){
        $(".clickDeletar").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            
            if(confirm("Você tem certeza que deseja deletar? Essa ação não poderá ser desfeita!")) {
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
            }
        });
    },
    dzRemove: function(){
        $(".dz-remove.dz-exist").click(function(){
            var codi = $(this).data("codi");
            $("#dropzone").append('<input type="hidden" name="fotoRemove[]" value="'+codi+'" />');
            $(this).parents(".dz-preview").remove();
            if($(".dz-preview").length <=0){
                $("#demo-upload").removeClass("dz-started");
            }
        });
    }
}

Tag = {
    init: function(){
        Tag.suggest();
    },
    suggest: function(){
        if($(".suggest-tag").size() > 0)
            $(".suggest-tag").legacyautocomplete(sBaseUrl + "/admin/insight/suggestTags",{'multiple':true});
    }
}

Post.init();
Tag.init();