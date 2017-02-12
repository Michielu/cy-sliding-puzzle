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

function Square(props){
  return(
      <div className={props.customClass} onClick={() => props.onClick()}>
        {props.num}
      </div>
    );
}

function Board(props){
  let renderSquare = i => {
    let customClassName = `square col-xs-4 box-${props.squares[i] + 1}`;//could be sm
    return <Square key={(i+1).toString()} sqNum={i} customClass={customClassName} onClick={() => props.onClick(i)} num={props.squares[i]}/>;
  };
    return(
      <div className="col-xs-8 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">
        <div className="row">
          {[...Array(3).keys()].map(i => renderSquare(i))}
        </div>
        <div className="row">
          {[...Array(3).keys()].map(i => renderSquare(i+3))}
        </div>
        <div className="row">
          {[...Array(3).keys()].map(i => renderSquare(i+6))}
        </div>
      </div>
    );
}


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: shuffle([...Array(9).keys()]),
      moves: 0
    };
    this.isOver = false;
    this.moves = 0;
  }
  isSorted(arr){
    for (let i = 1; i < arr.length; i++)
      if (arr[i] < arr[i-1]) return false;
    return true;
  }
  checker(pos, pos_out){
    let y = pos%3;
    let x = Math.trunc(pos/3);
    //check up
    if ((x - 1 >= 0) && (((x-1)*3 + y) == pos_out)) return true;
    
    //check down
    if ((x + 1 < 3) && (((x+1)*3 + y) == pos_out)) return true;
    
    //check right
    if ((y + 1 < 3) && ((x*3 + (y + 1)) == pos_out)) return true;
    
    //check left
    if ((y - 1 >= 0) && ((x*3 + (y-1)) == pos_out)) return true;
    return false;
  }
  update(n){
    if (this.isOver) return;
    let squares = [...this.state.squares];
    if (squares[n] === 8) return;
    for (let i = 0; i < squares.length; i++){
      if (squares[i] === 8 && this.checker(n, i)){
        squares[i] = squares[n];
        squares[n] = 8;
      }
    }
    this.moves++;
    this.setState({squares: squares, moves: this.moves});
  }
  render() {
    return (
      <div className="container">
        <h1> Cy Sliding Puzzle</h1>
        <div className="status">{status}</div>
        <div className="row">
          <Board onClick={(i) => this.update(i)} squares={this.state.squares}/>
        </div>
        <div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
          <div className ="col-sm-8 col-sm-offset-2" >
            <div className = "row">
              <p>Moves: </p>
              <p>Score: {score}</p>
            <div className = "row info">
              <p className = "game-info">Moves: {this.state.moves}</p>
              <p className = "game-info">Score: {score}</p>
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