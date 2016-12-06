var menu = {
    preload: function() {
        game.load.image('barre', 'img/barre.jpg');
        game.load.image('brick', 'img/bricks.jpg');
        game.load.image('ball', 'img/ball.jpg');
        game.load.image('gameOver', 'img/game-over.jpg');
    },
    create: function() {
        //gestion des collisions
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        // création de variables qui vont traîte les touches gauche et droite
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        // Ajout du barre en bas de la fenêtre
        this.barre = game.add.sprite(200, 400, 'barre');

        // Make sure the paddle won't move when it hits the ball
        this.barre.body.immovable = true;

        //création du bloc contenant les briques
        this.bricks = game.add.group();

        //ajout de 25 briques dans le block (5*5) (cf: tableau deux dimensions C)
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                //ajout d'une brique à une position donnée
                var brick = game.add.sprite(55 + i * 60, 55 + j * 35, 'brick');
                // Make sure the brick won't move when the ball hits it
                brick.body.immovable = true;
                //ajout de la brique dans le bloc
                this.bricks.add(brick);
            }
        }

        //ball
        this.ball = game.add.sprite(200, 300, 'ball');
        this.ball.body.velocity.x = 200;
        this.ball.body.velocity.y = 200;
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
    },
    update: function() {
        // Bouger le barre de gauche à droite lorsqu'on presse sur une touche
        if (this.left.isDown) {
            this.barre.body.velocity.x = -500; //décrementation de la valeur du x
        } else if (this.right.isDown) {
            this.barre.body.velocity.x = 500; //incrémentation de la valeur du x
        }
        // Stoper le barre lorque l'on ne presse pas
        else {
            this.barre.body.velocity.x = 0;
        }

        //gestion des collisions
        game.physics.arcade.collide(this.barre, this.ball);
        game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
        if (this.ball.y > this.barre.y) {
            score = 0;
            point.innerHTML = "00";
            game.state.start('main');
        }
    },
    hit: function(ball, brick) {
        score++;
        point.innerHTML = score;
        brick.kill();
        if (score == "25") {
            alert("Félicitation!! ");
            end();
        }
    }
}