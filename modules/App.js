import React from 'react'
import NYRegion from './pages/NYRegion'

export default React.createClass({
  render() {
    return (
        <div id="app" className="wrapper">
            <NYRegion/>
            {this.props.children}
        </div>
    )
  }
});