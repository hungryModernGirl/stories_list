var S = require('string');

module.exports = {

    prefixPunctuation: function(text) {
        var results = {
            text: text,
            punctuation: ""
        };
        for (var i=0; i<text.length; i++) {
            if (S(text.charAt(i)).isAlphaNumeric()) {
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
            if (S(text.charAt(i)).isAlphaNumeric()) {
                results.text = text.slice(0, i);
                break;
        }
            else {
                results.punctuation = text.charAt(i) + results.punctuation;
            }
        }
        return results;
    },


    inlineSwapWord: function (text, key) {
        // preserves punctuation && case
        var results = "";
        var replace_with = key.charAt(0);
        for (var i = 0; i < text.length; i++) {
            if (key == "") {
                // handles case of more punctuation than length of key
                // ie. text = "w.h.a.t.i.s.t.h.i.s" && key = "boinga"
                // result =   "b.o.i.n.g.a...." to preserve all punctuation
                if (!S(text.charAt(i)).isAlphaNumeric()) {
                    results += text.charAt(i);
                }
                // implicit else condition that text.charAt(i) is alphanumeric
                // which we don't want to add to results
            }
            else {
                if (S(text.charAt(i)).isAlphaNumeric()) {
                    replace_with = key.charAt(0);
                    if (S(text.charAt(i)).isUpper()) {
                        replace_with = replace_with.toUpperCase();
                    }
                    results += replace_with;

                    // remove first char of key
                    key = key.slice(1);
                }
                else {
                    // text.charAt(i) is punctuation
                    results += text.charAt(i);
                }
            }
        }
        if (key != "") {
            // handles case that key is longer than text
            results += key;
        }

        return results;
    },

    translateToBoinga: function (text) {
        if (!text){
            return text;
        }
        var text_arr = text.split(" ");
        var key = S("boinga");
        for (var i = 0; i < text_arr.length; i++) {
            var word = S(text_arr[i]);
            if (word.length > 3) {
                var prefix_info = this.prefixPunctuation(word);
                word = prefix_info.text;
                var suffix_info = this.suffixPunctuation(word);
                word = suffix_info.text;
                text_arr[i] = prefix_info.punctuation +
                    this.inlineSwapWord(word, key) +
                    suffix_info.punctuation;
            }
        }
        return text_arr.join(" ");
    }
};