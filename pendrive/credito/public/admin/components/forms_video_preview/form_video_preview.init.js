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
                    $('.previewVideo').append('<div class="prev">\n\
                        <iframe width="500" height="281" src="//www.youtube.com/embed/'+ videoID +'" frameborder="0" allowfullscreen></iframe>\n\
                        <input type="hidden" name="Video[][url]" value="'+ value +'" />\n\
                        <a class="clickRemoverVideo" data-codi="null">deletar</a></div>');
                    $(el).val('');
                }
            } else if (url.indexOf('vimeo.com') !== -1) {
                what='Vimeo';
                var regExp = /(http|https):\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
                var match = value.match(regExp);
                if (match){
                    console.log(match);
                    videoID = match[3];                    
                    $('.previewVideo').append('<div class="prev">\n\
                    <iframe src="//player.vimeo.com/video/'+ videoID +'" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n\
                    <input type="hidden" name="Video[][url]" value="'+ value +'" />\n\
                    <a class="clickRemoverVideo" data-codi="null">deletar</a></prev>');
                $(el).val('');
                }
            } else {
                what = 'None';
            }
            
        }
    },
    changeVideo: function(){
        $("span.addVideo").click(function(){
            Video.previewVideo($("input#Video_url"));
        });
    },
    removerVideo: function(){
        $('.previewVideo').on('click', '.clickRemoverVideo', function(e){
            e.preventDefault();
            
            if(confirm('tem certeza que deseja remover esse vídeo?')) {
                var codi = $(this).data('codi'),
                    li = $(this).parents('.prev');
                
                if(codi > 0){
                    $(".previewVideo").append('<input type="hidden" name="videoRemove[]" value="'+codi+'" />');
                }
                
                li.remove();
                return true;
            }
        });
    }
}

Video.init();