import { Component } from "react";
import Abilities from "../abilities/abilities.component";
import TopCard from "../top-card/top-card.component";
import StatList from "../stat-list/stat-list.component";

import "./card.styles.css";

const BG_COLORS = {
  grass: "rgb(192, 228, 181)",
  fire: "rgb(193,140,135)",
  water: "rgb(86,149,232)",
  bug: "rgb(123,154,86)",
  normal: "rgb(185,192,228)",
  flying: "rgb(168,187,242)",
  ghost: "rgb(120,63,134)",
  psychic: "rgb(210,126,139)",
  dark: "rgb(132,114,104)",
  poison: "rgb(121,106,166)",
  electric: "rgb(252,205,64)",
  fairy: "rgb(231,177,233)",
  rock: "rgb(138,78,32)",
  ground: "rgb(201,166,118)",
  steel: "rgb(147,148,158)",
  ice: "rgb(154,218,235)",
  dragon: "rgb(49,105,185)",
  fighting: "rgb(171,106,114)",
};

class Card extends Component {
  getBarColor(value) {
    if (value < 55) return "rgb(212, 118, 17)";
    if (value < 65) return "rgb(212, 164, 17)";
    if (value < 75) return "rgb(212,196,17)";
    if (value < 85) return "rgb(212,212,17)";
    if (value < 95) return "rgb(203,212,17)";
    if (value < 100) return "rgb(180, 212, 17)";
    if (value < 110) return "rgb(160,212,17)";
    if (value < 120) return "rgb(134,212,17)";
    if (value < 130) return "rgb(98,212,17)";
    return "rgb(43,212,17)";
  }

  getStyle(id, type, stats) {
    const [hp, att, def, spAtt, spDef, speed] = stats.map((stat) => stat.value);
    const bgColor = BG_COLORS[type];
    const hpBarColor = this.getBarColor(hp);
    const attBarColor = this.getBarColor(att);
    const defBarColor = this.getBarColor(def);
    const spAttBarColor = this.getBarColor(spAtt);
    const spDefBarColor = this.getBarColor(spDef);
    const speedBarColor = this.getBarColor(speed);
    return `#id-${id}{--card-color: ${bgColor};
      --hp: ${hp};--att: ${att};--def: ${def};--spAtt: ${spAtt};--spDef: ${spDef};--speed: ${speed};
      --hpBarColor: ${hpBarColor};--attBarColor: ${attBarColor};--defBarColor: ${defBarColor};
      --spAttBarColor: ${spAttBarColor};--spDefBarColor: ${spDefBarColor};--speedBarColor: ${speedBarColor}`;
  }

  render() {
    const { id, name, types, thumbnail, abilities, stats } = this.props;
    return (
      <div
        key={id}
        style={this.getStyle(id, types[0], stats)}
        className="card container col-xs-12 col-sm-6 col-lg-4 col-xl-3"
        id={`id-${id}`}
      >
        <TopCard id={id} name={name} types={types} />
        <img className="thumbnail" src={thumbnail} alt={name} />
        <Abilities abilities={abilities} />
        <StatList stats={stats} />
      </div>
    );
  }
}

export default Card;
