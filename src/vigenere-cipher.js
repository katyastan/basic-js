const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    return this.process(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }
    return this.process(encryptedMessage, key, 'decrypt');
  }

  process(input, key, mode) {
    let result = '';
    input = input.toUpperCase();
    key = key.toUpperCase().repeat(Math.ceil(input.length / key.length));
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
      if (this.alphabet.includes(input[i])) {
        const inputPos = this.alphabet.indexOf(input[i]);
        const keyPos = this.alphabet.indexOf(key[keyIndex++ % key.length]);
        let newPos;
        if (mode === 'encrypt') {
          newPos = (inputPos + keyPos) % this.alphabet.length;
        } else {
          newPos =
            (inputPos - keyPos + this.alphabet.length) % this.alphabet.length;
        }
        result += this.alphabet[newPos];
      } else {
        result += input[i];
      }
    }
    return this.direct ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine,
};
