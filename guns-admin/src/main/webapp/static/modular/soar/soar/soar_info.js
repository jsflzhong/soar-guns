/**
 * 初始化SOAR检查详情对话框
 */
var SoarInfoDlg = {
    soarInfoData : {}
};

/**
 * 清除数据
 */
SoarInfoDlg.clearData = function() {
    this.soarInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SoarInfoDlg.set = function(key, val) {
    this.soarInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SoarInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SoarInfoDlg.close = function() {
    parent.layer.close(window.parent.Soar.layerIndex);
}

/**
 * 收集数据
 */
SoarInfoDlg.collectData = function() {
    this
    .set('id')
    .set('sql')
    .set('statement')
    .set('explanation')
    .set('createUser')
    .set('createDate')
    .set('updateUser')
    .set('updateDate');
}

/**
 * 提交添加
 */
SoarInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/soar/add", function(data){
        Feng.success("添加成功!");
        window.parent.Soar.table.refresh();
        SoarInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.soarInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SoarInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/soar/update", function(data){
        Feng.success("修改成功!");
        window.parent.Soar.table.refresh();
        SoarInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.soarInfoData);
    ajax.start();
}

$(function() {

});
