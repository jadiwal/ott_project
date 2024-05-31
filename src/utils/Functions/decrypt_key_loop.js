import decrypt from "./decrypt";
function decrypt_key_loop(obj)
{
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            try{
            obj[key]=JSON.parse(decrypt(obj[key]));
            }
            catch{
                obj[key]=decrypt(obj[key]);
            }
        }
      }
      return obj;
}
export default decrypt_key_loop;