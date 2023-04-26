const urls = require('../ShortenUrl/index').urls;

module.exports = async function (context, req) {
    const { id } = req.params;
    const url = urls.get(id);

    if (url) {
        context.res = {
            status: 302,
            headers: {
                'Location': url
            },
            body: ''
        };
    } else {
        context.res = {
            status: 404,
            body: 'URL not found'
        };
    }
};
