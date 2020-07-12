window.addEventListener('load', function() {

    const jsIndex = document.getElementsByClassName('js-index');
    // führe js nur auf Index aus 
    if (jsIndex.length !== 0) {
        /* Hinterlege sources */

        // Erzeuge Objekt: SideImages
        const imgSrc = new sources('../img/', '.jpg');
        // Füge BilderSrc für Side Images hinzu
        imgSrc.addLink('eins');
        imgSrc.addLink('zwei');
        imgSrc.addLink('drei');
        imgSrc.addLink('vier');
        // Erzeuge Objekt SideImages - Mouseover
        const imgOverSrc = new sources('../img/', '.jpg');
        // Füge "Mouseover" BilderSrc für Side Images hinzu
        imgOverSrc.addLink('eins_aktiv');
        imgOverSrc.addLink('zwei_aktiv');
        imgOverSrc.addLink('drei_aktiv');
        imgOverSrc.addLink('vier_aktiv');
        // Erzeuge Objekt: ALttexte für Side Images
        const imgAlt = new sources(null, null);
        // Füge Alttexte für Side Images hinzu
        imgAlt.addValue('Information HTML');
        imgAlt.addValue('Information CSS');
        imgAlt.addValue('Information Javascript');
        imgAlt.addValue('Informationen HTML / CSS / Javascript');
        /* Übergebe Bilder je nach Eintrag in Dokumentennanen */

        // Erzeuge Objekt Wrapper: side-ImageButtons
        const wrapper = new insertWrapper();
        // Erstelle Parent-Wrapper für side-ImageButtons
        wrapper.addDiv('aside', 'side_image_wrapper');
        // Erzeuge Objekt: Image-Button
        const imgButton = new create('imgButton');
        // rufe Parent von den mage-Button auf 
        let imgButtonContent = document.getElementById('side_image_wrapper');
        // Erkenne die Anzahl der Bilder
        if (imgSrc.value.length > 0) {
            // Erzeuge anhand der Anzahl von imgSrc mit imgAlt und srcOver Imagebutton und füge diese als Kinder hinzu
            imgSrc.value.forEach((src, index) => {
                let alt = imgAlt.getValue(index);
                let srcOver = imgOverSrc.getValue(index);
                // als Kind einfpgen
                imgButtonContent.appendChild(imgButton.getImgButton(index, src, alt, srcOver, null));
                // console.log(imgButton.getImgButton(index, src, alt, srcOver, 'showInfo();'));
                /**
                 * Result should be: getImgButtonn:[object HTMLButtonElement] ->
                 * <button id="[]" style="background-image: url([])" data-id="[]" aria-expanded="true" aria-label="[]" aria-pressed="true"></button>
                 */
                // console.log('imgButtonContent' + imgButtonContent)
                return imgButtonContent;
            });
        }

        console.log('All assets for index are loaded');
    }
})

// Erzeuge Objekt: Infotext Header
const infotextHdr = new sources(null, null);
// Füge HeaderContent für Side Images hinzu
infotextHdr.addValue('HTML');
infotextHdr.addValue('CSS');
infotextHdr.addValue('JavaScript');
infotextHdr.addValue('HTML/CSS/JavaScript');
// Erzeuge Objekt: Infotext Paragraph
const infotextP = new sources(null, null);
// Füge ParagraphContent für Side Images hinzu
infotextP.addValue('HTML dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat auch keine relevanz, und deswegen ist das egal. er dient lediglich als platzhalter. um mal zu zeigen, wie diese stelle der seite aussieht, wenn ein paar zeilen vorhanden sind. ob sich der text dabei gut fühlt, weiß ich nicht.');
infotextP.addValue('CSS dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat auch keine relevanz, und deswegen ist das egal. er dient lediglich als platzhalter. um mal zu zeigen, wie diese stelle der seite aussieht, wenn ein paar zeilen vorhanden sind. ob sich der text dabei gut fühlt, weiß ich nicht.');
infotextP.addValue('JavaScript dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat auch keine relevanz, und deswegen ist das egal. er dient lediglich als platzhalter. um mal zu zeigen, wie diese stelle der seite aussieht, wenn ein paar zeilen vorhanden sind. ob sich der text dabei gut fühlt, weiß ich nicht.');
infotextP.addValue('HTML/CSS/JavaScript dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat auch keine relevanz, und deswegen ist das egal. er dient lediglich als platzhalter. um mal zu zeigen, wie diese stelle der seite aussieht, wenn ein paar zeilen vorhanden sind. ob sich der text dabei gut fühlt, weiß ich nicht.');

// Methode, um Infotext einzublenden
function showInfo() {
    // Prüfe, ob Infotext Node existiert
    checkInfotext = document.getElementById('side_infotext_wrapper');
    if (checkInfotext !== null) {
        // Blende Infotextnode bei Klick aus, sollte er existieren
        checkInfotext.remove();
        // console.log('removed');
    } else {
        // Hole Data-Id aus Button
        let dataId = event.target.getAttribute('data-id');
        // Replace pattern aus dataID um CSS-ID / Klasse erstellen zu können
        humanId = dataId.replace(/imgbtn/i, '');
        // Subtrahiere 1 von humanId, um Objekt-Arrays aufrufen zu können
        indexId = humanId - 1;

        // Erzeuge Objekt Wrapper
        const wrapper = new insertWrapper();
        // Erstelle Parent von Infotext Node
        wrapper.addDiv('aside', 'side_infotext_wrapper');
        // Hole Infotext-Wrapper, um dem ein paar Kinder anzuhängen
        let infotextNode = document.getElementById('side_infotext_wrapper');
        // Erzeuge Objekt: Infotext-Header
        const infotextHeader = new create('hn');
        // Füge Infotext-Header als child ein
        infotextNode.appendChild(infotextHeader.getHeader('h2', 'infotext_header-' + humanId, null, infotextHdr.getValue(indexId)));
        // Erzeuge Objekt: Infotext-Paragraph
        const infotextParagraph = new create('p');
        // Füge Infotext-Paragraph als Child ein
        infotextNode.appendChild(infotextParagraph.getP('infotext-abschnitt-' + humanId, infotextP.getValue(indexId)));
        // Erzeuge Objekt: Infotext-close-Button
        const infotextClose = new create('textButton');
        // Füge Infotext-close-Button als child ein
        infotextNode.appendChild(infotextClose.getTextButton(humanId, 'infotext-button' + humanId, 'Schließe Info', 'close', null));
        // console.log('build');
    }
}
// Methode, um Infotext auszublenden
function closeInfo() {
    // hole Infotext Node
    checkInfotextWrapper = document.getElementById('side_infotext_wrapper');
    // Blende Infotext aus
    checkInfotextWrapper.remove();
    // console.log('removed');
}