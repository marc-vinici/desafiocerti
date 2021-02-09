// Constants for translation
const units = [
  "zero",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
];

const two_units = [
  "",
  "dez",
  "onze",
  "doze",
  "treze",
  "catorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
];

const tens = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa",
];

const hundreds = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos",
];

// This function validate only number characters
function isValid_number(num, l) {
  var regex = /^[0-9]+$/;
  const isValid = regex.test(num);
  const length = l;
  if (isValid && length <= 5) return true;
  else return false;
}
// This functions format and remove any unnecessary substring
function format_word(word, negative_number) {
  if (word.startsWith(" e")) word = word.replace(" e ", "");

  if (word.startsWith("um")) word = word.replace("um ", "");

  if (word.endsWith("e ")) word = word.slice(0, word.length - 3);

  if (word.endsWith("cento")) word = word.replace("cento", "cem");

  if (negative_number) word = "menos " + word;

  return word;
}
// This function verify and remove the minus "-" character fom negative numbers
function verify_negative_number(num) {
  const verified_number = [2];

  if (num.startsWith("-")) {
    verified_number[0] = true;
    verified_number[1] = num.slice(1, num.length);
  } else {
    verified_number[0] = false;
    verified_number[1] = num;
  }

  return verified_number;
}
// This function get the digit in the needed position
function get_digit(num, pos) {
  const number = num[pos].charCodeAt(0) - 48;
  return number;
}
// This functions convert the given number to word
function convert_number_to_word(num) {
  let word = "";
  let digit;
  let next_digit;
  let negative_number = false;
  let number;

  // Verify and remove the minus "-" from num
  number = verify_negative_number(num);
  negative_number = number[0];
  num = number[1];

  let l = num.length;

  // Exclude not a number characters
  if (!isValid_number(num, l)) return "Invalid Number";

  // Remove zeros;
  num = parseInt(num);
  num = num.toString();

  l = num.length;
  // get first digit from num
  digit = get_digit(num, 0);

  // Converte 1 digit length
  if (l == 1) {
    word += `${units[digit]}`;

    word = format_word(word, negative_number);
    return word;
  }

  // Iterate while num is not '\0'
  let x = 0;
  while (x < num.length) {
    digit = get_digit(num, x);

    // First 3 digits
    if (l >= 3) {
      switch (l) {
        // dezenzas de milhar: 20mil - 90mil
        case 5:
          if (digit != 0 && digit != 1) {
            word = word + `${tens[digit]}`;
          } else {
            // 10mil - 19mil
            next_digit = get_digit(num, x + 1);
            let sum = digit + next_digit;
            word += `${two_units[sum]}`;
            word += " mil";
            word += " e ";
            l -= 1;
            x += 1;
          }
          break;
        // uniodades de milhar: mil - 9mil
        case 4:
          if (digit != 0) {
            word += " e ";
            word += `${units[digit]}`;

            word += " mil";
            word += " e ";
          } else {
            word += " mil";
            word += " e ";
          }

          break;
        // centenas 100 - 900
        case 3:
          if (digit != 0) {
            word += `${hundreds[digit]}`;
            word += " e ";
          }
          break;
      }
      l -= 1;
    }
    //Last 2 digits
    else {
      next_digit = get_digit(num, x + 1);
      // dezenas 11 - 19
      if (digit == 1) {
        let sum = digit + next_digit;
        word = word + `${two_units[sum]}`;
        word = format_word(word, negative_number);

        return word;
      } else {
        // dezenas 20 - 90
        if (digit > 0) {
          word += `${tens[digit]}`;
          word += " e ";
        }

        x += 1;
        digit = get_digit(num, x);
        // unidades 0 - 9
        if (digit != 0) {
          word += `${units[digit]}`;
        }
      }
    }
    x += 1;
  }

  // Format the string berofe return it
  word = format_word(word, negative_number);

  return word;
}


  function translate(req, res) {
    try {

      const value = req.params.num;
      
      const word = convert_number_to_word(value);
      return res.json({ extenso: word });

    } catch (err) {

      return res.status(400).json({ error: `message: ${err.message}` });
    
    }
  }

module.exports = {translate, convert_number_to_word, get_digit, verify_negative_number, format_word, isValid_number};
