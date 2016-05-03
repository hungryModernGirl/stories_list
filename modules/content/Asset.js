import React from 'react'
import Moment from 'moment'

var base_image_url = "https://static01.nyt.com/";

export default React.createClass({

    componentWillMount() {
        this.setState({
            headline: this.props.asset.headline || "",
            byline: this.props.asset.byline || "",
            type: this.props.asset.type || "Article",
            published: this.props.asset.publicationDt,
            url: this.props.asset.url || "",
            image_url: this.getImageUrl(this.props.asset) || null,
            image_credit: this.getImageCredit(this.props.asset) || null,
            summary: this.props.asset.summary || ""
        });
    },

    getImageCredit(asset) {
        if (asset.images && asset.images.length > 0){
            return asset.images[0].credit;
        }
    },

    getImageUrl(asset) {
        var images = [];
        if (asset.images && asset.images.length > 0  && asset.images[0].types) {
            images = asset.images[0].types.filter(function(i) {
                return i.type == "articleLarge"
            });
            if (images.length > 0 && images[0]){
                var url = base_image_url + images[0].content;
                return url
            }
        }
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
