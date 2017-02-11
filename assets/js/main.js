var squareLocation = []; //Square itself **Having trouble storing Squares in here.
var puzzle = []; //Values of what is on the square
var index = []; //Use this in updateSquare function. It would be better to use Square{sqNum} but squareLocation doesn't seem to be storing squares. Likely remove this later
var initial = 0; //Temperary variable to populate squares.
var moves; //Number of moves
var score; //Score. Will figure out how to do this later

var shuffle = arr => {
  let array = [...arr];
  let currIdx = array.length, temp, randIdx;
  while (currIdx !== 0){
    randIdx = Math.floor(Math.random() * currIdx);
    currIdx--;
    temp = array[randIdx];
    array[randIdx] = array[currIdx];
    array[currIdx] = temp;
  }
  return array;
};

class Square extends React.Component{
  
   constructor() {
    super();
    this.state = {
      value: initial++, //Populate the values
    };
      console.log("Puzzle: " + puzzle[puzzle.length-1]); //Always 9 {Actually the console always logs 8}
      // squareLocation.push(this);
    }


  output(c){
    //Updates puzzle array
    var swap = function(a, b){
      moves++;
      let c =  puzzle[a];
      puzzle[a] = puzzle[b];
      puzzle[b] = c;
    }
    
    var updateSquare = function(index, num){
      let t = document.getElementsByClassName(`box-${index}`);
      t.setState({value: num});
    }
    
    console.log("C is : " + c  + " Puzzle is: " + puzzle[c]);
    //Check if 0 is bordering it
    if(puzzle[c]===0){
      console.log("Sqlocation value is: " + squareLocation[c].sqNum); //Why is this undefined??? SHouldn't it be 1?
      return 0;
    }
    
    if(c+3<8){
      if(puzzle[c+3] ===0){
       swap (c, c+3)
       updateSquare(c+3, puzzle[c]);
      console.log("up");
      console.log("C is : " + c  + " Puzzle is: " + puzzle[c]);
        return 0;
      }
    }
    if(c-3 >= 0){
       if(puzzle[c-3] === 0){
          console.log("down");
          swap(c, c-3);
          console.log("C is : " + c  + " Puzzle is: " + puzzle[c]);
          return 0;
       }
    }
    if(c!= 2 || c!= 5 || c!=8){
       if(puzzle[c+1] === 0){
         console.log("right");
          swap(c,c+1);
          console.log("C is : " + c  + " Puzzle is: " + puzzle[c]);
          return 0;
       }
    }
    if(c!==0 || c!= 3 || c!= 6){
       if(puzzle[c-1]===0){
       console.log("left");
       swap (c, c-1);
       console.log("C is : " + c  + " Puzzle is: " + puzzle[c]);
        return 0;
       }
    }
    console.log("else");
    return puzzle[c]; //Return itself
   }
  
  render(){
    return(
      <div className={this.props.customClass} /*onClick={() => this.setState({value: this.output(this.props.sqNum)})}*/ onClick={() => this.props.onClick()}>
        {this.props.num}
      </div>
    );
  }
}

class Board extends React.Component{
  constructor() {
    super();
    this.state = {
      squares: shuffle([...Array(9).keys()]),
    };
  }
  checker(pos, pos_out){
    let y = pos%3;
    let x = Math.trunc(pos/3);
    console.log("x is " + x);
    //check up
    if ((x - 1 >= 0) && (((x-1)*3 + y) == pos_out)) return true;
    
    //check down
    if ((x + 1 < 3) && (((x+1)*3 + y) == pos_out)) return true;
    
    //check right
    if ((y + 1 < 3) && ((x*3 + (y + 1)) == pos_out)) return true;
    
    //check left
    if ((y - 1 >= 0) && ((x*3 + (y-1)) == pos_out)) return true;
    // for(let i = x-1; i <= x+1; i++){
    //   for (let j = y-1; j <= y+1; j++){
    //     if (i > 0 && i < 4 && j > 0 && j < 4){
    //       let temp_pos = i*3 + j;
    //       if (temp_pos === pos_out) return true;
    //     }
    //   }
    // }
    return false;
  }
  update(n){
    let squares = [...this.state.squares];
    if (squares[n] == 8) return;
    for (let i = 0; i < squares.length; i++){
      if (squares[i] == 8 && this.checker(n, i)){
        squares[i] = squares[n];
        squares[n] = 8;
      }
    }
    console.log(squares);
    this.setState({squares: squares});
    
  }
  renderSquare(i){
    let customClassName = `square col-xs-4 box-${this.state.squares[i] + 1}`;//could be sm
    let sq = <Square key={(i+1).toString()} sqNum={i} customClass={customClassName} onClick={() => this.update(i)} num={this.state.squares[i]}/>;
    squareLocation.push(sq);
    puzzle.push(i);
    index.push(i);
    return sq;
  }
  render(){
    return(
      <div className="col-xs-8 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h1> Cy Sliding Puzzle</h1>
        <div className="status">{status}</div>
        <div className="row">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
          <div className ="col-sm-8 col-sm-offset-2" >
            <div className = "row">
              <p>Moves: {moves}</p>
              <p>Score: {score}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('react-container')
);