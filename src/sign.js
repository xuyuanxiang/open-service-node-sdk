// @flow
const crypto = require('crypto');

/**
 * @module open-service-node-sdk/lib/sign
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description 计算签名：sha1(sort(arg1, arg2, arg3...))
 * @example
 * const sign = require('open-service-node-sdk/lib/sign');
 *
 * const token = '123456';
 * const timestamp = new Date().getTime();
 * const nonce = 'abc123';
 * const encrypt = 'ol5ZdzGiGK9yXYIuKB0wb5I4DTnZwkNcuo0b3OZgCUNqMRIdb9mfsmjVEe5vJT+pp7M5kyY8lfxFGnrT/qr0UER9v+skaX5GQ59AEtILoe4=';
 *
 * const signature = sign(timestamp, nonce, token, encrypt); // 参数顺序随意
 * @param {...String} rest - 变长参数
 * @return {String} 签名
 */
module.exports = function sign(...rest: Array<string>): string {
  if (!Array.isArray(rest)
    || rest.length === 0) {
    return '';
  }
  // 将参数值按照字母生序排列，拼接为一个字符串。
  const params: string = rest.map((it) => String(it)).sort().join('');

  const sha = crypto.createHash('sha1');
  sha.update(params, 'utf8');
  return sha.digest('hex');
};
