//先判断浏览器版本是否时ie8以下浏览器
(function(window){var theUA=window.navigator.userAgent.toLowerCase();if((theUA.match(/msie\s\d+/)&&theUA.match(/msie\s\d+/)[0])||(theUA.match(/trident\s?\d+/)&&theUA.match(/trident\s?\d+/)[0])){var ieVersion=theUA.match(/msie\s\d+/)[0].match(/\d+/)[0]||theUA.match(/trident\s?\d+/)[0];if(ieVersion<8){var str="你的浏览器版本太low了\n已经和时代脱轨了 :(";var str2="推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:#cc0'>谷歌</a>,"+"<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:#cc0'>火狐</a>,"+"<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%8C%8E%E8%B1%B9%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:#cc0'>猎豹</a>,其他双核急速模式";document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>"+"<h2 style='padding-top:200px;margin:0'><strong>"+str+"<br/></strong></h2><p>"+str2+"</p><h2 style='margin:0'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");document.execCommand("Stop")}}})(window);
//先判断浏览器版本是否时ie8以下浏览器

//公共提示
function show_msg(msg,stay){
    $(".show_msg_box").remove();
    stay=stay?stay:3000;
    var show_box = "<div class='show_msg_box'><p class='show_msg'>"+ msg +"</p></div>";
    $("body").append(show_box);
    $(".show_msg_box").stop(true,true).fadeIn(3000);
    $(".show_msg_box").stop(true,true).fadeOut(stay)
};
//公共提示 show_msg("信息未完善！",3000);

//移入移出
function hiddenShow(hideA,hidePancel){
    $(document).on("mouseover",hideA,function(){$(this).children(hidePancel).stop().fadeIn("slow");});
    $(document).on("mouseleave",hideA,function(){$(this).children(hidePancel).stop().fadeOut("slow");});
};
//移入移出

$(function(){
// 根据窗口高度调整应聘信息弹出框高度大小
var WH = $(window).height();
var WW = $(window).width();
var conHeader = $(".conHeader").outerHeight();   //获取头部固定栏高度
var contactsBox2H = $(".contactsBox2H").outerHeight();  //获取联系人设置里联系人信息和自定义字段高度
var tempH = $(".tempH").outerHeight(); //获取模板列表header高度
var w24 = $(".w24bf").width();
var loginH = $("#login").height();
var registerH = $("#register").height();
$(".MinH").css("height",WH-conHeader-10);
$(".MinH2").css("height",WH-conHeader-10);
$(".contactsMsg").css("height",WH-conHeader-contactsBox2H-12); //联系人设置
$("#tempBoxWrap").css("height",WH-conHeader-tempH-12);  //模板列表
$(".MinH_h").css("height",WH-conHeader-52);  //联系人列表
$(".concactsAssessWrap").css("height",WH-conHeader-62);  //供应商评估
$("#productListMsg").css("height",WH-conHeader-122);  //收件箱 详情
$("#productListMsgB").css("height",WH-conHeader-47);  //收件箱 详情
$("#classifyUl").css("height",WH-conHeader-54);  //收件箱 详情
$("#changList").css("left",w24 + 220)
$("#contableWrapList").css("height",WH - conHeader - 141);
$("#dragTableWrap").css("height",WH - conHeader - 200);//编辑页面表格高度
$("#dragTableWrap02").css("height",WH - conHeader - 60);//编辑页面表格高度
$("#BasicInfoWrap").css("height",WH - conHeader - 50);//设置页面退出按钮盒子高度
$("#userProduct").css("height",WH - conHeader - 82);//userMsg 负责的产品
$("#userDepartment").css("height",WH - conHeader - 82);//userMsg 部门
$("#userSort").css("height",WH - conHeader - 82);//userMsg 分类
$("#login").css("padding-top",(WH - registerH)/2);//登陆高度
$("#register").css("padding-top",(WH - registerH)/2);//注册高度
$("#CreatOrJoin").css("padding-top",WH/3); //选择创建or加入公司
$("#joinDialog").css("margin-top",WH/3);


// 根据窗口高度调整应聘信息弹出框高度大小

// 左侧导航点击下拉效果
$(document).on("click",".navMoreLink",function(){
    var I = $(this);
    var Ic = I.children(".navMoreIcon");
    var Is = I.siblings(".navMoreMsg");
    if (!!I.hasClass("open")) {
        I.removeClass("open");
        Ic.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        Is.stop().slideUp();
    }else{
        I.addClass("open");
        Ic.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        Is.stop().slideDown();

    }
})
// 左侧导航点击下拉效果

// 自定义模仿select
$(document).on("click",".customSelLink",function(){
    var I = $(this);
    var Ic = I.children(".customSelIcon");
    var Is = I.siblings(".customSelMsg");
    if (!!I.hasClass("open")) {
        I.removeClass("open");
        Ic.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        Is.stop().fadeOut();
    }else{
        I.addClass("open");
        Ic.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        Is.stop().fadeIn();
    }
})
$(document).on("blur",".customSelLink",function(){
    var I = $(this);
    var Ic = I.children(".customSelIcon");
    var Is = I.siblings(".customSelMsg");
    I.removeClass("open");
    Ic.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
    Is.stop().fadeOut();
})
$(document).on("click",".customSelMsg>li",function(){
    var I = $(this);
    var Itar = I.parent().siblings(".customSelLink").find(".customSelTxt")
    var Itxt = I.text();
    var id = I.attr("id");
    Itar.attr("id",id);
    Itar.html(Itxt);
})
// 自定义模仿select

//自定义check
$(document).on("click",".customCheck",function(){
    var I = $(this);
    if (!!I.hasClass("active")) {
        I.removeClass("active");
    }else{
        I.addClass("active");
    }
})
//自定义check

// 分类管理删除事件
$(document).on("click",".cateLinkdelete",function(){
    var I = $(this);
    var Ip = I.parent();
    Ip.remove();
})
// 分类管理删除事件

// 基本信息编辑
$(document).on("click","#BasicInfoEdit",function(){
	var I = $(this);
	var Itxt = I.text();
    var Tar = $(".BasicInfoWrap");
    var TarS = Tar.siblings(".BasicInfoEditWrap");
    var Bs = $("#BasicInfoSava");
    switch(Itxt){
    	case '编辑':
          Tar.hide();
          TarS.fadeIn();
          I.html("保存");
          Bs.hide();
    	break;
    	case '保存':
          TarS.hide();
          Tar.fadeIn();
          I.html("编辑");
          Bs.show();
    	break;
    }
})
$(document).on("click","#BasicInfoCancel",function(){
	var I = $("#BasicInfoEdit");
	var Itxt = I.text();
	var Tar = $(".BasicInfoWrap");
	var TarS = Tar.siblings(".BasicInfoEditWrap");
	var Bs = $("#BasicInfoSava");
	TarS.hide();
	Tar.fadeIn();
	I.html("编辑");
	Bs.show();
})
// 基本信息编辑

// 隐藏选项栏
$(document).on("click","#showHideLink",function(){
    var I = $(this);
    var Ic = I.children(".glyphicon");
    var Ip = $(".productCenterL");
    var tar = $(".conProductList");
    var tarLink = $(".productListBox>a");
    if (I.hasClass("open")) {
      I.removeClass("open");
      Ic.removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right");
      Ip.show();
      tar.css("width","75%");
      tarLink.css("width","25%");
    }else{
      I.addClass("open");
      Ic.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left");
      Ip.hide();
      tar.css("width","100%");
      tarLink.css("width","20%");
    }
})
// 隐藏选项栏

// 导出
hiddenShow(".inboxOut div",".OutfileBox");
// 导出


// 保留两位小数
var fixed2 = function(val){
    if(typeof val != 'number'){return '';}
    return val.toFixed(2);
}
// 保留两位小数

// 点击切换列表模式和模块模式
$(document).on("click","#changList",function(){
    var I = $(this);
    var Ic = I.children("span");
    var A = $("#conBoxA");
    var B = $("#conBoxB");
    if (!!I.hasClass("open")) {
    	Ic.removeClass("glyphicon-th").addClass("glyphicon-list-alt");
    	I.removeClass("open");
    	B.addClass("custerHide");
    	A.removeClass("custerHide");
    }else{
    	Ic.removeClass("glyphicon-list-alt").addClass("glyphicon-th");
    	I.addClass("open");
    	A.addClass("custerHide");
      B.removeClass("custerHide");
        var items = [
          {Description:0.9309,currency:7.52,TURNOVERDEALS:0,Package:7.56,Size:36268940,TRADINGDAY:1345478400000,TOTALSHARE:18653471415,Department:"日用品",EPS:0.9217,QTYCTN:7.49,Unit:7.51,Category:"杯子",ALISTEDSHARE:14922777132,ID:3131258,WCOSTAVG:8.7968,NETCASHFLOWOPERPS:1.125,Buyer:7.51,Picture:-0.133,Material:272732527,BVPS:8.686,ItemNum:-0.01,PE:5.134,TURNOVERRATE:0.243,ADJUSTCLOSINGPRICE:51.8586,PB:0.9409},
          {Description:2.0472,currency:6.35,TURNOVERDEALS:0,Package:6.41,Size:1278011,TRADINGDAY:1345478400000,TOTALSHARE:1150000000,Department:"日用品",EPS:0.1567,QTYCTN:6.28,Unit:6.34,Category:"杯子",ALISTEDSHARE:1150000000,ID:3131387,WCOSTAVG:6.8846,NETCASHFLOWOPERPS:0.23,Buyer:6.39,Picture:0.6299,Material:8115183,BVPS:6.13,ItemNum:0.04,PE:10.5415,TURNOVERRATE:0.1111,ADJUSTCLOSINGPRICE:9.429,PB:1.0697},
          {Description:1.5504,currency:2.58,TURNOVERDEALS:0,Package:2.61,Size:10685141,TRADINGDAY:1345478400000,TOTALSHARE:10093779823,Department:"日用品",EPS:0.0043,QTYCTN:2.57,Unit:2.59,Category:"杯子",ALISTEDSHARE:10093779823,ID:3131671,WCOSTAVG:3.0629,NETCASHFLOWOPERPS:0.09,Buyer:2.6,Picture:0.7752,Material:27677196,BVPS:3.562,ItemNum:0.02,PE:24.2193,TURNOVERRATE:0.1059,ADJUSTCLOSINGPRICE:13.4817,PB:0.7308},
          {Description:2.069,currency:2.9,TURNOVERDEALS:0,Package:2.95,Size:2511165,TRADINGDAY:1345478400000,TOTALSHARE:2000000000,Department:"日用品",EPS:0.0266,QTYCTN:2.89,Unit:2.9,Category:"杯子",ALISTEDSHARE:2000000000,ID:3131903,WCOSTAVG:3.5362,NETCASHFLOWOPERPS:-0.4041,Buyer:2.9,Picture:0,Material:7316381,BVPS:3.0533,ItemNum:0,PE:12.4963,TURNOVERRATE:0.1256,ADJUSTCLOSINGPRICE:10.0741,PB:0.9581},
          {Description:1.9704,currency:10.15,TURNOVERDEALS:0,Package:10.35,Size:155609,TRADINGDAY:1345478400000,TOTALSHARE:1007282534,Department:"日用品",EPS:0.0887,QTYCTN:10.15,Unit:10.15,Category:"杯子",ALISTEDSHARE:1007282534,ID:3132032,WCOSTAVG:9.8783,NETCASHFLOWOPERPS:0.22,Buyer:10.26,Picture:1.0837,Material:1599848,BVPS:4.5,ItemNum:0.11,PE:53.2288,TURNOVERRATE:0.0154,ADJUSTCLOSINGPRICE:16.142,PB:2.3261},
          {Description:2.7211,currency:4.41,TURNOVERDEALS:0,Package:4.53,Size:3872525,TRADINGDAY:1345478400000,TOTALSHARE:2200000000,Department:"日用品",EPS:0.0714,QTYCTN:4.41,Unit:4.42,Category:"杯子",ALISTEDSHARE:2200000000,ID:3131442,WCOSTAVG:5.2878,NETCASHFLOWOPERPS:0.055,Buyer:4.49,Picture:1.8141,Material:17341208,BVPS:2.3832,ItemNum:0.08,PE:18.8918,TURNOVERRATE:0.176,ADJUSTCLOSINGPRICE:15.1655,PB:1.8324},
          {Description:0.7389,currency:12.18,TURNOVERDEALS:0,Package:12.22,Size:1332194,TRADINGDAY:1345478400000,TOTALSHARE:1926958448,Department:"日用品",EPS:0.1909,QTYCTN:12.13,Unit:12.19,Category:"杯子",ALISTEDSHARE:1093476397,ID:3131171,WCOSTAVG:12.8369,NETCASHFLOWOPERPS:-0.04,Buyer:12.14,Picture:-0.3284,Material:16207539,BVPS:8.16,ItemNum:-0.04,PE:15.5997,TURNOVERRATE:0.1218,ADJUSTCLOSINGPRICB:1.523},
          {Description:3.9604,currency:6.06,TURNOVERDEALS:0,Package:6.11,Size:95948038,TRADINGDAY:1345478400000,TOTALSHARE:6423643659,Department:"日用品",EPS:0.0017,QTYCTN:5.87,Unit:6.06,Category:"杯子",ALISTEDSHARE:6423643659,ID:3133528,WCOSTAVG:5.6692,NETCASHFLOWOPERPS:-0.09,Buyer:5.99,Picture:-1.1551,Material:572896242,BVPS:2.01,ItemNum:-0.07,PE:77.53,TURNOVERRATE:1.4937,ADJUSTCLOSINGP3PB:2.9846},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.75},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.94},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.187},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.75},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.94},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.187},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.7094,PB:1.875},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.945,PB:1.0322},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.1875,PB:0.9326},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.7094,PB:1.875},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.945,PB:1.0322},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.1875,PB:0.9326},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.7094,PB:1.875},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.945,PB:1.0322},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.1875,PB:0.9326},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.7094,PB:1.875},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.945,PB:1.0322},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.1875,PB:0.9326},
          {Description:2.0864,currency:6.71,TURNOVERDEALS:0,Package:6.8,Size:8203502,TRADINGDAY:1345478400000,TOTALSHARE:14055383440,Department:"日用品",EPS:0.1571,QTYCTN:6.66,Unit:6.78,Category:"杯子",ALISTEDSHARE:10000000000,ID:3132159,WCOSTAVG:5.7905,NETCASHFLOWOPERPS:0.91,Buyer:6.68,Picture:-0.4471,Material:55167434,BVPS:3.66,ItemNum:-0.03,PE:74.0314,TURNOVERRATE:0.082,ADJUSTCLOSINGPRICE:23.7094,PB:1.875},
          {Description:0.7712,currency:3.89,TURNOVERDEALS:0,Package:3.91,Size:418515,TRADINGDAY:1345478400000,TOTALSHARE:1658610000,Department:"日用品",EPS:0.1278,QTYCTN:3.88,Unit:3.89,Category:"杯子",ALISTEDSHARE:1165600000,ID:3133590,WCOSTAVG:4.4675,NETCASHFLOWOPERPS:0.25,Buyer:3.9,Picture:0.2571,Material:1632075,BVPS:3.8226,ItemNum:0.01,PE:7.5503,TURNOVERRATE:0.0359,ADJUSTCLOSINGPRICE:6.945,PB:1.0322},
          {Description:0.8037,currency:8.71,TURNOVERDEALS:0,Package:8.75,Size:14473038,TRADINGDAY:1345478400000,TOTALSHARE:6849725776,Department:"日用品",EPS:0.8869,QTYCTN:8.68,Unit:8.71,Category:"杯子",ALISTEDSHARE:4990528316,ID:3133403,WCOSTAVG:10.581,NETCASHFLOWOPERPS:2,Buyer:8.7,Picture:-0.1148,Material:126109959,BVPS:10.01,ItemNum:-0.01,PE:6.4621,TURNOVERRATE:0.29,ADJUSTCLOSINGPRICE:16.1875,PB:0.9326},
          {Description:1.0135,currency:5.92,TURNOVERDEALS:0,Package:5.94,Size:47828421,TRADINGDAY:1345478400000,TOTALSHARE:28365585227,Department:"日用品",EPS:0.3433,QTYCTN:5.88,Unit:5.91,Category:"杯子",ALISTEDSHARE:22587602387,ID:3132062,WCOSTAVG:6.1797,NETCASHFLOWOPERPS:-1.61,Buyer:5.91,Picture:-0.1689,Material:282428002,BVPS:5.2,ItemNum:-0.01,PE:6.0043,TURNOVERRATE:0.2117,ADJUSTCLOSINGPRICE:83.8993,PB:1.2936},
          {Description:1.8657,currency:2.68,TURNOVERDEALS:0,Package:2.72,Size:2086859,TRADINGDAY:1345478400000,TOTALSHARE:3075653888,Department:"日用品",EPS:0.1249,QTYCTN:2.67,Unit:2.69,Category:"杯子",ALISTEDSHARE:2630631660,ID:3133407,WCOSTAVG:3.0421,NETCASHFLOWOPERPS:0.122,Buyer:2.71,Picture:1.1194,Material:5634455,BVPS:2.674,ItemNum:0.03,PE:17.342,TURNOVERRATE:0.0793,ADJUSTCLOSINGPRICE:8.5585,PB:1.2871}
        ];

