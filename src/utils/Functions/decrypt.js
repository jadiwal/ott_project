function decrypt(value)
{
    try{
var crypto = require('crypto');
var mykey = crypto.createDecipher('aes-128-cbc', 'yugelbac');
var mystr = mykey.update(value, 'base64', 'utf8')
mystr += mykey.final('utf8');
return mystr;
    }catch{
        return '';
    }
}

export default decrypt;