new App(document.querySelector('.app'));

function App(el) {
    var appEl = el,
        doors = [
            new Door(0, this.onOpen)
        ];

    function onOpen() {
        // redraw state
    };
}

function Door(number, onOpen) {
    var level = document.querySelector('.level_' + number),
        door = document.querySelector('.door_level_' + number),
        popup = document.querySelector('.popup_level_' + number),
        close = popup.querySelector('.popup__close');

    door.addEventListener('click', onDoorClick);
    close.addEventListener('click', onCloseClick);

    function onDoorClick() {
        openPopup();
    }

    function onCloseClick() {
        closePopup();
    }

    function openPopup() {
        popup.classList.remove('popup_hidden');
    }

    function closePopup() {
        popup.classList.add('popup_hidden');
    }
}
