import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHandRock,
    faHandPaper,
    faHandScissors,
} from '@fortawesome/free-solid-svg-icons'

const LiveGame = ({
    handleRock,
    handlePaper,
    handleScissors,
    handleSubmit,
    handleChange,
    message,
    chatLines,
    users,
}) => {
    // if some condition (e.g 2 moves received)
    //execute 'some function'

    //if (player counter !== 2) {
    //return null
    // }
    return (
        <>
            <section className="livegame-container">
                <div className="chat-box">
                    <form
                        action=""
                        className="form-container"
                        onSubmit={handleSubmit}
                    >
                        <div className="chat-lines">
                            {users.players.map((user, i) => {
                                return (
                                    <div key={i} className="announcement">
                                        <li>{`${user} has joined the room`}</li>
                                    </div>
                                )
                            })}
                            {chatLines.map((message, i) => {
                                // console.log(message)
                                // console.log(chatLines)
                                return (
                                    <div key={i} className="line">
                                        <li>{`${message.split('~@$')[0]}`}</li>
                                        <li id="time-stamp">
                                            {`${message.split('~@$')[1]}`}
                                        </li>
                                    </div>
                                )
                            })}
                            {/* {`${user}: ${messages[messages.length - 1]}`} */}
                        </div>
                        <input
                            type="text"
                            className="message-input"
                            placeholder=" Type here..."
                            value={message}
                            onChange={handleChange('message')}
                            autoFocus
                        />
                        <button className="send-button">Send</button>
                    </form>
                </div>
                <div>
                    <h1 className="live-game-title">
                        Choose Rock, Paper, or Scissors
                    </h1>
                </div>
                <div className="flex game-container">
                    <FontAwesomeIcon
                        icon={faHandRock}
                        className="move-icon"
                        onClick={handleRock}
                    />
                    <FontAwesomeIcon
                        icon={faHandPaper}
                        className="move-icon"
                        onClick={handlePaper}
                    />
                    <FontAwesomeIcon
                        icon={faHandScissors}
                        className="move-icon"
                        onClick={handleScissors}
                    />
                </div>
            </section>
        </>
    )
}

export default LiveGame
