import { md5 } from 'vux'

function paramsHandle(url, appId, token) {

  let urlStr = url.split('&').sort().join('&'),
    newUrl = `${urlStr}&token=${token}&appId=${appId}`;

  return md5(newUrl);
}

export function getSign(params, appId, token) {
  if (params && typeof params == 'string') {
    return paramsHandle(params, appId, token)
  } else if (typeof params == 'object') {
    let arr = [];

    for (let i in params) {
      arr.push(`${i}=${params[i]}`);
    }

    return paramsHandle(arr.join("&"), appId, token);
  }
}
