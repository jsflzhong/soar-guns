/**
 * SOAR检查管理初始化
 */
var Soar = {
    id: "SoarTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Soar.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '源sql文', field: 'sql', visible: true, align: 'center', valign: 'middle'},
            {title: '对源sql文的说明', field: 'statement', visible: true, align: 'center', valign: 'middle'},
            {title: 'soar对sql文的解释', field: 'explanation', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'createUser', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'updateUser', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'updateDate', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Soar.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Soar.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加SOAR检查
 */
Soar.openAddSoar = function () {
    var index = layer.open({
        type: 2,
        title: '添加SOAR检查',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/soar/soar_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看SOAR检查详情
 */
Soar.openSoarDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: 'SOAR检查详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/soar/soar_update/' + Soar.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除SOAR检查
 */
Soar.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/soar/delete", function (data) {
            Feng.success("删除成功!");
            Soar.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("soarId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询SOAR检查列表
 */
Soar.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Soar.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Soar.initColumn();
    var table = new BSTable(Soar.id, "/soar/list", defaultColunms);
    table.setPaginationType("client");
    Soar.table = table.init();
});
