import React from 'react';
import '../main/main_page.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Hiscores extends React.Component {

    render() {
        return (
            <div>
                <section>
                </section>
            </div>
        );
    }
}

const msp = state => {
    return {
    }
}

const mdp = dispatch => {
    return {
    }
}

export default connect(msp, mdp)(Hiscores);