import React from 'react';
import '../main/main_page.css';
import './aboutus.css'
import { Link } from 'react-router-dom';

class AboutUs extends React.Component {

    render() {
        return (
            <div>
                <section>
                    <div className="about-container">
                        <a target="_blank" href="https://www.linkedin.com/in/naraskim/" className="user nara">
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/connor-murphy-085a7238/" className="user connor">
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/austinhokunwong/" className="user austin">
                        </a>
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutUs;