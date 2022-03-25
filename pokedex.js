'use strict';

const apiPrefix = 'https://pokeapi.co/api/v2/';

// Card Background Colors
const grassType = 'rgb(192, 228, 181)',
  fireType = 'rgb(193,140,135)',
  waterType = 'rgb(86,149,232)',
  bugType = 'rgb(123,154,86)',
  normalType = 'rgb(185,192,228)',
  flyingType = 'rgb(168,187,242)',
  electricType = 'rgb(217,217,183)',
  groundType = 'rgb(201,166,118)',
  rockType = 'rgb(138,78,32)',
  fightingType = 'rgb(171,106,114)',
  psychicType = 'rgb(210,126,139)',
  ghostType = 'rgb(120,63,134)',
  dragonType = 'rgb(49,105,185)',
  iceType = 'rgb(154,218,235)';

// Stat Bar Colors
const lt55 = 'rgb(212, 118, 17)',
  lt65 = 'rgb(212, 164, 17)',
  lt75 = 'rgb(212,196,17)',
  lt85 = 'rgb(212,212,17)',
  lt95 = 'rgb(203,212,17)',
  lt100 = 'rgb(180, 212, 17)',
  lt110 = 'rgb(160,212,17)',
  lt120 = 'rgb(134,212,17)',
  lt130 = 'rgb(98,212,17)',
  gt130 = 'rgb(43,212,17)';
