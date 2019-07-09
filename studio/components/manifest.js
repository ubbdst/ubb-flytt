import React, { Component } from "react";
import Loadable from 'react-loadable';

const mirador = Loadable({
  loader: () => import('mirador'),
});

class Mirador extends Component {
  componentDidMount() {
    const { config, plugins } = this.props;
    mirador.viewer(config, plugins);
  }

  render() {
    const { config } = this.props;
    return <div id={config.id} />;
  }
}

export default Mirador;