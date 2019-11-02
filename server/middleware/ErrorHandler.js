
var ErrorHandler = function (err, req, res, next) {
    console.log(err);
    if (!err.status) {
        return res.status(500).send({ Erreur: err.message });
    }
    return res.status(err.status).send({ Erreur: err.message });
};

module.exports = ErrorHandler;