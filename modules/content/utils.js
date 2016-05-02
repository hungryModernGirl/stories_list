module.exports = {
    parseStories: function(data) {
        var results = {
            page: {
                meta: {},
                sections: []
            }
        };
        if (data.page) {
            if (data.page.content) {
                for (var i = 0; i < data.page.content.length; i++) {
                    results.page.sections.push(
                        data.page.content[i]
                    );
                }
            }
        }
    }

};