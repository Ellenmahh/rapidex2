(function($) 
{
	if (typeof Dropzone != 'undefined')
		Dropzone.autoDiscover = false;
	
	if ($.fn.dropzone != 'undefined'){
            $('.dropzoneFile').dropzone({
                acceptedFiles: 'image/*',
                addRemoveLinks: true,
                dictRemoveFile: 'deletar',
                dictDefaultMessage: 'Solte os arquivos aqui para enviar',
                dictInvalidFileType: 'Arquivo não permitido',
                previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>',
                success: function(file, serverFileName){
                    var serverFileNameJson = JSON.parse(serverFileName);
                    var value = {'nameServer': serverFileNameJson.name, 'nameOriginal': file.name, 'height': file.height, 'width': file.width, 'size': file.size};
                    $(file.previewElement).append('<input type="hidden" name="Post[fileUp][]" value=\''+ JSON.stringify(value) +'\' />');
                    return file.previewElement.classList.add("dz-success");
                }
            });
            
            if($(".dropzoneLogo").size() > 0){
                $('.dropzoneLogo').dropzone({
                    uploadMultiple: false,
                    maxFiles: 1,
                    acceptedFiles: 'image/*',
                    addRemoveLinks: true,
                    dictRemoveFile: 'deletar',
                    dictDefaultMessage: 'Solte os arquivos aqui para enviar',
                    dictInvalidFileType: 'Arquivo não permitido',
                    previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>',
                    success: function(file, serverFileName){
                        var serverFileNameJson = JSON.parse(serverFileName);
                        var value = {'nameServer': serverFileNameJson.name, 'nameOriginal': file.name, 'height': file.height, 'width': file.width, 'size': file.size};
                        $(file.previewElement).append('<input type="hidden" name="fileUpLogo[]" value=\''+ JSON.stringify(value) +'\' />');
                        return file.previewElement.classList.add("dz-success");
                    }
                });
            }
        }
        
})(jQuery);