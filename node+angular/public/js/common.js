//从response中获得的json对象
//var receiveJson;
var couponInfo;
// 实付金额
var LoginPho = "123";// 登录人的手机号
var couponIdOrder = "";// 券的id
var flag_Info = "";
var version = "";
var payStype = "";
var clicked = true;
var showList = false;
var loadDataString;
var paySuccess = false;
var actId_now="";
var operatorTypeCode,flowDeno,productId,operatorArr=['','移动','联通','电信','','电信固话','联通固话','移动固话','170号段'];
/**
 * 初始化首页
 */
function doInitIndex() {
	try {
		$("input[name=flow]").hide();
		
		$("#phone").focus(function() {
			$("#result").html("");
			$("#phoneChoose").hide();
			$("#phoneClose").show();
			$(this).val(trim($(this).val()));
		});
		// $("#phone").blur(function(){
		// $("#phoneChoose").show();
		// $("#phoneClose").hide();
		// $("#cardList").hide();
		// formatToPhone($("#phone").get(0));
		// });
		$("#cardList").click(function() {
			if (showList) {
				showList = false;
				$("#cardChooseList").hide();
			} else {
				showList = true;
				$("#cardChooseList").show();
			}
		});
		$("#phoneClose").click(function() {
			$("#phone").focus();
			$(this).hide();
			$("#phoneChoose").show();
			$("#phone").val("") && $("#result").html("");
			$("#phoneTip").hide();
			$("#phoneChoose").show();
			$("div[name='next']").attr("enabl", "NO");
			$('#cardList,#count').hide();
		});
		$("#phone").keydown(function() {
			var abc = $("#phone").val();
			//光标移入修改
			var pattern=/\D/g;
			if(pattern.test(abc)){
				$("#phone").val(abc.replace(/\D/g, ''));
			}
			
		});
		$("#phone")
				.keyup(
						function() {
							$("#phoneChoose").hide();
							$("#phoneClose").show();
							var abc = $("#phone").val();
							//光标移入修改
							var pattern=/\D/g;
							if(pattern.test(abc)){
								$("#phone").val(abc.replace(/\D/g, ''));
							}
							
							var num = trim($("#phone").val());
							if (num.length <= 11) {
								$("div[name='next']").attr("enabl", "NO");
								if (loadDataString.default_clientplatform == "android"
										&& loadDataString.default_osversion < "4.4") {
									$("#result").html("");
									if (num.length < 11) {
										$("#phoneTip").hide();
										$("#phoneChoose").hide();
										$("#phoneClose").show();
									} else if (num.length == 11) {
										$("#phone").val(num + " ");
										window.location.href = "objc:getLocalContacts("
												+ base64.encode(num)
												+ ")&fillDateJUST";
									}
								} else {
									if ((num.length >= 4) && (num.length <= 10)) {
										$("#phoneTip").hide();
										$("#phoneChoose").hide();
										$("#phoneClose").show();
										window.location.href = "objc:getLocalContacts("
												+ base64.encode(num)
												+ ")&fillDate";
									}
									if (num.length == 11) {
										$("#result").html("");
										window.location.href = "objc:getLocalContacts("
												+ base64.encode(num)
												+ ")&fillDateJUST";
									}
								}
								$('#cardList,#count').hide();
								$('#amountTips').html($('input[name=amount]:checked').val())
							} else {
								$("#phone").val(abc.substring(0, 11));
								return false;
							}
						});

		$("input:radio[name='amount']").change(function() {
			// $("div[name='next']").attr("enabl", "YES");
			// var amountValue = $("input:radio[name='amount']:checked").val();
			// if(amountValue == 500){
			// $("#next1").attr("enabl", "NO");
			// }
			var phoNum = trim($("#phone").val());
			if (phoNum.length > 0 && isPhone(phoNum)) {
				(payStype == "1") ? getCouponAmont() : getCutAmont();
			} else {
				showWarning("请输入正确格式的手机号");
				$("div[name='next']").attr("enabl", "NO");
				$("#phone").focus();
			}
			$('#sample').html($("input:radio[name='amount']:checked").val());
		});
		$("input:radio[name='flow']").change(function() {
			var phoNum = trim($("#phone").val());
			if (phoNum.length > 0 && isPhone(phoNum)) {
				//获取优惠金额，暂时没有
			} else {
				showWarning("请输入正确格式的手机号");
				$("div[name='next']").attr("enabl", "NO");
				$("#phone").focus();
			}
			$('#flowSample,#flowPay').html($("input:radio[name='flow']:checked").val());
		});
		$("#phoneChoose").click(getPhoneNumAndName);
		getCurrentUserPhone("setLogPhoneNum");

		$("#readme").click(function() {
			var webUrl = "http://www.chinaums.com/Info/2099977";
			navToWebview("业务说明", webUrl);
		});
		$("#next1")
				.click(
						function() {
							if ($(this).attr("enabl") == "YES") {
								try {
									flag_Info = 1;
									window.location.href = "objc:getClientInfo()&setClientInfo";
								} catch (e) {
									showError(e.message);
								}
							}
						});
		$("#next2")
				.click(
						function() {
							if ($(this).attr("enabl") == "YES") {
								try {
									flag_Info = 2;
									window.location.href = "objc:getClientInfo()&setClientInfo";
								} catch (e) {
									showError(e.message);
								}
							}
						});
		$("#next3")
				.click(
						function() {
							if ($(this).attr("enabl") == "YES") {
								try {
									flag_Info == 1
									window.location.href = "objc:getClientInfo()&setClientInfo2";
								} catch (e) {
									showError(e.message);
								}
							}
						});
	} catch (e) {

	}
}

