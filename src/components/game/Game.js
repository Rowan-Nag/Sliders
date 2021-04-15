import React, { useState } from 'react';
import "./Game.css";
import playerRed from "../../res/redPlayer.png"
import playerBlue from "../../res/bluePlayer.jpg"
import Ai from "../Ai/Ai.js"
const width = 600,
height = 600,
frameRate = 1/80,
frameDelay = frameRate * 1000,
ratio = 1;//window.devicePixelRatio || 1;
var requestInterval = function (fn, delay) {
  var requestAnimFrame = (function () {
    return window.requestAnimationFrame || function (callback, element) {
      window.setTimeout(callback,  frameDelay);
    };
  })(),
      start = new Date().getTime(),
      handle = {};
  function loop() {
    handle.value = requestAnimFrame(loop);
    var current = new Date().getTime(),
        delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};



class Screen extends React.Component{
    constructor(props){
        super(); //MIGHT NEED super(props), BUT PROBABLY NOT

        this.canvasRef = React.createRef();
        this.selector = new Tile(0, 0, 0, "RGB(239, 242, 194, .5 )");

        this.state = {
            x: 0,
            y: 0,
            phase: 0,
            screen: {
                width: width,
                height: height,
                ratio: ratio,
            },

            ctx: null,
            currentDelta: 0,
            board: [],
            activePlayer: 0, 
            clicksAvailable: [2, 2],
            turns: 0,
            attacker: 1,
        }
        this.boardData = [];
        this.onMouseMove = this.onMouseMove.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.sliders = [];
        this.tick = 0;
        this.movingTiles = [];

    }
  
    onMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    update(){
        this.animate();
    }

    componentDidMount(){
        this.setupAnimation();
        requestInterval( () => {this.update()}, frameDelay);
        this.resetBoard();

    }

    setupAnimation(){

        this.setState({ctx:this.refs.canvas.getContext('2d')});
        if(this.state.ctx !== null){
            this.state.ctx.translate(this.state.screen.width/2,this.state.screen.height/2);
        }
    }

    animate(){
        if(this.state.ctx !== null){
            this.state.ctx.fillStyle = "#000";
            this.state.ctx.clearRect(-this.state.screen.width/2, -this.state.screen.height/2, this.state.screen.width, this.state.screen.height);
            
            this.state.ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);

            this.state.ctx.fillStyle = "#fff";
            
            for(var i = 0; i < this.state.board.length; i++){
                for(var j = 0; j < this.state.board[i].length; j++){
                    
                    this.state.board[i][j].draw(this.state.ctx);
                }
            }
        }
        let mousePos = this.getSquareFromPos(this.state.x, this.state.y);
        this.selector.x = mousePos.x;
        this.selector.y = mousePos.y;
        this.selector.draw(this.state.ctx);
        this.slideAllTiles();

        for(let i = 0; i < this.movingTiles.length; i++){
            this.movingTiles[i][0].draw(this.state.ctx);
        }
    }
    
    render(){
        return(
            
        <div>
            {/* mouse X: {this.state.x}, 
            mouse Y: {this.state.y},  */}
            clicks: {this.state.clicksAvailable[0]} - {this.state.clicksAvailable[1]} <br/>
            <h2 id="phase">phase: {["Strategy 1 (Add Blocks)", "Strategy 2 (Remove Blocks)", "slider placement", "direction decision"][this.state.phase]} </h2>
            <br/>
            <div className = "Container">
                <canvas ref= "canvas"
                width = {this.state.screen.width * this.state.screen.ratio}
                height= {this.state.screen.height * this.state.screen.ratio}
                onMouseMove={this.onMouseMove}
                onClick={this.clickAction}> </canvas>
                {this.playerData()}
            </div>
            <br/>
            {/* <button onClick={this.resetBoard}> Reset </button> */}
        {/* <button onClick={this.switchPlayer}> Switch to player {2-this.state.activePlayer}</button> */}
            <Ai currentBoard={this.state.boardData}/>
        </div>
        )
    }

    playerData(){
        return (this.state.activePlayer === 0)? (
            <div>
            <img src = {playerBlue} alt="(Blue Player Icon)" className="playerImage"></img><br/>
            {(this.state.attacker === 0) ? <h2>(Attacking)</h2> : <h2>(Defending)</h2>}
            <h2>Actions remaining: {this.state.clicksAvailable[0]}</h2>
            </div>
            ) : (
            <div>
            <img src = {playerRed} alt="(Red Player Icon)" className="playerImage"></img><br/>
            {(this.state.attacker === 1) ? <h2>(Defending)</h2> : <h2>(Attacking)</h2>}
            <h2>Actions remaining: {this.state.clicksAvailable[1]}</h2>
            </div>
            )
    }

    switchPlayer(){
        this.setState({activePlayer: (this.state.activePlayer + 1) % 2});

    }
    resetBoard(){
        let newBoard = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];
        this.boardData = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];
        for(let i = 0; i < newBoard.length; i++){
            for(let j = 0; j < newBoard[i].length; j++){
                switch(newBoard[i][j]){
                    case 0:
                        newBoard[i][j] = new Tile(i, j, 0, "white", false);
                        break;
                    case 1:
                        newBoard[i][j] = new Tile(i, j, 0, "grey", false);
                        newBoard[i][j].toggle();
                }
            }
        }
        this.selected = undefined;
        this.setState({turns: 0})
        this.setState({clicksAvailable: [10, 10]});
        console.log(newBoard);
        this.setState({board:newBoard})
        this.setState({phase: 0});
    }
    toggleBarrier(x, y){
        this.state.board[x][y].toggle();
        (this.state.board[x][y].isActive) ? this.boardData[x][y] = 3 : this.boardData[x][y] = 0;
        
    }
    
    changeBoard(x, y, color){
        var tempBoard = this.state.board;

        if(x > tempBoard.length-1 || y > tempBoard.length-1){
            console.warn("x, y, too large");
        }else{

            tempBoard[x][y].color = "grey";
            this.setState({board:tempBoard});
        }
    }

    getSquareFromPos(x, y){
        return {x:Math.floor(x/(width/8+2)), y:Math.floor(y/(height/8+2))}
    }

    clickCount(){
        let newClickState = this.state.clicksAvailable;
        newClickState[this.state.activePlayer] -= 1;
        this.setState({clicksAvailable: newClickState});
    }

    moveSliders(team, attacking){
        for(let i = 0; i < this.state.board.length; i++){
            for(let j = 0; j < this.state.board[i].length; j++){
                if(this.state.board[i][j].isSlider && (this.state.board[i][j].direction[0] !== 0 || this.state.board[i][j].direction[1] !== 0) && this.state.board[i][j].team === team){
                    let pos = {x:i, y:j};
                    while(pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8){
                        let tempX = pos.x + this.state.board[i][j].direction[0];
                        let tempY = pos.y + this.state.board[i][j].direction[1];
                        if(tempX > 7 || tempY > 7 || tempX < 0 || tempY <0){
                            // let t1 = this.state.board[i][j];
                            // let t2 = this.state.board[pos.x][pos.y];
                            // t2.color = t1.color;
                            // t2.team = t1.team;
                            // t2.isSlider = true;
                            // t1.isSlider = false;
                            // t1.color = "white"
                            // t1.team = 0;
                            // t1.direction = [0, 0];
                            // t2.direction = [0, 0]; 
                            
                            this.movingTiles.push([this.state.board[i][j].clone(), pos])
                            console.log(this.movingTiles);
                            this.boardData[pos.x][pos.y] = this.boardData[i][j];
                            this.boardData[i][j] = 0;
                            this.state.board[i][j].color = "white";
                            
                           


                            break;

                        }else if(attacking && this.state.board[tempX][tempY].isSlider && this.state.board[tempX][tempY].team !== team){
                            // let t1 = this.state.board[i][j];
                            // let t2 = this.state.board[tempX][tempY];
                            // t2.color = t1.color;
                            // t2.team = t1.team;
                            // t2.isSlider = true;

                            // t1.isSlider = false;
                            // t1.color = "white"
                            // t1.team = 0;
                            // t1.direction = [0, 0];
                            // t2.direction = [0, 0];
                            
                            this.movingTiles.push([this.state.board[i][j].clone(), {x: tempX, y: tempY}])
                            console.log(this.movingTiles);
                            this.boardData[tempX][tempY] = this.boardData[i][j];
                            this.boardData[i][j] = 0;
                            this.state.board[i][j].color = "white";
                            
                            
                            break;
                        }else if(this.state.board[tempX][tempY].isActive || this.state.board[tempX][tempY].isSlider){
                            // let t1 = this.state.board[i][j];
                            // let t2 = this.state.board[pos.x][pos.y];
                            // t2.color = t1.color;
                            // t2.team = t1.team;
                            // t2.isSlider = true;

                            // t1.isSlider = false;
                            // t1.color = "white"
                            // t1.team = 0;
                            // t1.direction = [0, 0];
                            // t2.direction = [0, 0];
                            this.movingTiles.push([this.state.board[i][j].clone(), pos])
                            console.log(this.movingTiles);
                            this.boardData[pos.x][pos.y] = this.boardData[i][j];
                            this.boardData[i][j] = 0;
                            this.state.board[i][j].color = "white";
                            
                            

                            
                            break; 
                        }else{
                            pos.x = tempX;
                            pos.y = tempY;
                        }
                        
                    }
                }
            }
        }
    }

    swapTileType(startPos, endPos){
        let t1 = this.state.board[startPos.x][startPos.y];
        let t2 = this.state.board[endPos.x][endPos.y];
        let tempC = t2.color;
        let tempT = t2.team;
        t2.color = t1.color;
        t2.team = t1.team;
        t2.isSlider = true;
        t1.isSlider = false;
        t1.color = tempC;
        t1.team = tempT;
        t1.direction = [0, 0];
        t2.direction = [0, 0]; 

        return {x: t2.x, y:t2.y};
    }

    switchAttacker(){
        this.setState({attacker:(this.state.attacker+1)%2});
    }

    slideAllTiles(){
        
        let isMoving = false;
        for(let i = 0; i < this.movingTiles.length; i++){

            let move = (tilePos) => {
                let tile = tilePos[0];
                let endPos = tilePos[1];
                this.slideTile(tile, endPos, 3);
                let pos = {x: tile.x, y: tile.y};

                return pos== endPos;
            }

            let tile = this.movingTiles[i];

            if(!move(tile)){
                isMoving = true;
            }else{
                this.boardData[tile.x][tile.y] === 1 ? this.state.board[tile.x][tile.y].color = "blue" : this.state.board[tile.x][tile.y].color = "red";
            }
        }
        // if(!isMoving){
        //     this.movingTiles = [];
        // }
    }
    //FIXME: Fix this
    slideTile(tile, endLocation, delay){
       
        if(this.tick > delay){
            if(tile.x < endLocation.x){
                
                tile.x += 1;
               
            }else if(tile.x > endLocation.x){

                tile.x -= 1;

            }
            
            if(tile.y < endLocation.y){

                tile.y += 1;

            }else if(tile.y > endLocation.y){
                
                tile.y -= 1;

            }

            this.tick = 0
        }else{
            this.tick ++;
        }
    }

    countSliders(){
        let b = this.state.board;
        let counts = [0, 0]
        for(let i = 0; i < b.length; i++){
            for(let j = 0; j < b[i].length; j++){
                if(b[i][j].color === "blue"){
                    counts[0] ++;
                }
                else if(b[i][j].color === "red"){
                    counts[1] ++;
                }
            }
        }
        return counts;
    }

    mapToIntArray(){
        var intAr = [];
        for(let i = 0; i < this.state.board.length; i++){
            var intRow = [];
            for(let j = 0; j < this.state.board[i].length; j++){
                if(this.state.board[i][j].isActive){
                    intRow.push(3);
                }else{
                    if(this.state.board[i][j].color === "red"){
                        intRow.push(2);
                    }else if(this.state.board[i][j].color === "blue"){
                        intRow.push(1);
                    }else{
                        intRow.push(0);
                    }
                }
            }
            intAr.push(intRow);
        }
        return intAr;
    }

    fixActivePlayer(){
        console.log("fixing");
        if(this.state.clicksAvailable[0] === 0 && this.state.clicksAvailable[1] !== 0){
            this.setState({activePlayer: 1});
            console.log("fixed");
        }
        if(this.state.clicksAvailable[1] === 0 && this.state.clicksAvailable[0] !== 0){
            this.setState({activePlayer: 0});
            console.log("fixed");
        }
    }

    clickAction(){

        console.log(this.mapToIntArray());

        if(this.state.clicksAvailable[this.state.activePlayer] > 0){
            var pos = this.getSquareFromPos(this.state.x, this.state.y);
            var x = pos.x;
            var y = pos.y;
            var selectedTile = this.state.board[x][y];
            var attacker = this.state.attacker;
            var defender = (this.state.attacker+1)%2;
            switch(this.state.phase){
                case 0: //strategy 1
                    if(!selectedTile.isActive){
                        
                        this.toggleBarrier(x, y);
                        this.clickCount();
                        if(this.state.turns === 0){
                            this.switchPlayer();
                        }
                    }

                    if(this.state.clicksAvailable[0] === 0 && this.state.clicksAvailable[1] === 0){
                        this.setState({phase:1});
                        if(this.state.turns === 0){
                            this.setState({clicksAvailable: [2, 2]});
                        }else{
                            this.switchPlayer();
                            this.setState({clicksAvailable: [[1, 0], [0, 1]][attacker]});
                        }
                    }
                    break;
                case 1: //strategy 2
                    if(selectedTile.isActive){
                        this.toggleBarrier(x, y);
                        this.clickCount();
                        if(this.state.turns === 0){
                            this.switchPlayer();
                        }
                    }
                    if(this.state.clicksAvailable[0] === 0 && this.state.clicksAvailable[1] === 0){
                        this.setState({phase: 2});
                        if(this.state.turns === 0){
                            this.setState({clicksAvailable: [2, 2]});
                        }else{
                            this.setState({clicksAvailable: [1, 1]});
                        }
                    }
                    break;
                case 2: //slider placement
                    if(!this.state.board[x][y].isActive){
                        this.state.board[x][y] = new Tile(x, y, this.state.activePlayer, ["blue", "red"][this.state.activePlayer], true);
                        this.boardData[x][y] = [1, 2][this.state.activePlayer];
                        this.clickCount();
                        this.switchPlayer();
                    }
                    if(this.state.clicksAvailable[0] === 0 && this.state.clicksAvailable[1] === 0){
                        this.setState({phase:3});
                        let sliders = this.countSliders();
                        this.setState({clicksAvailable: sliders})
                    
                    }
                    break;
                case 3: //direction decisions
                    if(this.selected){
                        if(!this.state.board[x][y].isActive && !this.state.board[x][y].isSlider){
                            let xDiff = x-this.selected.x;
                            let yDiff = y-this.selected.y;

                            if(xDiff === 0 && yDiff !== 0){
                                this.selected.direction = [0, yDiff/Math.abs(yDiff)]
                                this.selected = undefined;
                                this.clickCount();
                                this.switchPlayer();
                                
                                
                            }
                            else if(xDiff !== 0 && yDiff === 0){
                                this.selected.direction = [xDiff/Math.abs(xDiff), 0]
                                this.selected = undefined;
                                this.clickCount();
                                this.switchPlayer();
                                
                            }
                            this.fixActivePlayer();
                        }
                    }
                    if(this.state.board[x][y].isSlider && this.state.board[x][y].team === this.state.activePlayer){
                        this.selected = this.state.board[x][y];
                        if(this.selected.direction[0] !== 0 || this.selected.direction[1] !== 0){
                            this.selected = undefined
                        }
                    }
                    if(this.state.clicksAvailable[0] === 0 && this.state.clicksAvailable[1] === 0){
                        this.moveSliders(this.state.turns%2, false);
                        this.moveSliders((this.state.turns+1)%2, true);
                        this.setState({phase:0});
                        this.setState({clicksAvailable: [[2, 0], [0, 2]][attacker]})
                        this.setState({activePlayer: attacker})
                        this.switchAttacker();
                        this.setState({turns: this.state.turns+1})
                    }
                    break;
                }
            }
        //console.log(this.state.board);
    }
}

class Tile{
    constructor(x, y, team, color, isSlider){
        this.x = x;
        this.y = y;
        this.id = x*8 + y;
        this.team = team;
        this.color = color;
        this.isActive = false;
        this.isSlider = isSlider;
        this.direction = [0, 0];
    }

    toggle(){
        this.isActive = !this.isActive;
        (this.isActive) ? this.color = "grey" : this.color = "white";
    }

    draw(ctx){
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*width/8, this.y*height/8, width/8-2, height/8-2);
    }

    clone(){
        return new Tile(this.x, this.y, this.team, this.color, this.isSlider);
    }
}


export default Screen;

