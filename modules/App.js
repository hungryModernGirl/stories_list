import React from 'react'
import NYRegion from './pages/NYRegion'

export default React.createClass({
  render() {
    return (
        <div id="app">
            <h1>New York Times</h1>
            <NYRegion/>
            {this.props.children}
        </div>
    )
  }
});