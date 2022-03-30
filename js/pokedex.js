'use strict';

const apiPrefix = 'https://pokeapi.co/api/v2/';

let test = [];

function getBarColor(stat) {
  if (stat < 55) return 'rgb(212, 118, 17)';
  if (stat < 65) return 'rgb(212, 164, 17)';
  if (stat < 75) return 'rgb(212,196,17)';
  if (stat < 85) return 'rgb(212,212,17)';
  if (stat < 95) return 'rgb(203,212,17)';
  if (stat < 100) return 'rgb(180, 212, 17)';
  if (stat < 110) return 'rgb(160,212,17)';
  if (stat < 120) return 'rgb(134,212,17)';
  if (stat < 130) return 'rgb(98,212,17)';
  return 'rgb(43,212,17)';
}

class pokeStats {
  constructor(id, color, stats) {
    this.id = id;
    this.color = color;
    this.hp = stats.hp;
    this.att = stats.att;
    this.def = stats.def;
    this.spAtt = stats.spAtt;
    this.spDef = stats.spDef;
    this.speed = stats.speed;

    // Set Colors of stat bars
    this.hpBar = getBarColor(this.hp);
    this.attBar = getBarColor(this.att);
    this.defBar = getBarColor(this.def);
    this.spAttBar = getBarColor(this.spAtt);
    this.spDefBar = getBarColor(this.spDef);
    this.speedBar = getBarColor(this.speed);
  }

  getStyleContent() {
    return `#id-${this.id} {
      --card-color: ${this.color};
      --hp: ${this.hp};
      --att: ${this.att};
      --def: ${this.def};
      --spatt: ${this.spAtt};
      --spdef: ${this.spDef};
      --speed: ${this.speed};
      --hp-bar: ${this.hpBar};
      --att-bar: ${this.attBar};
      --def-bar: ${this.defBar};
      --spatt-bar: ${this.spAttBar};
      --spdef-bar: ${this.spDefBar};
      --speed-bar: ${this.speedBar};
    }`;
  }
}

// API Caller that returns JSON
async function getJSON(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

function getPic(pokemon) {
  return pokemon.sprites.other['official-artwork'].front_default;
}

function capital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getEvoChain(species) {
  let evoChain = [];
  getJSON(species).then((species) => {
    getJSON(species.evolution_chain.url).then((chain) => {
      evoChain[0] = [chain.chain.species.name, undefined];
      if (chain.chain.evolves_to.length != 0) {
        evoChain[1] = [chain.chain.evolves_to[0].species.name, chain.chain.evolves_to[0].evolution_details[0]];
        if (chain.chain.evolves_to[0].evolves_to.length != 0) {
          evoChain[2] = [
            chain.chain.evolves_to[0].evolves_to[0].species.name,
            chain.chain.evolves_to[0].evolves_to[0].evolution_details[0],
          ];
        }
      }
    });
  });
  return evoChain;
}

async function getPokemon(range) {
  let allPokemon = [];
  for (let id = range[0]; id <= range[1]; id++) {
    let pokemon = await getJSON(apiPrefix + `pokemon/${id}`);
    let entry = {
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
        speed: pokemon.stats[5].base_stat,
      },
      evoChain: getEvoChain(pokemon.species.url),
    };
    if (pokemon.types[1]) {
      entry.types.t2 = pokemon.types[1].type;
    }
    allPokemon.push(entry);
  }
  return allPokemon;
}

function getPic(pokemon) {
  return pokemon.sprites.other['official-artwork'].front_default;
}

function getBgColor(type) {
  if (type == 'grass') return 'rgb(192, 228, 181)';
  if (type == 'fire') return 'rgb(193,140,135)';
  if (type == 'water') return 'rgb(86,149,232)';
  if (type == 'bug') return 'rgb(123,154,86)';
  if (type == 'normal') return 'rgb(185,192,228)';
  if (type == 'flying') return 'rgb(168,187,242)';
  if (type == 'ghost') return 'rgb(120,63,134)';
  if (type == 'psychic') return 'rgb(210,126,139)';
  if (type == 'dark') return 'rgb(132,114,104)';
  if (type == 'poison') return 'rgb(121,106,166)';
  if (type == 'electric') return 'rgb(252,205,64)';
  if (type == 'fairy') return 'rgb(231,177,233)';
  if (type == 'rock') return 'rgb(138,78,32)';
  if (type == 'ground') return 'rgb(201,166,118)';
  if (type == 'steel') return 'rgb(147,148,158)';
  if (type == 'ice') return 'rgb(154,218,235)';
  if (type == 'dragon') return 'rgb(49,105,185)';
  if (type == 'fighting') return 'rgb(171,106,114)';
}

