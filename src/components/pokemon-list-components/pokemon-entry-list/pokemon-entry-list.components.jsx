import { Component } from "react";
import PokemonEntry from "../pokemon-entry/pokemon-entry.component";
import "./pokemon-entry-list.styles.css";

class PokemonEntryList extends Component {
  render() {
    const { pokemonList } = this.props;

    return (
      <div className="container-fluid bg-dark text-light p-5" id="list">
        <table className="table table-dark table-striped tabled-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pic</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Types</th>
              <th className="d-none d-lg-table-cell">Abilities</th>
              <th className="d-none d-xl-table-cell justify-content-center">
                HP
              </th>
              <th className="d-none d-xl-table-cell justify-content-center">
                Att
              </th>
              <th className="d-none d-xl-table-cell justify-content-center">
                Def
              </th>
              <th className="d-none d-xl-table-cell justify-content-center">
                Sp Att
              </th>
              <th className="d-none d-xl-table-cell justify-content-center">
                Sp Def
              </th>
              <th className="d-none d-xl-table-cell justify-content-center">
                Speed
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon) => (
              <PokemonEntry
                key={pokemon.id}
                id={pokemon.id}
                sprite={pokemon.sprite}
                name={pokemon.name}
                types={pokemon.types}
                abilities={pokemon.abilities}
                stats={pokemon.stats}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PokemonEntryList;
