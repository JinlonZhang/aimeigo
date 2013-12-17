/**
 * 通用dom绑定事件
 * allenxu on 2013-10-23.
 */

(function (D) {
    D.ns("app.bind");

    D.apply(app.bind, {

        init: function(data) {
            var w = this;



            w.form = $('.j-form');
            w.action = $('.j-action');
            w.pop = $('.j-pop');

            w.initHTML();
            w.initEvent();
        },

        initHTML: function(){
            var w = this;

            var defaultOpt = {
                /*fn: function(){
                    window.location.reload(true)
                }*/
            }

            w.form.each(function(){
                var f = $(this), opt = f.data('opt') || {}, optStr = f.attr('opt') || "{}";
                f.data('opt',
                    $.extend(
                        true,
                        {},
                        defaultOpt,
                        opt,
                        JSON.parse( optStr )
                    ));

                new UI.FormValidator({
                    el: f
                })
            })

            //下拉框 popup
            w.pop.each(function(){
                new UI.Popup({
                    el: $(this)
                })
            });
        },

        initEvent: function() {
            var w = this;

            //表单提交
            w.form.submit(function(){
                w.formSubmit( $(this) );
                return false;
            });
            w.form.each(function(){
                var f = $(this);
                f.find('.j-submit').click(function(){
                    w.formSubmit(f);
                });
            });

        },

        formSubmit: function(f){
            var w = this;

            f.trigger(FormValidatorEvent.SUBMIT, function(){
                $.ajax({
                    url: f.attr('action'),
                    type: f.attr('method'),
                    dataType: 'json',
                    data: f.serialize(),
                    success: function(o){
                        app.common.ajaxCallBack(o, f);
                    }
                })
            })
        }

    })
})(Das);