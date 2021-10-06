/*
    학번: 2017106119
    이름: 염상권
*/

const crypto = require('crypto');

// 암호화 키
const key = 'keykeykeykeykeyk';

// nonce 값
const nonce = crypto.randomBytes(12);

// 연관 데이터
const aad = Buffer.from('0123456789', 'hex');

// aes 128 ccm 암호화 객체 생성 16 바이트
const cipher = crypto.createCipheriv('aes-128-ccm', key, nonce, {
    authTagLength: 16,
});

//평문 데이터
const plaintext = 'Hello, world';

// add 추가
cipher.setAAD(aad, {
    plaintextLength: Buffer.byteLength(plaintext),
});

// 평문 암호화
const ciphertext = cipher.update(plaintext, 'utf8');

// 암호화 완료
cipher.final();

// 최종 암호화
const tag = cipher.getAuthTag();

// 암호화
console.log(`암호화: ${ciphertext.toString('hex')}, 태그: ${tag.toString('hex')}, nonce: ${nonce.toString('hex')}, aad: ${aad.toString('hex')}`);
