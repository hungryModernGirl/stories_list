import React from 'react'
import Collection from './Collection'

export default React.createClass({
    getInitialState() {
        return {}
    },
    
    componentWillMount() {
        console.log(this.props);
        this.setState({
            name: this.props.section.name || "",
            rank: this.props.section.rank || -1,
            collections: this.props.section.collections || []
        })
    },
    
    render() {
        console.log("section");
        var top_collection = {};
        if (this.state.collections.length > 0){
            // get top ranked collection for section
            top_collection = this.state.collections[0];
        }
        return (
            <div className={this.props.className}>
                Section
                <Collection collection={top_collection}/>
            </div>
        )
    }
})
