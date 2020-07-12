function sources(prefix, suffix) {
    /**
     * 1. hält Quellen in Array vor. 
     *      sofern prefix und suffix eingegeben werden, wird der Pfad unf Suffix gesetzt
     * Vearbeitet Dokumentennamen zu link.
     *  -> der Link wird zusammengestellt aus: [prefix][name][suffix] 
     *  -> link = [prefix: Pfad des Bildes][name: Dokumentennamen ohne Suffix][suffix: Suffix vom Dokumentennamen]
     * 
     * 2. ein Objekt kann mit const IrgendeinNamen = sources(prefix, suffix) erstell werden.
     * 
     * 3. hinzugefügt kann 
     *  -> mit CONST.addValue
     *  bei Bilder mit Pfad
     *  -> mit CONST.addName
     * 
     * 4. aufgerufen kann
     *  -> ein link mit CONST.getValue(item)
     */

    // Definiert die Arrays von link, Alttext und Infotext
    this.value = new Array();
    // Definiert den Prefix und Suffix von dem Link

    this.prefix = prefix;


    this.suffix = suffix;


    // lege entsprechenden Eintrag für Dokumentennamen an
    this.addLink = function(item) {
        // füge prefix und suffix in der Ausgabe hinzu
        this.value.push(this.prefix + item + this.suffix);
    }


    // lege entsprechenden Eintrag für Alttext an
    this.addValue = function(item) {
        this.value.push(item);
    }

    // Rufe Link auf 
    this.getValue = function(index) {
        return this.value[index];
    }
};

function insertWrapper() {
    /**
     * Prüft und Erstellt ein Wrapper innerhalb eines Eltern-Element
     * Sofern der Wrapper existiert, wird null ausgegeben
     * Erstell Objekt ohne Parameter.
     * 
     * [Objekt].addDiv(parentId, wrapperId)
     * @param {*} parentId = DOM-ID des Eltern Elements
     * @param {*} wrapperId = DOM-ID des Kind-Elements
     */
    // Füge div-Wrapper hinzu
    this.addDiv = function(parentId, wrapperId) {
        // Hole div-Wrapper
        let child = document.getElementById(wrapperId);
        // Prüfe div-wrapper nach vorkommen
        if (child === null) {
            // Hole Parant-Element
            let parent = document.getElementById(parentId);
            // Erstelle Child
            let wrapper = document.createElement('div');
            wrapper.setAttribute('id', String(wrapperId));
            // Erstelle Wrapper im Parent-Element
            parent.appendChild(wrapper);

        } else {
            // Gegenwert, wenn div-Wrapper exitiert
            parent = null;
        }
        /**
         * Result should be: addDiv:[object Window] ->
         * <aside id="'+parentId+'"><div id="wrapperId">
         */
        // console.log('addDiv:' + parent)
        return parent;
    }
}

