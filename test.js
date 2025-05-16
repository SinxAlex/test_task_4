widgetNameIntr = function() {
    var widget = this;
    this.code = null;



    // Инициализация событий
    this.bind_actions = function()
    {

        const url_phone="http://letmegooglethat.com/?q=";
        const url_email="https://yandex.ru/search/?text";
        //самое просто обратиться к родительской форме
        // далее уже обратьстья к дочерней меню формы


        const inputs = document.querySelectorAll('[data-pei-code="email"],[data-pei-code="phone"]');
        console.log(inputs);
        let  uri_test;
        let  selectorType;

        $.each(inputs, function(key, elementInput) {
            const inputIns = elementInput.querySelector('input');
            if (!inputIns) {
                // console.log('Input не найден внутри элемента:', elementInput);
                return;
            }
            const value = inputIns.value.trim(); // Берём текущее значение
            if (value) {

                const type = checkInputType(value);
                if (!type) {
                    //   console.log('Неизвестный тип ввода:', value);
                    return;
                }

                const uri_test = type === "phone" ? url_phone : url_email;
                const selectorType = type;
                const parentDiv = inputIns.closest(`[data-pei-code="${selectorType}"]`);
                console.log(parentDiv);


                const childrenMenu = parentDiv.querySelector('.js-tip-holder');
                if (!childrenMenu) {
                    console.log('Элемент .js-tip-holder не найден в форме');
                    return;
                }

                const itemsDiv = childrenMenu.querySelector('.tips__inner');
                if (!itemsDiv) {
                    console.log('Элемент .tips__inner не найден');
                    return;
                }

                const newItem = `
                                                                        <div class="tips-item js-tips-item js-cf-actions-item" data-type="search_test" data-id="search_id" data-forced="" data-value="" data-suggestion-type="">       
                                                                            <span class="tips-icon-container">
                                                                                <span class="tips-icon tips-svg-icon">
                                                                                    <svg class="svg-icon svg-common--copy-dims">
                                                                                        <use xlink:href="#common--filter-search"></use>
                                                                                    </svg>
                                                                                </span>
                                                                            </span>
                                                                            Нагуглить
                                                                        </div>
                                                                    `;

                console.log("тут:"+value);
                itemsDiv.insertAdjacentHTML('beforeend', newItem);
                const addedItem = itemsDiv.lastElementChild;
                addedItem.addEventListener('click', function() {
                    window.open(`${uri_test}${value}`, '_blank');
                });




            }


        });




    };


    function checkInputType(input) {
        if (!input || typeof input !== 'string') return 'unknown';

        const str = input.trim();
        if (str.length === 0) return 'unknown';

        // Более строгая проверка email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Удаляем все нецифровые символы (кроме + в начале)
        const phoneDigits = str.replace(/[^\d+]/g, '');

        // Проверка телефона (между 7 и 15 цифрами, может начинаться с +)
        const isPhone = /^\+?\d{7,15}$/.test(phoneDigits);

        // Проверка email
        const isEmail = emailRegex.test(str);

        if (isEmail) return 'email';
        if (isPhone) return 'phone';
        return 'unknown';
    }

    // Применение стилей к элементу (вынесено в отдельный метод)


    // Основная логика рендеринга
    this.render = function() {

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