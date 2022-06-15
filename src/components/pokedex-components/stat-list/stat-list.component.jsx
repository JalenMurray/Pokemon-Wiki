import { Component } from "react";
import Stat from "../stat/stat.component";

class StatList extends Component {
  render() {
    const { stats } = this.props;
    return (
      <div className="stats row">
        <h1 className="stat-keyword col-2">Stats:</h1>
        <div className="stat-bars container-fluid col-9">
          {stats.map((stat) => (
            <Stat key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </div>
      </div>
    );
  }
}

export default StatList;
