/**
 * Created by allenxu on 2013-11-30.
 * 保存成功的提示信息。
 */

(function(){
    _.ns('UI');

    var O = _.create();

    O.opt = {
        cls: 'u-msg',
        type: 'ok',
        text: '保存成功'
    }

    UI.Message = O;

    _.extend(UI.Base, O, {

        type: {
            'ok': '<i class="fa fa-check-circle fa-orange fa-18"></i>'
        },

        init: function(o){
            var w = this;

            O.__super__.init.call(this, o);

            w.initHTML();
        },

        initHTML: function(){
            var w = this;

            w.buildEl();
        },

        buildEl: function(){
            var w = this;

            var t = $('.u-msg');
            if(t.get(0)){
                w.el = t;
            }else{
                w.el = $('<div></div>');
                w.el.addClass(w.opt.cls);
                $(document.body).append(w.el);
            }
            w.hide();
        },

        setText: function(str){
            var w = this;

            w.el.html(w.type[w.opt.type] + (str || w.opt.text));
        },

        show: function(o){
            var w = this, opt = o.opt, param = o.param, timeout = opt.timeout || 2000;

            w.el.show();
            window.setTimeout(function(){
                w.hide();
                opt.fn && opt.fn(param);
            }, timeout);
        },

        hide: function(){
            var w = this;

            w.el.hide();
        }
    });
})();