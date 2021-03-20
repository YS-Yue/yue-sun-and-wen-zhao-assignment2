import React from 'react';
import '../Style/App.css';
import { connect } from 'react-redux';

export class ModeButtonGroup extends React.Component {

    handleSetModeAndStart(action, modeChoice) {
        this.props.dispatch({type: action, value: modeChoice});
    }

    render(){
        return (
            <div className="setModeButtons">
                <div className="modeButton" onClick={() => this.handleSetModeAndStart("setModeAndStart", "easy")}>EASY</div>
                <div className="modeButton" onClick={() => this.handleSetModeAndStart("setModeAndStart", "normal")}>NORMAL</div>
                <div className="modeButton" onClick={() => this.handleSetModeAndStart("setModeAndStart", "hard")}>HARD</div>
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
        deck : state.cards.deck,
        onTable : state.cards.onTable,
        selectedCards: state.cards.selectedCards,
    }
}


export default connect(
    mapStateTpProps,
    mapDispatchToProps
)(ModeButtonGroup)