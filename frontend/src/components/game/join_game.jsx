import React from 'react';

const JoinGame = ({ gameName, update, handleJoin, openRooms, creator}) => {

    return (
      <div>
        <div>
          <form>
            <section>
              <div className="join-room-container">
                <div className="available-rooms">
                  {
                    openRooms.map((openRoom, i) => {
                      return (
                        <div key={i} className={`open-room-${i}`}>
                          <li>{openRoom}</li>
                          <li>{creator}</li>
                        </div>
                      )
                    })
                  }
                </div>
                {/* <div className="game-name-container"> */}
                  <input
                    className="game-name-input"
                    type="text"
                    placeholder="Game Name"
                    value={gameName}
                    onChange={update("gameName")}
                    autoFocus
                  />
                  <button className="game-name-button" onClick={handleJoin}>Join</button>
                {/* </div> */}
              </div>
            </section>
          </form>
        </div>
      </div>
    );
}

export default JoinGame;