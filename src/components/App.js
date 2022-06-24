import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()]).then(
      ([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      }
    );
  }, []);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }
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

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about).then((user) => {
      setCurrentUser(user);
      closePopups();
    });
  }
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar).then((user) => {
      setCurrentUser(user);
      closePopups();
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link).then((res) => {
      setCards([res, ...cards]);
      closePopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlaceSubmit}
        />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
