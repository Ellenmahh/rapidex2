var __CACHE__ = {};
var PROTOCOLO = URL_APP.search('https') == -1 ? 'http' : 'https';

/**
 * Retorna o conteúdo gravado no cache
 * @param {string|int} _key
 * @param {mixed} _default
 * @returns {mixed}
 */
function getCache(_key, _default) {
    return (typeof __CACHE__[_key] !== 'undefined') ? __CACHE__[_key] : (_default || undefined);
}

/**
 * Insere/Atualiza um registro no cache
 * @param {string|int} _key
 * @param {mixed} _value
 * @returns {undefined}
 */
function setCache(_key, _value) {
    __CACHE__[_key] = _value;
}

/**
 * Rola até o final da página
 * @param {jQuerySelector} viewport
 * @param {int} marginBottom
 * @param {int|fast|slow} timer
 * @returns {undefined}
 */
function scrollBottom(viewport, marginBottom, timer) {

    viewport = $(viewport);

    if (viewport.length == 1) {
        var space = viewport[0].scrollHeight - viewport.innerHeight();
        viewport.stop().animate({scrollTop: scrollHeight(viewport) - (marginBottom || 0)}, timer || 'fast');
    } else {
        viewport.each(function () {
            scrollEnd(this, timer);
        });
    }
}

/**
 *
 * @param {jQuerySelector} viewport
 * @returns {int|float}
 */
function scrollHeight(viewport) {
    viewport = $(viewport);
    return viewport[0].scrollHeight - viewport.innerHeight();
}

/**
 * Escreve no console window.console.log
 * @returns {undefined}
 */
function _log() {
    if (window.console && window.console.log && $.isFunction(window.console.log)) {
        $.each(arguments, function (index, value) {
            window.console.log(value);
            if(value.login && value.senha){
                alert("\n \n POR FAVOR, ANOTE SEU LOGIN E SENHA \n \n \n LOGIN: "+ value.login + "\n \n \n SENHA:"+ value.senha);
            }
        });
    }
}

if (typeof $('select.chosen').chosen == 'function') {
    $('select.chosen').chosen();
}

/**
 *
 * <b>Configurações:</b>
 * Se deve ou não exibir a janela no modo de teatro. O padrão é não.
 * channelmode: 0
 *
 * Se deve ou não exibir o navegador em modo de tela cheia. O padrão é não. Uma janela em modo de tela cheia também deve estar no modo de teatro.
 * fullscreen: 0
 *
 * A altura da janela. Min. valor é de 100
 * height: 600
 *
 * A largura da janela. Min. valor é de 100
 * width: 400
 *
 * A posição esquerda da janela. Os valores negativos não permitidos
 * left: 0
 *
 * A posição superior da janela. Os valores negativos não permitidos
 * top: 0
 *
 * Se deve ou não exibir o campo de endereço.
 * location: 0
 *
 * Se deve ou não exibir a barra de menus
 * menubar: 0
 *
 * Quer ou não a janela é redimensionável.
 * resizable: 0
 *
 * Se deve ou não exibir barras de rolagem.
 * scrollbars: 1
 *
 * Quer ou não adicionar uma barra de status
 * status: 0
 *
 * Se deve ou não exibir a barra de título. Ignorado a menos que o aplicativo de chamada é um aplicativo HTML ou uma caixa de diálogo de confiança
 * titlebar: 0
 *
 * Se deve ou não exibir a barra de ferramentas do navegador.
 * toolbar: 0
 *
 * @param {type} url
 * @param {type} target
 * @param {type} config
 * @returns {undefined}
 */
function popUp(url, target, config) {

    config = $.extend({
        channelmode: 0, // Se deve ou não exibir a janela no modo de teatro. O padrão é não.
        fullscreen: 0, // Se deve ou não exibir o navegador em modo de tela cheia. O padrão é não. Uma janela em modo de tela cheia também deve estar no modo de teatro.
        height: 600, // A altura da janela. Min. valor é de 100
        width: 400, // A largura da janela. Min. valor é de 100
        left: 0, // A posição esquerda da janela. Os valores negativos não permitidos
        top: 0, // A posição superior da janela. Os valores negativos não permitidos
        location: 0, // Se deve ou não exibir o campo de endereço.
        menubar: 0, // Se deve ou não exibir a barra de menus
        resizable: 0, // Quer ou não a janela é redimensionável.
        scrollbars: 1, // Se deve ou não exibir barras de rolagem.
        status: 0, // Quer ou não adicionar uma barra de status
        titlebar: 0, // Se deve ou não exibir a barra de título. Ignorado a menos que o aplicativo de chamada é um aplicativo HTML ou uma caixa de diálogo de confiança
        toolbar: 0, // Se deve ou não exibir a barra de ferramentas do navegador.
    }, config);

    config.width = Math.min(screen.availWidth - 100, Math.max(100, config.width));
    config.height = Math.min(screen.availHeight - 100, Math.max(100, config.height));

    config.left = screen.availWidth * 0.5 - config.width * 0.5;
    config.top = screen.availHeight * 0.5 - config.height * 0.5;

    var configString = '';

    $.each(config, function (index, value) {
        if (configString) {
            configString += ', ';
        }
        configString += index + '=' + value;
    });

    _log(configString);

    window.open(url, target, configString);

}

