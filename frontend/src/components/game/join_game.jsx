import React from 'react';

const JoinGame = ({ gameName, update, handleJoin, }) => {
  // const rooms = gameRooms ? (
  //   <ul>
  //     {Object.values(gameRooms).map((game, idx) => {
  //       return (
  //         <li key={idx}>Name: {game.name} Players: {game.players[0]}</li>
  //       )
  //     })}
  //   </ul>
  // ) : <p>No Open Rooms</p>
    return (
      <div>
        <div>
          <form>
          {/* <div>
            {rooms}
          </div> */}
            <section>
              <div className="game-name-container">
                <input
                  className="game-name-input"
                  type="text"
                  placeholder="Game Name"
                  value={gameName}
                  onChange={update("gameName")}
                />
                <button className="game-name-button" onClick={handleJoin}>Join</button>
              </div>
            </section>
          </form>
        </div>
      </div>
    );
}

export default JoinGame;