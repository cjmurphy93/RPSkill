import React from 'react';
import '../main/main_page.css';
import './hiscores.css'
import { Link } from 'react-router-dom';

class Hiscores extends React.Component {

    componentDidMount() {
        this.props.scores()
    }

    render() {
        return (
            <div>
                <section>
                    <div className="hiscore-container">
                        <table className="hiscore-table">
                            <caption><h1>RPSkill Leaderboards</h1></caption>
                            <thead>
                                <tr role="row" className="hiscore-table-header">
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>ELO</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {Object.values((this.props.users)).map((user, idx) => {
                                        return(
                                            <tr role="row" key={idx}>
                                                <td className="score-item">
                                                    <Link className="hiscore-user" to={`/user/${user.username}`}><p>{idx + 1}</p></Link>
                                                </td>
                                                <td align="left">
                                                    <p>{user.username}</p>
                                                </td>
                                                <td>
                                                    <p>{user.elo}</p>
                                                </td>
                                            </tr>
                                        )
                                    })}
  
                            </tbody>                         
                        </table>
                    </div>
                </section>
            </div>
        );
    }
}

export default Hiscores;