function setClientInfo2(data){
	var receiveJson1 = eval("(" + base64.decode(data) + ")");
	version = receiveJson1.version;
	var flowAmount=$("input:radio[name='flow']:checked").val();
	var orderJson={};
	orderJson.msgType='69901200';
	orderJson.dataHeader = "CP01K1CP0000800_1101";
	orderJson.bizCode = "QMF";
	orderJson.mobileNo=trim($('#phone').val());
	orderJson.flowDeno=$("input[name='flow']:checked").next('span').children('div').eq(0).html().split('M')[0];
	orderJson.productId=$("input[name='flow']:checked").next('span').children('span').eq(0).html();
	orderJson.amount=toNumberDefaultZero(flowAmount).mul(100);
	orderJson.operatorTypeCode=operatorTypeCode;
    requestResponse(JSON.stringify(orderJson), "flowOrder");
}

/*手机归属地*/
function placeQuery(code,data){
	$("input:radio[name='amount']").change();
	var code = eval("(" + base64.decode(code) + ")");
	if(code==1){
		var data=base64.decode(data).replace('"[','[').replace(']"',']').replace(/\\/g,'');
		var json=eval("(" + data + ")");
		function operatorCode(){
			 for(var i=0 ;i<operatorArr.length;i++){
				 if(operatorArr[i]==json.operatorName){
					 operatorTypeCode='0'+i;
				 }
			 }
		};
		operatorCode();
		$('#phoneTips').html(json.operatorName);
		$('#place').html(json.provinceName+"");
		var len = json.productList.length>6 ? 6 : json.productList.length;
		for(var i=0;i<len;i++){
			var productArr=json.productList[i].Product.split('|');
			$("input[name='flow']").eq(i).val(productArr[1]);
			$("input[name='flow']").eq(i).next('span').children('div').eq(0).html(productArr[0]+'M/'+parseInt(productArr[1])+'元');
			$("input[name='flow']").eq(i).next('span').children('span').eq(0).html(productArr[2]).hide();
			$("input[name='flow']").eq(i).next('span').children('div').eq(1).children('span').html('售价'+productArr[1]+'元');
		}
		for(var j=1;j<(7-len);j++){
			$("input[name='flow']").eq(-j).parent().css('visibility','hidden');
		}
	}else if(code==2){
		$('#place').html('');
	}
}



