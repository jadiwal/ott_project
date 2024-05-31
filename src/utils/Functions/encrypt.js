var encrypt=(value)=>{
    try{
var crypto = require('crypto');
var mykey = crypto.createCipher('aes-128-cbc', 'yugelbac');
var mystr = mykey.update(value, 'utf8', 'base64')
mystr += mykey.final('base64');
return mystr;
    }
    catch{
        return '';
    }
}
// 48d0cb66d332157922c6ca1c3c65defd
export default encrypt;