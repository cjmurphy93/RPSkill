import React from 'react'
import './main_page.css'
import { Link } from 'react-router-dom'

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <section>
                    <div className="center-container">
                        <h1>Rock, Paper, Scissors!</h1>
                        <div className="flex-container">
                            {/* <button className="play-btn">Play</button> */}
                            <Link to="/gameroom" className="play-btn">
                                Play
                            </Link>
                            <Link to="/hiscores" className="hiscores-btn">
                                Hiscores
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default MainPage