/*流量第三方下单*/
function flowOrder(code,data){
	var code = eval("(" + base64.decode(code) + ")");
	
	if(code==1){
		var json = eval("(" + base64.decode(data) + ")");
		var flowAmount=$("input:radio[name='flow']:checked").val();
		var mOrderJson={};
		mOrderJson.msgType='69902200';
		mOrderJson.dataHeader = "CP01K1CP0000800_1102";
		mOrderJson.bizCode = "QMF";
		mOrderJson.mobileNo= trim($('#phone').val());
		mOrderJson.operatorTypeCode = operatorTypeCode;
		mOrderJson.amount = toNumberDefaultZero(flowAmount).mul(100);
		mOrderJson.flowDeno=$("input[name='flow']:checked").next('span').children('div').eq(0).html().split('M')[0];
		mOrderJson.platSeqId = json.platSeqId;
		requestResponse(JSON.stringify(mOrderJson), "flowOrder2");
	}else{
		setError(code, base64.decode(data));
	}
	
}

/*流量手机平台下单*/
function flowOrder2(code,data){
	var code = eval("(" + base64.decode(code) + ")");
	if(code==1){
		var receiveJson = eval("(" + base64.decode(data) + ")");
		var flowAmount=$("input:radio[name='flow']:checked").val();
		var json = {};
		json.version = version;
		json.msgType = '29901200';
		json.orderId = receiveJson.orderId;
		json.amount = toNumberDefaultZero(flowAmount).mul(100);
		json.dataHeader = "CP01K1CP0000800_1103";
		json.pVer = "1.0";
		json.secControlInfo = "1600000000000000";
		json.currencyCode = "156";
		var payType = getPayType(json, 1);
		var url = "payresult.op";
		paySuccess = true;
			//navToPaymentView(url, JSON.stringify(json), payType, null);
		window.location.href = "objc:navToPaymentView("
			+ base64.encode(url) + "," + base64.encode(JSON.stringify(json))+")&defaultNavToPaymentViewCallBack";
		
	}else{
		setError(code, base64.decode(data));
	}
	
}

function viewInt(){
	 var win=window.devicePixelRatio;
     var dpr, rem, scale;
	var docEl = document.documentElement;
	var fontEl = document.createElement('style');
	var metaEl = document.querySelector('meta[name="viewport"]');
	dpr = window.devicePixelRatio || 1;
	scale = 1 / dpr;
	metaEl.setAttribute('content', 'width=device-width'  
	+ ',initial-scale=' + scale + ',maximum-scale=' 
	+ scale + ', minimum-scale=' + scale + ',user-scalable=no');
	$('html').css('font-size',docEl.clientWidth/750*16+'px'); 
	$('body').show();
	
}

/*tabs切换*/
function tabsInit(){
			
		  $("#box1").click(function(){
		     $(".line").animate({left:0});
		     $(".item").eq(0).css('left',0);
			  $(".item").eq(1).css('left',$(window).width());
		  });
		   $("#box2").click(function(){
		    $(".line").animate({left:parseInt($('.parent').width()/2)});
		    $(".item").eq(0).css('left',-$(window).width());
			$(".item").eq(1).css('left',0);
		  });
		   $("#box1").click();
		/*function slideInit(){
				var width=$(window).width(),height=$(window).height(),
				start,end,diff,index;
				for(var i=0;i<$(".item").length;i++){
					$(".item").eq(i).css("left",(i*width));
				};
				var items=document.getElementById('items');
				 function touchStart(e){
					var touch = e.targetTouches[0];
					items.addEventListener('touchmove',touchMove);  
					for(var i=0;i<$(".item").length;i++){
						if($(".item").eq(i).position().left==0){
							index=$(".item").eq(i).index();
						}
					}
					start=touch.pageX;
					e.stopPropagation();
				}
				function touchMove(e){
						var touch = e.targetTouches[0];
						end=touch.pageX;
						if((end-start)>10){
							e.preventDefault();  
							if(index==0)return;
							for(var i=0;i<$(".item").length;i++){
								$(".item").eq(i).animate({left:parseInt($(window).width()*(i-index+1))});
							};
							$(".line").animate({left:parseInt($('.parent').width()*(index-1)/2)});
							$('.inputInfo').animate({left:parseInt($('.parent').width()*(index-1)/2)})
						}else if((end-start)<-10){
							e.preventDefault();  
							if(index==($(".item").length-1))return;
							for(var i=0;i<$(".item").length;i++){
								$(".item").eq(i).animate({left:parseInt($(window).width()*(i-index-1))});
							};
							$(".line").animate({left:parseInt($('.parent').width()*(index+1)/2)});
						}
						items.removeEventListener('touchmove',touchMove);
						e.stopPropagation();
				}
				items.addEventListener('touchstart',touchStart);  
				items.addEventListener('touchmove',touchMove);
			};	
				slideInit();*/
}