function addCSS(pokemon) {
  let style = document.createElement('style');
  let bgColor = getBgColor(pokemon.types.t1.name);
  let css = new pokeStats(pokemon.id, bgColor, pokemon.stats);
  style.textContent = css.getStyleContent();
  let head = document.head;
  head.appendChild(style);
}

function formatID(id) {
  if (id < 10) return `00${id}`;
  if (id < 100) return `0${id}`;
  return id;
}

function updateNameType(elem, pokemon) {
  elem.classList.add('row');

  // Create Name/ID element
  let name = document.createElement('h5');
  name.classList.add('name', 'col-9');
  let id = formatID(pokemon.id);
  name.textContent = `#${id} ${capital(pokemon.name)}`;

  // Create types Element
  let types = document.createElement('div');
  types.classList.add('types', 'col-auto');

  // Create Type 1 Image
  let t1 = document.createElement('img');
  t1.classList.add('type-pic');
  t1.alt = pokemon.types.t1.name;
  t1.src = `../images/types/${pokemon.types.t1.name}.png`;
  types.appendChild(t1);

  // Create Type 2 Image if there is 2 types
  if (pokemon.types.t2) {
    let t2 = document.createElement('img');
    t2.classList.add('type-pic');
    t2.alt = pokemon.types.t2.name;
    t2.src = `../images/types/${pokemon.types.t2.name}.png`;
    types.appendChild(t2);
  }

  // Add the Name and Type Elements to the row
  elem.appendChild(name);
  elem.appendChild(types);
}

function updateEvoChain(elem, pokemon) {
  elem.classList.add('row', 'evo-chain');

  // For every entry in evoChain create an Image and add it to the element
  pokemon.evoChain.forEach(function (n, i) {
    // Add arrow and level if it is not the first image
    if (i > 0) {
      let arrow = document.createElement('img');
      arrow.src = 'images/arrow.png';
      arrow.alt = 'arrow';
      arrow.classList.add('col', 'arrow');
      elem.appendChild(arrow);

      // Place level for first evo over arrow
      if (i == 1) {
        let trigger = document.createElement('h5');
        trigger.classList.add('evo-level-1');
        trigger.textContent = pokemon.evoChain[1][1].min_level;
        elem.appendChild(trigger);
      }

      // Place level for second evo over arrow
      if (i == 2) {
        let trigger = document.createElement('h5');
        trigger.classList.add('evo-level-2');
        trigger.textContent = pokemon.evoChain[i][1].min_level;
        elem.appendChild(trigger);
      }
    }

    let evoPic = document.createElement('img');
    let evoPicSource = '';
    getJSON(`${apiPrefix}pokemon/${n[0]}`).then((pokemon) => {
      evoPicSource = getPic(pokemon);
      evoPic.src = evoPicSource;
    });
    evoPic.alt = n[0];
    evoPic.classList.add('col', 'evo-pic');
    elem.appendChild(evoPic);
  });
}

function updateAbilities(elem, pokemon) {
  elem.classList.add('row', 'abilities');

  // Create text elements and add the text to them
  let abilityName = document.createElement('h4');
  abilityName.classList.add('col-auto', 'ability-name');
  abilityName.textContent = 'Abilities:';
  elem.appendChild(abilityName);

  // Get number of abilities
  let len = pokemon.abilities.length;

  // Create an element for each ability and add it to the element
  for (let i = 0; i < len; i++) {
    let ability = document.createElement('h5');
    ability.classList.add('col', 'ability');
    if (pokemon.abilities[i].is_hidden) ability.classList.add('HA');
    ability.textContent = capital(pokemon.abilities[i].ability.name);
    elem.appendChild(ability);
  }
}

