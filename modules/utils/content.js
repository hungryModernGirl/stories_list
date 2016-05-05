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

    prefixPunctuation: function(text) {
        var results = {
            text: text,
            punctuation: ""
        };
        for (var i=0; i<text.length; i++) {
            if (text.charAt(i).isAlpha) {
                results.text = text.slice(i);
                break;
            }
            else {
                results.punctuation += text.charAt(i);
            }
        }
        return results;
    },

    suffixPunctuation: function(text) {
        var results = {
            text: text,
            punctuation: ""
        };
        for (var i=text.length-1; i==0; i--) {
            if (text.charAt(i).isAlpha) {
                results.text = text.slice(0, i);
                break;
            }
            else {
                results.punctuation = text.charAt(i) + results.punctuation;
            }
        }
        return results;
    },

    // bodyPunctuation: function(text) {
    //     var results = {
    //         punctuation: {},
    //         text: text
    //     };
    //     for (var i=0; i<text.length; i++){
    //         if (text.charAt(i).isAlphaNumeric()){
    //             continue;
    //         }
    //         if (results.punctuation[text.charAt(i)]){
    //             results.punctuation[text.charAt(i)].push(i);
    //         }
    //         else {
    //             results.punctuation[text.charAt(i)] = [i];
    //         }
    //     }
    //     results.text = text.replace(/[\W_]+/g,"");
    //     return results;
    // },

    trimPunctuation: function(text) {
        var results = {
            prefix: "",
            suffix: "",
            text: text
        };
        var prefix_info = this.prefixPunctuation(text);
        results.prefix = prefix_info.punctuation;
        text = prefix_info.text;

        var suffix_info = this.suffixPunctuation(text);
        results.suffix = suffix_info.punctuation;
        results.text = suffix_info.text;

        return results;
    },

    // retainCase: function(text) {
    //     var results = [];
    //     for (var i=0; i<text.length; i++) {
    //         if (text.charAt(i).isUpper()) {
    //             results.push(i);
    //         }
    //     }
    //     return results;
    // },

    inlineSwapWord: function(text, key) {
        // preserves punctuation && case

        var replace_with = key.charAt(0);
        for (var i=0; i<text.length; i++) {
            if (key == "") {
                // handles case of more punctuation than length of key
                // ie. text = "w.h.a.t.i.s.t.h.i.s" && key = "boinga"
                // result =   "b.o.i.n.g.a...." to preserve all punctuation
                if (text.charAt(i).isAlphaNumeric()) {
                    // if index used in slice is out of range it returns ""
                    text = text.slice(0, i) + text.slice(i + 1);
                }
                // implicit else condition that text.charAt(i) is punctuation
                // which we don't want to change
            }
            else {
                if (text.charAt(i).isAlphaNumeric()) {
                    replace_with = key.charAt(0);
                    if (text.charAt(i).isUpper()) {
                        replace_with = replace_with.toUpperCase();
                    }
                    text = text.slice(0, i) + replace_with + text.slice(i + 1);

                    // remove first char of key
                    key = key.slice(1);
                }
                // implicit else condition that text.charAt(i) is punctuation
                // which we don't want to change
            }
        }
        if (key != "") {
            // case that key is longer than text
            text += key;
        }

        return text;
    },

    translateToBoinga: function(text) {
        var text_arr = text.split(" ");
        var key = S("boinga");
        for (var i=0; i<text_arr.length; i++) {
            var word = S(text_arr[i]);
            if (word.length > 3) {
                // preserve punctuation
                var trim_punc = this.trimPunctuation(word);
                word = S(trim_punc.text);

                // preserve case
                var retain_case = this.retainCase(word);

                word = key;

                // apply case
                for (var c=0; c<retain_case.length; c++) {
                    if (retain_case[c] >= word.length) {
                        break;
                    }
                    else {
                        word = word.slice(0, c) +
                            word.charAt(c).toUpperCase() +
                            word.slice(c+1);
                    }
                }
                for (var p=0; p<retain_punc.body.keys.length; p++) {
                    for (var p_i=0; p_i<retain_punc.body.p.length; p_i++) {
                        if (retain_punc.body.p[p_i] >= word.length) {
                            break;
                        }
                        else {
                            word = word.substring(0, retain_punc.body.p[p_i]) +
                                    retain_punc.body.keys[p] +
                                    word.substring(retain_punc.body.p[p_i]);
                        }
                    }
                }
                word
            }
        }
    }

};