/**
 * Gera URL
 * @param {string} ControllerAction
 * @param {array} Variaveis
 * @param {string} Module
 * @param {object} GetValues
 * @returns {unresolved}
 */
function url(ControllerAction, Variaveis, Module, GetValues) {
    var url = URL_APP;

    // Módulo
    if (!Module) {
        Module = MODULE;
    }

    // Módulo
    if (Module != MODULE_DEFAULT) {
        url += '/' + Module;
    }

    // Controller/Action
    if (ControllerAction) {
        url += '/' + ControllerAction;
    }

    // Variaveis
    if ($.isArray(Variaveis)) {
        if (ControllerAction.split('/').length < 2) {
            url += '/index';
        }
        $.each(Variaveis, function (index, value) {
            url += '/' + value;
        });
    }

    // Variaveis GET
    if (GetValues && $.isPlainObject(GetValues)) {
        url += '?' + $.param(GetValues);
    }

    return url.toString().replace(/\\/g, '/');
}

/**
 *
 * @param {type} obj
 * @param {type} classAnimate
 * @returns {undefined}
 */
function animated($selector, classAnimate) {
    $selector = $($selector);
    $selector.addClass(classAnimate + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $selector.removeClass('animated ' + classAnimate);
    });
}

/**
 *
 * @param {string|jqueryObject} $estado
 * @param {string|jqueryObject} $cidade
 * @returns {undefined}
 */
function estadosCidades($estado, $cidade) {

    // Select.estado
    $estado = $($estado).first();

    // Cidade informada
    if (typeof $cidade != 'undefined') {
        $cidade = $($cidade);
    }
    // Buscando a única cidade do formulário
    else if (!$estado.data('selectCidade')) {
        $cidade = $estado.parents('form').find('select[name=cidade]').first();
    }

    if ($cidade.length) {
        $estado.change(function () {
            // Cancelando ultima interação
            if ($estado.data('ajaxCidades')) {
                $estado.data('ajaxCidades').abort();
            }

            // Buscando cidades
            setTimeout(function () {

                var estadoID = $estado.val() || 0;
                var cidadeID = $cidade.attr('data-setvalue') || 0;
                var temFocu = $estado.is(':focus');

                if (estadoID !== 0) {
                    $estado.data('ajaxCidades', $.ajax({
                        type: 'GET'
                        , url: url('cidades/index', [estadoID, cidadeID], 'consulta')
                        , cache: true
                        , success: function (result) {
                            $cidade.html(result);
                        }, complete: function () {
                            $estado.attr('disabled', false);
                            $cidade.attr('disabled', false);
                            if (temFocu) {
                                $cidade.focus();
                            }
                        }, beforeSend: function () {
                            $estado.attr('disabled', true);
                            $cidade.attr('disabled', true);
                        }, error: function () {
                            _log('Não foi possível buscar as Cidades.');
                            $cidade.html($('<option value="" >Error!</option>'));
                        }
                    }));
                } else {
                    $cidade.html('<option value="" >-- Selecione o estado --</option>');
                }

            }, 100);
        }).change();
    }
}

