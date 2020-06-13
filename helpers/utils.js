export const getCookieFromReq = (req, cookieKey) => {
    const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieKey}=`));
  
    if (!cookie) { return undefined };
  
    return cookie.split('=')[1];
  }

 export const shortenText=(text,maxLenght=124)=>{
    if(text && text.length>maxLenght){
      return `${text.substring(0,maxLenght)}...`
    }
    return text;
  }