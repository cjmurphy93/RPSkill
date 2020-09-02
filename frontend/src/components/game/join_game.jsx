import React from 'react';


const JoinGame = ({ gameName, rounds, update, handleJoin, handleNumber, openRooms, creator}) => {


    return (
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
                <label >Rounds:
                <select name="rounds" id="rounds" value={rounds} onChange={handleNumber("rounds")}>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="9">9</option>
                </select>
                </label>
                <button className="game-name-button" onClick={handleJoin}>Join</button>

               </div>
            </section>

    );
}

export default JoinGame;