// установка заглавной буквы слова
export const setCapitalLetter = (str?: string) => {
  if (str) {
    return str[0].toUpperCase() + str.slice(1);
  } else {return str;}
};
