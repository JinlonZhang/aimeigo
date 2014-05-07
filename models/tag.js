/**
 * models of tag.标签
 * Created by allenxu on 14-5-7.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({

    item_type: String,  //属于哪个大类[0=不属于任何列表，1=女装，2=鞋子，3=包包]
    type: String,       //类别[1=类型，2=风格，3=流行元素，4=身材，5=场景]
    name: String,       //名称
    isShow: {type: Boolean, default: false},    //是否显示。根据不同的季节，选择显示不同的标签

    click_total: {type: Number, default: 0}  //点击计数
})

mongoose.model('Tag', TagSchema);