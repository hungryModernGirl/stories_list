var S = require('string');

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

    punctuationLocations: function(text) {
        var results = {};
        for (var i=0; i<text.length; i++){
            if (text.charAt(i).isAlphaNumeric()){
                continue;
            }
            if (results[text.charAt(i)]){
                results[text.charAt(i)].push(i);
            }
            else {
                results[text.charAt(i)] = [i];
            }
        }
    },

    translateToBoinga: function(text) {
        var text_arr = text.split(" ");
        var key = S("boinga");
        for (var i=0; i<text_arr.length; i++) {
            var word = S(text_arr[i]);
            if (word.length > 3) {
                if (word.isLower() && word.isAlphaNumeric()) {
                    word = key;
                }
                else {
                    for (var c=0; c<word.length; c++){
                        var new_word = word;
                        var b = 0;
                        if (new_word.charAt(c).isUpper()) {
                            new_word[c] = key.charAt(b).upper();
                            b++;
                        }
                        else if (!new_word.charAt(c).isAlphaNumeric()) {
                            continue;
                        }
                        if (c + 1 == word.length) {
                            new_word += key.substring(b);
                        }
                    }
                }
            }
        }
    }

};