function createStatRow(stat, num) {
  let row = document.createElement('div');
  row.classList.add('row', 'stat');
  let text = document.createElement('h5');
  text.classList.add('col-4', 'stat-text');
  text.textContent = stat;
  let bar = document.createElement('div');
  bar.classList.add('col-8', 'container-fluid', 'stat-bar', `${stat.toLowerCase().replace(' ', '')}-bar`);
  let statNum = document.createElement('p5');
  statNum.classList.add('stat-num');
  statNum.textContent = num;
  row.appendChild(text);
  row.appendChild(bar);
  row.appendChild(statNum);
  return row;
}

function updateStats(elem, pokemon) {
  elem.classList.add('row', 'stats');

  // Create the word Stats Element
  let statWord = document.createElement('h5');
  statWord.classList.add('col-2', 'stat-word');
  statWord.textContent = 'Stats:';
  elem.appendChild(statWord);

  // Create Stat Bars Container
  let statBars = document.createElement('div');
  statBars.classList.add('container-fluid', 'stat=bars', 'col-9');

  // Create a Row for each Stat
  let hpRow = createStatRow('HP', pokemon.stats.hp);
  let attRow = createStatRow('Att', pokemon.stats.att);
  let defRow = createStatRow('Def', pokemon.stats.def);
  let spAttRow = createStatRow('SpAtt', pokemon.stats.spAtt);
  let spDefRow = createStatRow('SpDef', pokemon.stats.spDef);
  let speedRow = createStatRow('Speed', pokemon.stats.speed);

  // Add the Rows to the Stat Bars Containers
  statBars.appendChild(hpRow);
  statBars.appendChild(attRow);
  statBars.appendChild(defRow);
  statBars.appendChild(spAttRow);
  statBars.appendChild(spDefRow);
  statBars.appendChild(speedRow);

  elem.appendChild(statBars);
}

function createCard(pokemon) {
  // Create the Card
  let card = document.createElement('div');
  card.classList.add('card', 'container', 'col-xs-12', 'col-sm-6', 'col-lg-4', 'col-xl-3');
  card.id = `id-${pokemon.id}`;

  // Create NameType Row and Populate it
  let nameType = document.createElement('div');
  updateNameType(nameType, pokemon);

  // Create Thumbnail
  let thumbnail = document.createElement('img');
  thumbnail.src = pokemon.thumbnail;
  thumbnail.alt = pokemon.name;
  thumbnail.classList.add('thumbnail');

  // // Create EvoChain Row and Populate it
  // let evoChain = document.createElement('div');
  // updateEvoChain(evoChain, pokemon);

  // Create Abilities Row and Populate it
  let abilities = document.createElement('div');
  updateAbilities(abilities, pokemon);

  // Create Stats Row and Populate it
  let stats = document.createElement('div');
  updateStats(stats, pokemon);

  // Add all the info to the Card
  card.appendChild(nameType);
  card.appendChild(thumbnail);
  // card.appendChild(evoChain);
  card.appendChild(abilities);
  card.appendChild(stats);

  // Add a style entry for the card
  addCSS(pokemon);

  // Add the Card to the Cards Container
  document.getElementById('cards').appendChild(card);
}

function sortArr(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j].id > arr[j + 1].id) {
        // If the condition is true then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clearArray(arr) {
  while (arr.length > 0) {
    arr.pop();
  }
}

// Retrieves the range for each generation of pokemon
function getGenRange(gen) {
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

// Creates the buttons that will populate the page with the pokemon
// of the selected generation
async function createGenBtns() {
  for (let i = 1; i < 9; i++) {
    let pokes = [];
    let gen = `gen${i}`;
    let range = getGenRange(gen);
    let id = `${gen}-btn`;
    let genBtn = document.getElementById(id);
    genBtn.addEventListener('click', async function () {
      removeAllChildNodes(document.getElementById('cards'));
      clearArray(pokes);
      let pokemon = await getPokemon(range);
      pokemon.forEach(function (n) {
        createCard(n);
      });
    });
  }
}

async function main() {
  let allPokemon = await getPokemon([1, 898]);
  allPokemon.forEach(function (n) {
    createCard(n);
  });
}

createGenBtns();

main();
