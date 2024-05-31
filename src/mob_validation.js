var mob_validation=(value)=>
{
var crypto = require('crypto');
var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update(value, 'base64', 'utf8')
mystr += mykey.final('utf8');
return mystr;
}

export default mob_validation;