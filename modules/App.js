import React from 'react'
import NYRegion from './pages/NYRegion'

export default React.createClass({
  render() {
    return (
        <div>
            <h1>Region: New York</h1>
            <NYRegion/>
            {this.props.children}
        </div>
    )
  }
});