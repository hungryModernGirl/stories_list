import React from 'react'
import NYRegion from './pages/NYRegion'
import $ from 'jquery'

var NYTD = {
    render_section_front: function(data) {
        var str_data = JSON.stringify(data);
        var args = {
            data: str_data,
            language: window.language || "english"
        };

        $.ajax({
            method: 'POST',
            url: '/more-stories',
            data: args,
            success: function(resp) {
                console.log(resp);
                window.cb(resp.page);
            },
            dataType: 'json'
        });
    }
};

export default React.createClass({
    componentDidMount() {
      window['NYTD'] = NYTD;
    },

    render() {
        return (
            <div id="app" className="wrapper">
                <NYRegion/>
                {this.props.children}
            </div>
        )
    }
});