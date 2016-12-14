"use strict";
var WIN=$(window);
var DOC=$(document);

var myNotepad={};
myNotepad["dayTime"]="白天";
myNotepad["dayTimeBg"]="#E9DFC7";
myNotepad["dayTimeStyle"]="nav-a3style2";
myNotepad["night"]="夜间";
myNotepad["nightBg"]="#0F1410";
myNotepad["nightStyle"]="nav-a3style1";
myNotepad["htmlF"]=14;
myNotepad["maxF"]=24;
myNotepad["minF"]=14;
myNotepad["stemp"]=2;
myNotepad["diyStyle1"]="nav-a2style1";
myNotepad["diyStyle2"]="nav-a2style2";
myNotepad["newNotepadFont"]="&nbsp;新建记事本&nbsp;";
myNotepad["cueInfo"]="暂无储存关于你信息哦~大千世界，精彩随手记。";
myNotepad["CUTime"]="新建\\更新时间：";
myNotepad["titleFont"]="title";
myNotepad["contentFont"]="content";

//操作DOM对象
var DOM={
	html:$("html"),
	body:$("body"),
	showTop:$("#js_showTop"),
	showBottom:$("#js_showBottom"),
	a2Show:$("#js_a2Show"),
	showBottomA1:$("#js_showBottomA1"),
	showBottomA2:$("#js_showBottomA2"),
	showBottomA3:$("#js_showBottomA3"),
	contentContainer:$("#js_contentContainer"),
	list:$("#js_list"),
	title:$("#js_title"),
	content:$("#js_content"),
	name:$("#name"),
	inputCheckbox:$("input[type='checkbox']"),
	showBgA:$("#js_showBg>a")
}
//用户信息对象
var useInfo={};
useInfo["fontSize"]=parseInt(localStorage.getItem("font-size"));
useInfo["bg"]=localStorage.getItem("background-color");
useInfo["bottomA3Style1"]=localStorage.getItem("showBottomA3-style1");
useInfo["bottomA3Style2"]=localStorage.getItem("showBottomA3-style2");
useInfo["bottomA3Text"]=localStorage.getItem("showBottomA3-text");

if(!useInfo.fontSize){useInfo.fontSize=myNotepad.htmlF;}
DOM.html.css("font-size",useInfo.fontSize+"px");
if(!useInfo.bg){useInfo.bg=myNotepad.dayTimeBg;}
DOM.body.css("background-color",""+useInfo.bg+"");
if(!useInfo.bottomA3Text){
	useInfo.bottomA3Style1=myNotepad.nightStyle;
	useInfo.bottomA3Style2=myNotepad.dayTimeStyle;
	useInfo.bottomA3Text=myNotepad.night;
}
DOM.showBottomA3.addClass(useInfo.bottomA3Style1).removeClass(useInfo.bottomA3Style2);
DOM.showBottomA3.contents().filter(function() { return this.nodeType === 3; }).text(useInfo.bottomA3Text);

var count=0;

//主入口函数
function main(){
	EventHanlder();
	selection();
}
/**
 * 各种事件绑定函数
 */
