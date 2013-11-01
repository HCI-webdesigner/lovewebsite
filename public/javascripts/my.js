//login.js
var M0001='会员名/注册邮箱/姓名';
function changeLoginId(value,id)
{
    if(value==M0001)
    {
        document.getElementById(id).value="";
        return;
    }
}

//爱心人物滚动图片
var dir=1;//每步移动像素，大＝快
var speed=15;//循环周期（毫秒）大＝慢
var MyMar=null;

document.getElementById("scrollcopy").innerHTML = document.getElementById("scrollcon").innerHTML;
 MyMar=setInterval(Marquee,speed);

function Marquee(){//正常移动
    var scrollbox = document.getElementById("scrollbox");
    var scrollcopy = document.getElementById("scrollcopy");
    if(dir>0&&(scrollcopy.offsetWidth-scrollbox.scrollLeft)<=0){
        scrollbox.scrollLeft=0;
    }
    if(dir<0 &&(scrollbox.scrollLeft<=0)){
        scrollbox.scrollLeft=scrollcopy.offsetWidth;
    }
        scrollbox.scrollLeft+=dir;
}

function onmouseoverMy(){
    window.clearInterval(MyMar);
}//暂停移动

function onmouseoutMy() {
    MyMar=setInterval(Marquee,speed);
}//继续移动

function r_left(){
    if(dir==-1)
    dir=1;
}//换向左移

function r_right(){
    if(dir==1)
    dir=-1;
}//换向右移

function IsIE(){
    var browser=navigator.appName
    if((browser=="Netscape")){
        return false;
    }
    else if(browser=="Microsoft Internet Explorer"){
        return true;
    }else{
        return null;
    }
}

var _IsIE = IsIE();
var _MousePX = 0;
var _MousePY = 0;
var _DivLeft = 0;
var _DivRight = 0;
var _AllDivWidth = 0;
var _AllDivHeight = 0;

function MoveDiv(e){

    var obj = document.getElementById("scrollbox");
    _MousePX = _IsIE ? (document.body.scrollLeft + event.clientX) : e.pageX;
    _MousePY = _IsIE ? (document.body.scrollTop + event.clientY) : e.pageY;
    //Opera Browser Can Support ''window.event'' and ''e.pageX''
    
    var obj1 = null;

    if(obj.getBoundingClientRect){
        //IE
        obj1 = document.getElementById("scrollbox").getBoundingClientRect();
        _DivLeft = obj1.left;
        _DivRight = obj1.right;
        _AllDivWidth = _DivRight - _DivLeft;
    }else if(document.getBoxObjectFor){
        //FireFox
        obj1 = document.getBoxObjectFor(obj); 
        var borderwidth = (obj.style.borderLeftWidth != null && obj.style.borderLeftWidth != "") ? parseInt(obj.style.borderLeftWidth) : 0;
        _DivLeft = parseInt(obj1.x) - parseInt(borderwidth);
        _AllDivWidth = Cut_Px(obj.style.width);
        _DivRight = _DivLeft + _AllDivWidth;
    }else{
        //Other Browser(Opera)
        _DivLeft = obj.offsetLeft;
        _AllDivWidth = Cut_Px(obj.style.width);
        var parent = obj.offsetParent;
        
        if(parent != obj){
            while (parent){  
                _DivLeft += parent.offsetLeft; 
                parent = parent.offsetParent;
            }
        }
        _DivRight = _DivLeft + _AllDivWidth;
    }

    var pos1,pos2;
    pos1 = parseInt(_AllDivWidth * 0.4) + _DivLeft;
    pos2 = parseInt(_AllDivWidth * 0.6) + _DivLeft;

    if(_MousePX > _DivLeft && _MousePX < _DivRight){
        if(_MousePX > _DivLeft && _MousePX < pos1){
            r_left(); //Move left
        }
        else if(_MousePX < _DivRight && _MousePX > pos2){
            r_right(); //Move right
        }
        if(_MousePX > pos1 && _MousePX < pos2){
            onmouseoverMy(); //Stop
            MyMar=null;
        }else if(_MousePX < pos1 || _MousePX > pos2){
            if(MyMar==null){
                MyMar=setInterval(Marquee,speed);
            }
        }
    }
}

function Cut_Px(cswidth){
    cswidth = cswidth.toLowerCase();
    if(cswidth.indexOf("px") != -1){
        cswidth.replace("px","");
        cswidth = parseInt(cswidth); 
    }
    return cswidth;
}

function MoveOutDiv(){
    if(MyMar == null){
        MyMar=setInterval(Marquee,speed);
    }
}//爱心人物滚动图片结束

