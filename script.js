'use strict';

const apiPrefix = 'https://pokeapi.co/api/v2/';
let test = {};

// API Caller that returns JSON
async function getJSON(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

async function getPokemon(range, obj) {
  for (let id = range[0]; id <= range[1]; id++) {
    getJSON(apiPrefix + `pokemon/${id}`).then((pokemon) => {
      obj[id] = {
        id: id,
        name: pokemon.name,
        speciesURL: pokemon.species.url,
        thumbnail: pokemon.sprites.other['official-artwork'].front_default,
        abilities: pokemon.abilities,
        types: {
          t1: pokemon.types[0].type,
        },
        stats: {
          hp: pokemon.stats[0].base_stat,
          att: pokemon.stats[1].base_stat,
          def: pokemon.stats[2].base_stat,
          spAtt: pokemon.stats[3].base_stat,
          spDef: pokemon.stats[4].base_stat,
          spd: pokemon.stats[5].base_stat,
        },
      };
      if (pokemon.types[1]) {
        obj[id].types.t2 = pokemon.types[1].type;
      }
    });
  }
}

function createCard(pokemon) {
  let card = document.createElement('div');
  let thumbnail = document.createElement('img');
  thumbnail.source = pokemon.thumbnail;
  card.classList.add('card');
  card.appendChild(thumbnail);
  document.getElementById('cards').appendChild(card);
}
