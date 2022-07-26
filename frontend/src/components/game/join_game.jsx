import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const JoinGame = ({
    gameName,
    rounds,
    update,
    handleJoin,
    handleNumber,
    openRooms,
    creator,
    updateOnClick,
}) => {
    return (
        <section>
            <div className="join-room-container">
                <div className="available-rooms">
                    <header>
                        Lobby
                        <div className="tooltip">
                            <span className="tooltiptext">
                                Create a lobby by entering a lobby name below,
                                or join one by clicking one in the list.
                            </span>
                            <FontAwesomeIcon
                                style={{ marginLeft: 8, cursor: 'pointer' }}
                                icon={faQuestionCircle}
                                className="questioncircle-img"
                            ></FontAwesomeIcon>
                        </div>
                    </header>
                    <div id="spacer1"></div>
                    {openRooms.map((openRoom, i) => {
                        return (
                            <div key={i} className={`open-room`}>
                                <div
                                    onClick={() => {
                                        // updateOnClick("gameName", openRoom);
                                        handleJoin(openRoom)
                                    }}
                                >
                                    {openRoom}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <input
                    className="game-name-input"
                    type="text"
                    placeholder="Game Name"
                    value={gameName}
                    onChange={update('gameName')}
                    autoFocus
                />
                <label>
                    Rounds:
                    <select
                        name="rounds"
                        id="rounds"
                        value={rounds}
                        onChange={handleNumber('rounds')}
                    >
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="9">9</option>
                    </select>
                </label>
                <button className="game-name-button" onClick={handleJoin}>
                    Join
                </button>
            </div>
        </section>
    )
}

export default JoinGame
