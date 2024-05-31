import encrypt from "utils/Functions/encrypt";

function encrypt_key_loop(obj)
{
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
                obj[key]=encrypt(obj[key]);
        }
      }
      return obj;
}
export default encrypt_key_loop;