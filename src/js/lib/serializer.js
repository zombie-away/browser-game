module.exports = {
    serialize: function (serializeObject, fields) {
        return fields.reduce(function (acc, field) {
            var data = serializeObject[field];
            if (data !== null && typeof data.serialize === 'function') {
                data = data.serialize();
            }
            acc[field] = data;

            return acc;
        }, {});
    }
};
