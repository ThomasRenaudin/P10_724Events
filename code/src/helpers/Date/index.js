
// Modification des indices des mois pour qu'ils coincident avec la date demandée

export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];

// Fonction pour obtenir l'année à partir d'une date
export const getYear = (date) => date.getFullYear();