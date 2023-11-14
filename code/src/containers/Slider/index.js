import { useEffect, useState} from "react";
import { useData } from "../../contexts/DataContext"; // Récupère les données de events.json
import { getMonth} from "../../helpers/Date"; // Permet de renvoyer les noms des mois

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  // Gestion de l'index

  // Initialisation de l'index du caroussel "state" à zéro
  const [index, setIndex] = useState(0);

  // Tri des dates pour priorité affichage, renvoie le tableau byDateDesc
  // Rajout de l'option tableau vide
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

console.log(byDateDesc);

  const nextCard = () => {
    setTimeout(
      // Correction du bug de page blanche en ajoutant -1 a byDateDesc
      () => setIndex(index < byDateDesc.length-1 ? index  + 1 : 0),
      5000
    );
  };

  useEffect(() => {
     nextCard();
  });



  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout d'une div globale du slider dans laquelle insérer une keys
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}
                </div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Ajout d'une clef sur l'input
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // Correction de l'erreur de coche des input remplacement d'idx par index
                  checked={index === radioIdx}
                  // Ajout readOnly selon demande console
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
