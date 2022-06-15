import { Component } from "react";

import Card from "../card/card.component.jsx";

class CardList extends Component {
  render() {
    const { pokemonList } = this.props;
    return (
      <div>
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            thumbnail={pokemon.thumbnail}
            abilities={pokemon.abilities}
            stats={pokemon.stats}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