// Prototype/Kontruktor zum Erstellen von Elementen 
function create(element) {
    /**
     * Erstellt ein HTML-Element
     * Sofern der Wrapper existiert, wird null ausgegeben
     * Erstellt Objekt mit Parameter
     * um Button zu erstellen:
     * @param {*} element = imgButton
     * 
     * um Überschrift zu erstellen:
     * @param {*} element = hn
     * 
     * um Paragraphen zu erstellen:
     * @param {*} element = button
     * 
     * erstelle Image-Button:
     * [Objekt].getImgButton(index, src, alt, srcOver, clickEvent)
     * @param {*} index = Nummer des Elements
     * @param {*} src = url von Background-Image
     * @param {*} alt = Alt-Namen, benutz in Aria-Label
     * @param {*} srcOver = url von Mouseover-Backgroundimage
     * @param {*} clickEvent = function(), welches das Event Bearbeitet, in Hochkomma
     * 
     * erstelle Header:
     * [Objekt].getImgButton(grade, id, hClass, headerText)
     * @param {*} grade = H1, H2, H3, H4, H5 oder H6
     * @param {*} id = ID
     * @param {*} hclass = CSS-Klasse
     * @param {*} headerText = Headertext
     * 
     * erstelle Paragraph:
     * [Objekt].getP(pClass, content)
     * @param {*} pClass = CSS Klasse
     * @param {*} headerText = HTML formatierte Text
     * 
     * erstelle Text-Button:
     * [Objekt].getTextButton(index, bClass, buttonInnerText, alt, clickEvent)
     * @param {*} index = Nummer des Elements
     * @param {*} bClass = CSS-Klasse oder null
     * @param {*} buttonInnerText = Reiner Text als Buttontext
     * @param {*} alt = Alt-Namen, benutz in Aria-Label
     * @param {*} clickEvent = function(), welches das Event Bearbeitet, in Hochkomma
     */
    // Element ist Button 
    if (element === 'imgButton') {
        // erstelle Image Button
        this.getImgButton = function(index, src, alt, srcOver, clickEvent) {
            // Erstelle ButtonID 
            let humanIndex = index + 1;
            let buttonId = 'button' + humanIndex;
            let dataId = 'imgbtn' + humanIndex;
            // Erstelle imgButton und setze Attribute
            let imgButton = document.createElement('button');
            // keine inneres HTML
            imgButton.innerHTML = "";
            // entsprechende css-ID
            imgButton.setAttribute('id', String(buttonId));
            // entsprechendes css-inlineStyle für Background-Image
            imgButton.setAttribute('style', 'background-image: url(' + src + ')');
            // entsprechende Data-ID
            imgButton.setAttribute('data-id', String(dataId));
            // entsprechende WAI-ARIA state attributes
            imgButton.setAttribute('aria-expanded', String(true));
            imgButton.setAttribute('aria-label', String(alt));
            imgButton.setAttribute('aria-pressed', String(false));
            // entsprechender event-Handler bei Klick: Aria-pressed: false bei klick hinzu
            // https://inclusive-components.design/toggle-button/
            imgButton.addEventListener('click', (e) => {
                let pressed = e.target.getAttribute('aria-pressed') === 'true';
                e.target.setAttribute('aria-pressed', String(!pressed));
                e.target.setAttribute('aria-expanded', String(!pressed))
            });
            // Füge event-Handler bei Klick hinzu: Infotext
            if (clickEvent === null) {
                imgButton.addEventListener('click', function() { showInfo(); }, false);
            } else {
                imgButton.addEventListener('click', function() { clickEvent }, false);
            }
            // Füge Event-Handler Mouseover hinzu: Ändere Backgroundimage
            imgButton.addEventListener('mouseover', function() {
                this.setAttribute('style', 'background-image: url(' + srcOver + ')');
            });
            // Füge Event-Handler Mouseout hinzu: Ändere Backgroundimage
            imgButton.addEventListener('mouseout', function() {
                this.setAttribute('style', 'background-image: url(' + src + ')');
            });
            /**
             * Result should be: [object HTMLButtonElement] ->
             * <button id="[]" style="background-image: url([])" data-id="[]" aria-expanded="true" aria-label="[]" aria-pressed="true"></button>
             */
            // console.log('getImgButton:' + imgButton)
            return imgButton;
        }
    }
    if (element === 'hn') {
        // erstelle Image Button
        this.getHeader = function(grade, id, hClass, headerText) {
            // Hole Existierenden DOM
            let hnExist = document.getElementById(id);
            // Erstelle Header
            let hn = document.createElement(grade);
            // entsprechende id 
            hn.setAttribute('id', String(id));
            // entsprechende CSS-Klasse
            if (hClass !== null) {
                hn.setAttribute('class', String(hClass));
            }
            // entsprechender Headertext
            hn.innerText = String(headerText);
            // Prüfe div-wrapper nach vorkommen
            if (hnExist === null) {
                header = hn;
            } else {
                // Gegenwert, wenn Header exitiert
                header = null;
            }
            /**
             * Result should be: [object H2Element] ->
             * <hn id="[]">[]</hn>
             */
            // console.log('getHeader:' + header)
            return header;
        };
    }
    if (element === 'p') {
        // erstelle Image Button
        this.getP = function(pClass, content) {
            // Erstelle Header
            let p = document.createElement('p');
            if (pClass !== null) {
                p.setAttribute('class', String(pClass));
            }
            // Erstelle Wrapper im Parent-Element
            p.innerHTML = content;
            /**
             * Result should be: [object HTMLParagraphElement] ->
             * <p class="[]">[]</p>
             */
            // console.log('getP:' + p)
            return p;
        };
    }
    if (element === 'textButton') {
        // erstelle Image Button
        this.getTextButton = function(index, bClass, buttonInnerText, alt, clickEvent) {
            // Erstelle ButtonID 
            let humanIndex = index + 1;
            let buttonId = 'button' + humanIndex;
            let dataId = 'imgbtn' + humanIndex;
            // Erstelle imgButton und setze Attribute
            let textButton = document.createElement('button');
            // Etnsprechender Text für den Button
            textButton.innerHTML = String(buttonInnerText);
            // entsprechende css-ID
            textButton.setAttribute('id', String(buttonId));
            // entsprechendes css-inlineStyle für Background-Image
            if (bClass !== null) {
                textButton.setAttribute('class', String(bClass));
            }
            // entsprechende Data-ID
            textButton.setAttribute('data-id', String(dataId));
            // entsprechende WAI-ARIA state attributes
            textButton.setAttribute('aria-expanded', String(true));
            textButton.setAttribute('aria-label', String(alt));
            textButton.setAttribute('aria-pressed', String(true));
            // entsprechender event-Handler bei Klick: Aria-pressed: false bei klick hinzu
            // https://inclusive-components.design/toggle-button/
            textButton.addEventListener('click', (e) => {
                let pressed = e.target.getAttribute('aria-pressed') === 'true';
                e.target.setAttribute('aria-pressed', String(!pressed));
                e.target.setAttribute('aria-expanded', String(!pressed));
            });
            // Füge event-Handler bei Klick hinzu
            if (clickEvent === null) {
                textButton.addEventListener('click', function() { closeInfo(); }, false);
            } else {
                textButton.addEventListener('click', function() { clickEvent }, false);
            }
            /**
             * Result should be: getImgButtonn:[object HTMLButtonElement] ->
             * <button id="[]" data-id="[]" aria-expanded="true" aria-label="[]" aria-pressed="true">[]</button>
             */
            // console.log('getTextButton:' + textButton)
            return textButton;
        };
    }
}