let test = [];

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

    // HP Bar
    if (this.hp < 55) {
      this.hpBar = lt55;
    } else if (this.hp < 65) {
      this.hpBar = lt65;
    } else if (this.hp < 75) {
      this.hpBar = lt75;
    } else if (this.hp < 85) {
      this.hpBar = lt85;
    } else if (this.hp < 95) {
      this.hpBar = lt95;
    } else if (this.hp < 100) {
      this.hpBar = lt100;
    } else if (this.hp < 110) {
      this.hpBar = lt110;
    } else if (this.hp < 120) {
      this.hpBar = lt120;
    } else if (this.hp > 130) {
      this.hpBar = lt130;
    } else if (this.hp >= 130) {
      this.hpBar = gt130;
    }

    // Att Bar
    if (this.att < 55) {
      this.attBar = lt55;
    } else if (this.att < 65) {
      this.attBar = lt65;
    } else if (this.att < 75) {
      this.attBar = lt75;
    } else if (this.att < 85) {
      this.attBar = lt85;
    } else if (this.att < 95) {
      this.attBar = lt95;
    } else if (this.att < 100) {
      this.attBar = lt100;
    } else if (this.att < 110) {
      this.attBar = lt110;
    } else if (this.att < 120) {
      this.attBar = lt120;
    } else if (this.att > 130) {
      this.attBar = lt130;
    } else if (this.att >= 130) {
      this.attBar = gt130;
    }

    // Def Bar
    if (this.def < 55) {
      this.defBar = lt55;
    } else if (this.def < 65) {
      this.defBar = lt65;
    } else if (this.def < 75) {
      this.defBar = lt75;
    } else if (this.def < 85) {
      this.defBar = lt85;
    } else if (this.def < 95) {
      this.defBar = lt95;
    } else if (this.def < 100) {
      this.defBar = lt100;
    } else if (this.def < 110) {
      this.defBar = lt110;
    } else if (this.def < 120) {
      this.defBar = lt120;
    } else if (this.def > 130) {
      this.defBar = lt130;
    } else if (this.def >= 130) {
      this.defBar = gt130;
    }

    // Sp Att Bar
    if (this.spAtt < 55) {
      this.spAttBar = lt55;
    } else if (this.spAtt < 65) {
      this.spAttBar = lt65;
    } else if (this.spAtt < 75) {
      this.spAttBar = lt75;
    } else if (this.spAtt < 85) {
      this.spAttBar = lt85;
    } else if (this.spAtt < 95) {
      this.spAttBar = lt95;
    } else if (this.spAtt < 100) {
      this.spAttBar = lt100;
    } else if (this.spAtt < 110) {
      this.spAttBar = lt110;
    } else if (this.spAtt < 120) {
      this.spAttBar = lt120;
    } else if (this.spAtt > 130) {
      this.spAttBar = lt130;
    } else if (this.spAtt >= 130) {
      this.spAttBar = gt130;
    }

    // Sp Def Bar
    if (this.spDef < 55) {
      this.spDefBar = lt55;
    } else if (this.spDef < 65) {
      this.spDefBar = lt65;
    } else if (this.spDef < 75) {
      this.spDefBar = lt75;
    } else if (this.spDef < 85) {
      this.spDefBar = lt85;
    } else if (this.spDef < 95) {
      this.spDefBar = lt95;
    } else if (this.spDef < 100) {
      this.spDefBar = lt100;
    } else if (this.spDef < 110) {
      this.spDefBar = lt110;
    } else if (this.spDef < 120) {
      this.spDefBar = lt120;
    } else if (this.spDef > 130) {
      this.spDefBar = lt130;
    } else if (this.spDef >= 130) {
      this.spDefBar = gt130;
    }

    // Speed Bar
    if (this.speed < 55) {
      this.speedBar = lt55;
    } else if (this.speed < 65) {
      this.speedBar = lt65;
    } else if (this.speed < 75) {
      this.speedBar = lt75;
    } else if (this.speed < 85) {
      this.speedBar = lt85;
    } else if (this.speed < 95) {
      this.speedBar = lt95;
    } else if (this.speed < 100) {
      this.speedBar = lt100;
    } else if (this.speed < 110) {
      this.speedBar = lt110;
    } else if (this.speed < 120) {
      this.speedBar = lt120;
    } else if (this.speed > 130) {
      this.speedBar = lt130;
    } else if (this.speed >= 130) {
      this.speedBar = gt130;
    }
  }

  getString() {
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

async function getPokemon(range, arr) {
  for (let id = range[0]; id <= range[1]; id++) {
    getJSON(apiPrefix + `pokemon/${id}`).then((pokemon) => {
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
      arr.push(entry);
    });
  }
}

function getPic(pokemon) {
  return pokemon.sprites.other['official-artwork'].front_default;
}

function addCSS(pokemon) {
  let style = document.createElement('style');
  let bgColor = '';
  switch (pokemon.types.t1.name) {
    case 'grass':
      bgColor = grassType;
      break;
    case 'fire':
      bgColor = fireType;
      break;
    case 'water':
      bgColor = waterType;
      break;
    case 'bug':
      bgColor = bugType;
      break;
    case 'normal':
      bgColor = normalType;
      break;
    case 'electric':
      bgColor = electricType;
      break;
    case 'ground':
      bgColor = groundType;
      break;
    case 'rock':
      bgColor = rockType;
      break;
    case 'fighting':
      bgColor = fightingType;
      break;
    case 'psychic':
      bgColor = psychicType;
      break;
    case 'ghost':
      bgColor = ghostType;
      break;
    case 'dragon':
      bgColor = dragonType;
      break;
    case 'ice':
      bgColor = iceType;
      break;
    default:
      bgColor = grassType;
  }
  let css = new pokeStats(pokemon.id, bgColor, pokemon.stats);
  style.textContent = css.getString();
  let head = document.head;
  head.appendChild(style);
}

function formatID(id) {
  let numDigits = 1;
  if (id > 10 && id < 100) {
    numDigits = 2;
  } else if (id >= 100) {
    numDigits = 3;
  }

  if (numDigits == 1) {
    return `00${id}`;
  } else if (numDigits == 2) {
    return `0${id}`;
  } else {
    return id;
  }
}

function updateNameType(elem, pokemon) {
  elem.classList.add('row');

  // Create Name/ID element
  let name = document.createElement('h5');
  name.classList.add('name', 'col-7');
  let id = formatID(pokemon.id);
  name.textContent = `#${id} ${capital(pokemon.name)}`;

  // Create types Element
  let types = document.createElement('div');
  types.classList.add('types', 'col');

  // Create Type 1 Image
  let t1 = document.createElement('img');
  t1.classList.add('type-pic');
  t1.alt = pokemon.types.t1.name;
  t1.src = `images/types/${pokemon.types.t1.name}.png`;
  types.appendChild(t1);

  // Create Type 2 Image if there is 2 types
  if (pokemon.types.t2) {
    let t2 = document.createElement('img');
    t2.classList.add('type-pic');
    t2.alt = pokemon.types.t2.name;
    t2.src = `images/types/${pokemon.types.t2.name}.png`;
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
  abilityName.classList.add('col-3', 'ability-name');
  abilityName.textContent = 'Abilities:';
  elem.appendChild(abilityName);

  // Get number of abilities
  let len = pokemon.abilities.length;

  // Create an element for each ability and add it to the element
  for (let i = 0; i < len; i++) {
    let ability = document.createElement('h5');
    ability.classList.add('col', 'ability');
    ability.textContent = capital(pokemon.abilities[i].ability.name);
    elem.appendChild(ability);
  }
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
  let hpRow = document.createElement('div');
  hpRow.classList.add('row', 'stat');
  let attRow = document.createElement('div');
  attRow.classList.add('row', 'stat');
  let defRow = document.createElement('div');
  defRow.classList.add('row', 'stat');
  let spAttRow = document.createElement('div');
  spAttRow.classList.add('row', 'stat');
  let spDefRow = document.createElement('div');
  spDefRow.classList.add('row', 'stat');
  let speedRow = document.createElement('div');
  speedRow.classList.add('row', 'stat');

  // Add the Info to the Stat Rows

  // HP Row
  let hpText = document.createElement('h5');
  hpText.classList.add('col-4', 'stat-text');
  hpText.textContent = 'HP';
  hpRow.appendChild(hpText);
  let hpBar = document.createElement('div');
  hpBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'hp-bar');
  hpRow.appendChild(hpBar);
  let hpNum = document.createElement('p5');
  hpNum.classList.add('stat-num');
  hpNum.textContent = pokemon.stats.hp;
  hpRow.appendChild(hpNum);

  // Att Row
  let attText = document.createElement('h5');
  attText.classList.add('col-4', 'stat-text');
  attText.textContent = 'Att';
  attRow.appendChild(attText);
  let attBar = document.createElement('div');
  attBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'att-bar');
  attRow.appendChild(attBar);
  let attNum = document.createElement('p5');
  attNum.classList.add('stat-num');
  attNum.textContent = pokemon.stats.att;
  attRow.appendChild(attNum);

  // Def Row
  let defText = document.createElement('h5');
  defText.classList.add('col-4', 'stat-text');
  defText.textContent = 'Def';
  defRow.appendChild(defText);
  let defBar = document.createElement('div');
  defBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'def-bar');
  defRow.appendChild(defBar);
  let defNum = document.createElement('p5');
  defNum.classList.add('stat-num');
  defNum.textContent = pokemon.stats.def;
  defRow.appendChild(defNum);

  // Sp Att Row
  let spAttText = document.createElement('h5');
  spAttText.classList.add('col-4', 'stat-text');
  spAttText.textContent = 'Sp Att';
  spAttRow.appendChild(spAttText);
  let spAttBar = document.createElement('div');
  spAttBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'spatt-bar');
  spAttRow.appendChild(spAttBar);
  let spAttNum = document.createElement('p5');
  spAttNum.classList.add('stat-num');
  spAttNum.textContent = pokemon.stats.spAtt;
  spAttRow.appendChild(spAttNum);

  // Sp Def Row
  let spDefText = document.createElement('h5');
  spDefText.classList.add('col-4', 'stat-text');
  spDefText.textContent = 'Sp Def';
  spDefRow.appendChild(spDefText);
  let spDefBar = document.createElement('div');
  spDefBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'spdef-bar');
  spDefRow.appendChild(spDefBar);
  let spDefNum = document.createElement('p5');
  spDefNum.classList.add('stat-num');
  spDefNum.textContent = pokemon.stats.spDef;
  spDefRow.appendChild(spDefNum);

  // Speed Row
  let speedText = document.createElement('h5');
  speedText.classList.add('col-4', 'stat-text');
  speedText.textContent = 'Speed';
  speedRow.appendChild(speedText);
  let speedBar = document.createElement('div');
  speedBar.classList.add('col-8', 'container-fluid', 'stat-bar', 'speed-bar');
  speedRow.appendChild(speedBar);
  let speedNum = document.createElement('p5');
  speedNum.classList.add('stat-num');
  speedNum.textContent = pokemon.stats.speed;
  speedRow.appendChild(speedNum);

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

document.getElementById('test-button').addEventListener('click', function () {
  getPokemon([1, 151], test).then(function () {
    sortArr(test);
    console.log(test);
    for (let i = 0; i < test.length; i++) {
      console.log(test[i].name);
      createCard(test[i]);
    }
  });
});

document.getElementById('gen1-btn').addEventListener('click', function () {
  getPokemon([1, 151], test).then(function () {
    sortArr(test);
    console.log(test);
    for (let i = 0; i < test.length; i++) {
      console.log(test[i].name);
      createCard(test[i]);
    }
  });
});

document.getElementById('gen2-btn').addEventListener('click', function () {
  let test = [];
  removeAllChildNodes(document.getElementById('cards'));
  getPokemon([152, 251], test).then(function () {
    sortArr(test);
    for (let i = 0; i < test.length; i++) {
      console.log(test[i].name);
      createCard(test[i]);
    }
  });
});
