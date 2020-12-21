var hypnoticBall;
var dataBase,position;
function setup(){
    //create and safe the data base.
    dataBase = firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //ref() is use to refer at one location inside the dataBase.
    var hypnoticBallPosition = dataBase.ref('ball/position');
    //on()is use to create a listener,when any value for the position changes it calls readPosition function.
    //if readPosition does not work it calls showError.
    hypnoticBallPosition.on("value",readPosition,showError);
}
function draw(){
    background("white");
    //draw the ball a right to the dataBase only when th position is avaible.
    if (position !== undefined) {
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
    }
}
//write the new positions of the ball in the dataBase.
//set is use to set new valuse in the dataBase.
function writePosition(x,y){
    dataBase.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    });
}
//read the new position of the ball from the dataBase.
//val is use to extract valuses from the data. 
function readPosition(data){
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError() {
    console.log("Error in reading the values");
}