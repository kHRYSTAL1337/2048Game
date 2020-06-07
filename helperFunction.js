class Helper {
    randomStartTile() {
        return Math.random() < 0.9 ? 2 : 4;
    }

    compare(firstTile, secondTile) {
        return firstTile.getAttribute('val') == secondTile.getAttribute('val');
    }

    clearStage() {
        let tileContainer = document.querySelector('#playfield');
        while (tileContainer.firstChild) {
            tileContainer.removeChild(tileContainer.firstChild);
        }
    }
}