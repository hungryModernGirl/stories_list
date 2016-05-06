import React from 'react'
import Moment from 'moment'

export default React.createClass({

    componentWillMount() {
        this.setState({
            headline: this.props.asset.headline || "",
            byline: this.props.asset.byline || "",
            type: this.props.asset.type || "Article",
            published: this.props.asset.publicationDt,
            url: this.props.asset.url || "",
            image_url: this.props.asset.image_url,
            image_credit: this.props.asset.image_credit,
            summary: this.props.asset.summary || ""
        });
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            headline: nextProps.asset.headline || "",
            byline: nextProps.asset.byline || "",
            type: nextProps.asset.type || "Article",
            published: nextProps.asset.publicationDt,
            url: nextProps.asset.url || "",
            image_url: nextProps.asset.image_url,
            image_credit: nextProps.asset.image_credit,
            summary: nextProps.asset.summary || ""
        });
    },

    renderImage() {
        if (this.state.image_url) {
            return (
                <div className="photo">
                    <a href={this.state.url}>
                        <img src={this.state.image_url}/>
                    </a>
                    <div className="byline">
                        {this.state.image_credit}
                    </div>
                </div>
            )
        }
    },

    render() {
        var image_el = this.renderImage();
        var how_recent = Moment().to(Moment(this.state.published));
        var className = "article-body" + (this.state.image_url ? "": " no-pic");
        return (
            <div className={className}>
                {image_el}
                <div>
                    <a href={this.state.url}>
                        <div className="headline">
                            {this.state.headline}
                        </div>
                    </a>
                    <p className="summary">
                        {this.state.summary}
                    </p>
                    <p className="byline">
                        {how_recent} {this.state.byline}
                    </p>
                </div>
            </div>
        )
    }
})
