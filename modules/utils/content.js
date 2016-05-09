var Translate = require('./translate');

const ARTICLE_TRANSLATE_FIELDS = ['headline', 'summary', 'image_credit'];
const META_TRANSLATE_FIELDS = ['description', 'title'];

const base_image_url = "https://static01.nyt.com/";

module.exports = {
    parseStories: function(data, language) {
        var results = {
            page: {
                meta: data.page.parameters,
                content: []
            }
        };
        for (var i=0; i<data.page.content.length; i++) {
            results.page.content = results.page.content.concat(
                this.flattenContent(data.page.content[i])
            );
        }

        if (language == "english") {
            return results;
        }
        else if (language == "boinga") {
            return this.translatePageToBoinga(results);
        }

        return results
    },

    translatePageToBoinga: function(data) {
        if (data.page.meta) {
            for (var i = 0; i < Object.keys(data.page.meta).length; i++) {
                var key = Object.keys(data.page.meta)[i];
                if (META_TRANSLATE_FIELDS.indexOf(key) > -1) {
                    data.page.meta[key] = Translate.translateToBoinga(data.page.meta[key]);
                }
            }
        }
        if (data.page.content) {
            for (i = 0; i < data.page.content.length; i++) {
                for (var j = 0; j < Object.keys(data.page.content[i]).length; j++) {
                    key = Object.keys(data.page.content[i])[j];
                    if (ARTICLE_TRANSLATE_FIELDS.indexOf(key) > -1) {
                        data.page.content[i][key] = Translate.translateToBoinga(data.page.content[i][key]);
                    }
                }
            }
        }

        return data;
    },

    flattenContent: function(section) {
        var content = [];
        for (var i=0; i<section.collections.length; i++){
            content = content.concat(
                this.filterArticles(section.collections[i])
            );
        }
        return content;
    },

    filterArticles: function(collection) {
        var assets = collection.assets.filter(function(asset) {
            return asset.type == "Article"
        });
        for (var i=0; i<assets.length; i++) {
            assets[i] = this.flattenArticle(assets[i]);
        }
        
        return assets;
    },

    flattenArticle: function(article) {
        var that = this;
        return {
            headline: article.headline || "",
            byline: article.byline || "",
            published: article.publicationDt,
            url: article.url || "",
            image_url: that.getImageUrl(article) || null,
            image_credit: that.getImageCredit(article) || null,
            summary: article.summary || ""
        };
    },

    getImageCredit: function(asset) {
        if (asset.images && asset.images.length > 0){
            return asset.images[0].credit;
        }
    },

    getImageUrl: function(asset) {
        var images = [];
        if (asset.images && asset.images.length > 0  && asset.images[0].types) {
            images = asset.images[0].types.filter(function(i) {
                return i.type == "articleLarge"
            });
            if (images.length > 0 && images[0]){
                return base_image_url + images[0].content;
            }
        }
    }

};