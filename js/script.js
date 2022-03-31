'use strict';

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
  htmlElement.prototype.varString = function (variable) {
    return variable.length > 0 ? ` ${variable.join('')}` : '';
  };

  // Returns string for the attributes
  htmlElement.prototype.attString = function () {
    return this.attributes.length > 0 ? ` ${this.attributes.join('')}` : '';
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

let h1 = new htmlElement('h1', [], new htmlContent(['H1'])),
  h2 = new htmlElement('h2', [], new htmlContent(['H1'])),
  div = new htmlElement('div', [], new htmlContent([h1, h1, h2]));
