import React from 'react'
import Request from 'axios'
import Page from '../containers/Page'
import Asset from '../content/Asset'
import utils from '../utils/content'

export default React.createClass({
    getInitialState() {
        return {
            language: "english",
            meta: {},
            content: []
        }
    },

    componentDidMount() {
        console.log('err');
        var that = this;
        Request
            .get('http://localhost:3000/get-stories')
            .then(function(resp) {
                that.setupPage(resp.data || {});
            })
            .catch(function(resp) {
                console.log(resp);
            });
    },

    setupPage(data) {
        var newState = {};
        if (data.page) {
            newState.meta = data.page.meta || {};

            if (data.page.content) {
                newState.content = data.page.content || [];
            }
        }
        this.setState(newState);
    },

    toggleLanguage(e) {
        e.preventDefault();
        this.setState({
            language: this.state.language == "english" ? "boinga" : "english"
        })
    },

    render() {
        var language_message = "Read this page in ";
        if (this.state.language == "boinga") {
            language_message = utils.translateToBoinga(language_message);
        }
        console.log(this.state.meta);
        return (
            <div>
                <a onClick={this.toggleLanguage}>
                    {language_message} {this.state.language == "english" ? "boinga" : "english"} 
                </a>
                <Page
                    meta={this.state.meta}
                >
                    {this.state.content.map(function(c) {
                        return <Asset
                            key={c.name}
                            asset={c || {}}
                        />
                    })}
                </Page>
            </div>
        )
    }
})