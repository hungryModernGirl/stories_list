import React from 'react'
import { Link } from 'react-router'

var base_image_url = "https://static01.nyt.com/";

export default React.createClass({

    componentWillMount() {
        this.setState({
            headline: this.props.asset.headline || "",
            byline: this.props.asset.byline || "",
            type: this.props.asset.type || "Article",
            published: this.props.asset.publicationDt,
            url: this.props.asset.url || "",
            image: this.getImage(this.props.asset) || null,
            summary: this.props.asset.summary || ""
        });
    },

    getImage(asset) {
        var images = [];
        if (asset.images && asset.images.length > 0  && asset.images[0].types) {
            images = asset.images[0].types.filter(function(i) {
                return i.type == "articleLarge"
            });
            console.log(images);
            if (images.length > 0 && images[0]){
                var url = base_image_url + images[0].content;
                console.log(url);
                return url
            }
        }
    },

    renderImage() {
        if (this.state.image) {
            return (
                <div className="media photo">
                    <a href={this.state.url}>
                        <img src={this.state.image}/>
                    </a>
                </div>
            )
        }
    },

    render() {
        console.log("asset");
        console.log(this.state);
        var image_el = this.renderImage();
        return (
            <div>
                {image_el}
                <div className="article-body">
                    <div className="thumb"></div>
                    <p className="summary">
                        {this.state.summary}
                    </p>
                    <p className="byline">
                        {this.state.published} {this.state.byline}
                    </p>
                </div>
            </div>
        )
    }
})