function EventHanlder(){
	//隐藏DIY窗口事件
		//1、滚动时隐藏
		WIN.on("scroll",function(){
			DOM.a2Show.hide();
			DOM.showBottomA2.addClass(myNotepad.diyStyle1).removeClass(myNotepad.diyStyle2);
		});
		//2、点击非下栏区域时隐藏
		$("#js_showTop,#body").on("click",function(){
			DOM.a2Show.hide();
			DOM.showBottomA2.addClass(myNotepad.diyStyle1).removeClass(myNotepad.diyStyle2);
		});
	//查看列表
	$("#js_showBottomA1,#js_showBottomA5").on("click",function(){refreshF("info");});
	//DIY
	$("#js_showBottomA2").on("click",function(){
		if(DOM.a2Show.css("display")=="none"){
			DOM.a2Show.show();
			$(this).addClass(myNotepad.diyStyle2).removeClass(myNotepad.diyStyle1);
		}else{
			DOM.a2Show.hide();
			$(this).addClass(myNotepad.diyStyle1).removeClass(myNotepad.diyStyle2);
		}
	});
	//白天/夜间切换
	$("#js_showBottomA3").on("click",function(){
		if(useInfo.bottomA3Text==myNotepad.night){
			$(this).removeClass(myNotepad.nightStyle).addClass(myNotepad.dayTimeStyle);
			$(this).text(myNotepad.dayTime);
			$(this).prepend("<i></i>");
			DOM.body.css("background-color",myNotepad.nightBg);
			localStorage.setItem("background-color",myNotepad.nightBg);
			localStorage.setItem("showBottomA3-style1",myNotepad.dayTimeStyle);
			localStorage.setItem("showBottomA3-style2",myNotepad.nightStyle);
			localStorage.setItem("showBottomA3-text",myNotepad.dayTime);
			useInfo.bottomA3Text=myNotepad.dayTime;
		}else if(useInfo.bottomA3Text==myNotepad.dayTime){
			$(this).removeClass(myNotepad.dayTimeStyle).addClass(myNotepad.nightStyle);
			$(this).text(myNotepad.night);
			$(this).prepend("<i></i>");
			DOM.body.css("background-color",myNotepad.dayTimeBg);
			localStorage.setItem("background-color",myNotepad.dayTimeBg);
			localStorage.setItem("showBottomA3-style1",myNotepad.nightStyle);
			localStorage.setItem("showBottomA3-style2",myNotepad.dayTimeStyle);
			localStorage.setItem("showBottomA3-text",myNotepad.night);
			useInfo.bottomA3Text=myNotepad.night;
		}
	});
	//背景切换
	$("#js_bgA1,#js_bgA2,#js_bgA3,#js_bgA4,#js_bgA5").on("click",function(){
		DOM.showBgA.removeClass("a-borderstyle");
		$(this).addClass('a-borderstyle');
		DOM.body.css("background-color",$(this).css("background-color"));
		localStorage.setItem("background-color",$(this).css("background-color"));
	});
	//字体大小调整
	$("#js_fontMax").on("click",function(){
		if(useInfo.fontSize>=myNotepad.maxF){
			return;
		}else{
			useInfo.fontSize+=myNotepad.stemp;
			DOM.html.css("font-size",useInfo.fontSize+"px");
			localStorage.setItem("font-size",useInfo.fontSize+"px");
		}
	});
	$("#js_fontMin").on("click",function(){
		if(useInfo.fontSize<=myNotepad.minF){
			return;
		}else{
			useInfo.fontSize-=myNotepad.stemp;
			DOM.html.css("font-size",useInfo.fontSize+"px");
			localStorage.setItem("font-size",useInfo.fontSize+"px");
		}
	});
	
	//新建记事本
	$("#js_create").on("click",function(){
		DOM.title.val("");
		DOM.content.val("");
		DOM.name.html(myNotepad.newNotepadFont);
		DOM.list.hide();
		DOM.contentContainer.show();
	});
	//删除记事本
	$("#js_delete").on("click",function(){
		if(ifRecordF()){
			$("#js_list>h2>input").show();
			$("#js_showBottomA1,#js_showBottomA2,#js_showBottomA3,#js_create").hide();
			DOM.showBottom.addClass("a2-showTemporary");
			$("#js_list>h2").attr("onclick"," ");
		}
	});
	//确定删除所选记录
	$("#js_showBottomA4").on("click",function(){
		var inputs=$("#js_list>h2>input");
		for(var i=0;i<inputs.length;i++){
			var boole=$(inputs[i]).prop("checked");
			console.log(boole);
			if(boole){
				var time=$(inputs[i].previousSibling).text().slice(myNotepad.CUTime.length);
				localStorage.removeItem(myNotepad.titleFont+time);
				localStorage.removeItem(myNotepad.contentFont+time);
			}
		}
		refreshF("delete");
	});
	//保存记事本的标题及内容到本地
	$("#js_save").on("click",function(){
		var title=DOM.title.val();
		if(title){
			var time=formatDate((new Date()),"yyyy-MM-dd hh:mm:ss")
			var content=DOM.content.val();
			for(var i in localStorage){
				if(localStorage.getItem(i)==title){
					localStorage.removeItem(i);
					localStorage.removeItem(myNotepad.contentFont+i.slice(myNotepad.titleFont.length),content);
				}
			}
			localStorage.setItem(myNotepad.titleFont+time,title);
			localStorage.setItem(myNotepad.contentFont+time,content);
		}
		refreshF("save");
	});
}
/**
 * 查询本地存储信息函数
 */
