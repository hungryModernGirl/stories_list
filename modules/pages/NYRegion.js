import React from 'react'
import Request from 'axios'
import Page from '../containers/Page'
import Section from '../containers/Section'


export default React.createClass({
    getInitialState() {
        return {
            meta: {},
            sections: []
        }
    },

    componentDidMount() {
        console.log('err');
        var that = this;
        Request
            .get('http://localhost:3000/get-stories')
            .then(function(resp) {
                that.setupPage(resp.data || {});
                that.setState({
                    page: resp.data.page || {}
                })
            })
            .catch(function(resp) {
                console.log(resp);
            });
    },

    setupPage(data) {
        var newState = {};
        if (data.page) {
            newState.meta = data.page.parameters || {};

            if (data.page.content) {
                newState.sections = data.page.content || [];
            }
        }
        this.setState(newState);
    },

    render() {
        console.log("nyregion");
        return (
            <div>
                <div>NYRegion</div>
                <Page meta={this.state.meta || {}}>
                    {this.state.sections.map(function(s) {
                        return <Section
                            key={s.name}
                            section={s || {}}
                        />
                    })}
                </Page>
            </div>
        )
    }
})