'use strict';

const apiPrefix = 'https://pokeapi.co/api/v2/';
let test = [];

class htmlContent {
  constructor(content) {
    this.content = content;
  }
}

class htmlAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class htmlElement {
  constructor(type, attributes, content) {
    this.type = type;
    this.attributes = attributes;
    this.content = content;
  }
}

function htmlElementPrototypes() {
  // Returns string for the HTML Content
  htmlContent.prototype.toString = function () {
    return this.content.length > 0 ? this.content.join('') : '';
  };

  // Returns string for an HTML Attributes
  htmlAttribute.prototype.toString = function () {
    return `${this.name}="${this.value}"`;
  };

  // Returns string for the attributes
  htmlElement.prototype.attString = function () {
    return this.attributes.length > 0 ? ` ${this.attributes.join(' ')}` : '';
  };

  // Returns the string for an HTML Element
  htmlElement.prototype.toString = function () {
    return `<${this.type}${this.attString()}>${this.content}</${this.type}>`;
  };

  // Adds classes to the Element
  htmlElement.prototype.addClass = function (classStr) {
    let classAdded = false;
    this.attributes.forEach(function (n) {
      if (n.name == 'class') {
        n.value += ` ${classStr}`;
        classAdded = true;
      }
    });
    if (!classAdded) this.attributes.push(new htmlAttribute('class', classStr));
  };
}

htmlElementPrototypes();

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
    };
    if (pokemon.types[1]) entry.types.t2 = pokemon.types[1].type;
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

function getCSS(pokemon) {
  let bgColor = getBgColor(pokemon.types.t1.name),
    stats = new pokeStats(pokemon.id, bgColor, pokemon.stats),
    styleContent = new htmlContent([stats.getStyleContent()]);

  return new htmlElement('style', [], styleContent);
}

function formatID(id) {
  if (id < 10) return `00${id}`;
  if (id < 100) return `0${id}`;
  return id;
}

function createType(typeName) {
  let src = new htmlAttribute('src', `../images/types/${typeName}.png`),
    alt = new htmlAttribute('alt', typeName),
    classes = new htmlAttribute('class', 'type-pic'),
    attributes = [src, alt, classes],
    type = new htmlElement('img', attributes, []);

  return type;
}

