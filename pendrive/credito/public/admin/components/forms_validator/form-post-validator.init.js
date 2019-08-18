$.validator.setDefaults(
{
	submitHandler: function(form) {
            $.ajax({
                url: $(form).attr('action'),
                data: $(form).serialize(),
                type: 'post',
                dataType: 'json',
                success: function(json){
                    if(json.success){
                        if(json.redirect){
                            window.location.href = json.redirect;
                        } else {
                            alert('Dados salvo com sucesso!');
                        }
                    } else {
                        console.log(json);
                        if(json.errors){
                            if($("div#errorsList").length < 1){
                                $('<div/>', {
                                    id: 'errorsList'
                                }).insertBefore('form');
                            } else {
                                $("div#errorsList").empty();
                            }
                            
                            $.each(json.errors, function(index, value){
                                $("div#errorsList").append(value + '<br />');
                            });
                        }
                    }
                }
            });
        },
	showErrors: function(map, list) 
	{
		this.currentElements.parents('label:first, div:first').find('.has-error').remove();
		this.currentElements.parents('.innerB:first').removeClass('has-error');
		
		$.each(list, function(index, error) 
		{
			var ee = $(error.element);
			var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');
			
			ee.parents('.innerB:first').addClass('has-error');
			eep.find('.has-error').remove();
			eep.append('<p class="has-error help-block">' + error.message + '</p>');
		});
		//refreshScrollers();
	}
});

$(function()
{
    // validate signup form on keyup and submit
    $("#formPost").validate({
        rules: {
            "Post[post_titu]": "required",
            "Post[post_text]": {
                required: true,
                minlength: 2
            }
        },
        messages: {
            "Post[post_titu]": "Digite um título para esse post",
            "Post[post_text]": {
                required: "Digite um texto para seu post",
                minlength: "Esse texto deve ser maior que isso"
            }
        }
    });
});