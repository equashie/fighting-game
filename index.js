



const canvas = document.querySelector('canvas');

//selecting canvas context
const c = canvas.getContext('2d');
const gravity = 0.7
const peak = -15


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const Shop = new Sprite({
    position: {
        x: 600,
        y: 135
    },
    imageSrc: './img/shop.png',
    scale: 2.7,
    frameMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Beth/Individual Sprite/actions/idle/beth_idle.png',
    frameMax: 5.9,
    scale: 2.40,
    offset: {
        x: -75,
        y: -48
    },
    sprites: {
        idle: {
            imageSrc: './img/Beth/Individual Sprite/actions/idle/beth_idle.png',
            frameMax: 5.9,
        },
        idle2: {
            imageSrc: './img/Beth/Individual Sprite/actions/idle/beth_idleV2.png',
            frameMax: 5.9,
        },
        run: {
            imageSrc: './img/Beth/Individual Sprite/actions/Run/Beth_runV2.png',
            frameMax: 8,
        },
        run2: {
            imageSrc: './img/Beth/Individual Sprite/actions/Run/Beth_runV2 (1).png',
            frameMax: 8,
        },

        jump: {
            imageSrc: './img/Beth/Individual Sprite/actions/Fall/Beth_Jump_fall.png',
            frameMax: 6,
        },

        fall: {
            imageSrc: './img/Beth/Individual Sprite/actions/UptoFall/Beth_fall_down.png',
            frameMax: 5,

        },
        dash: {
            imageSrc: './img/Beth/Individual Sprite/actions/Dash/Beth_dash.png',
            frameMax: 7,
        },
        atk: {
            imageSrc: './img/Beth/Individual Sprite/actions/Attack/Beth_12_frame.png',
            frameMax: 12,
        },
        datk: {
            imageSrc: './img/Beth/Individual Sprite/actions/Dash Attack/Beth_dattk.png',
            frameMax: 10,
        },
        crouch: {
            imageSrc: './img/Beth/Individual Sprite/actions/Crouch/Beth_crouch2.png',
            frameMax: 4,
        },
        slide: {
            imageSrc: './img/Beth/Individual Sprite/actions/Slide/Beth_slide (1).png',
            frameMax: 5,
        },
        hurt:{
            imageSrc:'./img/Beth/Individual Sprite/actions/Hurt-Effect/Beth_hurt.png',
            frameMax: 4,
        },
        death:{
            imageSrc:'./img/Beth/Individual Sprite/actions/Death-Effect/Beth_death.png',
            frameMax:11,
        }
    },
    attackbox:{
        offset:{
            x:.100,
            y:0
        },
        width: 50,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -75,
        y: 167
    }, imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Idle/Kahn_idle (1).png',
    frameMax: 8,
    scale: 2.3,
    offset: {
        x: -80,
        y: -30
    },
    sprites: {
        idle: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Idle/Kahn_idle (1).png',
            frameMax: 8,
        },
        run: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Run/Kahn_run (1).png',
            frameMax: 8,
        },
        run2: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Run/Kahn_run.png',
            frameMax: 8,
        },

        jump: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Fall/kahn_jump_fall (1).png',
            frameMax: 6,
        },

        fall: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Fall/kahn_fall_jump (1).png',
            frameMax: 6,

        },
        dash: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Dash/kahn_dash (1).png',
            frameMax: 7,
        },
        atk: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Attack/Kahn_atk (1).png',
            frameMax: 14,
        },
        datk: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Shoot/kahn_shoot_arrow (1).png',
            frameMax: 3,
        },
        crouch: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Croush/Kahn_crouch (1).png',
            frameMax: 4,
        },
        slide: {
            imageSrc: './img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Roll/kahn_roll.png',
            frameMax: 7,
        },
        hurt:{
            imageSrc:'./img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Hurt/Kahn_hurt (1).png',
            frameMax: 3,
        },
        death:{
            imageSrc:'./img/Bounty Hunter/Individual Sprite/Bounty Hunter CrossBow/Death/Kahn_dead (2).png',
            frameMax:7,
        }
    },
    attackbox:{
        offset:{
            x:0, 
            y:0
        },
        width: 100,
        height: 50
    }
})



console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    Shift: {
        pressed: false
    },
    s: {
        pressed: false
    },
    c: {
        pressed: false
    },
    f: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    k: {
        pressed: false
    },
    l: {
        pressed: false
    },
    j: {
        pressed: false
    },


}



