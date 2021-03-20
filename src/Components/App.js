import '../Style/App.css';
import React from 'react';
import { connect } from 'react-redux';
import GameTable from './GameTable';
import ModeButtonGroup from './ModeButtonGroup';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import {ReactComponent as HomeIcon} from '../Style/image/home-icon.svg';
import {ReactComponent as RuleIcon} from '../Style/image/rule-icon.svg'


class App extends React.Component {
    handleDispatch(action) {
        this.props.dispatch({type: action});
    }

    contentToShow(){
        if(this.props.gameStarted){
            return (
                <div>
                    <div className="inGameButtonHolder">
                        <div className="gameButton" onClick={() => this.handleDispatch("newGame")}>reset game</div>
                        <div className="gameButton" onClick={() => this.handleDispatch("moreCards")}>More cards</div>
                        <div className="gameButton" onClick={() => this.handleDispatch("showHint")}>show hint</div> 
                        <div className="gameButton" onClick={() => this.handleDispatch("endGame")}>change mode</div>
                    </div>
                    <div className="deckInfo"><b>{this.props.deck.length}</b> cards left in deck</div>
                    <GameTable onTable={this.props.onTable}></GameTable>
                </div>
            )
        } else {
            return (
                <ModeButtonGroup />
            )
        }
    }

    render() {
        return(
            <div>
                <div className="navbar">
                    <div className="gameTitle">Set card Game</div>
                    <div className="links">
                        <Link className="linkButton" exact="true" to={"/Home"} onClick={() => this.handleDispatch("endGame")}><HomeIcon className="icon" /></Link>
                        <Link className="linkButton" exact="true" to={"/Rule"} onClick={() => this.handleDispatch("endGame")}><RuleIcon className="icon" /></Link>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                {this.contentToShow()}
                <div className="footer"> </div>
            </div>
        )
    }
}


let mapDispatchToProps = function(dispatch, props) {
    return {
      dispatch: dispatch,
    }
}


let mapStateTpProps = function(state, props) {
    return {
        gameStarted: state.cards.gameStarted,
        mode: state.cards.mode,
        deck : state.cards.deck,
        onTable : state.cards.onTable,
        selectedCards: state.cards.selectedCards,
    }
}


export default connect(
    mapStateTpProps,
    mapDispatchToProps
)(App)