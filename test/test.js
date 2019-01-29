/* eslint-disable no-undef */
const { expect } = require('chai');

const { detectEncoding, countGsm7bitEx, count } = require('./../counter');

const GSM_7BIT = 'GSM_7BIT';
const GSM_7BIT_EX = 'GSM_7BIT_EX';

describe('Encoding Detector', () => {
  it('Should return GSM_7BIT for all lowercase characters', () => {
    const encoding = detectEncoding('abcdefghijklmnopqrstuvwxyz');
    expect(encoding).to.equal(GSM_7BIT);
  });
  it('Should return GSM_7BIT for all uppercase characters', () => {
    const encoding = detectEncoding('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(encoding).to.equal(GSM_7BIT);
  });
  it('Should return GSM_7BIT numbers 0-9', () => {
    const encoding = detectEncoding('0123456789');
    expect(encoding).to.equal(GSM_7BIT);
  });
  it('Should return GSM_7BIT_EX if text has curly braces', () => {
    const encoding = detectEncoding('Hello {World}');
    expect(encoding).to.equal(GSM_7BIT_EX);
  });
  it('Should return GSM_7BIT_EX has tilder', () => {
    const encoding = detectEncoding('Hello~World');
    expect(encoding).to.equal(GSM_7BIT_EX);
  });
  it('Should return UTF16 when no input is given', () => {
    const encoding = detectEncoding();
    expect(encoding).to.equal('UTF16');
  });
});


describe(`Count ${GSM_7BIT_EX} characters`, () => {
  it('Should be One', () => {
    expect(countGsm7bitEx('{')).to.equal(1);
  });
  it('Should be equal to 5', () => {
    expect(countGsm7bitEx('{}~^[')).to.equal(5);
  });
});


describe('Count message', () => {
  it('should return an Object', () => {
    const res = count('Message');

    expect(typeof res).to.equal('object');
  });
  it('should have a message lenth of 6', () => {
    const res = count('Message');

    expect(res.length).to.equal(7);
  });
});
