import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
      </button>
    );
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      const key = "square".concat(i);
      return (
        <Square key={key}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const imageUrl = require(`./resources/pelilauta.jpg`)
      const rows = [];
      for (let j=0; j<30; j++) {
        let row = [];
        for(let i=0; i<45; i++) {
          row.push(this.renderSquare(45*j+i));
        }
        rows.push(<div className="board-row">{row}</div>)
      }
      return (
        <div style={{ backgroundImage: `url(${imageUrl})`}} className="pelilauta" >
          {rows}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {lastClicked: null,
        pisteet: {musta: 0, punainen: 0, vihrea: 0, sininen: 0, keltainen: 0},
        stokob: {name: "Stockholm-Kobenhavn", key: "stokob", length: 3, points: 4, double: true, built1: null, built2: null},
        stoped: {name: "Stockholm-Pedrograd", key: "stoped", length: 8, points: 21, double: false, built1: null, built2: null},
        pedrig: {name: "Pedrograd-Riga", key: "pedrig", length: 4, points: 7, double: false, built1: null, built2: null},
        pedwil: {name: "Pedrograd-Wilno", key: "pedwil", length: 4, points: 7, double: false, built1: null, built2: null},
        pedmos: {name: "Pedrograd-Moskva", key: "pedmos", length: 4, points: 7, double: false, built1: null, built2: null},
        rigdan: {name: "Riga-Danzig", key: "rigdan", length: 3, points: 4, double: false, built1: null, built2: null},
        rigwil: {name: "Riga-Wilno", key: "rigwil", length: 4, points: 7, double: false, built1: null, built2: null},
        edilon: {name: "Edinburgh-London", key: "edilon", length: 4, points: 7, double: true, built1: null, built2: null},
        kobess: {name: "Kobenhavn-Essen", key: "kobess", length: 3, points: 4, double: true, built1: null, built2: null},
        danber: {name: "Danzig-Berlin", key: "danber", length: 4, points: 7, double: false, built1: null, built2: null},
        danwar: {name: "Danzig-Warszawa", key: "danwar", length: 2, points: 2, double: false, built1: null, built2: null},
        londie: {name: "London-Dieppe", key: "londie", length: 2, points: 2, double: true, built1: null, built2: null},
        lonams: {name: "London-Amsterdam", key: "lonams", length: 2, points: 2, double: false, built1: null, built2: null}
      };
    }

    reitit(i) {
      if (i === 113 || i === 114 || i === 157 || i === 158 || i === 201|| i === 202) {
        return this.state.stokob;
      } else {
        return null;
      }

    }
  
    handleClick(i) {
      this.setState({lastClicked: this.reitit(i)});
      this.setState({lastIndex: i});
    }
    
    handleColorSelect(e, selectKey) {
      let oldColor = this.state.lastClicked[selectKey];
      if (oldColor) {
        let points = this.state.pisteet[oldColor];
        points = points - this.state.lastClicked.points;
        const updatedPisteet = _.set(this.state.pisteet, oldColor, points);
        this.setState({"pisteet": updatedPisteet});  
      }

      let points = this.state.pisteet[e.target.value];
      points = points + this.state.lastClicked.points;
      const updatedPisteet = _.set(this.state.pisteet, e.target.value, points);
      this.setState({"pisteet": updatedPisteet});

      const updatedRailway = _.set(this.state.lastClicked, selectKey, e.target.value);
      let key = updatedRailway.key;
      this.setState({key: updatedRailway});
    }
  
    render() {

      return (
        <div className="game">
          <div className="game-info">
            <div>PISTETILANNE</div>
            <div>Musta: {this.state.pisteet.musta}</div>
            <div>Punainen: {this.state.pisteet.punainen}</div>
            <div>Vihreä: {this.state.pisteet.vihreä}</div>
            <div>Sininen: {this.state.pisteet.sininen}</div>
            <div>Keltainen: {this.state.pisteet.keltainen}</div>
          </div>
          <div className="game-board">
            <Board
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="move-info"> 
            <div> {this.state.lastIndex} </div>
            {this.state.lastClicked && <div>
                  <div>{this.state.lastClicked.name}</div>
                  <div>Pituus: {this.state.lastClicked.length}</div>
                  <div>Pisteet: {this.state.lastClicked.points}</div>
                  <div>Rakentanut: 
                    <select 
                      name="select-who-built1"
                      value={this.state.lastClicked.built1}
                      onChange={(e) => this.handleColorSelect(e, "built1")} >
                      <option value=""></option>
                      <option value="musta">Musta</option>
                      <option value="punainen">Punainen</option>
                      <option value="vihrea">Vihreä</option>
                      <option value="keltainen">Keltainen</option>
                      <option value="sininen">Sininen</option>
                    </select>
                  </div>
                  {this.state.lastClicked.double && 
                  <div>Rakentanut: 
                    <select 
                      name="select-who-built1"
                      value={this.state.lastClicked.built2}
                      onChange={(e) => this.handleColorSelect(e, "built2")} >
                      <option value=""></option>
                      <option value="musta">Musta</option>
                      <option value="punainen">Punainen</option>
                      <option value="vihrea">Vihreä</option>
                      <option value="keltainen">Keltainen</option>
                      <option value="sininen">Sininen</option>
                    </select>
                  </div>}
              </div>}
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
