import React from "react";
import Card from "./Card";
import api from "../utils/Api";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userProfession, setUserProfession] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()]).then(
      ([userInfo, cardInfo]) => {
        setUserName(userInfo.name);
        setUserProfession(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardInfo);
      }
    );
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          aria-label="редактировать аватар"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </button>
        <div className="profile__biography">
          <div className="profile__info">
            <h1 className="profile__name" id="profile__name">
              {userName}
            </h1>
            <p className="profile__profession" id="profile__profession">
              {userProfession}
            </p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="редактировать профиль"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
