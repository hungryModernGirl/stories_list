import React from 'react'
import Collection from './Collection'

export default React.createClass({
    getInitialState() {
        return {
            collections: []
        }
    },
    
    componentWillMount() {
        this.setState({
            name: this.props.section.name || "",
            rank: this.props.section.rank || -1,
            collections: this.props.section.collections || []
        });
    },
    
    render() {
        return (
            <div>
                {this.state.collections.map(function(c) {
                    return <Collection collection={c}/>
                })}
            </div>
        )
    }
})
