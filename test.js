widgetNameIntr = function() {
    var widget = this;
    this.code = null;
    this.yourVar = {};
    this.yourFunc = function() {};
    // вызывается один раз при инициализации виджета, в этой функции мы вешаем события на $(document)
    this.bind_actions = function(){
    };
    this.render = function() {
        /** думал может сделать фильтр для находждения всех
         * div  маске status_id_******
         * и потом выбрать рандомно и поменять стили
         * @type {string}
         */
        const div1_status = 'status_id_24374824';
        const div1 = document.getElementById(div1_status);
        if (div1) {
            const childs=div1.children;
            console.log(childs);
            for (let i = 0; i < childs.length; i++) {
                const child = childs[i];
                child.style.color = "black";
                child.style.backgroundColor ="blue";
            }

        } else {
            console.error("Элемент с ID '" + div1_status + "' не найден");
        }
    };
    // вызывается один раз при инициализации виджета, в этой функции мы загружаем нужные данные, стили и.т.п
    this.init = function(){

    };
    // метод загрузчик, не изменяется
    this.bootstrap = function(code) {
        widget.code = code;
        // если frontend_status не задан, то считаем что виджет выключен
        // var status = yadroFunctions.getSettings(code).frontend_status;
        var status = 1;

        if (status) {
            widget.init();
            widget.render();
            widget.bind_actions();
            $(document).on('widgets:load', function () {
                widget.render();
            });
        }
    }
};
yadroWidget.widgets['widget-name'] = new widgetNameIntr();
yadroWidget.widgets['widget-name'].bootstrap('widget-name');