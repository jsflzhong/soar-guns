package com.stylefeng.guns.modular.soar.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.Soar;
import com.stylefeng.guns.modular.soar.service.ISoarService;

/**
 * SOAR检查控制器
 *
 * @author cj
 * @Date 2018-10-23 18:07:38
 */
@Controller
@RequestMapping("/soar")
public class SoarController extends BaseController {

    private String PREFIX = "/soar/soar/";

    @Autowired
    private ISoarService soarService;

    /**
     * 跳转到SOAR检查首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "soar.html";
    }

    /**
     * 跳转到添加SOAR检查
     */
    @RequestMapping("/soar_add")
    public String soarAdd() {
        return PREFIX + "soar_add.html";
    }

    /**
     * 跳转到修改SOAR检查
     */
    @RequestMapping("/soar_update/{soarId}")
    public String soarUpdate(@PathVariable Integer soarId, Model model) {
        Soar soar = soarService.selectById(soarId);
        model.addAttribute("item",soar);
        LogObjectHolder.me().set(soar);
        return PREFIX + "soar_edit.html";
    }

    /**
     * 获取SOAR检查列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return soarService.selectList(null);
    }

    /**
     * 新增SOAR检查
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Soar soar) {
        soarService.insert(soar);
        return SUCCESS_TIP;
    }

    /**
     * 删除SOAR检查
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer soarId) {
        soarService.deleteById(soarId);
        return SUCCESS_TIP;
    }

    /**
     * 修改SOAR检查
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Soar soar) {
        soarService.updateById(soar);
        return SUCCESS_TIP;
    }

    /**
     * SOAR检查详情
     */
    @RequestMapping(value = "/detail/{soarId}")
    @ResponseBody
    public Object detail(@PathVariable("soarId") Integer soarId) {
        return soarService.selectById(soarId);
    }
}
