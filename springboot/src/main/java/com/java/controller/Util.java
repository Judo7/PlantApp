package com.java.controller;

import com.java.utils.JsonBody;


public class Util {

	public static JsonBody SetMap(String msg, boolean  b)
	{
		JsonBody jb=new JsonBody();
		int code=b?0:1;
		String icon=b?"success":"error";
		jb.setCode(code);
		jb.setMsg(msg);
		jb.setSuccess(b);
		jb.setIcon(icon);
		return jb;
	}

	public static JsonBody SetOK(String msg)
	{
		JsonBody jb=new JsonBody();
		jb.setCode(0);
		jb.setMsg(msg);
		jb.setSuccess(true);
		jb.setIcon("success");
		return jb;
	}

	public static JsonBody SetError(String msg)
	{
		JsonBody jb=new JsonBody();
		jb.setCode(1);
		jb.setToken("");
		jb.setMsg(msg);
		jb.setSuccess(false);
		jb.setIcon("error");
		return jb;
	}

	public static JsonBody SetData(Object data, String msg)
	{
		JsonBody jb=new JsonBody();
		jb.setCode(0);
		jb.setMsg(msg);
		jb.setSuccess(true);
		jb.setIcon("success");
		jb.setData(data);
		return jb;
	}

	public static JsonBody SetData(Object data)
	{
		JsonBody jb=new JsonBody();
		jb.setCode(0);
		jb.setMsg("加载成功");
		jb.setSuccess(true);
		jb.setIcon("success");
		jb.setData(data);
		return jb;
	}
}


