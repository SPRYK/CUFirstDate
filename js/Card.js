

//ตัวเก็บสี background ตามคณะ
var backgroundColor = {
    "21": "#751D13",
    "22": "#81807F",
    "23": "#F7ED3C",
    "24": "#080605",
    "25": "#BC5722",
    "26": "#86D4EC",
    "27": "#C42026",
    "28": "#124572"
    // "29": "เศรษฐศาสตร์",
    // "30": "แพทยศาสตร์",
    // "31": "สัตวแพทยศาสตร์",
    // "32": "ทันตแพทยศาสตร์",
    // "33": "เภสัชศาสตร์",
    // "34": "นิติศาสตร์",
    // "35": "ศิลปกรรมศาสตร์",
    // "36": "พยาบาลศาสตร์",
    // "37": "สหเวชศาสตร์",
    // "38": "จิตวิทยา",
    // "39": "สำนักวิชาวิทยาศาสตร์การกีฬา",
    // "40": "สำนักวิชาทรัพยากรการเกษตร",
    // "56": "โครงการจัดตั้งสถาบันนวัตกรรมบูรณาการ"
};
//ตัวเก็บสี Success และปุ่ม ตามคณะ
var successColor = {
    "21": "#FCB215",
    "22": "#F7ED3C",
    "23": "#333333",
    "24": "#F27494",
    "25": "#FCB215",
    "26": "#565554",
    "27": "#FFFFFF",
    "28": "#FCB215"
    // "29": "เศรษฐศาสตร์",
    // "30": "แพทยศาสตร์",
    // "31": "สัตวแพทยศาสตร์",
    // "32": "ทันตแพทยศาสตร์",
    // "33": "เภสัชศาสตร์",
    // "34": "นิติศาสตร์",
    // "35": "ศิลปกรรมศาสตร์",
    // "36": "พยาบาลศาสตร์",
    // "37": "สหเวชศาสตร์",
    // "38": "จิตวิทยา",
    // "39": "สำนักวิชาวิทยาศาสตร์การกีฬา",
    // "40": "สำนักวิชาทรัพยากรการเกษตร",
    // "56": "โครงการจัดตั้งสถาบันนวัตกรรมบูรณาการ"
};


function OpenMap()
{
    location.href = "https://www.google.com.qa/maps/d/u/0/edit?mid=19V-guvfurM10VmT2jfFTag4dWZwYEERM&ll=13.737321443835798%2C100.52812347549934&z=17";

    //https://drive.google.com/open?id=19V-guvfurM10VmT2jfFTag4dWZwYEERM&usp=sharing
}

function myStart() {
    //var json = localStorage.getItem("json");
    //var obj = JSON.parse(json);


    checkCookie();
    
    fetch('https://cunex.supergolf500.com/api/student'+'/'+getCookie("QRCode"))
        .then(response => response.json())
        .then(data => {

            if(data.StatusCode == "01")
            {
                setViewColor(data.Student.StudentID.substring(8));
                //document.getElementById("name").innerHTML = data.Student.FirstName + " " + data.Student.LastName;
                
                document.getElementById("nickname").innerHTML = data.Student.Other;
                //document.getElementById("id").innerHTML = data.Student.StudentID;
                document.getElementById("fac").innerHTML = data.Student.Faculty;
                document.getElementById("avatar").innerHTML = localStorage.getItem("picture");
                makeCode(data.Student.QRCode);
                var interest = "";
                var str = data.Student.Interest;
                var array = ["กีฬา", "วิชาการ", "จิตอาสา", "ดนตรี", "ถ่ายรูป", "วัฒนธรรม"];
                for (var i = 0; i < str.length; i++) {
                    if (str.charAt(i) == "1") {
                        interest += array[i] + " ";
                    }
                }
                if (interest == "") {
                    interest = "ไม่มี";
                }
                document.getElementById("interest").innerHTML = "ความสนใจ : " + interest;
            }
            else
            {
                deleteCookie();
            }
        })
        .catch(error => console.error(error))
    
}

function getMapKeyValueByIndex(obj, idx) {
    var key = Object.keys(obj)[idx];
    return { key: key, value: obj[key] };
 }
 function getMapKeyValue(obj, key) {
    if (obj.hasOwnProperty(key))
       return { key: key, value: obj[key] };
    throw new Error("Invalid map key.");
 }
function setViewColor(facCode)
{
    
    // if (typeof successColor[facCode] == 'undefined')
    // {
    //     //alert('หาสีไม่เจอ');
    //     facCode = "28";
    // }


    

    

        // var color_BG = backgroundColor[facCode];
        // var color_TXT = successColor[facCode];

        var color_BG = "#8ECAC8";//"#FFE0F6";
        var color_TXT = "#575556"

        $('html').css('background-color', "#FFFFFF");
        $('.card').css('background-color', color_BG)
        
        $('#Success').css('color',color_TXT);
        $('#nickname').css('color',color_TXT);

        $('#nickname').css('text-shadow',color_BG+' 3px 0px 0px');


        $('#fac').css('color',color_TXT);
        $('#interest').css('color',color_TXT);
        $('.interest-btn').css('color',"#FFFFFF");
        $('.interest-btn').css('background-color', color_TXT);
        
}

function makeCode(QRCode) //----วาด QR
{
    var qrcodeConfig = {
        width: 135,
        height: 135,
        //correctLevel : QRCode.CorrectLevel.M,	
        correctLevel: 0
    }

    $("#qrcodeCanvas").qrcode($.extend(qrcodeConfig, {
        text: QRCode
    }));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
    var cookie = getCookie("QRCode");
    if (cookie == "") {

        location.href = 'index.html';
    } 
}

function deleteCookie() {
    setCookie("QRCode","",0);
    location.href = 'index.html';
}

var CustomConfirm = new function () {

    this.show = function (msg, callback) {
        var dlg = document.getElementById('dialogCont');
        var dlgBody = dlg.querySelector('#dlgBody');
        dlg.style.top = '50%';
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        this.callback = callback;
        document.getElementById('freezeLayer').style.display = '';
    };
    this.okay = function () {
        this.callback();
        this.close();
    }
    this.close = function () {
        var dlg = document.getElementById('dialogCont');
        dlg.style.top = '-30%';
        dlg.style.opacity = 0;
        document.getElementById('freezeLayer').style.display = 'none';
    }
};