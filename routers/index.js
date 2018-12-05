const router = require('koa-router')({ prefix: '/' })
const User = require('../control/User')
const Auth = require('../tools/authenticate')
const crypto = require('crypto')
const ed25519 = require('ed25519')

router.get('/', async (ctx, next) => {
  
  ctx.body = keypair;
})


const mypassword = 'abcd123';
const hash = crypto.createHash('sha256', 'utf8').update(mypassword).digest()
const keyPair = ed25519.MakeKeypair(hash) // 生成秘钥对

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
var data = 'Hello, this is a secret message!'; // 传输信息
var msgCiphered = aesEncrypt(data, keyPair.publicKey); // 公钥加密

var signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), keyPair.privateKey); // 私钥签名


// 接收人
if (ed25519.Verify(new Buffer(msgCiphered, 'utf8'), signature, keyPair.publicKey)) {
  var msg = aesDecrypt(msgCiphered, keyPair.publicKey);
  console.log('Bob said: ', msg); //显示信息
} else {
	console.log('签名不合法！');
}


router.get('/login', Auth, User.login)
router.get('/signin', User.signin)
// router.get('/你的新页面地址', async (ctx, next) => {
//   await ctx.render('iview')
// })


module.exports = router