/**
 * 模糊查询回调
 * 
 * @param data
 */
function fillDate(data) {
	try {
		var receiveJson = eval("(" + base64.decode(data) + ")");
		var str = "";
		if (!isEmpty(receiveJson) && receiveJson.length >= 0) {
			for ( var i = 0; i < receiveJson.length; i++) {
				str += "<li onClick=fill('" + receiveJson[i].phoneNumber
						+ "','" + receiveJson[i].name + "')><p>"
						+ receiveJson[i].phoneNumber + "</p><P>"
						+ receiveJson[i].name + "</P></li>";
			}

		}
		$("#result").html(str);
	} catch (e) {
		showError(e.message);
	}
}
function fillDateJUST(data) {
	// $("#phoneClose").show();
	try {
		var num = trim($("#phone").val());
		var receiveJson = eval("(" + base64.decode(data) + ")");
		if (!isEmpty(receiveJson) && receiveJson.length >= 0) {
			$("#phoneTip").show();
			$("#phoneTip").html(receiveJson[0].name);
		} else if (num == LoginPho) {
			$("#phoneTip").show();
			$("#phoneTip").html("账户绑定号码");
		} else {
			$("#phoneTip").show("");
			$("#phoneTip").html("不在通讯录");
		}
		var aa = getMobileTypeWithPhonePrefix(num);
		setPhoneTipsAndAmount(num, aa);
	} catch (e) {
		showError(e.message);
	}
}

function fill(num, name) {
	$("#phoneTip").show();
	$("#result").html("");
	$("#phone").val(num);
	$("#phoneTip").html(name);
	var aa = getMobileTypeWithPhonePrefix(num);
	setPhoneTipsAndAmount(num, aa);
}

/**
 * 根据手机号查找对应的卷
 * 
 */
function getCardInfo(phoNum) {
	var json = {};
	json.msgType = "000001";
	// json.mobile = LoginPho;
	json.source = "qmfClient";
	json.actId = (LoginPho == phoNum) ? "shiTu,ipinyouAdvert,rrShengjin,reward7,EposNation,campusRecruitment2015,campusRecruitmentLive2015,campusRecruitmentLive2015js,mposMarketActivities,TtylRecomment201511,mposMarketActivities,JXWAct"
			: "rrShengjin,reward7,EposNation,mposMarketActivities,TtylRecomment201511,mposMarketActivities,JXWAct";
	// json.actId = "shiTu,ipinyouAdvert";
	json.busiRange = "700";
	json.state = "1";
	json.type = "query";
	json.pVer = "1.0";
	json.showLoading = false;
	json.dataHeader = "CP01K1CP0000800_1104";
	requestResponse(JSON.stringify(json), "gotoCardInfo");
}

/**
 * 
 * 根据卷填充到优惠券的地方
 * 
 * @param code
 * @param data
 * @returns {Boolean}
 */
