package com.java.controller;

import com.java.utils.JsonBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

;

@RestController
public class IndexController {


    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping("index")
    public JsonBody index() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("thingtype", new ArrayList<>());
        map.put("thingtype2", new ArrayList<>());


        return Util.SetData(map);

    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping("config")
    public JsonBody config() {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("thingtype", new ArrayList<>());
        map.put("thingtype2", new ArrayList<>());
        return Util.SetData(map);

    }
}
