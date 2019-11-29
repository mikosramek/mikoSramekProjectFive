import React from 'react';

import cardSets from './assets/sets.json';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      expandDescription: false
    }
  }
  componentDidMount() {
    
  }

  getColorIdentity = (colors) => {
    let identity = '';
    //A brute force thing to make sure the colour identity is in WUBRG order. (It's an MTG thing)
    if(colors.includes('W')){
      identity += 'W';
    }
    if(colors.includes('U')){
      identity += 'U';
    }
    if(colors.includes('B')){
      identity += 'B';
    }
    if(colors.includes('R')){
      identity += 'R';
    }
    if(colors.includes('G')){
      identity += 'G';
    }
    if(identity === ''){
      identity += 'Colorless'
    }
    return identity;
  }

  getPrices = (prices) => {
    const result = [];
    result.push("$"+prices.usd+" USD")
    // for(let key in prices){
    //   result.push(key + ": " + prices[key] +' ');
    // }
    return result;
  }

  render() {
    const { bought, name, quantity, identity, rarity, sets, latestSet, prices, imgUrl, hasFoil } = this.props.card;
    // console.log(prices);
    return(
      <li>
        <div className="cardHeader">
        	<span 
        	  onClick={this.props.checkOff}
        	  className = {bought ? 'bought' : ''}
        	>
        	  {bought ? <i className='far fa-check-square'></i> : <i className='far fa-square'></i>} {quantity}x {name}
            
        	</ span>
          <i className={`ss ss-${latestSet.toLowerCase()} ss-${rarity.toLowerCase()}`}></i>
        	<button className="showDescriptionButton" onClick={() => this.setState({expandDescription: !this.state.expandDescription})}>
        	  <i className={`fas fa-chevron-${this.state.expandDescription ? 'up' : 'down'}`}></i>   
        	</ button>

        </div>
        <div className={`cardBody ${this.state.expandDescription ? 'show' : 'hide'}`}>
          { 
            hasFoil
              ? <i className='fab fa-snapchat-ghost'></i>
              : null
          }
          
          <img src={imgUrl} alt={name}/>
          <p>
            {
              this.getColorIdentity(identity)
            }
          </p>
          <p>{rarity}</p>
          {
            this.getPrices(prices).map((item) => {
              return <p key={item}>{item}</p>
            })
          }
          {
            sets.map( (set) => {
              // return  <i key={name+set} className={`ss ss-${set.toLowerCase()} ss-${rarity.toLowerCase()}`}></i> 
              return (
              (cardSets[set.toUpperCase()] !== undefined)
                ? <p key={name+set}><i className={`ss ss-${set} ss-${rarity}`}></i> {cardSets[set.toUpperCase()]}</p>
                : null  
              )
            })
          }

        </div>
      </li>
    );
  }
};

export default Card;