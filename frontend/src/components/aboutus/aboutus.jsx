import React from 'react'
import '../main/main_page.css'
import './aboutus.css'

class AboutUs extends React.Component {
    render() {
        return (
            <div>
                <section>
                    <div className="about-container">
                        <div className="flex column center">
                            <h2 className="about-title">Nara Lee</h2>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/naraskim/"
                                className="user nara"
                            >
                                {' '}
                            </a>
                        </div>
                        <div className="flex column center">
                            <h2 className="about-title">Connor Murphy</h2>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/connor-j-murphy/"
                                className="user connor"
                            >
                                {' '}
                            </a>
                        </div>
                        <div className="flex column center">
                            <h2 className="about-title">Austin Wong</h2>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/austinhokunwong/"
                                className="user austin"
                            >
                                {' '}
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default AboutUs
