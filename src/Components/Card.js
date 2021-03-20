import React from 'react';
import '../Style/Card.css';
import { connect } from 'react-redux';

export class Card extends React.Component {

    generateCardHelper(index){

        let fill_pattern;
        
        if (this.props.shading === "open"){
            fill_pattern = "white";
        } else if (this.props.shading === "full") {
            fill_pattern = this.props.color;
        } else if (this.props.shading === "stripe") {
            fill_pattern = 'url(#stripe_' + this.props.color + ')';
        }

        let textShape = <text x = "50" y ="85" fill={fill_pattern} stroke={this.props.color} strokeWidth="4" textAnchor="middle">{this.props.shape}</text>
        
        return (
            <svg key = {index} width="100%" height="33%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="stripe_#F28C28" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(40 0 0)">
                        <line stroke="#F28C28" strokeWidth="8px" y2="10"/>
                    </pattern>
                    <pattern id="stripe_#DE3163" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(40 0 0)">
                        <line stroke="#DE3163" strokeWidth="8px" y2="10"/>
                    </pattern>
                    <pattern id="stripe_#279697" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(40 0 0)">
                        <line stroke="#279697" strokeWidth="8px" y2="10"/>
                    </pattern>
                </defs>
                {textShape}
            </svg>
        )
    }

    generateCard() {
        let OnCard = [];

        for(let i=0; i<this.props.num; i++) {
            OnCard.push(this.generateCardHelper(i));
        }
        return OnCard;
    }

    handleOnClickCard(action, cardId){
        this.props.dispatch({type: action, value: cardId});
    }

    render(){
        return (
            <div id="card" className={this.props.select} onClick={() => this.handleOnClickCard("selectCard", this.props.id)}>
                 {this.generateCard()}
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
)(Card)