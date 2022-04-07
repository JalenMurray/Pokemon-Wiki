'use strict';

async function getJSON(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

export async function getPokemon(range) {
  let allPokemon = [];
  for (let id = range[0]; id <= range[1]; id++) {
    let pokemon = await getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let entry = {
      id: id,
      name: pokemon.name,
      speciesURL: pokemon.species.url,
      thumbnail: pokemon.sprites.other['official-artwork'].front_default,
      sprite: pokemon.sprites.front_default,
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
        speed: pokemon.stats[5].base_stat,
      },
    };
    if (pokemon.types[1]) entry.types.t2 = pokemon.types[1].type;
    allPokemon.push(entry);
  }
  return allPokemon;
}

export function capital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatID(id) {
  if (id < 10) return `00${id}`;
  if (id < 100) return `0${id}`;
  return id;
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function clearArray(arr) {
  while (arr.length > 0) {
    arr.pop();
  }
}

// Retrieves the range for each generation of pokemon
export function getGenRange(gen) {
  if (gen == 'gen1') return [1, 151];
  if (gen == 'gen2') return [152, 251];
  if (gen == 'gen3') return [252, 386];
  if (gen == 'gen4') return [387, 493];
  if (gen == 'gen5') return [494, 649];
  if (gen == 'gen6') return [650, 721];
  if (gen == 'gen7') return [722, 809];
  if (gen == 'gen8') return [810, 898];
  return [1, 905];
}

export function createHTMLString(elems) {
  let str = '';
  elems.forEach(function (n) {
    str += n;
  });
  return str;
}

function sortByStat(pokes, stat, direction) {
  if (direction == 'up') {
    pokes.sort(function (x, y) {
      if (x.stats[stat] < y.stats[stat]) return -1;
      if (x.stats[stat] > y.stats[stat]) return 1;
      return 0;
    });
  } else {
    return pokes.sort(function (x, y) {
      if (x.stats[stat] < y.stats[stat]) return 1;
      if (x.stats[stat] > y.stats[stat]) return -1;
      return 0;
    });
  }
}

export function sortPokes(pokes, by, direction) {
  if (by == 'name') {
    if (direction == 'up') {
      pokes.sort(function (x, y) {
        if (x.name < y.name) return -1;
        if (x.name > y.name) return 1;
        return 0;
      });
    } else {
      return pokes.sort(function (x, y) {
        if (x.name < y.name) return 1;
        if (x.name > y.name) return -1;
        return 0;
      });
      console.log(pokes);
    }
  }
  if (by == 'hp') return sortByStat(pokes, 'hp', direction);
  if (by == 'att') return sortByStat(pokes, 'att', direction);
  if (by == 'def') return sortByStat(pokes, 'def', direction);
  if (by == 'spAtt') return sortByStat(pokes, 'spAtt', direction);
  if (by == 'spDef') return sortByStat(pokes, 'spDef', direction);
  if (by == 'speed') return sortByStat(pokes, 'speed', direction);
  if (by == 'ability') {
    if (direction == 'up') {
      pokes.sort(function (x, y) {
        if (x.abilities[0].ability.name < y.abilities[0].ability.name) return -1;
        if (x.abilities[0].ability.name > y.abilities[0].ability.name) return 1;
        if (x.abilities[1] && y.abilities[1]) {
          if (x.abilities[1].ability.name < y.abilities[1].ability.name) return -1;
          if (x.abilities[1].ability.name > y.abilities[1].ability.name) return 1;
          return 0;
        }
      });
    } else {
      return pokes.sort(function (x, y) {
        if (x.abilities[0].ability.name < y.abilities[0].ability.name) return 1;
        if (x.abilities[0].ability.name > y.abilities[0].ability.name) return -1;
        return 0;
      });
    }
  }
  if (by == 'type') {
    if (direction == 'up') {
      pokes.sort(function (x, y) {
        if (x.types.t1.name < y.types.t1.name) return -1;
        if (x.types.t1.name > y.types.t1.name) return 1;
        if (x.types.t2 && y.types.t2) {
          if (x.types.t2.name < y.types.t2.name) return -1;
          if (x.types.t2.name > y.types.t2.name) return 1;
          return 0;
        }
        if (x.types.t2 && !y.types.t2) return 1;
        if (!x.types.t2 && y.types.t2) return -1;
        return 0;
      });
    } else {
      return pokes.sort(function (x, y) {
        if (x.types.t1.name < y.types.t1.name) return 1;
        if (x.types.t1.name > y.types.t1.name) return -1;
        if (x.types.t2 && y.types.t2) {
          if (x.types.t2.name < y.types.t2.name) return 1;
          if (x.types.t2.name > y.types.t2.name) return -1;
          return 0;
        }
        if (x.types.t2 && !y.types.t2) return -1;
        if (!x.types.t2 && y.types.t2) return 1;
        return 0;
      });
    }
  }
}
