import React from 'react';
import './profile.css';


class Profile extends React.Component {

    componentDidMount() {
        Promise.all([
            this.props.getScores(),
            this.props.getUser(this.props.match.params.username),
        ]).then(() => console.log("all resolved"))
    }

    render() {
        const { user, hiscores } = this.props;
        if (!this.props.hiscores) {
            return null;
        } else {
                 return (
                   <div>
                     <section>
                       <div className="profile-container">
                         <h1 id="username">{user.username}</h1>
                         <div className="user-info">
                           <li>Rank: {hiscores.indexOf(user.username) + 1}</li>
                           <li>ELO: {user.elo}</li>
                         </div>
                       </div>
                     </section>
                   </div>
                 );
               }
    }
}

export default Profile;
