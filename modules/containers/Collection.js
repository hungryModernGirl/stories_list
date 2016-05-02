import React from 'react'
import Asset from '../content/Asset'

export default React.createClass({
    getInitialState() {
        return {
            assets: []
        }
    },

    componentWillMount() {
        this.setState({
            assets: this.props.collection.assets || []
        })
    },

    render() {
        return (
            <div>
                Collection
                {this.state.assets.map(function(a) {
                    return <Asset asset={a}/>
                })}
            </div>
        )
    }
})