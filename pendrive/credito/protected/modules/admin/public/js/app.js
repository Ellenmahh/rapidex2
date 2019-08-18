Plupload = {
    init: function ($home) {
        
        Plupload.removerFoto();

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'pickfiles', // you can pass in id...
            container: document.getElementById('container'), // ... or DOM Element itself
            url: 'admin/upload',
            flash_swf_url: '../js/Moxie.swf',
            silverlight_xap_url: '../js/Moxie.xap',
            unique_names: true,
            filters: {
                max_file_size: '10mb',
                mime_types: [
                    {title: "Image files", extensions: "jpg,jpeg,gif,png"}
                ]
            },
            // Views to activate
            views: {
                list: true,
                thumbs: true, // Show thumbs
                active: 'thumbs'
            },
            init: {
                PostInit: function () {
                    document.getElementById('filelist').innerHTML = '';

                    document.getElementById('uploadfiles').onclick = function () {
                        uploader.start();
                        return false;
                    };
                },
                FilesAdded: function (up, files) {
                    plupload.each(files, function (file) {
                        document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                    });
                },
                FileUploaded: function(up, file){
                    var order = $('#thumbs li').length;
                    if($home){
                        document.getElementById('thumbs').innerHTML += '<li><a class="clickRemover fa fa-minus-circle" data-codi="null"></a><img src="public/uploads/temp/' + file.target_name + '" width=250 /><input type="hidden" name="Pagefoto[]" value="' + file.target_name + '" /><input type="text" name="PagefotoLink[]" value="" placeholder="link" /><input class="fotoOrdem" type="hidden" value="'+ order +'" name="fotoUpOrder[]" /></li>';
                    } else {
                        document.getElementById('thumbs').innerHTML += '<li><a class="clickRemover fa fa-minus-circle" data-codi="null"></a><img src="/public/uploads/temp/' + file.target_name + '" width=150 /><input type="hidden" name="Pagefoto['+ file.id +']" value="' + file.target_name + '" /><input class="fotoOrdem" type="hidden" value="'+ order +'" name="fotoUpOrder['+ file.id +']" /></li>';
                    }
                },
                UploadProgress: function (up, file) {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                },
                UploadComplete: function (up, file) {
                    document.getElementById('filelist').innerHTML = '';
                },
                Error: function (up, err) {
                    document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
                }
            }
        });

        uploader.init();

    },
    removerFoto: function() {
        $('#page-wrapper').on('click', '.clickRemover', function(){
            if(confirm('tem certeza que deseja remover essa foto?')) {
                var codi = $(this).data('codi'),
                    li = $(this).parents('li');
                
                if(codi === null){
                    li.remove();
                    return true;
                }
                
                $.ajax({
                    url: 'admin/upload/removeFoto',
                    data: {codi : codi},
                    type: 'post',
                    dataType: 'json',
                    success: function(json){
                        if(json.success){
                            li.remove();
                        }
                    }
                });
            }
        });
    }

}

Video = {
    init: function() {
        Video.changeVideo();
        Video.removerVideo();
    },
    previewVideo: function(el) {
        var value = $(el).val();
        
        if( value != ''){
            
            var testLoc = document.createElement('a'),
                videoID = '',
                what,
                url;
        
                testLoc.href = value.toLowerCase();
                url = testLoc.hostname;
            
            if (url.indexOf('youtube.com') !== -1) {
                what='Youtube';
                videoID = value.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)[1];
                if (videoID){
                    $('.previewVideo').empty().html('<li><a class="clickRemoverVideo fa fa-minus-circle" data-codi="null"></a><iframe width="500" height="281" src="//www.youtube.com/embed/'+ videoID +'" frameborder="0" allowfullscreen></iframe></li>');
                }
            } else if (url.indexOf('vimeo.com') !== -1) {
                what='Vimeo';
                var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
                var match = value.match(regExp);
                if (match){
                    videoID = match[2];                    
                    $('.previewVideo').empty().html('<li><a class="clickRemoverVideo fa fa-minus-circle" data-codi="null"></a><iframe src="//player.vimeo.com/video/'+ videoID +'" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></li>');
                }
            } else {
                what = 'None';
            }
            
        } else {
            $('.previewVideo').empty();
        }
    },
    changeVideo: function(){
        $("span.addVideo").click(function(){
            Video.previewVideo($("input#Video_url"));
        });
    },
    removerVideo: function(){
        $('#page-wrapper').on('click', '.clickRemoverVideo', function(){
            if(confirm('tem certeza que deseja remover esse vídeo?')) {
                var codi = $(this).data('codi'),
                    li = $(this).parents('li');
                
                if(codi === null){
                    li.remove();
                    return true;
                }
                
                $.ajax({
                    url: 'admin/insight/removeVideo',
                    data: {codi : codi},
                    type: 'post',
                    dataType: 'json',
                    success: function(json){
                        if(json.success){
                            li.remove();
                        }
                    }
                });
            }
        });
    }
}

Insight = {
    init: function(){
        Insight.deletar();
    },
    deletar: function(){
        $("a.clickDeletar").click(function(e){
            e.preventDefault();
            var url = $(this).attr("href");
            $.ajax({
                url: url,
                data: {deletar : true},
                type: "post",
                dataType: "json",
                success: function(json){
                    alert(json.msg);
                    if(json.success){
                        if(json.redirect != 'undefined'){
                            window.location.href = json.redirect;
                        }
                    }
                }
            });
        });
    }
}

MenuActive = {
    init: function(){
        var mactive = $(".container-fluid").data("menu");
        $("ul.navbar-nav li").removeClass("active");
        $("ul.navbar-nav li."+mactive).addClass("active")
    }
}

MenuActive.init();