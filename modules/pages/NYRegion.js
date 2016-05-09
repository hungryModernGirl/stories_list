import React from 'react'
import Request from 'axios'
import $ from 'jquery'
import Page from '../containers/Page'
import Asset from '../content/Asset'
import Translate from '../utils/translate'

export default React.createClass({
    getInitialState() {
        return {
            language: "english",
            meta: {
                english: {},
                boinga: {}
            },
            content: {
                english: [],
                boinga: []
            }
            ,
            page: 0
        }
    },

    componentDidMount() {
        this.getStories(this.state.language, this.setupPage);
    },

    getStories(language, callback) {
        Request
            .get('http://localhost:3000/get-stories/' + language)
            .then(function(resp) {
                callback(resp.data || {});
            })
            .catch(function(resp) {
                console.log(resp);
            });
        // if load_more working
        this.setState({
            page: this.state.page + 1
        })
    },

    getJSONP(url, cb) {
        window['cb'] = cb;
        $.ajax(url, {
            crossDomain: true,
            dataType: "jsonp"
        });
    },

    setupPage(data) {
        var newState = {
            meta: {},
            content: {
                english: [],
                boinga: []
            }
        };
        if (data.page) {
            newState.meta['english'] = data.page.meta || {};

            if (data.page.content) {
                newState.content['english'] = data.page.content || [];
            }
        }
        this.setState(newState);
    },

    translateToBoinga(cb) {
        var clean_page = {
            page: {
                meta: this.state.meta.english,
                content: this.state.content.english
            }
        };
        Request
            .post('/translate-boinga/', {data: JSON.stringify(clean_page)})
            .then(function(resp) {
                cb(resp.data || {})
            })
            .catch(function(resp) {
                console.log(resp);
            })
    },

    toggleLanguage(e) {
        e.preventDefault();
        var new_lang;
        var old_lang;
        if (this.state.language == "english") {
            new_lang = "boinga";
            old_lang = "english";
        }
        else {
            new_lang = "english";
            old_lang = "boinga";
        }
        window["language"] = new_lang;
        if (this.state.content[new_lang].length) {
            if (this.state.content[new_lang].length >= this.state.content[old_lang].length) {
                this.setState({
                    language: new_lang
                });
            }
            else {
                var that = this;
                var cb = function (page) {
                    var newContent = that.state.content;
                    newContent[new_lang] = that.state.content[new_lang].concat(page.content)
                    that.setState({
                        content: newContent,
                        language: new_lang
                    });
                };
                this.getPage(cb);
            }
        }
        else {
            // case where content.boinga hasn't populated at all
            // can only be page 0
            that = this;
            cb = function (data) {
                var newMeta = that.state.meta;
                newMeta.boinga = data.page.meta;
                var newContent = that.state.content;
                newContent.boinga = newContent.boinga.concat(data.page.content);
                that.setState({
                    content: newContent,
                    meta: newMeta,
                    language: new_lang
                })

            };
            this.translateToBoinga(cb);
        }
    },

    getPage(cb) {
        this.getJSONP('http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js', cb);
    },

    handleLoadMore(e) {
        e.preventDefault();
        var that = this;
        var cb = function(page){
            that.state.content[that.state.language] = that.state.content[that.state.language].concat(page.content);
            that.setState(that.state.content);
        };
        this.getPage(cb);
    },

    render() {
        var language_message = "Read this page in ";
        var load_more_el = "";
        if (this.state.language == "boinga") {
            language_message = Translate.translateToBoinga(language_message);
        }

        // if load_more working use:
        if (this.state.page < 2){
            load_more_el = (<a
                className="load-more"
                onClick={this.handleLoadMore}
            >Load More</a>);
        }
        return (
            <div id="NYRegion">
                <a className="language" onClick={this.toggleLanguage}>
                    {language_message} {this.state.language == "english" ? "boinga" : "english"}
                </a>
                <Page
                    meta={this.state.meta[this.state.language]}
                >
                    {this.state.content[this.state.language].map(function(c) {
                        return <Asset
                            key={c.name}
                            asset={c || {}}
                        />
                    })}
                    {load_more_el}
                </Page>
            </div>
        )
    }
})