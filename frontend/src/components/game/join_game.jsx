import React from 'react';

const JoinGame = ({ gameName, rounds, update, handleJoin, handleNumber}) => {

    return (
      <div>
        <div>
          <form>
            <section>
              <div className="game-name-container">
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
          </form>
        </div>
      </div>
    );
}

export default JoinGame;