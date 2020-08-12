import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/profile_actions';

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
                        <h1>{user.elo}</h1>
                        <caption><h1>Profile</h1></caption>
                        
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