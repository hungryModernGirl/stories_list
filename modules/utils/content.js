module.exports = {
    parseStories: function(data) {
        results = {
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
        return results
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
        return collection.assets.filter(function(asset) {
            return asset.type == "Article"
        });
    },

    translateToBoinga(text) {
        return ""
    }

};