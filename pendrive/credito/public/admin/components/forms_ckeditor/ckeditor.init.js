/**
 * Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */



if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

$('document').ready(function(){

    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = 350;
    CKEDITOR.config.width = 'auto';
    if($("#Menu_texto").length > 0)
        CKEDITOR.replace( 'Menu_texto', {
                // Define the toolbar groups as it is a more accessible solution.
                toolbarGroups: [
                        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                        { name: 'forms', groups: [ 'forms' ] },

                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                        { name: 'links', groups: [ 'links' ] },
                        { name: 'insert', groups: [ 'insert' ] },

                        { name: 'styles', groups: [ 'styles' ] },
                        { name: 'colors', groups: [ 'colors' ] },
                        { name: 'tools', groups: [ 'tools' ] },
                        { name: 'others', groups: [ 'others' ] },
                        { name: 'about', groups: [ 'about' ] }
                ],

                removeButtons: 'Outdent,NumberedList,Save,NewPage,Preview,Print,Templates,Cut,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,RemoveFormat,Indent,Blockquote,CreateDiv,Language,Link,Unlink,Anchor,Image,Flash,Smiley,SpecialChar,PageBreak,Iframe,ShowBlocks,About'
        } );
    
});