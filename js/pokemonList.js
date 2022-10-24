"use strict";

import { createElement } from "./modules/htmlUtils.js";
import {
  pokemon,
  formatID,
  capital,
  clearArray,
  getGenRange,
  sortPokes,
} from "./modules/Utils.js";

function getTypeElement(type) {
  let text = createElement("h5", `type-text ${type.name}`, [
    capital(type.name),
  ]);
  return createElement("div", "type row", [text]);
}

function getTypesElement(types) {
  let t1 = getTypeElement(types.t1),
    content = types.t2 ? [t1, getTypeElement(types.t2)] : [t1];

  return createElement("div", "types row", content);
}

function getAbilityElement(ability) {
  let text = createElement("h5", "ability-name", [
    capital(ability.ability.name),
  ]);

  if (ability.is_hidden) text.addClass("ha");
  return createElement("div", "ability", [text]);
}

function getAbilitiesElement(abilities) {
  let a1 = getAbilityElement(abilities[0]),
    content = abilities[1] ? [a1, getAbilityElement(abilities[1])] : [a1];
  return createElement("div", "abilities d-flex", content);
}

function getStatElement(stat) {
  return createElement("td", "d-none d-xl-table-cell stat-num", [stat]);
}

function createHeader() {
  let idHeader = createElement("th", ["ID"]),
    picHeader = createElement("th", ["Pic"]),
    nameHeader = createElement("th", ["Name"]),
    typeHeader = createElement("th", "d-none d-md-table-cell", ["Types"]),
    abilityHeader = createElement("th", "d-none d-lg-table-cell", [
      "Abilities",
    ]),
    statClasses = "d-none d-xl-table-cell justify-content-center",
    hpHeader = createElement("th", statClasses, ["HP"]),
    attHeader = createElement("th", statClasses, ["Att"]),
    defHeader = createElement("th", statClasses, ["Def"]),
    spAttHeader = createElement("th", statClasses, ["Sp Att"]),
    spDefHeader = createElement("th", statClasses, ["Sp Def"]),
    speedHeader = createElement("th", statClasses, ["Speed"]),
    row = createElement(
      "tr",
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
  return createElement("thead", [row]);
}

function createEntry(pokemon) {
  // Create ID Element
  let id = createElement("h5", "id", [formatID(pokemon.id)]),
    idCell = createElement("th", [id]);

  // Create Sprite Element
  let sprite = createElement(
      "img",
      "sprite",
      [
        ["src", pokemon.sprite],
        ["alt", pokemon.name],
      ],
      []
    ),
    spriteCell = createElement("td", [sprite]);

  // Create Name Element
  let name = createElement("h5", "name", [capital(pokemon.name)]),
    nameCell = createElement("td", [name]);

  // Create Types Element
  let types = getTypesElement(pokemon.types),
    typesCell = createElement("td", "d-none d-md-table-cell", [types]);

  // Create Abilities Element
  let abilities = getAbilitiesElement(pokemon.abilities),
    abilitiesCell = createElement("td", "d-none d-lg-table-cell", [abilities]);

  // Create Stats Element
  let hp = getStatElement(pokemon.stats.hp),
    att = getStatElement(pokemon.stats.att),
    def = getStatElement(pokemon.stats.def),
    spAtt = getStatElement(pokemon.stats.spAtt),
    spDef = getStatElement(pokemon.stats.spDef),
    speed = getStatElement(pokemon.stats.speed);

  // Create Entry
  let content = [
    idCell,
    spriteCell,
    nameCell,
    typesCell,
    abilitiesCell,
    hp,
    att,
    def,
    spAtt,
    spDef,
    speed,
  ];

  return createElement("tr", [["id", pokemon.id]], content);
}

async function main() {
  let entries = [];
  console.log(pokemon);
  pokemon.forEach(function (n) {
    let entry = createEntry(n);
    entries.push(entry);
  });

  let header = createHeader(),
    body = createElement("tbody", "", entries),
    table = createElement(
      "table",
      "table table-dark table-striped table-bordered table-hover",
      [header, body]
    );

  document.getElementById("loading").classList.add("d-none");
  document.getElementById("list").innerHTML = table.toString();
}

main();