function gotoCardInfo(code, data) {
	code = base64.decode(code);
	var str = "";
	var strother = "";
	if (code == 1) {
		var receiveJson = eval("(" + base64.decode(data) + ")");
		if (receiveJson.couponList.length > 0) {
			for ( var i = 0; i < receiveJson.couponList.length; i++) {
				couponInfo = receiveJson.couponList[i];
				var validFr = couponInfo.validFr;
				var validTo = couponInfo.validTo;
				var myDate = new Date();
				var month = myDate.getMonth() + 1;
				month = month > 9 ? month : "0" + month;
				var day = myDate.getDate();
				day = day > 9 ? day : "0" + day;
				var hours = myDate.getHours();
				hours = hours > 9 ? hours : "0" + hours;
				var minutes = myDate.getMinutes();
				minutes = minutes > 9 ? minutes : "0" + minutes;
				var seconds = myDate.getSeconds();
				seconds = seconds > 9 ? seconds : "0" + seconds;
				var useCondition = (isEmpty(couponInfo.useCondition)) ? couponInfo.useCondition
						: "(" + couponInfo.useCondition + ")";
				var tempDate = myDate.getFullYear() + "-" + month + "-" + day
						+ " " + hours + ":" + minutes + ":" + seconds;
				var aa = trim(tempDate) > trim(validFr);
				var bb = trim(tempDate) < trim(validTo);
				if (bb) {
					if (aa) {
						var cardAmount = toNumberDefaultZero(couponInfo.rebate)
								.div(100).formatMoney();
						var couponId = couponInfo.couponId;
						strother += "<li name='amountchoose' onClick=choose('"
								+ couponId + "','" + cardAmount + "','"
								+ useCondition +"','"+couponInfo.actId+ "') class='black'><p><span class='yellow'>"
								+ cardAmount + "</span>元充值优惠券" + useCondition
								+ "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></li>";
						couponIdOrder = couponInfo.couponId;
						actId_now=couponInfo.actId;
						// $("#cardAmount").html(cardAmount);
						$("#cardText").html(
								"<span id='cardAmount' cardAmount='"
										+ cardAmount + "' >" + cardAmount
										+ "</span>元充值优惠券" + useCondition + "");
						payStype = "1";
					} else {
						var cardAmount = toNumberDefaultZero(couponInfo.rebate)
								.div(100).formatMoney();
						strother += "<li name='amountchoose' onClick=alertINFO() class='grey'><p><span class='yellow'>"
								+ cardAmount
								+ "</span>元充值优惠券"
								+ useCondition
								+ "</p><p><span class='yellow'>"
								+ validFr.substring(0, 10)
								+ "</span>后可用</p></li>";
					}
					$("#cardList").show();
				}
			}
			str += strother;
			if (str != "") {
				str= "<div class='couponTitle'><img id='couponClose' alt='' src='images/SJCZ_tankuang_guanbi@2x.png'"+
				" srcset='images/SJCZ_tankuang_guanbi@3x.png 1080w'>"
					+"选择优惠券</div><li name='amountchoose' onClick=chooseNone() class='black'><p>不使用优惠券</p><p></p></li>"
					+str+"<div class='divBtm'></div>";
			}
			checkYhq($("#cardAmount").attr("cardAmount"));
		}
		$("#cardChooseList").html(str);
		$("#cardChooseList").hide();
		 $('#couponClose').click(function(){
				$('#cardChooseList').hide();
			})
		//$("input:radio[name='amount']").change();
		 var placeJson={};
		   placeJson.msgType='19901200';
		   placeJson.dataHeader = "CP01K1CP0000800_1101";
		   placeJson.bizCode = "QMF";
		   placeJson.mobileNo=trim($('#phone').val());
         requestResponse(JSON.stringify(placeJson), "placeQuery");
	} else
		setError(code, base64.decode(data));
}

function alertINFO() {
	showWarning("该优惠券未在使用期限内！");
}

function choose(couponId, cardAmount, useCondition,actId) {
	if (!checkYhq(cardAmount)) {
		payStype = "0";
		showWarning("尚不支持此数额的充值券，如有疑问，请联系95534客服！");
		return;
	}
	;
	couponIdOrder = couponId;
	actId_now=actId;
	payStype = "1";
	$("#cardText").html(
			"<span id='cardAmount'>" + cardAmount + "</span>元代金券"
					+ useCondition + "");
	$('#sampleCopy').html($('#sample').html());
	$('#minusAmount').html('-'+parseInt(cardAmount));
	$('#count').show();
	/*setTimeout(function() {
		$("#cardChooseList").hide();
	}, 100);*/
	
	$("input:radio[name='amount']").change();
}

function chooseNone() {
	payStype = "0";
	$("#cardText").html("不使用优惠券");
	$('#count').hide();
	/*setTimeout(function() {
		$("#cardChooseList").hide();
	}, 100);*/
	$("input:radio[name='amount']").change();
	$("input:radio[name='amount']").removeAttr("disabled");
	$("span[style='background:#ddd']").removeAttr("style");
}

/**
 * 设置登录人手机号
 * 
 * @param num
 */
