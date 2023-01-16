'use strict'

import { createElement } from './modules/htmlUtils.js'
import {
    formatID,
    capital,
    clearArray,
    getGenRange,
    removeAllChildNodes,
    createHTMLString,
    getPokemon,
} from './modules/Utils.js'

let currRange = [1, 100]

function getBarColor(stat) {
    if (stat < 55) return 'rgb(212, 118, 17)'
    if (stat < 65) return 'rgb(212, 164, 17)'
    if (stat < 75) return 'rgb(212,196,17)'
    if (stat < 85) return 'rgb(212,212,17)'
    if (stat < 95) return 'rgb(203,212,17)'
    if (stat < 100) return 'rgb(180, 212, 17)'
    if (stat < 110) return 'rgb(160,212,17)'
    if (stat < 120) return 'rgb(134,212,17)'
    if (stat < 130) return 'rgb(98,212,17)'
    return 'rgb(43,212,17)'
}

class pokeStats {
    constructor(id, color, stats) {
        this.id = id
        this.color = color
        this.hp = stats.hp
        this.att = stats.att
        this.def = stats.def
        this.spAtt = stats.spAtt
        this.spDef = stats.spDef
        this.speed = stats.speed

        // Set Colors of stat bars
        this.hpBar = getBarColor(this.hp)
        this.attBar = getBarColor(this.att)
        this.defBar = getBarColor(this.def)
        this.spAttBar = getBarColor(this.spAtt)
        this.spDefBar = getBarColor(this.spDef)
        this.speedBar = getBarColor(this.speed)
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
    }`
    }
}

function getBgColor(type) {
    if (type == 'grass') return 'rgb(192, 228, 181)'
    if (type == 'fire') return 'rgb(193,140,135)'
    if (type == 'water') return 'rgb(86,149,232)'
    if (type == 'bug') return 'rgb(123,154,86)'
    if (type == 'normal') return 'rgb(185,192,228)'
    if (type == 'flying') return 'rgb(168,187,242)'
    if (type == 'ghost') return 'rgb(120,63,134)'
    if (type == 'psychic') return 'rgb(210,126,139)'
    if (type == 'dark') return 'rgb(132,114,104)'
    if (type == 'poison') return 'rgb(121,106,166)'
    if (type == 'electric') return 'rgb(252,205,64)'
    if (type == 'fairy') return 'rgb(231,177,233)'
    if (type == 'rock') return 'rgb(138,78,32)'
    if (type == 'ground') return 'rgb(201,166,118)'
    if (type == 'steel') return 'rgb(147,148,158)'
    if (type == 'ice') return 'rgb(154,218,235)'
    if (type == 'dragon') return 'rgb(49,105,185)'
    if (type == 'fighting') return 'rgb(171,106,114)'
}

function getCSS(pokemon) {
    let bgColor = getBgColor(pokemon.types.t1.name),
        stats = new pokeStats(pokemon.id, bgColor, pokemon.stats)
    return createElement('style', '', [], [stats.getStyleContent()])
}

function createType(typeName) {
    let src = ['src', `../images/types/${typeName}.png`],
        alt = ['alt', typeName]
    return createElement('img', 'type-pic', [src, alt], [])
}

function createNameType(pokemon) {
    let name = createElement(
            'h5',
            'name col-9',
            [],
            [`#${formatID(pokemon.id)} ${capital(pokemon.name)}`]
        ),
        t1 = createType(pokemon.types.t1.name),
        content = pokemon.types.t2
            ? [t1, createType(pokemon.types.t2.name)]
            : [t1],
        types = createElement('div', 'types col-3', [], content)
    return createElement('div', 'row', [], [name, types])
}

function createAbility(ability) {
    let a1 = createElement(
        'h5',
        'col ability',
        [],
        [capital(ability.ability.name)]
    )
    if (ability.is_hidden) a1.addClass('HA')
    return a1
}

function createAbilities(pokemon) {
    let text = createElement('h4', 'col-auto ability-name', [], ['Abilities']),
        a1 = createAbility(pokemon.abilities[0]),
        content = pokemon.abilities[1]
            ? [text, a1, createAbility(pokemon.abilities[1])]
            : [text, a1]
    return createElement('div', 'abilities row', [], content)
}

function createStatRow(statName, statNum) {
    let stat = statName.toLowerCase().replace(' ', ''),
        bar = createElement(
            'div',
            `stat-bar ${stat}-bar container-fluid col-8`,
            [],
            []
        ),
        text = createElement('h5', 'stat-text col-4', [], [statName]),
        num = createElement('p5', 'stat-num', [], [statNum])
    return createElement('div', 'stat row', [], [text, num, bar])
}

function createStats(pokemon) {
    // Create the word Stats Element
    let text = createElement('h5', 'stat-word col-2', [], ['Stats:'])

    // Create a Row for each Stat
    let hpRow = createStatRow('HP', pokemon.stats.hp)
    let attRow = createStatRow('Att', pokemon.stats.att)
    let defRow = createStatRow('Def', pokemon.stats.def)
    let spAttRow = createStatRow('SpAtt', pokemon.stats.spAtt)
    let spDefRow = createStatRow('SpDef', pokemon.stats.spDef)
    let speedRow = createStatRow('Speed', pokemon.stats.speed)

    // Create Stat Bars Container
    let bars = [hpRow, attRow, defRow, spAttRow, spDefRow, speedRow],
        statBars = createElement(
            'div',
            'stat-bars container-fluid col-9',
            [],
            bars
        )

    return createElement('div', 'stats row', [], [text, statBars])
}

function createCard(pokemon) {
    // Create NameType Row
    let nameType = createNameType(pokemon)

    // Create Thumbnail
    let thumbnail = createElement(
        'img',
        'thumbnail',
        [
            ['src', pokemon.thumbnail],
            ['alt', pokemon.name],
        ],
        []
    )

    // Create Abilities Row
    let abilities = createAbilities(pokemon)

    // Create Stats Row
    let stats = createStats(pokemon)

    // Create and return the card
    let content = [nameType, thumbnail, abilities, stats]

    return createElement(
        'div',
        'card container col-xs-12 col-sm-6 col-lg-4 col-xl-3',
        [['id', `id-${pokemon.id}`]],
        content
    )
}

async function loadPage(range) {
    let cards = [],
        css = [],
        pokemon = await getPokemon(currRange)
    pokemon.forEach(function (n) {
        cards.push(createCard(n))
        css.push(getCSS(n))
    })
    document.head.innerHTML += createHTMLString(css)

    document.getElementById('loading').classList.add('d-none')
    document.getElementById('cards').innerHTML += createHTMLString(cards)
}

async function main() {
    loadPage(currRange)
    document.getElementById('prevPage').addEventListener('click', prevPage)
    document.getElementById('nextPage').addEventListener('click', nextPage)
}

function clearPage() {
    document.getElementById('cards').innerHTML = ''
    document.getElementById('loading').classList.remove('d-none')
}

async function prevPage() {
    clearPage()
    currRange = currRange.map((val) => val - 100)
    if (currRange[0] == 1) {
        document.getElementById('prevPage').disabled = true
    }
    if (currRange[1] == 1000) {
        document.getElementById('nextPage').disabled = false
    }
    loadPage(currRange)
}

async function nextPage() {
    clearPage()
    currRange = currRange.map((val) => val + 100)
    if (currRange[1] == 1000) {
        document.getElementById('nextPage').disabled = true
        loadPage([900, 970])
    } else if (currRange[0] == 101) {
        document.getElementById('prevPage').disabled = false
        loadPage(currRange)
    } else {
        loadPage(currRange)
    }
}

main()
