import React from 'react';

const JoinGame = ({ gameName, update, handleJoin}) => {

    return (
      <div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Game Name"
              value={gameName}
              onChange={update("gameName")}
            />
            <button onClick={handleJoin}>Join</button>
          </form>
        </div>
      </div>
    );
}

export default JoinGame;