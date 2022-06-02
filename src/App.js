import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import CardList from "./components/card-list/card-list.component.jsx";

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemonList: [],
    };
  }

  async getPokemon() {
    let allPokemon = [];
    try {
      for (let i = 1; i < 20; i++) {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokemon = await pokemonResponse.json();
        let entry = {
          id: pokemon.id,
          name: pokemon.name,
          abilities: this.getAbilities(pokemon.abilities),
          speciesURL: pokemon.species.url,
          thumbnail: pokemon.sprites.other["official-artwork"].front_default,
          sprite: pokemon.sprites.front_default,
          types: this.getTypes(pokemon.types),
          stats: this.getStats(pokemon.stats),
        };
        allPokemon.push(entry);
      }
      return allPokemon;
    } catch (err) {
      console.log(err, `A Pokemon was not found`);
      return [];
    }
  }

  getStats(stats) {
    let arr = [];
    for (const index in stats) {
      const stat = stats[index];
      arr.push({
        name: stat.stat.name,
        value: stat.base_stat,
      });
    }
    return arr;
  }

  getAbilities(abilities) {
    let arr = [];
    for (const index in abilities) {
      const ability = abilities[index];
      arr.push({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
        url: ability.ability.url,
      });
    }
    return arr;
  }

  getTypes(types) {
    let arr = [];
    for (const index in types) {
      arr.push(types[index].type.name);
    }
    return arr;
  }

  async componentDidMount() {
    let allPokemon = await this.getPokemon();
    this.setState(() => {
      return { pokemonList: allPokemon };
    });
  }

  render() {
    return (
      <div className="App">
        <CardList pokemonList={this.state.pokemonList} />
      </div>
    );
  }
}

export default App;
