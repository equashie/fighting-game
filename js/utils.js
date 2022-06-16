function rectangularCollision({rect1, rect2}){
    return ( 
        rect1.attackbox.position.x + rect1.attackbox.width >= rect2.position.x 
        && rect1.attackbox.position.x <= rect2.position.x + rect2.width 
        && rect1.attackbox.position.y + rect1.attackbox.height >= rect2.position.y
        && rect1.attackbox.position.y <= rect2.position.y + rect2.height
        )
}

function DetermineWinner({player,enemy, timerID}){
    clearTimeout(timerID)
    document.querySelector('#outcome').style.display = 'flex'
    
    if (player.health===enemy.health ) {
        document.querySelector('#outcome').innerHTML = 'Draw'  
        
    } else if (player.health < enemy.health ) {
        document.querySelector('#outcome').innerHTML = 'player 2 wins!'
     
    }else if (player.health > enemy.health ){
        document.querySelector('#outcome').innerHTML = 'player 1 wins!'
        
       
    }
}

let timer = 90
let timerID
function countDown(){
        
    if(timer>0){
        timerID = setTimeout(countDown, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
        }
    if (timer == 00) {
        DetermineWinner({player,enemy,timerID})
       
    }
}