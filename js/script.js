'use strict';

class htmlAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

htmlAttribute.prototype.toString = function () {
  return `${this.name}="${this.value}"`;
};

class htmlElement {
  constructor(type, attributes, content) {
    this.type = type;
    this.attributes = attributes;
    content ? (this.content = content) : (this.content = '');
  }
}

function htmlElementPrototypes() {
  // Returns string for the attributes
  htmlElement.prototype.attString = function () {
    return this.attributes.length > 0 ? ` ${this.attributes.join('')}` : '';
  };

  // Returns the string for an HTML Element
  htmlElement.prototype.toString = function () {
    return `<${this.type}${this.attString()}>${this.content}</${this.type}>`;
  };
}

let h1 = new htmlElement('h1', [], 'Testing');
let div = new htmlElement('div', [new htmlAttribute('class', 'container row')], h1);
let section = new htmlElement('section', [new htmlAttribute('class', 'bg-light text-dark p-5 text-center')], div);

let sec = document.createElement('section');
sec.classList.add('bg-light', 'text-dark', 'p-5', 'text-center');