function setLogPhoneNum(phoneNumber) {
	try {
		var phone = base64.decode(phoneNumber);
		phone = change2Phone(phone);
		LoginPho = phone;
		var mobileType = getMobileType(phone); // 由于需要校验是否正确长度等，故不使用前缀获得手机类型

		if (!checkPhoneLongin(phone, mobileType)) {
			return false;
		}
		phone = "13811528476";
		$("#phone").val(phone);
		if (!isEmpty(phone)) {
			onInputKeyup($("#phone").get(0));
			formatToPhone($("#phone").get(0));
			setPhoneTipsAndAmount(phone, mobileType);
		}
	} catch (e) {
		showError(e.message);
	}
}

/**
 * 设置手机号
 * 
 * @param num
 */
function setPhoneNumAndNanme(code, data) {
	code = base64.decode(code);
	if (code == 1) {
		data = eval("(" + base64.decode(data) + ")");
		var phone = data.phoneNumber;
		phone = change2Phone(phone);
		var mobileType = getMobileType(phone); // 由于需要校验是否正确长度等，故不使用前缀获得手机类型
		if (!checkPhone(phone, mobileType))
			return false;
		$("#phone").val(phone);
		$("#phoneClose").hide() && $("#phoneTip").show();
		$("#phoneTip").html(data.name);
		if (!isEmpty(phone)) {
			onInputKeyup($("#phone").get(0));
			formatToPhone($("#phone").get(0));
			setPhoneTipsAndAmount(phone, mobileType);
		}
	}
}

/**
 * 设置手机提示及金额
 * 
 * @param phone
 * @param mobileType
 */
function setPhoneTipsAndAmount(phone, mobileType) {
	try {
		formatToPhone($("#phone").get(0));
		if (phone.substring(0, 3) == "170") {
			showWarning("尚不支持为170开头的虚拟运营商手机号充值");
			return false;
		}
		if (phone.length > 0 && isPhone(phone)) {
			$("#phoneTips").html(getMobileTypeName(phone));
			var aa = {
				"移动运营商" : "move",
				"联通运营商" : "link",
				"电信运营商" : "tele"
			}[getMobileTypeName(phone)] || "moble";
			$(".faName")
					.css("background-image", "url(./images/" + aa + ".png)");
			$("input[name='amount'][value='100']").attr("checked", "checked");
			if (!$("input[name='amount']").is(":checked")) {
				showWarning("请选择充值金额");
			}
			// $("div[name='next']").attr("enabl", "NO");
			payStype = "0";
			$("#phoneChoose").show();
			$("#phoneClose").hide();
			$("#cardList").hide();
			$("#phone").blur();
			getCardInfo(phone);
			// if (phone == LoginPho) {
			// getCardInfo(phone);
			// } else {
			// $("input:radio[name='amount']").change();
			// }
		}
	} catch (e) {
		showError(e.message);
	}
}

/**
 * 进行下单
 * 
 * @returns {Boolean}
 */

function setClientInfo(data) {
	var phone = change2Phone(trim($("#phone").val()));
	var mobileType = getMobileType(phone);
	if (!checkPhone(phone, mobileType)) {
		return false;
	}
	try {
		var receiveJson1 = eval("(" + base64.decode(data) + ")");
		version = receiveJson1.version;
		order(phone, mobileType);
	} catch (e) {
		showError(e.message);
	}
}

/**
 * 下单
 * 
 * @param amount
 * @param phone
 * @param mobileType
 */
