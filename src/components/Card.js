import React from "react";

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="card__location">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className="card__like-button"
            aria-label="Лайк"
          ></button>
          <span className="card__like-number">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className="card__delete-button"
        aria-label="Удалить"
      ></button>
    </article>
  );
}

export default Card;
