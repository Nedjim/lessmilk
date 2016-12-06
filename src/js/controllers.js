// Initialisaton de l'interface du jeu 400 * 450
var game = new Phaser.Game(400, 450);
var start = document.getElementsByClassName('button')[0];
var stop = document.getElementsByClassName('button')[1];

function play() {
    game.state.add('main', menu);
    game.state.start('main');
    start.innerHTML = "Pause";
}

function end() {
    start.innerHTML = "Play";
    score = 0;
    point.innerHTML = "00";
    game.destroy();
    game = new Phaser.Game(400, 450);
}

start.addEventListener('click', play);
stop.addEventListener("click", end);