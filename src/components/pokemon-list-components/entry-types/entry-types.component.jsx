import { Component } from "react";
import { format } from "../../../modules/Utils";
import "./entry-types.styles.css";

class EntryTypes extends Component {
  render() {
    const { types } = this.props;
    return (
      <div className="entry-types row">
        {types.map((type) => (
          <div key={type} className="entry-type">
            <h1 className={`entry-type-text ${type}`}>{format(type)}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default EntryTypes;
