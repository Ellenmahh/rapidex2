Contato = {
    init: function(){
        Contato.list();
    },
    list: function(){
        $("a.list-group-item").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            var self = $(this);
            var href = $(this).attr("href");
            $.ajax({
                url: href,
                dataType: 'html',
                success: function(html){
                    $("#email_details").html(html);
                    //Selected
                    $(".list-group.email-item-list .selected").removeClass("selected");
                    self.addClass("selected");
                    if(self.find(".fa-circle-o").size() > 0){
                        self.find(".fa-circle-o").removeClass("fa-circle-o text-muted").addClass("fa-circle");
                        var value = parseInt($(".badge.badge-primary").html());
                        console.log(value);
                        $(".badge.badge-primary").html(value-1);
                    }
                }
            });
        });
    }
}

Contato.init();