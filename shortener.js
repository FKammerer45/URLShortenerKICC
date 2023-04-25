const { nanoid } = require('nanoid');
const urls = new Map();

exports.shorten = (req, res) => {
    const { url } = req.body;
    const id = nanoid(7);
    urls.set(id, url);
    res.json({ id, shortUrl: `https://${req.hostname}/${id}` });
};

exports.redirect = (req, res) => {
    const { id } = req.params;
    const url = urls.get(id);

    if (url) {
        res.redirect(url);
    } else {
        res.status(404).send('URL not found');
    }
};
