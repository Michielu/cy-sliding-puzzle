class Square extends React.Component{
  render(){
    return(
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component{
  renderSquare(i){
    return <Square value={i}/>;
  }
  render(){
    const moves = 0;
    const score = 0;
    return(
      <div>
        <h1> Cy Sliding Puzzle</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(0)}
        </div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(0)}
          {this.renderSquare(0)}
        </div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(0)}
          {this.renderSquare(0)}
        </div>
        <div className="numMoves">Moves: {moves}</div>
        <div className="numScore">Score: {score}</div>

      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);