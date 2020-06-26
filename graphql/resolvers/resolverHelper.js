const { dateToString } = require('../../helpers/date')

const transformResponse = item => {
    return { ...item._doc, _id: item.id, interest: item.interest, createdAt: dateToString(item._doc.createdAt), updatedAt: dateToString(item._doc.updatedAt) }
}
exports.transformResponse = transformResponse