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

export function createElement(type, classList, attributeList, contentList) {
  let classes,
    attributes = [],
    content = new Content(contentList);

  if (classList != '') classes = getClasses(classList);

  attributeList.forEach(function (n) {
    attributes.push(new Attribute(n[0], n[1]));
  });

  return classes ? new Element(type, [classes, ...attributes], content) : new Element(type, attributes, content);
}
