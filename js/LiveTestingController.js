define([
    'urlHosted/BaseController'
  , 'urlHosted/dom-tool'
], function(
    Parent
  , dom
) {
    "use strict";
    var createElement = dom.createElement
      , createElementfromMarkdown = dom.createElementfromMarkdown
      ;

    var defaults = {
        // you have to set up the css yourself
        // NOTE: the key will be stored in the URL, so make sure that it
        // can stay forever the way you define it and that keeps its meaning ...
        // The CSS class can change (or how font's are actually configured
        // and activated)
        fonts: {key: 'cssClassToActivate'}
    };

    function LiveTestingController(hostElement, config) {
        Parent.call(this, hostElement, Parent.makeConfig(config, defaults));
    }

    var _p = LiveTestingController.prototype = Object.create(Parent.prototype);
    _p.constructor = LiveTestingController;

    _p._createInputs = function() {
        var fonts = []
          , textDirs = [
                createElement('option', {value: 'ltr'}, 'left to right')
              , createElement('option', {value: 'rtl'}, 'right to left')
            ]
          , k
          ;

        for(k in this._config.fonts)
            fonts.push(createElement('option', {value: k}
                                                , this._config.fonts[k]));

        return {
            font: createElement('select', {'class': 'input-font'}, fonts)
          , textDir: createElement('select', {'class': 'input-textdir'}, textDirs)
          , lang: createElement('input', {type: 'text', 'class': 'input-lang', size: 4
                            , placeholder: 'English: en; Arabic: ar; etc.'})
          , content: createElement('textarea', {'class': 'input-content'
                            , placeholder: 'Enter Markdown or HTML'})
        };
    };

    /**
     * Read data from the objects created in _createInputs
     *
     * Return key->value pairs where the values should be strings or
     * behave well when being casted to strings.
     */
    _p._readData = function(inputElements) {
        return {
            font: inputElements.font.value
          , textDir: inputElements.textDir.value
          , lang: inputElements.lang.value
          , content: inputElements.content.value
        };
    };

    /**
     * Write data to the objects created in _createInputs.
     * NOTE: this is user input, so be careful with the data.
     */
    _p._writeData = function(inputElements, data) {
        inputElements.font.value = data.font;
        inputElements.textDir.value = data.textDir;

        inputElements.lang.value = data.lang
            ? data.lang + ''
            : ''
            ;
        inputElements.content.value = data.content
            ? data.content + ''
            : ''
            ;
    };

    /**
     * Return an object with key value pairs of {name: html-element}
     *
     * The keys of data correspond with the keys of the return value of _createInputs
     * plus, if used, a date or null at this._config.lastGeneratedKey.
     *
     * This method will be called initially and for each update i.e. these
     * elements are replaced on each update.
     */
    _p._createDisplays = function(data) {
        var k;
        if(this._articleElement) {
            // initially article _articleElement does not exist when this
            // method is called.
            this._articleElement.setAttribute('dir', data.textDir);
            this._articleElement.setAttribute('lang', data.lang);

            for(k in this._config.fonts)
                if(k !== data.font)
                    this._articleElement.classList.remove(this._config.fonts[k]);
            this._articleElement.classList.add(this._config.fonts[data.font]);
        }

        return {
            content: createElementfromMarkdown('div', {'class': 'display-content'}
                          , data.content || "")
          , date: createElement(
                            'time'
                          , {
                                'class': 'display-date'
                              , datetime: data.date && data.date.toISOString() || ''
                            }
                          , data.date || ''
            )
        };
    };


    return LiveTestingController;
});
