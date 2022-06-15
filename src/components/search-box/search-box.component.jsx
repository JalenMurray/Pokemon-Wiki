import { Component } from "react";
import "./search-box.styles.css";

class SearchBox extends Component {
  render() {
    return (
      <input
        className="search-box"
        type="search"
        placeholder="Search for a pokemon"
        onChange={this.props.onChangeHandler}
      />
    );
  }
}

export default SearchBox;
