import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Définition du nombre d'events par page

const PER_PAGE = 9;

// Definition du composant event list

const EventList = () => {
  const { data, error } = useData(); // Récupération des données d'event .json
  const [type, setType] = useState(); // Gestion du type des évenements récupérés
  const [currentPage, setCurrentPage] = useState(1);

  // Gestion du filtrage des évènements

// Création de la variable filteredEvents pour stocker les événements filtrés
const filteredEvents = (
  // Opérateur pour vérifier si le type est défini 
  (!type
      // Si le type n'est pas défini, utiliser tous les événements du contexte data
  ? data?.events
  // Si le type est défini, filtrer les événements en fonction du type CORRECTION DU BUUUG !!!!
  : data?.events.filter((event) => event.type === type)) || []
  // Appliquer la méthode filter pour effectuer un filtrage supplémentaire
).filter((event, index) => {
  // Condition pour déterminer si l'événement doit être inclus dans les résultats filtrés
  if (
    // Vérifier si l'index de l'événement est dans la plage de la page actuelle
    (currentPage - 1) * PER_PAGE <= index &&
    PER_PAGE * currentPage > index
  ) {
    // Retourner true si la condition est satisfaite, ce qui inclura l'événement dans les résultats filtrés
    return true;
  }
  // Retourner false si la condition n'est pas satisfaite, excluant l'événement des résultats filtrés
  return false;
});


// Fonction de mise à jour du type d'évenement affiché
  const changeType = (evtType) => {
    console.log("Le changement de valeur vient de passer dans la fonction changeType");
    setCurrentPage(1);
    setType(evtType);
    console.log("Liste des événements après changement du type :", filteredEvents);
  };

// Calcul du nombre de pages nécessaires pour afficher tous les évenements
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

// Récupère les types extraits d'event .json et en établi la liste pour filtration ultérieure
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
    {/* Gestion des erreurs de chargement */}
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
        {/* Définition du bouton de choix de catégories */}
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => {
              changeType(value);
              console.log("La valeur est injectée :", value);
            }}
          />
          {/* Affichage des évènements */}
          <div id="events" className="ListContainer">
            {/* Attribution d'un EventCard a chacun des éléments de filteredEvents */}
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Pagination */}
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