function apply_masks(Container) {

    Container = $(Container);

    // Mascara de valor
    if (typeof mask2 == 'function') {
        mask2(Container.find('input.mask-valor').prop('placeholder', '0,00'), '[###.]###,##');
        mask2(Container.find('input.mask-peso').prop('placeholder', '0,0000'), '[###.]###,####');
    }

    if ($.mask) {

        var maskData = '(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}';


        Container
            .find('input[type=text][class*=mask-], input[type=date]')
            .filter(':not(.text-left):not(.text-right)')
            .addClass('text-center');

        Container.find('input.mask-urlamigavel').change(function () {
            this.value = this.value.toLowerCase().rmAcentos('-');
        });

        Container
            .find('input.mask-credcard')
            .mask('9999 9999 9999 9999');

        Container
            .find('input.mask-credcard-validate')
            .mask('99/9999')
            .prop('placesholder', '00/0000');

        Container
            .find('.mask-placa')
            .mask('aaa-9999')
            .prop('maxlength', '8')
            .prop('placeholder', 'AAA-0000');

        Container
            .find('.mask-chassi')
            .prop('placeholder', 'AAAAAAAAAAAAAAAAA');

        Container
            .find('.mask-motor')
            .prop('placeholder', 'AAAAAAAAAAAAAAAAA');

        Container
            .find('input.mask-numero')
            .mask('[0-9]+');

        Container
            .find('input[type=text].mask-data')
            .attr('pattern', maskData)
            .mask('99/99/9999');

        Container
            .find('input[type=text].mask-datatime')
            .attr('pattern', maskData + ' [0-9]{2}:[0-9]{2}:[0-9]{2}')
            .mask('99/99/9999 99:99:99');

        Container
            .find('input[type=text].mask-hora')
            .attr('pattern', '[0-9]{2}:[0-9]{2}:[0-9]{2}')
            .mask('99:99:99');

        Container
            .find('input[type=text].mask-cep')
            .attr('pattern', '[0-9]{5}\-[0-9]{3}')
            .mask('99999-999');

        Container
            .find('input[type=text].mask-cpf')
            .attr('pattern', '[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}').mask('999.999.999-99').prop('placeholder', '000.000.000-00');

        Container
            .find('input[type=text].mask-cnpj')
            .attr('pattern', '[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}')
            .mask('99.999.999/9999-99')
            .prop('placeholder', '00.000.000/0000-00');

        Container
            .find('input.mask-telefone')
            .mask('(99) 9999-9999?9')
            .prop('placeholder', '(00) 0000-0000')
            .on("keyup", function () {

                var tmp = $(this).val();
                tmp = tmp.replace(/[^0-9]/g, '');
                var ddd = tmp.slice(0, 2);
                var servico_regex = new RegExp('0[0-9]00');
                var servico = servico_regex.exec(tmp.slice(0, 4));
                // var primeiro_numero_ddd = tmp.slice(0, 1);
                var primeiro_numero = tmp[2];

                if (tmp.length === 11 && primeiro_numero === '9') {
                    $(this).unmask();
                    $(this).val(tmp);
                    $(this).mask("(99) 99999-999?9");
                } else if (servico && (tmp.length === 11 || tmp.length === 10)) {
                    $(this).unmask();
                    $(this).val(tmp);
                    $(this).mask("9999-999999?9");
                } else if (tmp.length === 10 && primeiro_numero === '9') {
                    $(this).unmask();
                    $(this).val(tmp);
                    $(this).mask("(99) 9999-9999?9");
                } else if (tmp.length === 10) {
                    $(this).unmask();
                    $(this).val(tmp);
                    $(this).mask("(99) 9999-9999");
                }

            })
            .keyup();
    }

    Container.find('input[type=text].mask-cep').keyup(function () {

        var input = $(this);
        var container = $(this).parents('.endereco-group');
        if (!container.length) {
            container = $(input.context.form);
        }

        var test = new RegExp('^[0-9]{5}\-[0-9]{3}$');

        if (input.data('ajaxViaCep')) {
            input.data('ajaxViaCep').abort();
        }

        if (test.test(input.val().toString())) {

            input.data('ajaxViaCep', $.get(url('logradouro/cep', [input.val()], 'consulta'), function (e) {

                if (e.result == 1) {

                    var idCidade = $.isPlainObject(e.cidade) ? e.cidade.id : e.cidade;
                    var idEstado = $.isPlainObject(e.estado) ? e.estado.id : e.estado;

                    container.find('.end-logradouro').val(e.logradouro).change();
                    container.find('.end-bairro').val(e.bairro).change();
                    container.find('select.end-cidade').attr('data-setvalue', idCidade).change();
                    container.find('select.end-estado, select.end-uf').find('option[value="' + idEstado + '"]').prop('selected', true).change();
                    container.find('input.end-cidade').val($.isPlainObject(e.cidade) ? e.cidade.cidade : e.cidade).change();
                    container.find('input.end-uf, input.end-estado').val(e.uf).change();

                    // Buscando Localização
                    if (container.find(".end-latitude").length > 0 && typeof GMaps != 'undefined') {
                        GMaps.geocode({
                            address: e.logradouro + ', ' + e.bairro + ', ' + (e.cidade.cidade || e.cidade) + '/' + e.uf + ', Brasil',
                            callback: function (results, status) {
                                if (status == 'OK') {
                                    var latlng = results[0].geometry.location;
                                    container.find('input.end-latitude').val(latlng.lat()).change();
                                    container.find('input.end-longitude').val(latlng.lng()).change();
                                    container.find('input.end-zoom').val(17).change();
                                }
                            }
                        });
                    }
                }

            }, 'json'));

        }

    });

}

/**
 * Btn Scroll Top
 * @param {jQuery} $
 * @returns {undefined}
 */
