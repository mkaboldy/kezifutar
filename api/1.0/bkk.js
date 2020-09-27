module.exports = (router) => {

    router.get('/departuresdemo', (req, res) => {
        res.json();
    });

    router.get('/locationsdemo', (req, res) => {
        res.json();
    });

    router.get('*', (req, res) => {
        res.json();
    });

    return router;

};