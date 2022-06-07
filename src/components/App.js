import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false);
  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  const [isAddPlaceOpen, setAddPlaceOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  const [isImageOpen, setImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  function handleCardClick(card) {
    setImageOpen(true);
    setSelectedCard(card);
  }

  function closePopups() {
    setEditProfileOpen(false);
    setEditAvatarOpen(false);
    setAddPlaceOpen(false);
    setImageOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="root">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfileOpen}
        onClose={closePopups}
      >
        <input
          className="popup__input popup__input_profile_name"
          id="name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          type="text"
          placeholder="Имя"
        />
        <span
          className="error-message error-message_visible"
          id="error-name"
        ></span>
        <input
          className="popup__input popup__input_profile_profession"
          id="profession"
          name="profession"
          required
          minLength="2"
          maxLength="200"
          type="text"
          placeholder="Профессиональная деятельность"
        />
        <span
          className="error-message error-message_visible"
          id="error-profession"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarOpen}
        onClose={closePopups}
      >
        <input
          className="popup__input popup__input_avatar"
          id="avatar"
          name="avatar"
          required
          type="url"
          placeholder="Ссылка на аватар"
        />
        <span
          className="error-message error-message_visible"
          id="error-avatar"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="new-card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlaceOpen}
        onClose={closePopups}
      >
        <input
          className="popup__input popup__input_location_name"
          id="title"
          name="name"
          required
          minLength="2"
          maxLength="30"
          type="text"
          placeholder="Название"
        />
        <span
          className="error-message error-message_visible"
          id="error-title"
        ></span>
        <input
          className="popup__input popup__input_location_link"
          id="link"
          name="link"
          required
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span
          className="error-message error-message_visible"
          id="error-link"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImageOpen}
        onClose={closePopups}
      />
    </div>
  );
}

export default App;
