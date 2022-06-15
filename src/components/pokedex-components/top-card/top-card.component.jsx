import { Component } from "react";

import { format } from "../../../modules/Utils.js";
import "./top-card.styles.css";

class TopCard extends Component {
  getFormattedName(id, name) {
    return `#${format(id)} ${format(name)}`;
  }

  getTypes(types) {
    let imgs = types.map((type) => (
      <img
        key={`${type}`}
        className="type-pic"
        src={`../../../images/types/${type}.png`}
        alt={type}
      />
    ));
    return imgs;
  }

  render() {
    const { id, name, types } = this.props;
    return (
      <div className="row">
        <h1 className="name col-9">{this.getFormattedName(id, name)}</h1>
        <div className="types col-3">{this.getTypes(types)}</div>
      </div>
    );
  }
}

export default TopCard;