function createTypes(types) {
  let classes = new htmlAttribute('class', 'col-3 types'),
    content = new htmlContent(types);

  return new htmlElement('div', [classes], content);
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

function createAbility(ability) {
  let classes = new htmlAttribute('class', 'col ability'),
    abilityElem = new htmlElement('h5', [classes], new htmlContent([capital(ability.ability.name)]));

  if (ability.is_hidden) abilityElem.addClass('HA');

  return abilityElem;
}

function createStatRow(statName, statNum) {
  let barClasses = new htmlAttribute(
      'class',
      `col-8 container-fluid stat-bar ${statName.toLowerCase().replace(' ', '')}-bar`
    ),
    textClasses = new htmlAttribute('class', 'col-4 stat-text'),
    textContent = new htmlContent([statName]),
    numClasses = new htmlAttribute('class', 'stat-num'),
    numContent = new htmlContent([statNum]),
    bar = new htmlElement('div', [barClasses], []),
    text = new htmlElement('h5', [textClasses], textContent),
    num = new htmlElement('p5', [numClasses], numContent),
    rowClasses = new htmlAttribute('class', 'row stat');

  return new htmlElement('div', [rowClasses], new htmlContent([text, num, bar]));
}

function createNameType(pokemon) {
  let id = formatID(pokemon.id),
    nameTypeClasses = new htmlAttribute('class', 'row'),
    nameClasses = new htmlAttribute('class', 'name col-9'),
    nameContent = new htmlContent([`#${id} ${capital(pokemon.name)}`]),
    name = new htmlElement('h5', [nameClasses], nameContent),
    t1 = createType(pokemon.types.t1.name),
    t2,
    typesArr = [t1];

  if (pokemon.types.t2) typesArr.push(createType(pokemon.types.t2.name));

  let types = createTypes(typesArr);
  return new htmlElement('div', [nameTypeClasses], new htmlContent([name, types]));
}

function createThumbnail(pokemon) {
  let thumbnailSrc = new htmlAttribute('src', pokemon.thumbnail),
    thumbnailAlt = new htmlAttribute('alt', pokemon.name),
    thumbnailClasses = new htmlAttribute('class', 'thumbnail'),
    thumbnailAttributes = [thumbnailSrc, thumbnailAlt, thumbnailClasses],
    thumbnail = new htmlElement('img', thumbnailAttributes, []);

  return thumbnail;
}

function createAbilities(pokemon) {
  let a1 = createAbility(pokemon.abilities[0]),
    a2,
    aTextClasses = new htmlAttribute('class', 'col-auto ability-name'),
    aTextContent = new htmlContent(['Abilities']),
    aText = new htmlElement('h4', [aTextClasses], aTextContent),
    abilitiesClasses = new htmlAttribute('class', 'row abilities'),
    abilities;

  if (pokemon.abilities[1]) a2 = createAbility(pokemon.abilities[1]);

  a2
    ? (abilities = new htmlElement('div', [abilitiesClasses], new htmlContent([aText, a1, a2])))
    : (abilities = new htmlElement('div', [abilitiesClasses], new htmlContent([aText, a1])));

  return abilities;
}

function createStats(pokemon) {
  // Create the word Stats Element
  let textContent = new htmlContent(['Stats:']),
    textClasses = new htmlAttribute('class', 'col-2 stat-word'),
    text = new htmlElement('h5', [textClasses], textContent);

  // Create a Row for each Stat
  let hpRow = createStatRow('HP', pokemon.stats.hp);
  let attRow = createStatRow('Att', pokemon.stats.att);
  let defRow = createStatRow('Def', pokemon.stats.def);
  let spAttRow = createStatRow('SpAtt', pokemon.stats.spAtt);
  let spDefRow = createStatRow('SpDef', pokemon.stats.spDef);
  let speedRow = createStatRow('Speed', pokemon.stats.speed);

  // Create Stat Bars Container
  let statBarsContent = new htmlContent([hpRow, attRow, defRow, spAttRow, spDefRow, speedRow]),
    statBarsClasses = new htmlAttribute('class', 'container-fluid stat-bars col-9'),
    statBars = new htmlElement('div', [statBarsClasses], statBarsContent);

  // Create Stats Container
  let statContent = new htmlContent([text, statBars]),
    statClasses = new htmlAttribute('class', 'stats row');

  return new htmlElement('div', [statClasses], statContent);
}

function createCard(pokemon) {
  // Create NameType Row
  let nameType = createNameType(pokemon);

  // Create Thumbnail
  let thumbnail = createThumbnail(pokemon);

  // Create Abilities Row
  let abilities = createAbilities(pokemon);

  // Create Stats Row
  let stats = createStats(pokemon);

  // Create htmlContent that holds all the cards information
  let cardContent = new htmlContent([nameType, thumbnail, abilities, stats]);

  // Create the Card
  let cardClasses = new htmlAttribute('class', 'card container col-xs-12 col-sm-6 col-lg-4 col-xl-3'),
    cardId = new htmlAttribute('id', `id-${pokemon.id}`);

  return new htmlElement('div', [cardClasses, cardId], cardContent);
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
    let cards = [],
      css = [];
    genBtn.addEventListener('click', async function () {
      removeAllChildNodes(document.getElementById('cards'));
      clearArray(pokes);
      let pokemon = await getPokemon(range);
      pokemon.forEach(function (n) {
        cards.push(createCard(n));
        css.push(getCSS(n));
      });
      document.head.innerHTML += createHTMLString(css);
      document.getElementById('cards').innerHTML += createHTMLString(cards);
    });
  }
}

function createBaseHTML(pokemon) {
  var fs = require('fs');

  var htmlContent = '<html>Whatever</html>';

  fs.writeFile('/my-page.html', htmlContent, (error) => {
    /* handle error */
  });
}

function createHTMLString(elems) {
  let str = '';
  elems.forEach(function (n) {
    str += n;
  });
  return str;
}

async function main() {
  let cards = [],
    css = [];
  createGenBtns();
  test = await getPokemon([1, 898]);
  test.forEach(function (n) {
    cards.push(createCard(n));
    css.push(getCSS(n));
  });
  document.head.innerHTML += createHTMLString(css);
  let htmlString = createHTMLString(cards);

  document.getElementById('loading').classList.add('d-none');
  document.getElementById('cards').innerHTML += createHTMLString(cards);
}

main();
