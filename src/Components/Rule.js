import React from 'react';
import '../Style/App.css';
import {Link} from 'react-router-dom';
import {ReactComponent as HomeIcon} from '../Style/image/home-icon.svg';
import {ReactComponent as GameIcon} from '../Style/image/game-icon.svg'

export default class Rule extends React.Component {

    render() {
        return(
            <div>
                <div className="navbar">
                    <div className="gameTitle">Game Rule</div>
                    <div className="links">
                        <Link className="linkButton" exact="true" to={"/Home"}><HomeIcon className="icon" /></Link>
                        <Link className="linkButton" exact="true" to={"/Game"}><GameIcon className="icon" /></Link>
                    </div>
                </div>
                <div className="rule">
                    <p>The deck consists of 81 unique cards that vary in four features across three possibilities for each kind of feature: </p>
                    <ul>
                        <li>number of shapes</li>
                        <li>shape </li>
                        <li>shading </li>
                        <li>color </li>
                    </ul>
                    <p>For each one of the four categories of features, the three cards must display that feature as</p>
                    <ul>
                        <li>either all the same</li>
                        <li>all different.</li>
                    </ul>
                    <p>For each feature, the three cards must avoid having two cards showing one version of the feature and the remaining card showing a different version.</p>
                    <p>When landing on the game page, you could choose difficulties:</p>
                    <ul>
                        <li>An easy game only uses 3 of the 4 features of each card (so you might have color, shape, and number all be variable, but all other cards are solid.)  Because of this, you only have 27 cards in total</li>
                        <br />
                        <li>In a medium game, the game will use the normal 81 cards and will automatically draw more cards if there is not an available set for the user to pick.  To clarify, if there does not exist a set within the 12 drawn cards, then 3 more cards are automatically drawn by the game (and so on until a set is possible.)</li>
                        <br />
                        <li>A hard game uses the normal 81 cards and will NOT automatically draw cards for the player</li>
                    </ul>
                    <p>Explore more and enjoy yourself.</p>
                </div>
            </div>
        )
    }
}