//注册
// 一个标志 用来在总体校验时判断用户输入的邮箱、帐号是否已被占用 1的时候被占用  不进行表单提交
var ret = 0;
// 光标定位的标志 1 邮箱  2 帐号
var retresult = 0;

 var M1='姓名不能为空';
 var M2='姓名不能少于2个字';
 var M3='姓名不能多于4个字';
 var M4='邮箱不能为空';
 var M5='请输入正确格式的邮箱！';
 var M6='您输入的电子邮箱未被注册，您可以放心使用！';
 var M7='您输入的电子邮箱已被注册，请使用其他邮箱！';
 var M6='会员名不能为空';
 var M7='会员名长度不能少于4位';
 var M8='会员名不能大于16位';
 var M9='请输入正确格式的会员名！';
 var M10='密码不能为空';
 var M11='密码不能少于6位';
 var M12='确认密码不能为空';
 var M13='两次输入密码不一致';
 var M14='您需要同意服务协议才能继续注册！';
 var M01='您输入的电子邮箱未被注册，您可以放心使用！';
 var M02='您输入的电子邮箱已被注册，请使用其他邮箱！';
 var M03='您输入的帐号未被注册，您可以放心使用！';
 var M04='您输入的帐号已被注册，请使用其他名字！';
 var M05='会员名被系统保留，请选择其他会员名！';
/*
 * 创建请求对象
 */
    function createXMLHttpRequest2()
    { 
        var xmlHttp;
        //针对IE浏览器
        if(window.ActiveXObject)
        { 
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest){ 
        //其它的浏览器
            xmlHttp=new XMLHttpRequest();
        }
        return xmlHttp;
    }
/*
*检查邮箱是否可用
*/
    function checkEmail(email)
    {
        if(email!="")
        {
            var xmlHttp=createXMLHttpRequest2();
            /*修改修改修改修改修改*/ 
            xmlHttp.open("GET",basePath+"MailCheckServlet?email="+email,true);
            /*修改修改修改修改修改*/
            xmlHttp.send(null); 
            xmlHttp.onreadystatechange=function()
            {
                if(xmlHttp.readyState==4)
                { 
                    if(xmlHttp.status==200)
                    {
                        if(xmlHttp.responseText=='true')
                        {
                            document.getElementById("login_emailError").innerHTML="<span class='success'>"+M01+"</span>";
                        } 
                        else if(xmlHttp.responseText=='false')
                        {
                            ret=1;
                            retresult=1;
                            document.getElementById("login_emailError").innerHTML="<span class='error'>"+M02+"</span>";
                        }
                    }
                } 
            } 
        }
    }

/*
*检查会员名是否可用
*/
    function checkAcount(acount)
    {
        if(acount!="")
        {
            //避免乱码
            var userNameEncode=encodeURIComponent(acount);
            var xmlHttp=createXMLHttpRequest2();
            /*修改修改修改修改修改*/
            xmlHttp.open("GET",basePath+"NameCheckServlet?acount="+userNameEncode,true); 
            /*修改修改修改修改修改*/
            xmlHttp.send(null); 
            xmlHttp.onreadystatechange=function()
            {
                if(xmlHttp.readyState == 4)
                { 
                    if(xmlHttp.status == 200)
                    {
                        if(xmlHttp.responseText=='true')
                        {
                            document.getElementById("login_acountError").innerHTML="<span class='success'>"+M03+"</span>";
                        } 
                    else if(xmlHttp.responseText=='false') 
                    {
                        ret = 1;
                        retresult = 2;
                        document.getElementById("login_acountError").innerHTML="<span class='error'>"+M04+"</span>";
                    }
                    else if(xmlHttp.responseText=='banwork') 
                    {
                        ret = 1;
                        retresult = 2;
                        document.getElementById("login_acountError").innerHTML="<span class='error'>"+M05+"</span>";
                    }
                    
               }
            } 
        } 
    }
}

/*
*计算字符串的长度，一个汉字作为两个字符
*/
    function len(s)
    {
        var l=0;
        var a=s.split("");
        for(var i=0;i<a.length;i++)
        {
            if(a[i].charCodeAt(0)<256)
            {
                l++;
            }
            else
                l+=2;
        }
        return l;
    }
/*
*计算字符串的长度，一个汉字作为一个字符，英文两个字符
*/
    function lenToCharNum(s)
    {
        var l=0;
        var a=s.split("");
        for(var i=0;i<a.length;i++)
        {
            if (a[i].charCodeAt(0)<256)
            {
                l+=0.5 ;
            }
            else
            {
                l++;
            }
        }
        return Math.round(l);
    } 
