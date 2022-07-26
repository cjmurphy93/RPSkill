import { connect } from 'react-redux'
import { getUser } from '../../actions/profile_actions'
import { scores } from '../../actions/session_actions'
import Profile from './profile'

const msp = (state) => {
    return {
        user: state.user,
        hiscores: state.hiscores.length
            ? state.hiscores.map((obj) => obj.username)
            : null,
    }
}

const mdp = (dispatch) => {
    return {
        getUser: (username) => dispatch(getUser(username)),
        getScores: () => dispatch(scores()),
    }
}

export default connect(msp, mdp)(Profile)
