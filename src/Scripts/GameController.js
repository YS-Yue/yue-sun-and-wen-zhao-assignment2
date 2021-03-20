import { toast } from "react-toastify";

const COLORS = ["#DE3163", "#F28C28", "#279697"]
const SHAPES = ["S", "U", "N"]
const SHADINGS = ["open", "full", "stripe"]
const NUMS = [1, 2, 3]


export function setupNewGame(state) {
    const newDeck = createDeck(state.mode);
    const onTable = newDeck.slice(0,12);
    const deckStock = newDeck.slice(12,81);

    let newState = {
            ...state,
            deck: deckStock,
            onTable: onTable,
            selectedCards:[],
    }

    return checkGameCanContinue(newState);
}


function createDeck(mode){
    let deck = [];

    if (mode === "easy") {
        for (let i = 0; i < COLORS.length; i++) {
            for (let j = 0; j < SHAPES.length; j++) {
                for (let k = 0; k < SHADINGS.length; k++) {
                    deck.push({
                        id :  COLORS[i] + "_" + SHAPES[j] + "_" + SHADINGS[k] + "_" + NUMS[0],
                        color : COLORS[i],
                        shape : SHAPES[j],
                        shading : SHADINGS[k],
                        num : NUMS[0],
                        select: "unselect",
                    });
                }
            }
        }
    } else {
        for (let i = 0; i < COLORS.length; i++) {
            for (let j = 0; j < SHAPES.length; j++) {
                for (let k = 0; k < SHADINGS.length; k++) {
                    for (let l = 0; l < NUMS.length; l++) {
                        deck.push({
                            id :  COLORS[i] + "_" + SHAPES[j] + "_" + SHADINGS[k] + "_" + NUMS[l],
                            color : COLORS[i],
                            shape : SHAPES[j],
                            shading : SHADINGS[k],
                            num : NUMS[l],
                            select: "unselect",
                        });
                    }
                }
            }
        }
    }

    return shuffle(deck);
}


function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    return deck;
}


export function selectCard(preState, action){

    let state = {...preState};

    if (!state.selectedCards.length) {
        state = clearSelectedAndHint(state);
    }

    let newOnTable = [];
    let targetCardId= action.value;
    let newSelected = state.selectedCards;

    for (let i=0; i< state.onTable.length; i++){
        let currentCard = state.onTable[i];
        if (currentCard.id === targetCardId){
            let selectedCurrentCard = {...currentCard, select: "selected"};
            newOnTable.push(selectedCurrentCard);
            newSelected.push(selectedCurrentCard);
        } else {
                newOnTable.push(currentCard);
        }
    }

    let newState = {...state, onTable: newOnTable, selectedCards: newSelected};

    if (!newState.selectedCards || newState.selectedCards.length < 3){
        // console.log("Is there a SET on the table? ",setExistsOnTable(newState.onTable));
        return newState;
    } else {
        if(isSet(newState.selectedCards)) {
            toast.success("It a SET!");
            return replaceThreeCards(newState);
        } else {
            toast.warn("Not a SET!");
            return clearSelectedAndHint(newState);
        }
    }
}


function checkGameCanContinue(newState) {
    // console.log("Is there a SET on the table? ",setExistsOnTable(newState.onTable));
    while (newState.deck.length > 0 && newState.mode !== "hard" && !setExistsOnTable(newState.onTable)) {
        newState = moreCards(newState);
        // console.log("Is there a SET on the table? ",setExistsOnTable(newState.onTable));
    }

    if (newState.deck.length === 0 && !setExistsOnTable(newState.onTable)){
        toast.info("Congrats! GAME END!",{autoClose:4000, position: toast.POSITION.BOTTOM_CENTER,});
        return {
            gameStarted: false, 
            mode: "normal", 
            deck: [], 
            onTable:[], 
            selectedCards:[],
        }
    }

    return newState;
}


export function moreCards(state) {
    let threeCards = state.deck.slice(0,3);
    let newDeck = state.deck.slice(3, state.deck.length);
    let newOntable = state.onTable.concat(threeCards);

    let newState = {
            ...state,
            deck: newDeck,
            onTable: newOntable,
            selectedCards:state.selectedCards,
    }

    return checkGameCanContinue(newState);
}


function isSet(selecledList) {
    let colorSet = new Set();
    let shapeSet = new Set();
    let shadingSet = new Set();
    let numSet = new Set();

    for (let i=0; i<3; i++){
        colorSet.add(selecledList[i].color);
        shapeSet.add(selecledList[i].shape);
        shadingSet.add(selecledList[i].shading);
        numSet.add(selecledList[i].num);
    }

    if (colorSet.size === 2 || shapeSet.size === 2 || shadingSet.size === 2 || numSet.size === 2) {
        return false;
    }

    return true;
}


function clearSelectedAndHint(state) {
    let newOnTable = [];

    for(let i=0; i < state.onTable.length; i++) {
        let currentCard = state.onTable[i];
        if (currentCard.select !== "unselect"){
            newOnTable.push({...currentCard, select: "unselect",})
        } else {
            newOnTable.push(currentCard);
        }
    }
    const newState = {...state, onTable: newOnTable, selectedCards: []};
    return newState;
}


function replaceThreeCards(state) {
    let newDeck = state.deck;
    let newOnTable = [];

    for(let i=0; i < state.onTable.length; i++) {
        let currentCard = state.onTable[i];
        if (currentCard.select === "selected"){
            if(newDeck.length > 0 && state.onTable.length <= 12){
                newOnTable.push(newDeck.pop());
            }
        } else {
            newOnTable.push(currentCard);
        }
    }

    let newState = {...state, deck: newDeck, onTable: newOnTable, selectedCards: []};
    return checkGameCanContinue(newState);
}


function setExistsOnTable(onTable) {
    if (! onTable) {
        return false;
    }
    for (let i = 0; i < onTable.length; i++) {
        for (let j = i + 1; j < onTable.length; j++) {
            for (let k = j + 1; k < onTable.length; k++) {
                let threeCards = [onTable[i], onTable[j], onTable[k]];
                if (isSet(threeCards)){
                    console.log("You find the secret hint :) [",i, j, k, "] on the table is a SET.");
                    return true;
                }
            }
        }
    }
    return false;
}


function findASet(onTable) {
    let hintSet = new Set();
    if (! onTable) {
        return hintSet;
    }
    for (let i = 0; i < onTable.length; i++) {
        for (let j = i + 1; j < onTable.length; j++) {
            for (let k = j + 1; k < onTable.length; k++) {
                let threeCards = [onTable[i], onTable[j], onTable[k]];
                if (isSet(threeCards)){
                    hintSet.add(onTable[i].id);
                    hintSet.add(onTable[j].id);
                    hintSet.add(onTable[k].id);
                    console.log("find a hint: ", hintSet);
                    return hintSet;
                }
            }
        }
    }
    return hintSet;
}


export function showHint(preState) {
    let state = clearSelectedAndHint(preState);

    let hintSet = findASet(state.onTable);

    let newOnTable = [];

    for(let i=0; i < state.onTable.length; i++) {
        let currentCard = state.onTable[i];
        if (hintSet.has(currentCard.id)){
            newOnTable.push({...currentCard, select: "hint",})
        } else {
            newOnTable.push(currentCard);
        }
    }
    const newState = {...state, onTable: newOnTable};
    return newState;
}