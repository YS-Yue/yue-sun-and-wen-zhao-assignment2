import {selectCard} from '../Scripts/GameController';
import {setupNewGame} from '../Scripts/GameController';
import {moreCards} from '../Scripts/GameController';
import {showHint} from '../Scripts/GameController';

function CardsReducer(state={gameStarted: false, mode: "normal", deck: [], onTable:[], selectedCards:[],}, action) {
    switch(action.type) {
        case "setModeAndStart": {
            const newState = {
                ...state,
                mode: action.value,
                gameStarted: true,
            }

            return setupNewGame(newState);
        }
        case "endGame": {
            return {
                gameStarted: false, 
                mode: "normal", 
                deck: [], 
                onTable:[], 
                selectedCards:[],
            }
        }
        case "newGame": {
            return setupNewGame(state);
        }
        case "moreCards": {
            return moreCards(state);
        }
        case "selectCard": {
            return selectCard(state, action);
        }
        case "showHint": {
            return showHint(state);
        }
        default:
            return state;
    }
    
}

export default CardsReducer;