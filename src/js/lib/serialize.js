module.exports = function (serializeObject, fields) {
    var obj = fields.reduce(function (acc, field) {
        var data = serializeObject[field];
        if (data !== null && typeof data.serialize === 'function') {
            data = data.serialize();
        }
        acc[field] = data;

        return acc;
    }, {});

    return JSON.stringify(obj);
};
