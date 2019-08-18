// Adicionando modais ao topo da página
$('body')
.prepend($('div .modal'));

// Pré-carregamento
$(window)
.load(function () {
    $('html')
    .removeClass("pre-loading");
});

$('.sidebar a[href="' + window.location.href + '"]')
.parents('li')
.addClass("active");

var pusher;

if (typeof Pusher == 'function') {
    Pusher.logToConsole = true;
    pusher = new Pusher('443f18fda45f67983a80', {encrypted: true});
}

var alertAudio = $('<audio loop="loop" >' +
    '<source src="' + URL_APP + '/webfiles/song/alert.mp3" type="audio/mp3" />' +
    '</audio>')
.on("play", function () {

    var audio = $(this);

    if (audio.data('status') === true) {

        audio[0].currentTime = 0;
        audio[0].loop = true;
        audio[0].play();

        audio.data('status', false);
    }
})
.on("stop", function () {

    var audio = $(this);

    audio[0].pause();
    audio[0].currentTime = 0;

})
.on('pause', function () {
    var audio = $(this);
    audio[0].pause();
})
.on('resume', function () {
    $(this).trigger('play');
})
.data("status", true);


