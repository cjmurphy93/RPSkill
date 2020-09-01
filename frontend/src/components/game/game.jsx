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
      username: "",
      socket: null,
      gameName: "",
      stage: 1,
      winner: "",
      message: "",
      messages: [],
      chatLines: [],
      users: {},
    };
    this.scoket = null;
    this.testSocket = null;
    this.handleJoin = this.handleJoin.bind(this);
    this.update = this.update.bind(this);
    this.handleRock = this.handleRock.bind(this);
    this.handlePaper = this.handlePaper.bind(this);
    this.handleScissors = this.handleScissors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const HOST =
      process.env.NODE_ENV === "production"
        ? "https://rpskill.herokuapp.com/"
        : "http://localhost:5000/";
        
    this.socket = io(HOST);
    
    this.socket.on("connect", (socket) => {

      this.socket.on('chat message', data => {
        // console.log(data.messages, data.user, "this came through")
        this.setState({
          messages: [...this.state.messages, data.messages[data.messages.length - 1]],
          user: data.username,
          chatLines: [...this.state.chatLines, `${data.username}: ${data.messages[data.messages.length - 1]} ~@$ ${new Date(parseInt(Date.now())).toLocaleTimeString()}`],
          time: data.time,
        })
      })

      this.socket.on('join', data => {
        console.log(data);
      })

      this.socket.on("gameData", (gameData) => {
        // console.log(gameData);
      });

      this.socket.on("game start", (gameData) => {
        console.log(gameData)
        this.setState({
          stage: 3,
          users: Object.assign({}, this.state.users, gameData)
        });
      });

      this.socket.on("player 1 wins", (moves) => {
        const winner = moves[0]["player"];
        this.setState({winner: winner, stage: 4});
        this.socket.emit("add points", winner);
      });
      this.socket.on("player 2 wins", (moves) => {
        const winner = moves[1]["player"];
        this.setState({winner: winner, stage: 4});
        this.socket.emit("add points", winner);
      });
      this.socket.on("tie", (moves) => {
        const winner = "tie";
        this.setState({winner: winner, stage: 4});
      });
    })
    //emit "join" username
  }
  
  handleChange(type) {
    return e => {
      this.setState({ [type]: e.currentTarget.value, user: this.state.user, time: new Date(parseInt(Date.now())).toLocaleTimeString()});
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    debugger
    this.socket.emit('chat message', {
      messages: [...this.state.messages, this.state.message],
      user: this.props.user.username,
      username: this.props.user.username,
      message: "",
      chatLines: [...this.state.chatLines, `${this.props.user.username}: ${this.state.message} ~@$ ${new Date(parseInt(Date.now())).toLocaleTimeString()}`],
      time: new Date(parseInt(Date.now())).toLocaleTimeString(),
    })
    this.setState({message: ""});
    // console.log(this.state.message, this.state.user, 'client side');
    // console.log(this.state.messages, this.state.user, 'client side');
    // console.log(this.state.messages);
  }

  handleRock(e) {
    e.preventDefault();
    const username = this.props.user.username
    const game = this.state.gameName;
    this.socket.emit('move', {username, move: "rock", game });
    this.setState({stage: 2});
  };
  handlePaper(e) {
    e.preventDefault();
    const username = this.props.user.username
    const game = this.state.gameName;
    this.socket.emit('move', {username, move: "paper", game });
    this.setState({ stage: 2 });
  };
  handleScissors(e) {
    e.preventDefault();
    const username = this.props.user.username
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

    const username = this.state.user.username;
    const game = this.state.gameName;
    const users = this.state.users;
    ;
    this.socket.emit("join", {username, game, users}, (error) => {
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
      const { stage, gameName, winner, message, messages, user, chatLines, users} = this.state;


      let display;
        if (stage === 1){
             display = <JoinGame gameName={gameName}update={this.update} handleJoin={this.handleJoin}/>
        } else if (stage===2) {
             display = <WaitingRoom />
        } else if (stage===3) {
             display = <LiveGame users={users} chatLines={chatLines} user={user} message={message} messages={messages} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleRock={this.handleRock} handlePaper={this.handlePaper} handleScissors={this.handleScissors}/>
        } else if (stage===4) {
          display = <Result winner={winner} players={users.players} loser={users.players.filter(user => user !== winner)} />
        }
    return (
      <div>
     {display}
      </div>
    );
  }
}

export default GameRoom;

