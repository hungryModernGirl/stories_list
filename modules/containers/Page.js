import React from 'react'

export default React.createClass({
    componentWillMount() {
        this.setState({
            title: this.props.meta.title || "",
            description: this.props.meta.description || "",
            template: this.props.meta.template || ""
        })
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.meta.title || "",
            description: nextProps.meta.description || "",
            template: nextProps.meta.template || ""
        })
    },

    render() {
        window.title = this.state.title;
        return (
            <div>
                <h1 className="pageTitle">{this.state.title}</h1>
                {this.props.children}
            </div>
        )
    }
})