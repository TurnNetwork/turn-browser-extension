import {base_api_url,base_api_url_pro} from './../config'
import store from 'src/main/store';
let baseUrl = base_api_url


const queryScanUrl = ()=>{
  let sSlice:any = store.getState().networkSlice
  sSlice = sSlice.value
  sSlice = sSlice.filter((v:any)=>v.active)
  if(process.env.NODE_ENV == 'development'){
    if(sSlice[0].scanUrl == 'http://scan.bubbonet.com') {
      baseUrl = base_api_url_pro
    }else{
      baseUrl = base_api_url
    }
    return
  }
  baseUrl = sSlice[0].scanUrl
}

async function fetchWrapper(
  url: string,
  options: RequestInit = {}
): Promise<any> {
 try{
      queryScanUrl()
    const headers = new Headers(options.headers || {});
    
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });
  
    // Part 3: Handle the received response
    if (response.ok) {
      // If the status code is 200, convert data structure according to Content-Type
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else if (contentType && contentType.includes("text/plain")) {
        return await response.text();
      } else {
          return await response
        // Manage other Content-Type cases or when Content-Type is absent
      }
    } else {
      // Handle other non-200 status codes as needed
      throw new Error(`Request failed with status ${response.status}`);
    }
 }catch(e){
    return Promise.reject(e)
 }
}

const fetchHeader = {'Content-Type': 'application/json'}
export const historyGameList = async (data:any)=>{
  try{
    return await fetchWrapper(`/browser-server/addrGame/list`,{
                method: 'post',
                headers: fetchHeader,
                body: JSON.stringify(data)
        })
  }catch(e){
    return Promise.reject(e)
  }
}