var cols = [
            {title:'Department', name:'Department' ,width:100, sortable: true, align:'center'},
            {title:'Category', name:'Category' ,width:100, sortable: true, align:'center' },
            {title:'Buyer', name:'Buyer' ,width:100, align:'center', sortable: true, type: 'number', renderer: fixed2},
            {title:'Picture', name:'Picture' ,width:100, align:'center', sortable: true, type: 'number',renderer: function(val){if(val > 0){return '<span style="color: #b00">' + val.toFixed(2) +'%' + '</span>';}else if(val < 0){return '<span style="color: #0b0">' + val.toFixed(2) +'%' + '</span>';}return val.toFixed(2)+'%';}},
            {title:'Item num', name:'ItemNum' ,width:100, align:'center', sortable: true, type: 'number'},
            {title:'Description', name:'Description' ,width:100, align:'center', sortable: true, type: 'number', renderer: function(val){return val.toFixed(2)+'%';}},
            {title:'Size', name:'Size' ,width:100, align:'center', sortable: true, type: 'number', renderer: function(val){return (val / 100).toFixed(2);}},
            {title:'Material', name:'Material' ,width:100, align:'center', sortable: true, type: 'number', renderer: function(val){return (val / 10000).toFixed(2);}},
            {title:'currency', name:'currency' ,width:100, align:'center', sortable: true, type: 'number', renderer: fixed2},
            {title:'Unit', name:'Unit',width:100, align:'center', sortable: true, type: 'number', renderer: fixed2},
            {title:'Package', name:'Package' ,width:100, align:'center', sortable: true, type: 'number', renderer: fixed2},
            {title:'QTY/CTN', name:'QTYCTN' ,width:100, align:'center', sortable: true, type: 'number', renderer: fixed2},
            {title:'Description', name:'Description' ,width:100, align:'center', sortable: true, type: 'number', renderer: function(val){return val.toFixed(2)+'%';}},
    ];
    // $('#table2-1').mmGrid({
    //     height:'100%',
    //     cols: cols,
    //     items: items,
    //     nowrap: true,
    // });
}
})
// 点击切换列表模式和模块模式

