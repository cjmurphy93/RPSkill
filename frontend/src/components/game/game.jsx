import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import JoinGame from './join_game';
import Result from '../result/result';
import io from 'socket.io-client';
import "./game.css";

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      socket: null,
      gameName: "",
      stage: 1,
      winner: "",
      message: "",
      messages: [],
    };
    this.scoket = null;
    this.handleJoin = this.handleJoin.bind(this);
    this.update = this.update.bind(this);
    this.handleRock = this.handleRock.bind(this);
    this.handlePaper = this.handlePaper.bind(this);
    this.handleScissors = this.handleScissors.bind(this);
    // this.handleMessage = this.handleMessage.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const HOST =
      process.env.NODE_ENV === "production"
        ? "https://rpskill.herokuapp.com/"
        : "http://localhost:5000/";
        
    this.socket = io(HOST);
    
    this.socket.on("connect", (socket) => {

      // this.socket.on("receiveMessage", data => {
      //   addMessage(data);
      // })

      // const addMessage = data => {
      //   debugger
      //   console.log(data);
      //   this.setState({messages: [...this.state.messages, data]});
      //   console.log(this.state.messages);
      // }

      this.socket.on("gameData", (gameData) => {
        console.log(gameData);
      });

      this.socket.on("game start", () => {
        this.setState({ stage: 3 });
      });

      this.socket.on("player 1 wins", (moves) => {
        const winner = moves[0]["player"];
        this.setState({winner: winner, stage: 4});
      });
      this.socket.on("player 2 wins", (moves) => {
        const winner = moves[1]["player"];
        
        this.setState({winner: winner, stage: 4});
      });
      this.socket.on("tie", (moves) => {
        
        const winner = "tie";
        this.setState({winner: winner, stage: 4});
      });


    })
    //emit "join" username
  }

  // handleMessage(e) {
  //   debugger
  //   e.preventDefault();
  //   const username = this.state.user.username;
  //   const game = this.state.gameName;
  //   this.socket.emit('sendMessage', {
  //     username,
  //     message: this.state.message,
  //   })
  //   this.setState({message: ""});
  // }

  // handleChange(e) {
  //   this.setState({
  //     message: e.currentTarget.value,
  //   })
  // }

  handleRock(e) {
    e.preventDefault();
    const username = this.state.user.username
    const game = this.state.gameName;
    this.socket.emit('move', {username, move: "rock", game });
    this.setState({stage: 2});
  };
  handlePaper(e) {
    e.preventDefault();
    const username = this.state.user.username
    const game = this.state.gameName;
    this.socket.emit('move', {username, move: "paper", game });
    this.setState({ stage: 2 });
  };
  handleScissors(e) {
    e.preventDefault();
    const username = this.state.user.username
    const game = this.state.gameName;
    this.socket.emit('move', {username, move: "scissors", game });
    this.setState({ stage: 2 });
  };

  update(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleJoin(e){
    e.preventDefault();

    const username = this.state.user.username
    const game = this.state.gameName;
    ;
    this.socket.emit("join", {username, game}, (error) => {
        if (error) {
            alert(error);
        }
    });
    this.setState({stage: 2});
  }

  componentWillUnmount() {
    //disconnect socket
  }

  render() {
      const { stage, gameName, winner} = this.state;


      let display;
        if (stage === 1){
             display = <JoinGame gameName={gameName}update={this.update} handleJoin={this.handleJoin}/>
        } else if (stage===2) {
             display = <WaitingRoom />
        } else if (stage===3) {
             display = <LiveGame handleRock={this.handleRock} handlePaper={this.handlePaper} handleScissors={this.handleScissors}/>
        } else if (stage===4) {
          display = <Result winner={winner} />
        }
    return (
      <div>
     {display}
      </div>
    );
  }
}

export default GameRoom;

