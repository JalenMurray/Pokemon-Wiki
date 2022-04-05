'use strict';
let pokemon = [];

class Content {
  constructor(content) {
    this.content = content;
  }
}

class Attribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Element {
  constructor(type, attributes, content) {
    this.type = type;
    this.attributes = attributes;
    this.content = content;
  }
}

function htmlElementPrototypes() {
  // Returns string for the HTML Content
  Content.prototype.toString = function () {
    return this.content.length > 0 ? this.content.join('') : '';
  };

  // Returns string for an HTML Attributes
  Attribute.prototype.toString = function () {
    return `${this.name}="${this.value}"`;
  };

  // Returns string for the attributes
  Element.prototype.attString = function () {
    return this.attributes.length > 0 ? ` ${this.attributes.join(' ')}` : '';
  };

  // Returns the string for an HTML Element
  Element.prototype.toString = function () {
    return `<${this.type}${this.attString()}>${this.content}</${this.type}>`;
  };

  // Adds classes to the Element
  Element.prototype.addClass = function (classStr) {
    let classAdded = false;
    this.attributes.forEach(function (n) {
      if (n.name == 'class') {
        n.value += ` ${classStr}`;
        classAdded = true;
      }
    });
    if (!classAdded) this.attributes.push(new Attribute('class', classStr));
  };
}

htmlElementPrototypes();

function getClasses(classes) {
  return new Attribute('class', classes);
}

function getContent(content) {
  return new Content(content);
}

async function getJSON(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

async function getPokemon(range) {
  let allPokemon = [];
  for (let id = range[0]; id <= range[1]; id++) {
    let pokemon = await getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let entry = {
      id: id,
      name: pokemon.name,
      speciesURL: pokemon.species.url,
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

function capital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatID(id) {
  if (id < 10) return `00${id}`;
  if (id < 100) return `0${id}`;
  return id;
}

function getIdElement(id) {
  let classes = getClasses('id'),
    content = getContent([formatID(id)]);

  return new Element('h5', [classes], content);
}

function getSpriteElement(source, name) {
  let classes = getClasses('sprite'),
    src = new Attribute('src', source),
    alt = new Attribute('alt', name);
  return new Element('img', [classes, src, alt], []);
}

function getNameElement(name) {
  let classes = getClasses('name col'),
    content = getContent([capital(name)]);
  return new Element('h5', [classes], content);
}

function getTypeElement(type) {
  let typeClasses = getClasses('type'),
    typeTextClasses = getClasses(`type-text ${type.name}`),
    typeTextContent = getContent([capital(type.name)]),
    typeText = new Element('h5', [typeTextClasses], typeTextContent);
  return new Element('div', [typeClasses], getContent([typeText]));
}

function getTypesElement(types) {
  let classes = getClasses('types row'),
    t1 = getTypeElement(types.t1);

  let content = types.t2 ? new Content([t1, getTypeElement(types.t2)]) : new Content([t1]);

  return new Element('div', [classes], content);
}

function getAbilityElement(ability) {
  let abilityClasses = new Attribute('class', 'ability'),
    abilityNameClasses = new Attribute('class', 'ability-name'),
    abilityNameContent = new Content([capital(ability.ability.name)]),
    abilityName = new Element('h5', [abilityNameClasses], abilityNameContent);

  if (ability.is_hidden) abilityName.addClass('ha');

  return new Element('div', [abilityClasses], new Content([abilityName]));
}

function getAbilitiesElement(abilities) {
  let classes = new Attribute('class', 'abilities d-flex'),
    ability1 = getAbilityElement(abilities[0]);

  let content = abilities[1] ? new Content([ability1, getAbilityElement(abilities[1])]) : new Content([ability1]);

  return new Element('div', [classes], content);
}

function getStatElement(stat) {
  let classes = getClasses('stat-num'),
    content = getContent([stat]),
    statNum = new Element('h5', [classes], content);
  return new Element('td', [getClasses('d-none d-xl-table-cell')], getContent([statNum]));
}

function createHeader() {
  let idHeader = new Element('th', [], getContent(['ID'])),
    picHeader = new Element('th', [], getContent(['Pic'])),
    nameHeader = new Element('th', [], getContent(['Name'])),
    typeHeader = new Element('th', [getClasses('d-none d-md-table-cell')], getContent(['Types'])),
    abilityHeader = new Element('th', [getClasses('d-none d-lg-table-cell')], getContent(['Abilities'])),
    statClasses = getClasses('d-none d-xl-table-cell'),
    hpHeader = new Element('th', [statClasses], getContent(['HP'])),
    attHeader = new Element('th', [statClasses], getContent(['Att'])),
    defHeader = new Element('th', [statClasses], getContent(['Def'])),
    spAttHeader = new Element('th', [statClasses], getContent(['Sp Att'])),
    spDefHeader = new Element('th', [statClasses], getContent(['Sp Def'])),
    speedHeader = new Element('th', [statClasses], getContent(['Speed'])),
    row = new Element(
      'tr',
      [],
      getContent([
        idHeader,
        picHeader,
        nameHeader,
        typeHeader,
        abilityHeader,
        hpHeader,
        attHeader,
        defHeader,
        spAttHeader,
        spDefHeader,
        speedHeader,
      ])
    );
  return new Element('thead', [], getContent([row]));
}

function createEntry(pokemon) {
  // Create ID Element
  let id = getIdElement(pokemon.id),
    idCell = new Element('th', [], getContent([id]));

  // Create Sprite Element
  let sprite = getSpriteElement(pokemon.sprite, pokemon.name),
    spriteCell = new Element('td', [], getContent([sprite]));

  // Create Name Element
  let name = getNameElement(pokemon.name),
    nameCell = new Element('td', [], getContent([name]));

  // Create Types Element
  let types = getTypesElement(pokemon.types),
    typesCell = new Element('td', [getClasses('d-none d-md-table-cell')], getContent([types]));

  // Create Abilities Element
  let abilities = getAbilitiesElement(pokemon.abilities),
    abilitiesCell = new Element('td', [getClasses('d-none d-lg-table-cell')], getContent([abilities]));

  // Create Stats Element
  let hp = getStatElement(pokemon.stats.hp),
    att = getStatElement(pokemon.stats.att),
    def = getStatElement(pokemon.stats.def),
    spAtt = getStatElement(pokemon.stats.spAtt),
    spDef = getStatElement(pokemon.stats.spDef),
    speed = getStatElement(pokemon.stats.speed);

  // Create Entry
  let entryId = new Attribute('id', pokemon.id),
    content = getContent([idCell, spriteCell, nameCell, typesCell, abilitiesCell, hp, att, def, spAtt, spDef, speed]);

  return new Element('tr', [entryId], content);
}

function createHTMLString(elems) {
  let str = '';
  elems.forEach(function (n) {
    str += n;
  });
  return str;
}

async function main() {
  let entries = [];
  pokemon = await getPokemon([1, 898]);
  pokemon.forEach(function (n) {
    let entry = createEntry(n);
    entries.push(entry);
  });

  let header = createHeader(),
    body = new Element('tbody', [], getContent(entries));

  document.getElementById('loading').classList.add('d-none');
  document.getElementById('entries').innerHTML = createHTMLString([header, body]);
}

main();
