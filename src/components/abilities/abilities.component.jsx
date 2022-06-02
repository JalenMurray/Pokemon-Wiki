import { Component } from "react";
import { format } from "../../modules/Utils.js";
import "./abilities.styles.css";

class Abilities extends Component {
  getClasses(ability) {
    return ability.isHidden ? "col ability HA" : "col ability";
  }

  getAbilities(abilities) {
    return abilities.map((ability) => (
      <h1 key={ability.name} className={this.getClasses(ability)}>
        {format(ability.name)}
      </h1>
    ));
  }

  render() {
    const { abilities } = this.props;
    return (
      <div className="abilities row">
        <h1 className="col-auto ability-keyword">Abilities</h1>
        {this.getAbilities(abilities)}
      </div>
    );
  }
}

export default Abilities;
