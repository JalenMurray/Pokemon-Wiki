import { Component } from "react";
import { format } from "../../../modules/Utils";
import "./entry-abilities.styles.css";

class EntryAbilities extends Component {
  render() {
    const { abilities } = this.props;
    return (
      <div>
        {abilities.map((ability) => (
          <div key={ability.name} className="entry-ability">
            <h1
              className={
                ability.isHidden
                  ? "entry-ability-name HA"
                  : "entry-ability-name"
              }
            >
              {format(ability.name)}
            </h1>
          </div>
        ))}
      </div>
    );
  }
}

export default EntryAbilities;
