import React from 'react'
import Request from 'axios'
import Page from '../containers/Page'
import Asset from '../content/Asset'
import Translate from '../utils/translate'

export default React.createClass({
    getInitialState() {
        return {
            language: "english",
            meta: {},
            content: [],
            page: 0
        }
    },

    componentDidMount() {
        this.getStories(this.state.language, this.setupPage);
    },

    componentWillUpdate(nextProps, nextState) {
    },

    getStories(language, callback) {
        console.log(language);
        Request
            .get('http://localhost:3000/get-stories/' + (this.state.page + 1) + '/' + language)
            .then(function(resp) {
                callback(resp.data || {});
            })
            .catch(function(resp) {
                console.log(resp);
            });
        // if load_more working
        // this.setState({
        //     page: this.state.page + 1
        // })
    },

    setupPage(data) {
        var newState = {};
        if (data.page) {
            newState.meta = data.page.meta || {};

            if (data.page.content) {
                console.log(data.page.content[0]);
                newState.content = data.page.content || [];
            }
        }
        this.setState(newState);
    },

    toggleLanguage(e) {
        e.preventDefault();
        var new_lang = this.state.language == "english" ? "boinga" : "english";
        this.setState({
            language: new_lang
        });
        this.getStories(new_lang, this.setupPage);
    },

    handleLoadMore(e) {
        e.preventDefault();
        var that = this;
        var cb = function(data){that.setState({
            content: that.state.content.concat(data.page.content)
        })};
        this.getStories(cb);
    },

    render() {
        var language_message = "Read this page in ";
        var load_more_el = "";
        if (this.state.language == "boinga") {
            language_message = Translate.translateToBoinga(language_message);
        }

        // if load_more working use:
        // if (this.state.page < 2){
        //     load_more_el = (<a
        //         className="load-more"
        //         onClick={this.handleLoadMore}
        //     >Load More</a>);
        // }
        return (
            <div id="NYRegion">
                <a className="language" onClick={this.toggleLanguage}>
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