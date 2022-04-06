'use strict';
let pokemon = [];

import { createElement } from './modules/htmlUtils.js';
import { getPokemon, formatID, capital } from './modules/Utils.js';

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

function getTypeElement(type) {
  let text = createElement('h5', `type-text ${type.name}`, [], [capital(type.name)]);
  return createElement('div', 'type row', [], [text]);
}

function getTypesElement(types) {
  let t1 = getTypeElement(types.t1),
    content = types.t2 ? [t1, getTypeElement(types.t2)] : [t1];

  return createElement('div', 'types row', [], content);
}

function getAbilityElement(ability) {
  let text = createElement('h5', 'ability-name', [], [capital(ability.ability.name)]),
    abilityClasses = new Attribute('class', 'ability');

  if (ability.is_hidden) text.addClass('ha');
  return createElement('div', 'ability', [], [text]);
}

function getAbilitiesElement(abilities) {
  let a1 = getAbilityElement(abilities[0]),
    content = abilities[1] ? [a1, getAbilityElement(abilities[1])] : [a1],
    classes = new Attribute('class', 'abilities d-flex');
  return createElement('div', 'abilities d-flex', [], content);
}

function getStatElement(stat) {
  return createElement('td', 'd-none d-xl-table-cell stat-num', [], [stat]);
}

function createHeader() {
  let idHeader = createElement('th', '', [], ['ID']),
    picHeader = createElement('th', '', [], ['Pic']),
    nameHeader = createElement('th', '', [], ['Name']),
    typeHeader = createElement('th', 'd-none d-sm-table-cell', [], ['Types']),
    abilityHeader = createElement('th', 'd-none d-md-table-cell', [], ['Abilities']),
    statClasses = 'd-none d-xl-table-cell justify-content-center',
    hpHeader = createElement('th', statClasses, [], ['HP']),
    attHeader = createElement('th', statClasses, [], ['Att']),
    defHeader = createElement('th', statClasses, [], ['Def']),
    spAttHeader = createElement('th', statClasses, [], ['Sp Att']),
    spDefHeader = createElement('th', statClasses, [], ['Sp Def']),
    speedHeader = createElement('th', statClasses, [], ['Speed']),
    row = createElement(
      'tr',
      '',
      [],
      [
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
      ]
    );
  return createElement('thead', '', [], [row]);
}

function createEntry(pokemon) {
  // Create ID Element
  let id = createElement('h5', 'id', [], [formatID(pokemon.id)]),
    idCell = createElement('th', '', [], [id]);

  // Create Sprite Element
  let sprite = createElement(
      'img',
      'sprite',
      [
        ['src', pokemon.sprite],
        ['alt', pokemon.name],
      ],
      []
    ),
    spriteCell = createElement('td', '', [], [sprite]);

  // Create Name Element
  let name = createElement('h5', 'name', [], [capital(pokemon.name)]),
    nameCell = createElement('td', '', [], [name]);

  // Create Types Element
  let types = getTypesElement(pokemon.types),
    typesCell = createElement('td', 'd-none d-sm-table-cell', [], [types]);

  // Create Abilities Element
  let abilities = getAbilitiesElement(pokemon.abilities),
    abilitiesCell = createElement('td', 'd-none d-md-table-cell', [], [abilities]);

  // Create Stats Element
  let hp = getStatElement(pokemon.stats.hp),
    att = getStatElement(pokemon.stats.att),
    def = getStatElement(pokemon.stats.def),
    spAtt = getStatElement(pokemon.stats.spAtt),
    spDef = getStatElement(pokemon.stats.spDef),
    speed = getStatElement(pokemon.stats.speed);

  // Create Entry
  let content = [idCell, spriteCell, nameCell, typesCell, abilitiesCell, hp, att, def, spAtt, spDef, speed];

  return createElement('tr', '', [['id', pokemon.id]], content);
}

function createHTMLString(elems) {
  let str = '';
  elems.forEach(function (n) {
    str += n;
  });
  return str;
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

async function createGenBtns() {
  for (let i = 1; i < 9; i++) {
    let pokes = [];
    let gen = `gen${i}`;
    let range = getGenRange(gen);
    let id = `${gen}-btn`;
    let genBtn = document.getElementById(id);
    let entries = [];
    genBtn.addEventListener('click', async function () {
      document.getElementById('loading').classList.remove('d-none');
      document.getElementById('list').innerHTML = '';
      console.log(document.getElementById('list').innerHTML);
      clearArray(entries);
      pokemon = await getPokemon(range);
      pokemon.forEach(function (n) {
        let entry = createEntry(n);
        entries.push(entry);
      });

      let header = createHeader(),
        body = createElement('tbody', '', [], entries),
        table = createElement('table', 'table table-dark table-striped table-bordered table-hover', [], [header, body]);

      document.getElementById('loading').classList.add('d-none');
      document.getElementById('list').innerHTML = table.toString();
    });
  }
}

async function main() {
  createGenBtns();
  let entries = [];
  pokemon = await getPokemon([1, 898]);
  pokemon.forEach(function (n) {
    let entry = createEntry(n);
    entries.push(entry);
  });

  let header = createHeader(),
    body = createElement('tbody', '', [], entries),
    table = createElement('table', 'table table-dark table-striped table-bordered table-hover', [], [header, body]);

  document.getElementById('loading').classList.add('d-none');
  document.getElementById('list').innerHTML = table.toString();
}

main();
