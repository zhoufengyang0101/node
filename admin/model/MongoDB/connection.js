const mongoose = require("mongoose")

const { connect } = require("../../assets/config/mongodb")

mongoose.connect(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose