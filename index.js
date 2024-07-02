const boxes =document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");


let currentPlayer; //O or X
let gameGrid;   //  will be array

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialise game

function initGame(){
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    // UI ko V empty karo
    boxes.forEach((box,index)=>{
        box.innerText ="";
        boxes[index].style.pointerEvents="all";
        // one more thing is missing // initialse CSS property again after wining match
        box.classList =`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player -${currentPlayer}`;

}
initGame();

function checkGameOver() {

    // 3 possiblity
    // a) Koi Jeet gya
    // b) Game chal rhi Hai
    // c) Game tie ho gya hai
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    
    //it means we have a winner // new button ko visible karo
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer ="O";
    }else{
        currentPlayer ="X";
    }
    // UI update
    gameInfo.innerText =`Current Player -${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] ===""){
        // UI pe update
        boxes[index].innerHTML=currentPlayer;
        boxes[index].style.pointerEvents ="none";
        // Game grid update
        gameGrid[index] =currentPlayer;
        
        // turn ka dhyan rakho // swap turn
        swapTurn();
        checkGameOver();

    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
