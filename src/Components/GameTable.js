import React from 'react';
import Card from './Card.js';
import '../Style/App.css';

export default class GameTable extends React.Component {

    render() {
        return(
            <div className="gameDeck">
                {this.props.onTable.map((singleCard)=><Card key={singleCard.id} id={singleCard.id} color={singleCard.color} shape={singleCard.shape} shading={singleCard.shading} num={singleCard.num} select={singleCard.select}></Card>)}
            </div>
        )
    }
}