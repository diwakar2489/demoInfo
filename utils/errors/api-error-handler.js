const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
    // in prod, don't use console.log or console.err because
    // it is not async
    console.error(err);

    if (err instanceof ApiError) {
        if (err.code === 200) {
            res.status(err.code).json({
                status: true,
                msg: err.message
            });
            return;
        } else {
            res.status(err.code).json({
                status: false,
                msg: err.message
            });
            return;
        }
    }

    res.status(500).json({
        status:false,
        msg:'Internal Server Error'
    });
}

module.exports = apiErrorHandler;