import React from 'react'
import Section from './Section'

export default React.createClass({
    getInitialState() {
        return {
            sections: []
        }
    },

    componentWillMount() {
        this.setState({
            title: this.props.meta.title || "",
            description: this.props.meta.description || "",
            template: this.props.meta.template || ""
        })
    },

    render() {
        console.log("page");
        return (
            <div>
                <div>Page</div>
                {this.props.children}
            </div>
        )
    }
})