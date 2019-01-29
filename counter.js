
const gsm7bitChars = "@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";

const gsm7bitExChar = '\\^{}\\\\\\[~\\]|€';

const gsm7bitRegExp = RegExp(`^[${gsm7bitChars}]*$`);

const gsm7bitExRegExp = RegExp(`^[${gsm7bitChars}${gsm7bitExChar}]*$`);

const gsm7bitExOnlyRegExp = RegExp(`^[\\${gsm7bitExChar}]*$`);

const GSM_7BIT = 'GSM_7BIT';

const GSM_7BIT_EX = 'GSM_7BIT_EX';

const UTF16 = 'UTF16';

const messageLength = {
  GSM_7BIT: 160,
  GSM_7BIT_EX: 160,
  UTF16: 70,
};

const multiMessageLength = {
  GSM_7BIT: 153,
  GSM_7BIT_EX: 153,
  UTF16: 67,
};

function detectEncoding(text) {
  if (typeof text === 'undefined') {
    return UTF16;
  }
  switch (false) {
    case text.match(gsm7bitRegExp) == null:
      return GSM_7BIT;
    case text.match(gsm7bitExRegExp) == null:
      return GSM_7BIT_EX;
    default:
      return UTF16;
  }
}

function countGsm7bitEx(text) {
  const results = [];
  const chars = text.split('');

  chars.forEach((char) => {
    if (char.match(gsm7bitExOnlyRegExp) != null) {
      results.push(char);
    }
  });

  return results.length;
}

function count(text) {
  let perMessage;
  let remaining;
  const encoding = detectEncoding(text);
  // eslint-disable-next-line prefer-destructuring
  let length = text.length;
  if (encoding === GSM_7BIT_EX) {
    length += countGsm7bitEx(text);
  }
  perMessage = messageLength[encoding];
  if (length > perMessage) {
    perMessage = multiMessageLength[encoding];
  }
  const messages = Math.ceil(length / perMessage);
  remaining = (perMessage * messages) - length;
  if (remaining === 0 && messages === 0) {
    remaining = perMessage;
  }
  const total = {
    encoding,
    length,
    perMessage,
    remaining,
    messages,
  };

  return total;
}


module.exports = {
  detectEncoding,
  countGsm7bitEx,
  count,
};
