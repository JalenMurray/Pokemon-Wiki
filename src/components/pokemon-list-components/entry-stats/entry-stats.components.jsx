import { Component } from "react";

class EntryStats extends Component {
  constructor() {
    super();

    this.key = 0;
  }

  getKey() {
    const key = this.key;
    this.key += 1;
    return key;
  }

  render() {
    const { stats } = this.props;
    return stats.map((stat) => (
      <td key={stat.name} className="d-none d-xl-table-cell entry-stat-num">
        {stat.value}
      </td>
    ));
  }
}

export default EntryStats;
