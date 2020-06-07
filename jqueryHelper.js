class JqueryHelper {
    addScore(scoreValue) {
        $('.score').text(scoreValue);
    }

    setNewTileClass(tile) {
        $(tile).addClass('tile-new');
    }

    tileMerged(earlyTile) {
        $(earlyTile).addClass('tile-merged');
    }
}