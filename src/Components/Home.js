import React from 'react';
import '../Style/App.css';
import {Link} from 'react-router-dom';
import {ReactComponent as GameIcon} from '../Style/image/game-icon.svg';
import {ReactComponent as RuleIcon} from '../Style/image/rule-icon.svg';

export default class Home extends React.Component {

    render() {
        return(
            <div>
                <div className="navbar">
                    <div className="gameTitle">Welcome</div>
                    <div className="links">
                        <Link className="linkButton" exact="true" to={"/Game"}><GameIcon className="icon" /></Link>
                        <Link className="linkButton" exact="true" to={"/Rule"}><RuleIcon className="icon" /></Link>
                    </div>
                </div>
                <div className="homePageTitle">Set Card Game </div>
                <div className="homePageButtons">
                    <Link className="modeButton" exact="true" to={"/Game"}>Play</Link>
                    <Link className="modeButton"exact="true" to={"/Rule"}>Rule</Link>
                </div>
            </div>
        )
    }
}