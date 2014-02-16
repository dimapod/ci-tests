var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CatSchema = new Schema({
    name: String
});

CatSchema.statics = {
    getAll: function (cb) {
        return this.find({}, cb);
    },
    findByName: function (name, cb) {
        return this.find({ name: new RegExp(name, 'i') }, cb);
    }
};

// Export the model
module.exports = mongoose.model('Cat', CatSchema);