function order(phone, mobileType) {
	try {
		var faceAmount = $("input:radio[name='amount']:checked").val();
		var amountPay = $("#amountTips").html();
		if (isEmpty(faceAmount) || isEmpty(amountPay)) {
			showWarning("请选择充值金额");
		} else {
			var excludePayMethod = "";
			var json = {};
			json.amount = toNumberDefaultZero(amountPay).mul(100);
			/*if (toNumberDefaultZero(json.amount).div(100).formatMoney() > 490) {
				if (flag_Info == 1) {
					if (loadDataString.default_clientversion > "2.6.0") {
						excludePayMethod = "4-2|0|10|1|2";
					} else {
						excludePayMethod = "0|10|1|2";
					}
				} else if (flag_Info == 2) {
					excludePayMethod = "1|2|3|4-1|4-2";
				} else if (flag_Info == 3) {
					excludePayMethod = "1|2|3|4-1|4-2";
				}
			} else {
				if (flag_Info == 1) {
					if (loadDataString.default_clientversion > "2.6.0") {
						excludePayMethod = "0|10";
					} else {
						excludePayMethod = "0|10";
					}
				} else if (flag_Info == 2) {
					excludePayMethod = "1|2|3|4-1|4-2";
				} else if (flag_Info == 3) {
					excludePayMethod = "1|2|3|4-1|4-2";
				}
			}*/
			//json.excludePayMethod = excludePayMethod;
			json.rechargeAmt = toNumberDefaultZero(faceAmount).mul(100);
			json.msgType = "61000220";
			(payStype == "1") ? (json.couponId = couponIdOrder)
					: (json.couponId = "");
			json.mobiNoRecharge = "" + phone;
			json.mobileOperatorId = "" + mobileType;
			json.actId= actId_now;
			BizConf.fillAndRequestFromNet(json, "gotoOrder");
		}

	} catch (e) {
		showError(e.message);
	}
}

/**
 * 跳转到订单确认页面
 * 
 * @param code
 * @param data
 */
function gotoOrder(code, data) {
	var amountPay = $("#amountTips").html();
	code = base64.decode(code);
	if (code == 1) {
		var receiveJson = eval("(" + base64.decode(data) + ")");
		var json = {};
		json.version = version;
		json.msgType = '21000220';
		json.orderId = receiveJson.orderId;
		json.amount = toNumberDefaultZero(amountPay).mul(100);
		json.dataHeader = "CP01K1CP0000800_1103";
		json.pVer = "1.0";
		json.secControlInfo = "1600000000000000";
		json.currencyCode = "156";
		var payType = getPayType(json, flag_Info);
		var url = "payresult.op";
		paySuccess = true;
		// setTimeout("tellTip()", 1000);
		navToPaymentView(url, JSON.stringify(json), payType, null);

		// navToNewView("order.op", JSON.stringify(json));
	} else {
		setError(code, base64.decode(data));
	}
}

// function tellTip(){
// if(payStype == "1"){
// showWarning("订单已生成，您的优惠券已被使用");
// }
// }

function getPayType(json, flag_Info) {
	if (toNumberDefaultZero(json.amount).div(100).formatMoney() > 490) {
		if (flag_Info == 1) {
			if (loadDataString.default_clientversion > "2.6.0") {
				return [ [ "3", "3" ], [ "2-1", "2-1" ] ];
			} else {
				return [ [ "3", "3" ], [ "2", "2" ] ];
			}
		} else if (flag_Info == 2) {
			return [ [ "0", "0" ], [ "5", "5" ] ];
		} else if (flag_Info == 3) {
			return [ [ "0", "0" ], [ "5", "5" ] ];
		}
	} else {
		if (flag_Info == 1) {
			if (loadDataString.default_clientversion > "2.6.0") {
				return [ [ "1", "1" ], [ "3", "3" ], [ "2", "2" ] ];
			} else {
				return [ [ "1", "1" ], [ "3", "3" ], [ "2", "2" ] ];
			}
		} else if (flag_Info == 2) {
			return [ [ "0", "0" ], [ "5", "5" ] ];
		} else if (flag_Info == 3) {
			return [ [ "0", "0" ], [ "5", "5" ] ];
		}
	}

}

/**
 * 检查手机号
 * 
 * @param phone
 * @returns {Boolean}
 */
function checkPhone(phone, mobileType) {
	if (isEmpty(phone)) {
		showAlert("3", "错误", "要充值的手机号码不能为空");
		return false;
	} else if (!isPhone(phone)) {
		showAlert("3", "错误", "手机号码不正确");
		return false;
	} else if (isEmpty(mobileType)) {
		showAlert("3", "错误", "手机号码不正确");
		return false;
	}
	return true;
}

function checkPhoneLongin(phone, mobileType) {
	if (isEmpty(phone)) {
		$("#phoneTip").html("");
		return false;
	} else if (!isPhone(phone)) {
		$("#phoneTip").html("");
		return false;
	} else if (isEmpty(mobileType)) {
		$("#phoneTip").html("");
		return false;
	}
	return true;
}
/**
 * 查询售价.通过默认的
 */
