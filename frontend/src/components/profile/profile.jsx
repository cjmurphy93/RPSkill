import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/profile_actions';
import './profile.css';


class Profile extends React.Component {

    componentDidMount() {
        debugger
        this.props.getUser(this.props.match.params.username);
    }

    render() {
        const { user } = this.props;
        debugger
        return (
            <div>
                <section>
                    <div className="profile-container">
                        <h1>{user.username}</h1>
                            <div className="user-info">
                                <li>Rank:</li>
                                <li>ELO: {user.elo}</li>
                            </div>                        
                    </div>
                </section>
            </div>
        )
    }
}

const msp = state => {
    debugger
    return {
        user: state.user,
    }
}

const mdp = dispatch => {
    debugger
    return {
        getUser: username => dispatch(getUser(username))
    }
}

export default connect(msp, mdp)(Profile);