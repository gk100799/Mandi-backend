const { dateToString } = require('../../helpers/date')

const transformResponse = item => {
    return { ...item._doc, _id: item.id, createdAt: dateToString(item._doc.createdAt), updatedAt: dateToString(item._doc.updatedAt) }
}
module.transformResponse = transformResponse