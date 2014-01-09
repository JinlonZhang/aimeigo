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
            w.uploadForm = $('.j-uploadForm');
            w.del = $('.j-delete');
            w.clear = $('.j-clear');

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

            w.uploadForm.each(function(){
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

            //
            w.uploadForm.each(function(){
                new UI.AjaxUpload({
                    el: $(this),
                    success: function(o, dom){
                        app.common.ajaxCallBack(o, dom);
                    }
                })
            })
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

            w.del.data('opt', {
                text: '删除成功！',
                fn: function(){
                    window.location.reload();
                }
            })
            w.del.bind('click', function(){
                w.delClick( $(this) );
                return false;
            });

            w.clear.data('opt', {
                text: '清除成功！',
                fn: function(){
                    window.location.reload();
                }
            });

            w.clear.bind('click', function(){
                w.clearClick($(this));
                return false;
            })

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
        },

        delClick: function(dom){
            var w = this, url = dom.attr('href');

            if(window.confirm('确定删除？')){
                $.ajax({
                    type: 'delete',
                    url: url,
                    dataType: 'json',
                    success: function(o){
                        app.common.ajaxCallBack(o, dom);
                    }
                })
            }
        },

        clearClick: function(dom){

            if(window.confirm('确定清除7天之前的数据？')){
                $.ajax({
                    type: 'post',
                    url: '/api/item/clear',
                    dataType: 'json',
                    success: function(o){
                        app.common.ajaxCallBack(o, dom);
                    }
                })
            }
        }

    })
})(Das);