function getCutAmont() {
	try {
		var phone = trim($("#phone").val());
		var mobileType = getMobileType(phone);
		if (isEmpty(mobileType)) {
			showWarning("运营商未找到，请核对充值号码后再试！");
			return false;
		}
		var faceAmount = $("input:radio[name='amount']:checked").val();
		faceAmount = toNumberDefaultZero(faceAmount).mul(100);
		var json = {};
		json.msgType = "11000220";
		json.shopid = "";
		json.orderAmt = '' + faceAmount;
		json.mobileOperatorId = mobileType;
		BizConf.fillAndRequestFromNet(json, "onGetCutAmont");
	} catch (e) {
		showError(e.message);
	}
}

function onGetCutAmont(code, data) {
	code = base64.decode(code);
	if (code == 1) {
		var receiveJson = eval("(" + base64.decode(data) + ")");
		$("#amountTips").html(toNumberDefaultZero(receiveJson.amount).div(100));
		$("div[name='next']").attr("enabl", "YES");
		var amountValue = $("input:radio[name='amount']:checked").val();
		if (amountValue == 500) {
			$("#next1").attr("enabl", "NO");
		}
		  /* var placeJson={};
		   placeJson.msgType='19901200';
		   placeJson.dataHeader = "CP01K1CP0000800_1101";
		   placeJson.bizCode = "QMF";
		   placeJson.mobileNo=trim($('#phone').val());
           requestResponse(JSON.stringify(placeJson), "placeQuery");*/
	} else {
		setError(code, base64.decode(data));
	}
}

/**
 * 通过优惠券查询的
 * 
 */
function getCouponAmont() {
	var faceAmount = $("input:radio[name='amount']:checked").val();
	var rebate = $("#cardAmount").html();
	var amountCoupon = toNumberDefaultZero(faceAmount).sub(
			toNumberDefaultZero(rebate));
	$("#amountTips").html(amountCoupon);
	$("div[name='next']").attr("enabl", "YES");
	$('#sampleCopy').html($('#sample').html());
	$('#minusAmount').html('-'+parseInt(rebate));
	$('#count').show();
	var amountValue = $("input:radio[name='amount']:checked").val();
	if (amountValue == 500) {
		$("#next1").attr("enabl", "NO");
	}
}
// 优惠券使用限制
function checkYhq(cardAmount) {
	payStype = "1";
	var tag = true;
	$("input:radio[name='amount']:checked").removeAttr("checked");
	$("input:radio[name='amount']").removeAttr("disabled");
	$("span[style='background:#ddd']").removeAttr("style");
	var index = "100";
	if (toNumber(cardAmount) >= 20) {
		$("input:radio[value='20']").attr("disabled", "true");
		$("input:radio[value='20']").parent("label").find("span").eq(0).attr(
				"style", "background:#ddd");
	}
	if (toNumber(cardAmount) >= 30) {
		$("input:radio[value='30']").attr("disabled", "true");
		$("input:radio[value='30']").parent("label").find("span").eq(0).attr(
				"style", "background:#ddd");
	}
	if (toNumber(cardAmount) >= 50) {
		$("input:radio[value='50']").attr("disabled", "true");
		$("input:radio[value='50']").parent("label").find("span").eq(0).attr(
				"style", "background:#ddd");
	}
	if (toNumber(cardAmount) >= 100) {
		$("input:radio[value='100']").attr("disabled", "true");
		$("input:radio[value='100']").parent("label").find("span").eq(0).attr(
				"style", "background:#ddd");
		index = "300";
	}
	if (toNumber(cardAmount) >= 300) {
		$("input:radio[value='300']").attr("disabled", "true");
		$("input:radio[value='300']").parent("label").find("span").eq(0).attr(
				"style", "background:#ddd");
		index = "500";
	}
	if (toNumber(cardAmount) >= 500) {
		$("input:radio[name='amount']").removeAttr("disabled");
		$("span[style='background:#ddd']").removeAttr("style");
		$("input:radio[value='500']").click();
		$("#cardText").html("不使用优惠券");
		tag = false;
		$("input:radio[name='amount']").change();
	}
	$("input:radio[value='" + index + "']").click();
	return tag;

}