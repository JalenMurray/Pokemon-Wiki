import { Component } from "react";

class Stat extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <div className="stat row">
        <h1 className="stat-name">{name}</h1>
        <p className="stat-num">{value}</p>
        <div className={`stat-bar ${name}-bar container-fluid col-8`}></div>
      </div>
    );
  }
}

export default Stat;
