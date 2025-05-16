
widgetNameIntr = function() {
    var widget = this;
    this.code = null;

    this.config = {
        targetId: 'status_id_24374824', в
        divSelector: 'div[id^="div_"]',
        styles: {
            color: "black",
            backgroundColor: "blue"
        }
    };

    // Инициализация событий
    this.bind_actions = function() {

    };

    // Применение стилей к элементу (вынесено в отдельный метод)
    this.applyStyles = function(element) {
        if (!element) return;

        Object.assign(element.style, widget.config.styles);

        Array.from(element.children).forEach(child => {
            Object.assign(child.style, widget.config.styles);
        });
    };


    this.findTargetElements = function() {
        return {
            mainElement: document.getElementById(widget.config.targetId),
            allDivs: document.querySelectorAll(widget.config.divSelector)
        };
    };


    this.render = function() {
        const {mainElement, allDivs} = widget.findTargetElements();

        console.log('Найдены элементы:', {
            allDivs: allDivs,
            mainElement: mainElement
        });

        if (mainElement) {
            widget.applyStyles(mainElement);
        } else {
            console.error(`Элемент с ID '${widget.config.targetId}' не найден`);
        }
    };

    // Инициализация (теперь с реальной логикой)
    this.init = function() {
        // Здесь можно загружать данные, стили и т.д.
        console.log('Виджет инициализирован');
    };

    // Загрузчик (без изменений)
    this.bootstrap = function(code) {
        widget.code = code;
        var status = 1; // В реальном коде получаем из yadroFunctions.getSettings(code)

        if (status) {
            widget.init();
            widget.render();
            widget.bind_actions();

            $(document).on('widgets:load', function() {
                widget.render();
            });
        }
    };
};

// Инициализация виджета
yadroWidget.widgets['widget-name'] = new widgetNameIntr();
yadroWidget.widgets['widget-name'].bootstrap('widget-name');