count=0;
function selection(info){
	var saveTimeT=[];//标题储存时的时间
	var saveTimeC=[];//内容储存时的时间
	count=0;
	var x=0;
	var y=0;
	if(ifRecordF()){
		for(var i in localStorage){
			if(i.indexOf(myNotepad.titleFont)!=-1){
				saveTimeT[x]=i.slice(myNotepad.titleFont.length);
				x++;
			}
			if(i.indexOf(myNotepad.contentFont)!=-1){
				saveTimeC[y]=i.slice(myNotepad.contentFont.length);
				y++;
			}
		}
		if(info){
			var small=$("#js_list>h2>small");
			for(var y=0;y<small.length;y++){
				var newSmall=$(small[y]).text();
				if(newSmall.slice(myNotepad.CUTime.length)==saveTimeT[y]){
					continue;
				}else{
					DOM.list.append("<h2 onclick='readInfoF(this)'>"+localStorage.getItem(myNotepad.titleFont+saveTimeT[y])+"<br/><small>"+myNotepad.CUTime+saveTimeT[y]+"</small><input type='checkbox'/></h2>");
				}
			}
		}else{
			for(var x=0;x<saveTimeT.length;x++){
				if(saveTimeT[x]==saveTimeC[x]){
					DOM.list.append("<h2 onclick='readInfoF(this)'>"+localStorage.getItem(myNotepad.titleFont+saveTimeT[x])+"<br /><small>"+myNotepad.CUTime+saveTimeT[x]+"</small><input type='checkbox' /></h2>");
				}
			}
		}
	}else{
		DOM.list.append(myNotepad.cueInfo);
	}
}
/**
 * 读取本地储存的记事本
 */
function readInfoF(obj){
	var h2Obj=$(obj).clone();
	h2Obj.find(":nth-child(n)").remove();
	DOM.name.html("&nbsp;"+$(h2Obj).text()+"&nbsp;");
	var cValue=$(obj).find("small").text().slice(myNotepad.CUTime.length);
	DOM.title.val(h2Obj.text());
	DOM.content.val(localStorage.getItem(myNotepad.contentFont+cValue));
	DOM.list.hide();
	DOM.contentContainer.show();
}
/**
 * 判断本地是否有用户储存记录
 */
function ifRecordF(){
	var boo=false;
	for(var key in localStorage){
		if(key.indexOf(myNotepad.titleFont)!=-1){
			return boo=true;
		}
	}
}
/**
 * 刷新页面
 */
function refreshF(info){
	history.go(0);//重新刷新本页面
	selection(info);
	DOM.contentContainer.hide();
	DOM.list.show();
}
/**
 * 时间格式化函数
 */
function formatDate (strTime) {
	function Appendzero (obj) {
		if (obj < 10) return "0" + obj; else return obj;
	}
	var date = new Date(strTime);
	return date.getFullYear()+"-"+Appendzero(date.getMonth()+1)+"-"+Appendzero(date.getDate())+" "+Appendzero(date.getHours())+":"+Appendzero(date.getMinutes())+":"+Appendzero(date.getSeconds());
}
main();