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
  let bkgImg = (props.bkg) ? {backgroundImage: props.bkg} : {};
  return(
      <div className={props.customClass} onClick={() => props.onClick()} style ={bkgImg} >
        {props.num}
      </div>
    );
}

function Board(props){
  let renderSquare = (i) => {
    let bkgImg = (props.bkg !== undefined && props.squares[i] !== 8) ? props.bkg : false;
    let customClassName = `square col-xs-4 box-${props.squares[i] + 1}`;
    return <Square key={(i+1).toString()} customClass={customClassName} onClick={() => props.onClick(i)} num={props.displayNumbers && (props.squares[i] + 1)} bkg={bkgImg}/>;
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

function Options(props){
    return (
    <div className="col-xs-5">
      <button type="button" className="btn" title="reshuffle" onClick={() => props.refreshOnClick()}>
        <span className="glyphicon glyphicon-refresh"></span>&nbsp;
      </button>
      <button type="button" className="btn col-xs-offset-1" title="solve" onClick={() => props.solveOnClick()}>
        <span className="glyphicon glyphicon-picture"></span>&nbsp;
      </button>
      <button type="button" className="btn col-xs-offset-1" title="display numbers" onClick={() => props.toggleNumbersOnClick()}>
        <span className="glyphicon glyphicon-sunglasses"></span>&nbsp;
      </button>
      <div>
        <br />
        <p>Select image: </p>
        <div className="list-group">
          <p className="list-group-item option" onClick={() => props.pictureOnClick('numbers.png')}>Numbers</p>
          <p className="list-group-item option" onClick={() => props.pictureOnClick('default.jpg')}>Cy crushing Hawkeye</p>
          <p className="list-group-item option" onClick={() => props.pictureOnClick('dog.jpg')}>Suprise Suprise</p>
        </div>
      </div>
      
    </div>
    )
}


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: shuffle([...Array(9).keys()]),
      moves: 0,
      background: false,
      displayNumbers: false
    };
    this.isOver = false;
    this.moves = 0;
    this.score = 10000;
    this.startTime = null;
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
    return (((x - 1 >= 0) && (((x-1)*3 + y) == pos_out)) ||
    
    //check down
     ((x + 1 < 3) && (((x+1)*3 + y) == pos_out)) ||
    
    //check right
     ((y + 1 < 3) && ((x*3 + (y + 1)) == pos_out)) ||

    //check left
     ((y - 1 >= 0) && ((x*3 + (y-1)) == pos_out)));
  }
  
  update(n){
    if (this.isOver) return;
    let squares = [...this.state.squares];
    if (squares[n] === 8) return;
    for (let i = 0; i < squares.length; i++){
      if (squares[i] === 8 && this.checker(n, i)){
        squares[i] = squares[n];
        squares[n] = 8;
        this.moves++;
        this.score -= 2;
      }
      if (this.moves == 1) this.startTime = (new Date()).getTime()/1000;
    }
    this.isOver = this.isSorted(squares);
    this.setState({squares: squares, moves: this.moves});
  }
  
  changePicture(pic){
    let newBkg = `url(assets/images/${pic})`;
    this.setState({background: newBkg});
  }
  
  refreshGame(){
    this.isOver = false;
    this.score = 10000;
    this.moves = 0;
    this.setState({squares: shuffle([...Array(9).keys()]),
      moves: 0,
    });
  }
  
  solveGame(){
    if (this.isOver) return;
    this.moves = 0;
    this.startTime = (new Date()).getTime()/1000;
    this.setState({squares: [0,1,2,3,4,5,6,8,7],
        moves: this.moves,
      });
  }
  
  toggleNumbers(){
    this.setState({displayNumbers: !this.state.displayNumbers});
  }
  
  render() {
    return (
      <div className="container">
        <h1> Cy Sliding Puzzle</h1>
        <div className="status">{status}</div>
        <div className="row">
          <Board onClick={(i) => this.update(i)} squares={this.state.squares} bkg={this.state.background} displayNumbers={this.state.displayNumbers}/>
        </div>
        <br />
        <div>
          <div className="row">
            <div className ="col-sm-8 col-sm-offset-2" >
              <div className = "info">
                <p className = "game-info">Moves: {this.state.moves}</p>
                {this.isOver && <p className = "game-info">Score:  {this.score = ((this.score -= Math.floor((this.startTime - (new Date()).getTime()/1000)/10)) < 0) ? 100 : this.score}. You solved it!</p>}
              </div>
              <Options pictureOnClick={(i) => this.changePicture(i)} refreshOnClick={() => this.refreshGame()} solveOnClick={() => this.solveGame()} toggleNumbersOnClick={() => this.toggleNumbers()}/>
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