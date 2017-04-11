var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
        first        : String,
        last         : String,
        address      : String,
        email        : String,
        password     : String,
        preferences  : {
            world: { type: Boolean, default: false },
            politics: { type: Boolean, default: false },
            money: { type: Boolean, default: false },
            opinion: { type: Boolean, default: false },
            health: { type: Boolean, default: false },
            entertainment: { type: Boolean, default: false },
            tech: { type: Boolean, default: false },
            style: { type: Boolean, default: false },
            travel: { type: Boolean, default: false },
            sports: { type: Boolean, default: false },
            us: { type: Boolean, default: false },
      },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);