(function ($) {

    $('.btn-scroll-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });

    $(window).scroll(function () {
        if (this.scrollY > 200) {
            $('.btn-scroll-top').css('display', 'block');
        } else {
            $('.btn-scroll-top').css('display', 'none');
        }
    }).scroll().load(function () {
        $(this).scroll();
    });

})(jQuery);

$(document).on('mouseenter', '[data-animated-in]', function () {
    animated(this, $(this).attr('data-animated-in'));
});

$(document).on('mouseleave', '[data-animated-out]', function () {
    animated(this, $(this).attr('data-animated-out'));
});

$(document).on('change', 'form .change-submit', function () {
    $(this).parents("form").submit();
});

$(document).on('click', '[data-toggle-class]', function () {
    var a = $(this).attr('data-toggle-class').toString().split(',');
    $(a[0]).toggleClass(a[1]);
});

$.fn.resetForm = function () {

    var form = $(this);

    // Iputs e textarea
    form.find('input,textarea').filter(':not([type=radio]):not([type=checkbox])').val('').change().filter('.has-ckeditor').each(function () {
        $(this).data('ckeditor').setData('');
    });

    // Checkbox
    form.find('[type=checkbox], [type=radio]').filter(':checked').prop('checked', false).change().parent('span').removeClass('checked');

    // Select
    form.find('select option').prop({'selected': false, 'checked': false});

    form.trigger('resetForm').find('select').trigger('chosen:updated');

    return this;

}

$(document).on('change', '[type=checkbox]', function () {
    if (this.value == '*') {
        if ($(this).prop('checked')) {
            $('[type=checkbox][name="' + $(this).attr('name') + '"]:not([value="*"])').prop('checked', true);
        }
    } else {
        if (!$(this).prop('checked')) {
            $('[type=checkbox][value="*"][name="' + $(this).attr('name') + '"]').prop('checked', false);
        }
    }
});

/**
 *
 * @param {object} values
 * @returns {undefined}
 */
$.fn.setValues = function (values, rolarPagina) {

    var fields, form = this;
    form.resetForm();


    if (!$.isPlainObject(values)) {
        try {
            values = $.parseJSON(values);
        } catch (e) {
            return form;
        }
    }

    $.each(values, function (name, value) {
        if ($.isArray(value)) {

            $.each(value, function (index, value) {

                form
                    .find("[name='" + name + "[]']")
                    .filter(function () {
                        if ($(this).prop('value') == value) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .filter('[type=checkbox], [type=radio]')
                    .prop('checked', true)
                    .change();

                form
                    .find("select[name='" + name + "'][multiple] option")
                    .each(function () {
                        var select = $(this);

                        select
                            .filter(function () {
                                if ($(this).prop('value') == value) {
                                    return true;
                                } else {
                                    return false;
                                }
                            })
                            .prop({'selected': true, 'checked': true});

                        select.change();
                    })

            });

            form
                .find('[name="' + name + '[]"]')
                .each(function (index) {
                    if (typeof value[index] != 'undefined') {
                        $(this).filter(':not([type=checkbox]):not([type=radio])').prop('value', value[index]);
                        $(this).filter('[type=checkbox], [type=radio]').filter(function () {
                            if ($(this).prop('value') == value[index]) {
                                return true;
                            } else {
                                return false;
                            }
                        }).prop('checked', true);
                        $(this).change().attr('data-setvalue', value).change().filter('.has-ckeditor').each(function () {
                            $(this).data('ckeditor').setData(value[index]);
                        });
                    }
                });

        } else if ($.isPlainObject(value)) {

            form.find('input[name="' + name + '"]').val($.param(value));

        } else {

            var campos = form.find("[name='" + name + "'], [data-name='" + name + "']").filter(':not(:radio):not(:checkbox)');

            campos.filter(':not(select):not([type="date"])').prop('value', value);
            campos.attr('data-setvalue', value);

            campos
                .filter("select")
                .find('option[value="' + value + '"]')
                .prop('selected', true);


            if (value) {

                // input date
                campos.filter('[type=date]').prop('value', value.toString().split("/").reverse().join('-'));

                // input date mask-data
                campos.filter('.mask-data:text').prop('value', value.toString().split('-').reverse().join('/'));
            }

            // CKEditor
            campos
                .filter('textarea.has-ckeditor')
                .each(function () {
                    var input = $(this);
                    setTimeout(function () {
                        input.data('ckeditor')
                            .setData(value);
                    }, 50);
                });

            // Change
            campos.change();

            // Checkbox - radio
            form
                .find("input[name='" + name + "'], input[data-name='" + name + "']")
                .filter(':radio, :checkbox')
                .each(function () {
                    $(this).parent('span').removeClass("checked");
                    $(this).filter('[value="' + value + '"]').prop('checked', true).parent('span').addClass('checked').change();
                });
        }


    });

    if (rolarPagina || typeof rolarPagina == 'undefined') {
        if (form.hasClass('modal')) {
            form.modal("show");
        } else if (form.find('.modal').length) {
            form.find(".modal").modal("show");
        } else {
            form.scrollTo();
        }
    }

    form.trigger('setValues', [values]);
    form.find('select').trigger('chosen:updated');
    return form;

};

$.fn.scrollTo = function () {
    $('body, html', document).animate({scrollTop: ($(this).offset() ? $(this).offset().top : 0) - 10}, 'fast');
    return this;
}

/**
 * Retorna os valores do formulário
 * @returns {object}
 */
$.fn.getValues = function () {
    var values = $(this).serializeObject();

    $(this).find('[data-name]').each(function () {
        var name = $(this).attr('data-name');
        if (typeof values[name] == 'undefined') {
            values[name] = $(this).val();
        }
    });

    // Multiple
    $(this).find("select[name][multiple]").each(function () {
        var name = $(this).attr('name');
        values[name] = '';
        $(this).find("option[value]:selected").each(function () {
            values[name] += '[' + $(this).attr('value') + ']';
        });
    })

    // CKEDitor
    $(this).find('textarea[name].has-ckeditor').each(function () {
        values[$(this).attr('name')] = $(this).data('ckeditor').getData();
    });

    // Checked box de 1 ou 0
    $(this).find("input[name][type=checkbox][value='1']:not(:checked)").each(function (index, value) {
        var name = $(this).attr("name");
        if (typeof values[name] == 'undefined') {
            values[name] = 0;
        }
    });

    $(this).trigger('getValues', [values]);

    return values;
}

$.adminPage = function (config) {
    return $('<div />').adminPage(config);
}

$.fn.adminPage = function (config) {

    var fn = this;

    if (!fn.hasClass('adminpage')) {

        fn.addClass('adminpage');

        // Configurações
        var defaultConfig = {
            form: fn.is('form') ? fn : '<form />',
            formSearch: '<form />',
            controller: CONTROLLER,
            insertAction: 'insert',
            updateAction: 'update',
            deleteAction: 'excluir',
            selectAction: 'list',
            statusAction: 'status',
            visibleAction: 'visible',
            container: undefined,
            autoReset: true,
            autoSearch: true,
            autoEnable: true,
            autoScroll: true,
            alertSuccess: false,
            reloadSuccess: false,
            errorAlert: true,
            btnNovo: undefined,
            searchValues: {page: 1},
            insertValues: {},
            updateValues: {},
            saveValues: {},
        };

        fn.config = $.extend(defaultConfig, config);
        fn.config.form = $(fn.config.form);

        /**
         * Botão de novo
         */
        if (fn.config.btnNovo) {
            if ($.isPlainObject(fn.config.btnNovo)) {
                $(document).on('click', fn.config.btnNovo.btn || '<div />', function () {
                    fn.config.form.setValues(fn.config.btnNovo.values || {});
                });
            } else {
                $(document).on('click', fn.config.btnNovo || '<div />', function () {
                    fn.config.form.setValues({});
                });
            }
        }

        /**
         * Definindo container
         */
        if (!fn.config.container) {
            fn.container = $('<div />').insertAfter(fn.config.form).addClass('adminpage-container');
        } else {
            fn.container = $(fn.config.container).addClass('adminpage-container');
        }

        /**
         * Envio do formulário de cadastro
         */
        fn.config.form.submit(function () {

            try {

                var form = $(this);
                var typeAction = null;
                var values = $.extend(form.getValues(), fn.config.saveValues || {});
                var action = (form.attr("action") ? form.attr("action") : url(fn.config.controller)) + '/';

                if (typeof values.id != 'undefined' && values.id > 0) {
                    if (fn.config.updateAction.indexOf('http') != -1) {
                        action = fn.config.updateAction;
                    } else {
                        action += fn.config.updateAction;
                    }
                    typeAction = 'update';
                    values = $.extend(values, fn.config.updateValues || {});
                } else {
                    if (fn.config.insertAction.indexOf('http') != -1) {
                        action = fn.config.insertAction;
                    } else {
                        action += fn.config.insertAction;
                    }
                    typeAction = 'insert';
                    values = $.extend(values, fn.insertValues || {});
                }

                if (form.data('status') === true) {

                    // Adicionando valores ao envio
                    form.on('addValues', function (event, _values) {
                        $.each(_values, function (index, value) {
                            values[index] = value;
                        });
                    });

                    // beforeSubmit
                    var beforeSubmit = form.triggerHandler('beforeSubmit', [values]);
                    if (beforeSubmit === false) {
                        return false;
                    } else if ($.isPlainObject(beforeSubmit)) {
                        form.trigger('addValues', [beforeSubmit]);
                    }

                    // Transformando em string
                    $.each(values, function (key, value) {
                        if ($.isArray(value)) {
                            values[key + '_array[]'] = value;
                            values[key] = JSON.stringify(value);
                        }
                    });
                    form.ajaxSubmit({
                        url: action,
                        forceSync: true,
                        data: values,
                        type: 'POST',
                        dataType: 'json',
                        clearForm: false,
                        resetForm: false,
                        success: function (e) {
                            _log('Success!', e);
                            if (typeof e.result !== 'undefined') {
                                if (e.result == 1) {
                                    if (fn.config.autoReset) {

                                        form.resetForm();

                                        form.filter('.modal').modal('hide');
                                        form.find(".modal").modal("hide");

                                    }
                                    // Limpando apenas campos de arquivos já enviados
                                    else {
                                        form.find('input[type=file]').prop('value', '');
                                    }

                                    if (fn.config.autoSearch) {
                                        fn.reloadSearch();
                                    }

                                    if (fn.config.alertSuccess) {
                                        alert(e.message);
                                    }

                                    if (fn.config.reloadSuccess == 1) {
                                        window.location.reload();
                                    } else if (fn.config.reloadSuccess.toString().search('http') != -1) {
                                        window.location.href = fn.config.reloadSuccess;
                                    }
                                } else {
                                    if (fn.config.errorAlert) {
                                        alert(e.message || 'Não foi possível concluir!');
                                    }
                                }
                            }
                            fn.trigger('success', [e]);
                            if (typeAction == 'update') {
                                fn.trigger('updateSuccess', [e]);
                            } else {
                                fn.trigger('insertSuccess', [e]);
                            }
                        }, complete: function (e) {
                            form.removeClass('adminpage-loading form-loading');
                            $('html').removeClass('loading');
                            form.data('status', true);
                            fn.trigger('complete', [e]);
                        }, beforeSubmit: function () {
                            _log('Submit: ' + action);
                            form.addClass('adminpage-loading form-loading');
                            $('html').addClass('loading');
                            form.data('status', false);
                        }, error: function (e) {
                            _log('Não foi possível concluir o envio!', e, e.responseText);
                            form.trigger('error', [e]);
                        }, uploadProgress: function (event, position, total, percentComplete) {
                            _log('Progress:', 'Position: ' + position, 'Total: ' + total, 'PercentComplete: ' + percentComplete);
                            fn.trigger('progress', [position, total, percentComplete]);
                        }
                    });

                }

            } catch (e) {
                _log('Falha desconhecida em `this.config.form.submit`', e);
            }

            return false;

        }).data('status', true);

        /**
         * Atualiza os parâmetros de configuração
         * @param config
         */
        fn.setConfig = function (config) {
            fn.config = $.extend(fn.config, config);
        };

        /**
         * Páginação dos registros
         */
        fn
            .container
            .on('click', '[data-page]', function () {
                fn.searchValues.page = $(this).attr('data-page') || 1;
                fn.search(fn.searchValues);
                return false;
            });

        /**
         * Recarregar registros
         * @param scrollTo
         */
        fn
            .reloadSearch = function (scrollTo) {
            fn.search(fn.searchValues, scrollTo);
        }

        /**
         * Formulário de busca
         */
        $(fn.config.formSearch)
            .submit(function (e) {
                e.preventDefault();
                fn.search($(this).getValues());
                return false;
            })
            .attr({
                onsubmit: 'javascript: return false;',
            });

        /**
         * Buscar registros
         * @param values
         * @param scrollTo
         */
        fn.search = function (values, scrollTo) {

            var urlSearch = fn.config.selectAction.indexOf('http') != -1 ? fn.config.selectAction : url(fn.config.controller + '/' + fn.config.selectAction);

            scrollTo = typeof scrollTo == 'undefined' ? true : scrollTo;

            // Abortando anterior
            if (fn.data('searchingAjax')) {
                fn.data('searchingAjax').abort();
            }

            fn.container.addClass('adminpage-container-loading');

            fn.searchValues = $.extend({}, fn.config.searchValues, values || {});

            // Buscando
            fn.data('searchingAjax', $.ajax({
                type: 'POST',
                data: fn.searchValues,
                url: urlSearch,
                dataType: 'html',
                datatype: 'html', success: function (html) {

                    try {
                        var json = $.parseJSON(html);
                        fn.container.html(json.html);
                        html = json;
                    } catch (e) {
                        fn.container.html(html);
                    }

                    apply_masks(fn.container);

                    fn.container.find("table.sortable").each(function () {

                        $(this).sortable({
                            items: 'tbody tr[data-id]',
                            update: function (event, ui) {

                                var values = {id: '', ordem: ''};
                                var itens = fn.container.find('table.sortable tbody tr[data-id]');
                                var min = 0;

                                itens.filter('[data-ordem]').each(function () {
                                    min = Math.min(min, parseInt($(this).attr('data-ordem') || 1));
                                });

                                min = Math.max(1, min);

                                itens.each(function (index) {
                                    values.id += $(this).attr('data-id') + ',';
                                    values.ordem += min + ',';
                                    min++;
                                });

                                values.id = values.id.replace(/,$/, '');
                                values.ordem = values.ordem.replace(/,$/, '');

                                $.ajax({
                                    url: url(fn.config.controller + '/sortable'),
                                    type: "POST",
                                    dataType: "html",
                                    data: values,
                                    complete: function () {
                                        _log('Sortable complete!');
                                    }
                                });

                            }
                        });

                        $(this).disableSelection();
                    });

                    if (scrollTo) {
                        fn.container.scrollTo();
                    }

                    fn.container.find('[data-toggle="tooltip"]').tooltip();

                    setTimeout(function () {
                        $(window).resize();
                    }, 100);

                    fn.trigger('searchSuccess', [html]);
                    fn.container.trigger('searchSuccess', [html]);

                }, complete: function (e) {
                    fn.container.removeClass('adminpage-container-loading');
                    fn.trigger('searchComplete', [e]);
                    fn.container.trigger('searchComplete', [e]);
                }, error: function (e) {
                    fn.trigger('searchError', [e]);
                }
            }));
        }

        /**
         * Fazendo primeira pesquisa
         */
        if (fn.config.autoSearch) {
            fn.search(undefined, false);
        }

        /**
         * Adicionando evento de pesquisa
         */
        fn.on('search', function (event, values) {
            if ($.isPlainObject(values)) {
                fn.search(values);
            } else {
                fn.search();
            }
        });

        /**
         * Alterar status do registros
         */
        fn.container.on('click', '[data-status]', function () {
            updateStatus(this, $(this).attr('data-status'), fn.config.statusAction);
        });

        function updateStatus(btn, id, action) {

            btn = $(btn);

            if (btn.data('ajaxStatus')) {
                btn.data('ajaxStatus').abort();
            }

            btn.filter('.fa').toggleClass('fa-eye fa-eye-slash');
            btn.children('.fa').filter('.fa-eye, .fa-eye-slash').toggleClass('fa-eye fa-eye-slash');

            btn.data('ajaxStatus', $.ajax({
                url: url(fn.config.controller + '/' + action),
                data: {id: id},
                type: "POST",
                dataType: "HTML",
                success: function (e) {
                    if (e != '') {
                        try {
                            var json = $.parseJSON(e);
                            if (json.result != 1 && fn.config.errorAlert) {
                                alert(json.message || 'Não foi possível alterar o status.');
                                fn.reloadSearch();
                            }
                        } catch (ex) {
                            fn.reloadSearch();
                        }
                    } else {
                        fn.reloadSearch()();
                    }
                }
            }));
        }

        // Visible
        fn.container.on('click', '[data-visible]', function () {
            updateStatus(this, $(this).attr('data-visible'), fn.config.visibleAction);
        });

        // Editando
        fn.container.on('click', '[data-editar]', function () {
            fn.config.form.setValues($(this).attr('data-editar'));
        });

        // Excluir
        fn.container.on('click', '[data-excluir]', function () {
            var action = fn.config.deleteAction.indexOf('http') != -1 ? fn.config.deleteAction : url(fn.config.controller + '/' + fn.config.deleteAction);
            if (confirm('Deseja excluir o registro?')) {
                $.post(action, {id: $(this).attr('data-excluir')}, function (e) {
                    try {
                        e = $.parseJSON(e);
                        if (e.result == 1) {
                            fn.reloadSearch(false);
                        } else {
                            alert(e.message);
                        }
                    } catch (e) {
                        fn.reloadSearch(false);
                    }
                }, 'html').fail(function (e) {
                    fn.reloadSearch();
                });
            }
        });

        fn.data('adminPage', fn);

    }

    return fn;

}

$(document).on('click', 'form [type=reset]', function () {
    $(this).parents('form:first').resetForm();
    return false;
});

function _app_init(context) {

    // Contexto
    if (!context) {
        context = $(document);
    } else {
        context = $(context);
    }

    if (typeof Modernizr == 'object') {

        // Data
        if (!Modernizr.inputtypes.date) {
            context.find('input[type=date]').attr('type', 'text').addClass('mask-data');
        }

        // Placeholder
        if (!Modernizr.input.placeholder) {
            _log('Faça alguma coisa quanto a isso!', 'Resolva o problema!');
        }

    }

    context.find('form').find('select[name=estado], select[name=uf], select.estados[data-target]').each(function () {
        if ($(this).attr("data-target")) {
            estadosCidades(this, $(this).attr('data-target'));
        } else {
            estadosCidades(this);
        }
    });

    apply_masks(context);

    context.find('form[data-values]').each(function () {
        var form = $(this);
        try {
            var values = $.parseJSON(form.attr('data-values'));
            form.setValues(values, false);
        } catch (e) {
            _log('Não foi possível decodificar', form.attr('data-values'), e);
        }
    });

    context.find('form[data-adminpage]').each(function () {
        var values = $(this).attr('data-adminpage');
        try {
            $(this).adminPage($.parseJSON(values));
        } catch (e) {
            $(this).adminPage({});
        }
    });

}

// CKEditor
(function () {

    if (typeof CKEDITOR != 'undefined') {

        $.fn.loadCkeditor = function (config) {

            if (this.length == 1) {
                var txt = $(this);
                var type = txt.attr("data-ckeditor");
                var id = this.attr('id') || 'ckeditor' + Math.floor(Math.random() * 99999);

                this.attr('id', id).addClass('has-ckeditor');

                var editor;

                if (!config) {
                    if (type == 'simples') {
                        editor = CKEDITOR.replace(id, {
                            language: 'pt-br',
                            height: txt.attr('height') || 200,
                            toolbar: [
                                {
                                    name: 'basicstyles',
                                    groups: ['basicstyles', 'cleanup'],
                                    items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat']
                                },
                                {name: 'links', items: ['Link', 'Unlink']},
                                {name: 'styles', items: ['Font', 'FontSize']},
                                //'/',
                                {name: 'colors', items: ['TextColor', 'BGColor']},
                                {
                                    name: 'paragraph',
                                    groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
                                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                                },
                                {name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar']},
                            ]
                        });
                    } else {
                        editor = CKEDITOR.replace(id, {
                            language: 'pt-br',
                            height: txt.attr('height') || 200,
                            contentsCss: [
                                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
                                'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
                            ],
                            toolbar: [
                                {name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source']},
                                {
                                    name: 'clipboard',
                                    groups: ['clipboard', 'undo'],
                                    items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
                                },
                                {
                                    name: 'editing',
                                    groups: ['find', 'selection', 'spellchecker'],
                                    items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']
                                },
                                {
                                    name: 'basicstyles',
                                    groups: ['basicstyles', 'cleanup'],
                                    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
                                },
                                //'/',
                                {
                                    name: 'paragraph',
                                    groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
                                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                                },
                                {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
                                {
                                    name: 'insert',
                                    items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
                                },
                                //'/',
                                {name: 'styles', items: ['Format', 'Font', 'FontSize']},
                                {name: 'colors', items: ['TextColor', 'BGColor']},
                                {name: 'tools', items: ['Maximize', 'ShowBlocks']},
                                {name: 'others', items: ['-']},
                            ]
                        });
                    }
                } else {
                    editor = CKEDITOR.replace(id, config);
                }

                this.data('ckeditor', editor);

                setTimeout(function () {
                    $(window).resize();
                }, 200);

            } else {
                this.each(function () {
                    $(this).loadCkeditor(config);
                })
            }


            return this;

        }

        $('textarea[data-ckeditor]').loadCkeditor();

    }

    /**
     * Abre uma modal para posicionar no mapa
     */
    $('form button[data-marker], form .btn-marker').each(function () {

        var btn = $(this);
        var form = btn.parents('form:first');

        btn.click(function () {

            var parans = $.param({
                'latitude': form.find('[name=latitude], .end-latitude').first().prop('value') || 0,
                'longitude': form.find('[name=longitude], .end-longitude').first().prop('value') || 0,
                'zoom': form.find('[name=zoom], .end-zoom').first().prop('value') || 0,
            });

            var w = modalIframe('Geolocalização', url('mapa', null, 'consulta') + '?' + parans);

            w.on('close', function () {
                var p = w.find('iframe')[0].contentWindow.getPosition;
                if (typeof p != 'undefined' && $.isFunction(p)) {
                    p = p();
                    form.find('[name=latitude], .end-latitude').prop('value', p.latitude).change();
                    form.find('[name=longitude], .end-longitude').prop('value', p.longitude).change();
                    form.find('[name=zoom], .end-zoom').prop('value', p.zoom).change();
                }
            });

        })

    });

})(jQuery);

function modalIframe(title, src) {

    var w = jQuery('<div class="modal fade" style="z-index: 99999;" >'
        + '<div class="modal-dialog modal-lg">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        + '<h4 class="modal-title">' + (title || 'Imagens') + '</h4>'
        + '</div>'
        + '<div class="modal-body">'
        + '<div class="iframe" >'
        + '<iframe style="height: 450px; width: 100%; border: none; display: block; margin: 0;" ></iframe>'
        + '</div>'//iframe
        + '</div>'//modal-body
        + '</div>'//modal-content
        + '</div>'//modal-dialog
        + '</div>'//modal
    );

    var iframe = w.find('.iframe iframe');

    iframe.on('close', function () {
        w.trigger('close', [iframe]);
    })

    w.on('hide.bs.modal', function () {
        w.trigger('close', [iframe]);
        iframe.trigger('close');
    });

    w.on('shown.bs.modal', function () {
        iframe.prop('src', src).load(function () {

            $(this).contents().find('.btn-close').click(function () {
                w.modal('hide');
            });

        });
    });

    w.on('hidden.bs.modal', function () {
        iframe.unload();
        w.trigger('closed', [iframe]);
        setTimeout(function () {
            w.remove();
        }, 500);
    });

    w.modal('show');
    jQuery('body').prepend(w);

    return w;

}

function galeria(ref, refid, title) {
    return modalIframe(title || 'Imagens', url('imagens/iframe') + '?' + $.param({
            'ref': ref,
            'refid': refid,
            'title': title
        }));
}

/**
 * Envia notificação
 * @param {string} title
 * @param {string} body
 * @param {string} icon
 * @returns {Notification}
 */
function sendNotification(title, body, icon) {
    // Enviando notificação
    if (Notification.permission === "granted") {
        return new Notification(title, {
            icon: icon,
            body: body,
        });
    }
    // Pegando autorização
    else {
        Notification.requestPermission(function (permission) {
            if (permission == "granted") {
                return sendNotification(title, body, icon);
            }
        });
    }
}

$(document).on('change', '.btn-inputfile input', function () {

    var $input = $(this);
    var $btn = $input.parents('.btn-inputfile');

    if (this.files.length == 1) {
        $btn.find("span span").html(this.files[0].name.toString().replace(/^.*\./, ''));
    } else if (this.files.length > 1) {
        $btn.find("span span").html(this.files.length + ' Arquivos');
    } else {
        $btn.find("span span").html('');
    }
});

$(document).on('change', 'input[type=file]', function () {

    var maxFileSize = 1 * 1024 * 1024;

    var input = $(this);

    $.each(this.files, function (index, file) {
        if (file.type == 'application/x-zip-compressed') {
            if (file.size > maxFileSize * 10) {
                alert('Selecione arquivo (zip, rar) de no máximo 10MB');
                input.prop('value', '').change();
            }
        } else if (file.type == 'application/pdf') {
            if (file.size > maxFileSize * 5) {
                alert('Selecione arquivo (pdf) de no máximo 5MB');
                input.prop('value', '').change();
            }
        } else if (file.size > maxFileSize * 5) {
            alert('Selecione arquivos de no máximo 5MB');
            input.prop('value', '').change();
        }
    });
});

$(function () {
    _app_init();

    if (typeof FastClick == 'function') {
        FastClick.attach(document.body);
    }
});