/*编辑页面*/
var items1 = [
{Description:0.9309,currency:7.52,Package:7.56,Size:3626811940,Department:"日用品",QTYCTN:7.49,Unit:7.51,Category:"杯子",Buyer:7.51,Picture:'<div class="fileWrap"><div class="fileBox"><input type="file" value="+" class="conOpacity fileLink"><span class="glyphicon glyphicon-plus"></span></div></div> <div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"><img src="img/1.png" class="img-responsive"></div>',Material:272732527,BVPS:8.686,ItemNum:'<div class="fileWrap"><div class="fileBox"><input type="file" value="+" class="conOpacity"><span class="glyphicon glyphicon-plus"></span></div></div> <div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:2.0472,currency:6.35,Package:6.41,Size:1278011,Department:"日用品",QTYCTN:6.28,Unit:6.34,Category:"杯子",Buyer:6.39,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"><img src="img/1.png" class="img-responsive"></div>',Material:8115183,ItemNum:'<div class="fileWrap"><div class="fileBox"><input type="file" value="+" class="conOpacity"><span class="glyphicon glyphicon-plus"></span></div></div> <div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:1.5504,currency:2.58,Package:2.61,Size:10685141,Department:"日用品",QTYCTN:2.57,Unit:2.59,Category:"杯子",Buyer:2.6,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:27677196,ItemNum:0.02},
{Description:2.069,currency:2.9,Package:2.95,Size:2511165,Department:"日用品",QTYCTN:2.89,Unit:2.9,Category:"杯子",Buyer:2.9,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:7316381,ItemNum:0},
{Description:1.9704,currency:10.15,Package:10.35,Size:155609,Department:"日用品",QTYCTN:10.15,Unit:10.15,Category:"杯子",Buyer:10.26,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:1599848,ItemNum:0.11},
{Description:2.7211,currency:4.41,Package:4.53,Size:3872525,Department:"日用品",QTYCTN:4.41,Unit:4.42,Category:"杯子",Buyer:4.49,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:17341208,ItemNum:0.08},
{Description:0.7389,currency:12.18,Package:12.22,Size:1332194,Department:"日用品",QTYCTN:12.13,Unit:12.19,Category:"杯子",Buyer:12.14,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:16207539,ItemNum:-0.04},
{Description:3.9604,currency:6.06,Package:6.11,Size:95948038,Department:"日用品",QTYCTN:5.87,Unit:6.06,Category:"杯子",Buyer:5.99,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:572896242,ItemNum:-0.07},
{Description:2.0864,currency:6.71,Package:6.8,Size:8203502,Department:"日用品",QTYCTN:6.66,Unit:6.78,Category:"杯子",Buyer:6.68,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:55167434,ItemNum:-0.03},
{Description:0.7712,currency:3.89,Package:3.91,Size:418515,Department:"日用品",QTYCTN:3.88,Unit:3.89,Category:"杯子",Buyer:3.9,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:1632075,ItemNum:0.01},
{Description:0.8037,currency:8.71,Package:8.75,Size:14473038,Department:"日用品",QTYCTN:8.68,Unit:8.71,Category:"杯子",Buyer:8.7,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:126109959,ItemNum:-0.01},
{Description:2.0864,currency:6.71,Package:6.8,Size:8203502,Department:"日用品",QTYCTN:6.66,Unit:6.78,Category:"杯子",Buyer:6.68,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:55167434,ItemNum:-0.03},
{Description:1.8657,currency:2.68,Package:2.72,Size:2086859,Department:"日用品",QTYCTN:2.67,Unit:2.69,Category:"杯子",Buyer:2.71,Picture:'<div class="dragTar" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="img/1.png" class="img-responsive"></div>',Material:5634455,ItemNum:0.03}
];
var cols1 = [
{title:'Department', name:'Department' , sortable: true, align:'center'},
{title:'Category', name:'Category' , sortable: true, align:'center' },
{title:'Buyer', name:'Buyer' , align:'center', sortable: true, type: 'number', renderer: fixed2},
{title:'Picture', name:'Picture' , width:'180', align:'center'},
{title:'Item num', name:'ItemNum' , align:'center'},
{title:'Description', name:'Description' , align:'center', sortable: true, type: 'number', renderer: function(val){return val.toFixed(2)+'%';}},
{title:'Size', name:'Size' , align:'center', sortable: true, type: 'number', renderer: function(val){return (val / 100).toFixed(2);}},
{title:'Material', name:'Material' , align:'center', sortable: true, type: 'number', renderer: function(val){return (val / 10000).toFixed(2);}},
{title:'currency', name:'currency' , align:'center', sortable: true, type: 'number', renderer: fixed2},
{title:'Unit', name:'Unit', align:'center', sortable: true, type: 'number', renderer: fixed2},
{title:'Package', name:'Package' , align:'center', sortable: true, type: 'number', renderer: fixed2},
{title:'QTY/CTN', name:'QTYCTN' , align:'center', sortable: true, type: 'number', renderer: fixed2},
];
// var dragTable = $('#dragTable').mmGrid({
//     height:'100%',
//     cols: cols1,
//     items: items1,
// });


// mm.on('loadSuccess', function(e, data){
// })
/*编辑页面*/

/*编辑页面 全屏*/
$(document).on("click","#fullscreen",function(){
    var I = $(this);
    var Ic = I.children(".glyphicon")
    var tar = $("#fullscreenWrap");
    if (!!I.hasClass("open")) {
        I.removeClass("open");
        Ic.removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
        tar.removeClass("fullscreenWrap");
    }else{
        I.addClass("open");
        Ic.removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
        tar.addClass("fullscreenWrap");
    }
})
/*编辑页面 全屏*/

/*编辑页面 上传图片*/


/*编辑页面 上传图片*/


// 历史页面
var items12 = [
{Description:'H123456',Size:'<a class="hisDelete" href="javascript:void(0);"><span class="glyphicon glyphicon-trash"></span></a>',Department:"1/4",Category:"黄先生",Buyer:'2016/02/02',Picture:'<input type="checkbox">',ItemNum:'<input type="checkbox">'},
{Description:'H123456',Size:'<a class="hisDelete" href="javascript:void(0);"><span class="glyphicon glyphicon-trash"></span></a>',Department:"1/4",Category:"黄先生",Buyer:'2016/02/02',Picture:'<input type="checkbox">',ItemNum:'<input type="checkbox">'},
{Description:'H123456',Size:'<a class="hisDelete" href="javascript:void(0);"><span class="glyphicon glyphicon-trash"></span></a>',Department:"1/4",Category:"黄先生",Buyer:'2016/02/02',Picture:'<input type="checkbox">',ItemNum:'<input type="checkbox">'},
{Description:'H123456',Size:'<a class="hisDelete" href="javascript:void(0);"><span class="glyphicon glyphicon-trash"></span></a>',Department:"1/4",Category:"黄先生",Buyer:'2016/02/02',Picture:'<input type="checkbox">',ItemNum:'<input type="checkbox">'},
];
var cols12 = [
{title:'序号', name:'Department' , align:'center'},
{title:'编辑时间', name:'Buyer' , align:'center'},
{title:'编辑者', name:'Category' , align:'center' },
{title:'设为默认', name:'Picture' , width:'180', align:'center'},
{title:'保存为独立产品', name:'ItemNum' , align:'center'},
{title:'隐藏', name:'Description' , align:'center'},
{title:'操作', name:'Size' , align:'center'},
];

var items2 = [
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">modified</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">modified</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">modified</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
{Description:'H123456 <span class="haviver">Deleted</span>',currency:12345,Package:1234,Size:123456,Department:"1/4",QTYCTN:123,Unit:123,Category:"黄先生",Buyer:'2016/02/02',Picture:'<div class="dragTar"><img src="img/1.png" class="img-responsive"></div>',Material:456789,ItemNum:'<div class="zipBox"><div class="zipInn"><span class="glyphicon glyphicon-file"></span><span class="zipName">某文件名</span> </div> </div>'},
];
var cols2 = [
{title:'编辑序号', name:'Department' , align:'center'},
{title:'编辑者', name:'Category' , align:'center' },
{title:'编辑日期', name:'Buyer' , align:'center', type: 'number'},
{title:'图片', name:'Picture' , width:'180', align:'center'},
{title:'附件', name:'ItemNum' , align:'center'},
{title:'货号', name:'Description' , align:'center', type: 'number'},
{title:'编码', name:'Size' , align:'center', type: 'number'},
{title:'序列号', name:'Material' , align:'center', type: 'number'},
{title:'价格', name:'currency' , align:'center', type: 'number'},
{title:'长度', name:'Unit', align:'center', type: 'number'},
{title:'高度', name:'Package' , align:'center', type: 'number'},
{title:'QTY', name:'QTYCTN' , align:'center', type: 'number'},
];

// var dragTable = $('#historyTableA').mmGrid({
//     height:'100%',
//     cols: cols12,
//     items: items12,
// });
//
// var dragTable = $('#historyTableB').mmGrid({
//     height:'100%',
//     cols: cols2,
//     items: items2,
// });
//
// var dragTable = $('#historyTableC').mmGrid({
//     height:'100%',
//     cols: cols2,
//     items: items2,
// });
//
// var dragTable = $('#historyTableD').mmGrid({
//     height:'auto',
//     cols: cols2,
//     items: items2,
// });
// 历史页面

});
