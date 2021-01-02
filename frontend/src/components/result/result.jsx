import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScore } from '../../actions/session_actions';
// import Odometer from "react-odometerjs";
import './result.css';
// import "./odometer-theme-default.css";

const Result = ({ winner, loser, players, users }) => {
        const dispatch = useDispatch();
        //if (player counter === 2) {
        //return null
        // }

        useEffect(() => {
          dispatch(updateScore(winner));
        }, [updateScore])

        
        const message = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
        return (
          <>
            <section className="section-container conf-wrap">
              <div className="conf-50"></div>
              <div className="conf-49"></div>
              <div className="conf-48"></div>
              <div className="conf-47"></div>
              <div className="conf-46"></div>
              <div className="conf-45"></div>
              <div className="conf-44"></div>
              <div className="conf-43"></div>
              <div className="conf-42"></div>
              <div className="conf-41"></div>
              <div className="conf-40"></div>
              <div className="conf-39"></div>
              <div className="conf-38"></div>
              <div className="conf-37"></div>
              <div className="conf-36"></div>
              <div className="conf-35"></div>
              <div className="conf-34"></div>
              <div className="conf-33"></div>
              <div className="conf-32"></div>
              <div className="conf-31"></div>
              <div className="conf-30"></div>
              <div className="conf-29"></div>
              <div className="conf-28"></div>
              <div className="conf-27"></div>
              <div className="conf-26"></div>
              <div className="conf-25"></div>
              <div className="conf-24"></div>
              <div className="conf-23"></div>
              <div className="conf-22"></div>
              <div className="conf-21"></div>
              <div className="conf-20"></div>
              <div className="conf-19"></div>
              <div className="conf-18"></div>
              <div className="conf-17"></div>
              <div className="conf-16"></div>
              <div className="conf-15"></div>
              <div className="conf-14"></div>
              <div className="conf-13"></div>
              <div className="conf-12"></div>
              <div className="conf-11"></div>
              <div className="conf-10"></div>
              <div className="conf-9"></div>
              <div className="conf-8"></div>
              <div className="conf-7"></div>
              <div className="conf-6"></div>
              <div className="conf-5"></div>
              <div className="conf-4"></div>
              <div className="conf-3"></div>
              <div className="conf-2"></div>
              <div className="conf-1"></div>
              <div className="conf-0"></div>
              <div className="inner-container">
                <div id="center-container">Game Results</div>
                <div className="result-message">{message}</div>
                <div className="players">
                  <div className="playerOne">
                        <h2>{winner === "tie" ? players[0] : winner}</h2>
                        <h2>ELO Change</h2>
                        <h2 id="winner-points">{winner === "tie" ? 0 : "+400"}</h2>
                  </div>
                  <div className="playerTwo">
                        <h2>{winner === "tie" ? players[1] : users.players.filter(user => user !== winner)}</h2>
                        <h2>ELO Change</h2>
                        <h2 id="loser-points">0</h2>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }


export default Result;