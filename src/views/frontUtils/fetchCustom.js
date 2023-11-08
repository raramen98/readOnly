/**
 * 
 * @param {string} url api_url
 * @param {string} method GET | POST | PUT | DELETE
 * @param {object} data 백엔드에 보내기 위한 데이터(default = null)
 * @param {string} token jwt_token(default = '')
 * @returns 
 */
async function fetchCustom(url,method,token = '',data = null) {
  let query = ''
  const headers = {
    "Content-Type": "application/json",
  }
  if(token){
    headers.authorization = 'Bearer ' + token;
  }
  const option = {
    method: method,
    headers:headers
  };
  if(method == ('GET'||'get')){
    if(data){
      query = '?'+Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
    }
  }else if(method == ('POST'||'post'||'PUT'||'put'||'DElETE'||'delete')){
    option.body = JSON.stringify(data);
  }
  return fetch(url+query,option);
}