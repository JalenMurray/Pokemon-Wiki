import { Component } from "react";
import { format } from "../../../modules/Utils";
import EntryAbilities from "../entry-abilities/entry-abilities.component";
import EntryStats from "../entry-stats/entry-stats.components";
import EntryTypes from "../entry-types/entry-types.component";
import "./pokemon-entry.styles.css";

class PokemonEntry extends Component {
  render() {
    const { id, sprite, name, types, abilities, stats } = this.props;
    return (
      <tr id={id}>
        <th>
          <h1 className="entry-id">{id}</h1>
        </th>
        <td>
          <img className="entry-sprite" alt={name} src={sprite} />
        </td>
        <td>
          <h1 className="entry-name">{format(name)}</h1>
        </td>
        <td className="d-none d-md-table-cell">
          <EntryTypes types={types} />
        </td>
        <td className="d-none d-lg-table-cell">
          <EntryAbilities abilities={abilities} />
        </td>
        <EntryStats stats={stats} />
      </tr>
    );
  }
}

export default PokemonEntry;
