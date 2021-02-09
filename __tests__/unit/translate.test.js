const Translation = require("../../src/controllers/TranslateController");

describe("Translation Functions", () => {
  it("should validate a number: Exclude Not a Number characters and greater thean 5 digits", () => {
    const number = "-12*y57";
    const length = number.length;
    const isValid = Translation.isValid_number(number, length);

    expect(isValid).toBe(false);
  });

  it("should formart the word", () => {
    const word = "um mil e cento";
    const negative_number = true;
    const formarted_word = Translation.format_word(word, negative_number);

    expect(formarted_word).toBe("menos mil e cem");
  });

  it('should verifify and remove the minus "-" character from a negative number', () => {
    const number = "-3401";
    const negative_number = Translation.verify_negative_number(number);

    expect(negative_number[0]).toBe(true);
    expect(negative_number[1]).toBe("3401");
  });

  it("should get digit", () => {
    const number = "345";
    const position = 0;
    const digit = Translation.get_digit(number, position);

    expect(digit).toBe(3);
  });
  it("should convert number to word", () => {
    const number = "200";

    const word = Translation.convert_number_to_word(number);

    expect(word).toBe("duzentos");
  });
});

describe("Convertion", () => {
  it("sould convert a one digit number to word ", () => {
    const number = "1";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("um");
  });

  it("sould convert a two digit number to word ", () => {
    const number = "18";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("dezoito");
  });

  it("sould convert a three digit number to word ", () => {
    const number = "922";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("novecentos e vinte e dois");
  });

  it("sould convert a four digit number to word ", () => {
    const number = "2511";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("dois mil e quinhentos e onze");
  });

  it("sould convert a 5 digit number to word ", () => {
    const number = "81452";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("oitenta e um mil e quatrocentos e cinquenta e dois");
  });

  it("sould convert a negative number to word ", () => {
    const number = "-1042";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("menos mil e quarenta e dois");
  });

  it("sould not convert a invalid number to word ", () => {
    const number = "-1*4t6";
    const word = Translation.convert_number_to_word(number);
    expect(word).toBe("Invalid Number");
  });
});