/*
*输入时限制字数开始
*/
    function onKeyDownByName(obj)
    {
        //会员名校验
        var value = obj.value.replace(/^\s+/,'').replace(/\s+$/,'');
        if(lenToCharNum(value)>8)
        {
            while (lenToCharNum(value)>8)
            {
                value = value.substr(0, value.length - 1);
            }
            obj.value = value;
            document.getElementById("login_acountError").innerHTML="<span class='error'>"+M8+"</span>";
        }
        else if(!(/^([A-Za-z]||[\u4e00-\u9fa5]||[0-9]||[_])+$/.test(value)))
        {
            document.getElementById("login_acountError").innerHTML = "<span class='error'>"+M9+"</span>";
        }
        return;
    }
/*
*输入时限制字数结束
*/

/*
 * 所有输入值校验
 */
function checkAllValue() 
{   
    if(ret == 1){
        if(retresult == 1){
            document.getElementById("login_email").focus();
            ret = 0;
            retresult = 0;
        }
        if(retresult == 2){
            document.getElementById("login_acount").focus();
            ret = 0;
            retresult = 0;
        }
        return false;
    }
    var flag = true;
    //第一个错误内容的ID
    var firstErrorID = "";

    //邮箱校验
    var value = document.getElementById("login_email").value.replace(/^\s+/,'').replace(/\s+$/,'');
    if(value == "")
    {
        if(firstErrorID=="") {firstErrorID="login_email";}
        document.getElementById("login_emailError").innerHTML="<span class='error'>"+M4+"</span>";
        flag = false;
    }else if(!/^[a-zA-Z0-9\_|\-|\.]+@([a-zA-Z0-9]+[\-\_]*)+(\.[a-zA-Z0-9]{2,4}){1,2}$/.test(value) || /^[0-9]{1,20}$/.test(value.substring((value.indexOf(".")+1)))){
        // 当邮箱不匹配正则表达式 或者 后缀为数字的时候 显示邮箱错误提示信息
        if(firstErrorID==""){firstErrorID="login_email";}
        document.getElementById("login_emailError").innerHTML="<span class='error'>"+M5+"</span>";
        flag = false;
    }else if(value.indexOf("..")!=-1){
        // 当邮箱不匹配正则表达式 或者 后缀为数字的时候 显示邮箱错误提示信息
        if(firstErrorID==""){firstErrorID="login_email";}
        document.getElementById("login_emailError").innerHTML="<span class='error'>"+M5+"</span>";
        flag = false;
    }

    //会员名校验
    value = document.getElementById("login_acount").value.replace(/^\s+/,'').replace(/\s+$/,'');
    if(value =="")
    {
        if(firstErrorID==""){firstErrorID="login_acount";}
        document.getElementById("login_acountError").innerHTML="<span class='error'>"+M6+"</span>";
        flag = false;
    }
    else if(len(value) < 4)
    {
        if(firstErrorID == ""){ firstErrorID = "login_acount";}
        document.getElementById("login_acountError").innerHTML = "<span class='error'>"+M7+"</span>";
        flag = false;
    }
    else if(lenToCharNum(value)>8)
    {
        if(firstErrorID==""){ firstErrorID="login_acount";}
        document.getElementById("login_acountError").innerHTML="<span class='error'>"+M8+"</span>";
        flag = false;
    }
    else if(!(/^([A-Za-z]||[\u4e00-\u9fa5]||[0-9]||[_])+$/.test(value)))
    {
        if(firstErrorID==""){ firstErrorID="login_acount";}
        document.getElementById("login_acountError").innerHTML="<span class='error'>"+M9+"</span>";
        flag = false
    }

    //密码校验
    value = document.getElementById("login_password1").value;
    if(value =="")
    {
        if(firstErrorID==""){ firstErrorID="login_password1";}
        document.getElementById("login_password1Error").innerHTML="<span class='error'>"+M10+"</span>";
        flag = false;
    }
    else if(len(value) < 6)
    {
        if(firstErrorID == "") {firstErrorID = "login_password1";}
        document.getElementById("login_password1Error").innerHTML = "<span class='error'>"+M11+"</span>";
        flag = false;
    }
    //协议校验
    if(document.getElementById("login_agreement").checked != true)
    {
        if(firstErrorID == "") {firstErrorID = "login_agreement";}
        document.getElementById("login_agreementError").innerHTML ="<span class='error'>"+M14+"</span>";
        flag = false;
    }
    if(firstErrorID != "")
    {
        document.getElementById(firstErrorID).focus();
        flag = false;
    }
    // 将2个标志返回初始状态
    ret = 0;
    retresult = 0;
    return flag;
}
/*
 * 所有输入值校验结束
 */

