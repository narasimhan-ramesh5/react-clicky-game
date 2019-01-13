import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import "./App.css";


/**
 *  This is the main App component. 
 */
class App extends Component {
  
  /**
   *  The App's state consists of
   *  a) cards : an array of Looney Tunes characters (represented by Bootstrap cards)
   *  b) score : this is the running score for the current game. 
   *     Each time the user clicks on a character that hasn't been clicked before, the score is incremented.
   *  c) highscore: This is the highest score attained so far. The maximum possible value is the number of cards.
   *     This happens when the user clicks all characters exactly once. 
   */
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  /**
   * @function: gameOver
   * 
   * This method is invoked when the game is over.
   * 
   * The game is over when either
   * a) the user clicks on any character more than once (loss)
   * b) the user clicks on all characters exactly once (win)
   */
  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score});
    }

    /* If the user clicked each card exactly once, they win.
       Otherwise they lose. */
    if(this.state.score === this.state.cards.length){
      alert("You win \nscore: " + this.state.score);
    } else {
      alert(`Game Over :( \nscore: ${this.state.score}`);
    }

    /*  New game : reset 'score' to 0 and the click count 
        for each character */
    this.setState({score: 0});
    this.state.cards.forEach( (card) => {
      card.count = 0;
    });
    return true;
  }

  /**
   * @function: clickCount
   * 
   * Callback function invoked each time the user clicks on a card.
   */
  clickCount = (id) => {

    let cards = this.state.cards;
    
    let i = cards.findIndex((card) => {
      return(card.id === id);
    });

    //console.log("User clicked on " + cards[i].name);

    /* If the character has a click count of 0, it hasn't been clicked before.
       Increment user's score and shuffle the cards */
    if(cards[i].count === 0){
      cards[i].count += 1;

      /* Call the array sort function, with the compareFunction returning a 
         random sort order */
      cards.sort(() => Math.random() - 0.5);

      /* Update the App's state to reflect the new score, and the re-shuffled
         cards */
      this.setState({
                      score : this.state.score + 1,
                      cards : cards
                    });
    } else {
      //console.log("oops, you've already clicked " + cards[i].name);
      this.gameOver();
    }
  }

  /**
   * @function: componentDidUpdate
   * 
   * Component update callback function for this app. 
   * 
   * Checks if the user has clicked on each card exactly once.
   * If so, the game is over and the user wins.
   */
  componentDidUpdate = () =>{
    /* If the user has clicked on each card exactly once, the score should 
       equal the number of cards (characters). The user wins and the game is over. */
    //console.log("Onchange invoked");
    if(this.state.score === this.state.cards.length){
      this.gameOver();
    }
  }

  /**
   * @function: render
   * 
   * Render function for this App.
   */
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