countDown()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    Shop.update()
    player.update()
    enemy.update()

    //default player velocity in x direction
    player.velocity.x = 0;
    //default enemy velocity in x direction
    enemy.velocity.x = 0;


    //player movement
    //loop for pressed action keys

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
        player.switchSprite('run2')

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
        player.switchSprite('run')
    } else if (keys.Shift.pressed && player.lastKey === 'Shift') {
        player.velocity.x = 7
        player.switchSprite('dash')
    } else if (keys.c.pressed && player.lastKey === 'c') {
        player.velocity.x = -7
        player.switchSprite('slide')
    } else if (keys.s.pressed && player.lastKey === 's') {
        player.switchSprite('crouch')
    } else if (keys.f.pressed) {
        player.switchSprite('datk')
    } else player.switchSprite('idle')

    // else if ((player.lastKey === 'a' && keys.a.pressed!=true )|| (player.lastKey === 'c'&& keys.c.pressed!=true)) {
    //player.switchSprite('idle2')


    //player vertical movment

    if (player.velocity.y < 0) {
        player.switchSprite('jump')

    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }




    //loop for enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
        enemy.switchSprite('run2')
    }else if (keys.ArrowDown.pressed ) {
        enemy.switchSprite('crouch')
    }else if(keys.j.pressed && enemy.lastKey === 'j'){
        enemy.velocity.x = -7
        enemy.switchSprite('dash')
    }else if(keys.l.pressed && enemy.lastKey === 'l'){
        enemy.velocity.x = 7
        enemy.switchSprite('slide')
    }else enemy.switchSprite("idle")


    
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')

    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }


    //detect for contact between sprites && hit animations
    if (
        rectangularCollision({
            rect1: player,
            rect2: enemy
        }) && 
        player.isAttacking && player.framecurrent === 2
        ) {    
        enemy.takeHit()
        player.isAttacking = false
       // document.querySelector('#e1health').style.width = enemy.health + '%'
        gsap.to('#e1health', {
            width: enemy.health + '%'
        })
    }


    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isAttacking && enemy.framecurrent === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false
        //document.querySelector('#p1health').style.width = player.health + '%'
        gsap.to('#p1health', {
            width: player.health + '%'
        })
    }

    if (
        rectangularCollision({
            rect1: player,
            rect2: enemy
        }) &&
        player.isDashattaking && player.framecurrent === 5
        ) {    
        player.isDashattaking = false
        enemy.health = enemy.health-10
        document.querySelector('#e1health').style.width = enemy.health + '%'
    }


    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isDashattaking
    ) {
        enemy.isDashattaking = false
        player.health -= 5
        document.querySelector('#p1health').style.width = player.health + '%'
    }
    //if player misses
    if (player.isAttacking && player.framecurrent ==2) {
        player.isAttacking=false
    }

      //if enemy misses
      if (enemy.isAttacking && enemy.framecurrent ==3) {
        enemy.isAttacking=false
    }

     // end the game based on health
     if (enemy.health <= 0 || player.health <= 0) {
        DetermineWinner({ player, enemy, timerID })
    }
  
}


animate()


//event handlers for player movement 
window.addEventListener('keydown', (event) => {
    //console.log(event.key);
    if(!player.dead){
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
            break;
        case 's':
            keys.s.pressed = true;
            player.lastKey = 's'
            break;

        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = peak
            break;
        case ' ':
            player.attack()
            break;
        case 'Shift':
            keys.Shift.pressed = true;
            player.lastKey = 'Shift'
            break;
        case 'c':
            keys.c.pressed = true;
            player.lastKey = 'c'
            break;
        case 'f':
            keys.f.pressed = true;
            player.dashattack()
            player.lastKey = 'f'
            break;
        }
    }
        //countrols for player2
        if (!enemy.dead) {
        switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft"
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight"
            break;
        case 'ArrowUp':
            enemy.velocity.y = peak
            break;
        case 'k':
            enemy.attack()
            break;
        case 'l':
            keys.l.pressed = true;
            enemy.lastKey = 'l'
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            enemy.lastKey = 'ArrowDown'
            break;
        case 'i':
            keys.k.pressed = true;
            enemy.dashattack()
            enemy.lastKey = 'i'
            break;
        case 'j':
            keys.j.pressed = true;
            enemy.lastKey = 'j'
            break;

    }
}
   //console.log(event.key);
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'Shift':
            keys.Shift.pressed = false;
            break;
        case 'c':
            keys.c.pressed = false;
            break;
        case 'f':
            keys.f.pressed = false;
            break;
    }

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowDown':  
            keys.ArrowDown.pressed = false;
            break;
        case 'k':
            keys.k.pressed = false;
            break;
        case 'i':
            keys.i.pressed = false;
            break;
        case 'j':
            keys.j.pressed = false;
            break;
        case 'l':
            keys.l.pressed = false;
            break;




    }
    console.log(event.key);
})