/*
*单个值检验开始
*/
    function checkValue(obj)
    {
        var id=obj.id;
        var value=obj.value.replace(/^\s+/,'').replace(/\s+$/,'');
        //姓名检验
        if(id=="login_name")
        {
            if(value==""){
                document.getElementById("login_nameError").innerHTML="<span class='error'>"+M1+"</span>";
            }
            else if(len(value)<4)
            {
                document.getElementById("login_nameError").innerHTML="<span class='error'>"+M2+"</span>";
            }
            else if(len(value)>8)
            {
                document.getElementById("login_nameError").innerHTML="<span class='error'>"+M3+"</span>";
            }
            else
            {
                document.getElementById("login_nameError").innerHTML="";
            }
            return;
        }
        //邮箱检验
        if(id=="login_email")
        {
            if(value=="")
            {
                document.getElementById("login_emailError").innerHTML="<span class='error'>"+M4+"</span>";
            }
            else if(!/^[a-zA-Z0-9\_|\-|\.]+@([a-zA-Z0-9]+[\-\_]*)+(\.[a-zA-Z0-9]{2,4}){1,2}$/.test(value) || /^[0-9]{1,20}$/.test(value.substring((value.indexOf(".")+1))))
            {
                // 当邮箱不匹配正则表达式 或者 后缀为数字的时候 显示邮箱错误提示信息
                document.getElementById("login_emailError").innerHTML="<span class='error'>"+M5+"</span>";
            }
            else if(value.indexOf("..")!=-1)
            {
                // 当邮箱不匹配正则表达式 或者 后缀为数字的时候 显示邮箱错误提示信息
                document.getElementById("login_emailError").innerHTML="<span class='error'>"+M5+"</span>";
            }
            else
            {
                //清空错误信息
                document.getElementById("login_emailError").innerHTML="";
                //检测邮箱是否已被注册
                checkEmail(value);
            }
            return;
        }
        //会员名检验
        if(id=="login_acount")
        {
            if(value=="")
                document.getElementById("login_acountError").innerHTML="<span class='error'>"+M6+"</span>";
            else if(len(value)<4)
                document.getElementById("login_acountError").innerHTML="<span class='error'>"+M7+"</span>";
            else if(lenToCharNum(value)>8)
            {
                while (lenToCharNum(value)>8)
                {
                    value=value.substr(0,value.length-1);
                }
                obj.value=value;
                document.getElementById("login_acountError").innerHTML="<span class='error'>"+M8+"</span>";
            }
            else if(!(/^([A-Za-z]||[\u4e00-\u9fa5]||[0-9]||[_])+$/.test(value)))
            {
                document.getElementById("login_acountError").innerHTML="<span class='error'>"+M9+"</span>";
            }
            else
            {
                //清空错误信息
                document.getElementById("userNameError").innerHTML="";
                //检测会员名是否已被注册
                checkAcount(value);
            }
            return;
        }
        //密码检验
        if(id=="login_password1")
        {
            if(value=="")
                document.getElementById("login_password1Error").innerHTML="<span class='error'>"+M10+"</span>";
            else if(value.length<6)
                document.getElementById("login_password1Error").innerHTML="<span class='error'>"+M11+"</span>";
            else
                document.getElementById("login_password1Error").innerHTML="<span class='success'>"&nbsp;"</span>";
            return;
        }
        //确认密码检验
        if(id=="password2")
        {
            if(value=="")
            {
                document.getElementById("login_password2Error").innerHTML="<span class='error'>"+M12+"</span>";
            }
            else if(document.getElementById("login_password1").value!=""&&value!=document.getElementById("login_password1").value)
            {
                document.getElementById("login_password2Error").innerHTML="<span class='error'>"+M13+"</span>";
            }
            else
            {
                document.getElementById("login_password2Error").innerHTML="<span class='success'>"&nbsp;"</span>";
            }
            return;
        }
        //用户协议检验
        if(id=="login_agreement")
        {
            if(document.getElementById(id).checked!=true)
            {
                document.getElementById("login_agreementError").innerHTML="<span class='error'>"+M14+"</span>";
            }
            else
            {
                document.getElementById("login_agreementError").innerHTML="<span class='success'>"&nbsp;"</span>";
            }
        }
        return;
    }
/*
*单个值检验结束
*/

//找回密码
    function check(obj)
    {
        var id=obj.id;
        var value=obj.value.replace(/^\s+/,'').replace(/\s+$/,'');
        //姓名检验
        if(id=="find")
        {
            if(value==""){
                document.getElementById("findError").innerHTML="<span class='error'>"+'此项不能为空'+"</span>";
            }
            else
            {
                document.getElementById("findError").innerHTML="<span class='success'>"+'成功发送'+"</span>";
            }
            return;
        }
    }
//找回密码结束


