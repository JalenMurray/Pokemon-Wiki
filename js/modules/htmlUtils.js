'use strict';

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

function getAttributes(attributeList) {
  let attributes = [];
  attributeList.forEach(function (n) {
    attributes.push(new Attribute(n[0], n[1]));
  });
  return attributes;
}

export function createElement(...args) {
  let type = args[0];
  if (args.length == 1) return new Element(type, [], new Content([]));
  if (args.length == 2) {
    if (typeof args[1] == 'string') return new Element(type, getClasses(args[1]), getContent([]));
    if (typeof args[1][1] == 'object') {
      return new Element(type, [new Attribute(args[1][0], args[1][1])], getContent([]));
    }
    return new Element(type, [], new Content(args[1]));
  }
  if (args.length == 3) {
    if (typeof args[1] == 'string') {
      return new Element(type, [getClasses(args[1])], new Content(args[2]));
    }
    return new Element(type, [new Attribute(args[1][0], args[1][1])], new Content(args[2]));
  }
  let classes = getClasses(args[1]),
    attributes = getAttributes(args[2]),
    content = new Content(args[3]);
  return new Element(type, [classes, ...attributes], content);
}
