widgetNameIntr = function() {
    var widget = this;
    this.code = null;


    const url_phone="http://letmegooglethat.com/?q=";
    const url_emal="https://yandex.ru/search/?q";
    //этот класс содержит меню для действий с контактными данными
    const subMenu='.js-tip-holder';

    // Инициализация событий
    this.bind_actions = function()
    {
        //самое просто обратиться к родительской форме
        // далее уже обратьстья к дочерней меню формы


        const inputs = document.querySelectorAll('input[class*="phone"], input[class*="email"]');
        let uri_test;
        let  selectorType;

        $.each(inputs,function(key,elementInput){
            const value=elementInput.value;
            if(value!='')
            {


                if(checkInputType(value)==="phone"){
                    uri_test=url_phone;
                    selectorType="phone";

                }
                if(checkInputType(value)==="email"){
                    uri_test=url_emal;
                    selectorType="email";
                }

                //если есть какое то значение то обращаемя к родителю
                // чтобы найти дочерний элемент который привязан к форме
                //.js-tip-holder
                // не смог
                const parentForm=elementInput.closest(`[data-pei-code="${selectorType}"]`);;
                const childrenMenu = parentForm.querySelector('.js-tip-holder');

                if (childrenMenu)
                {
                    console.log(parentForm);
                    const itemsDiv=childrenMenu.querySelector('.tips__inner')
                    if(itemsDiv)
                    {
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

                        // Добавляем новый элемент внутрь div с классом js-inner
                        itemsDiv.insertAdjacentHTML('beforeend', newItem);
                    }

                    console.log('Найден .js-tip-holder:', childrenMenu);
                } else {
                    console.log('Элемент .js-tip-holder не найден в форме');
                }
                document.querySelector('[data-type="search_test"]').addEventListener('click', function() {
                    window.open(`${uri_test}${encodeURIComponent(value)}`, '_blank');
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