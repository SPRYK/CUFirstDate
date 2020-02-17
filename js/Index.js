
function save() {

    var XHR = new XMLHttpRequest();

    XHR.addEventListener("error", function (event) {
        //------ API Error ----------
        $("#div_api_result").html("Error");
    });

    XHR.open("POST", "https://cunex.supergolf500.com/api/student");
    XHR.setRequestHeader('Content-Type', 'application/json');

    var xname = ($("#name").val()).trim().replace("  ", " ");
    var nickname = ($("#nickname").val()).trim();
    var name = xname.split(" ");
    var id = $("#id").val().trim();
    // สิ่งที่สนใจ
    var sport = document.getElementById("sport").value;
    var study = document.getElementById("study").value;
    var volunteer = document.getElementById("volunteer").value;
    var music = document.getElementById("music").value;
    var picture = document.getElementById("picture").value;
    var religion = document.getElementById("religion").value;
    var interest = sport+study+volunteer+music+picture+religion;
    // ไม่มั่นใจ SAR 
    var dict = {
        "21": "วิศวกรรมศาสตร์",
        "22": "อักษรศาสตร์",
        "23": "วิทยาศาสตร์",
        "24": "รัฐศาสตร์",
        "25": "สถาปัตยกรรมศาสตร์",
        "26": "พาณิชยศาสตร์และการบัญชี",
        "27": "ครุศาสตร์",
        "28": "นิเทศศาสตร์",
        "29": "เศรษฐศาสตร์",
        "30": "แพทยศาสตร์",
        "31": "สัตวแพทยศาสตร์",
        "32": "ทันตแพทยศาสตร์",
        "33": "เภสัชศาสตร์",
        "34": "นิติศาสตร์",
        "35": "ศิลปกรรมศาสตร์",
        "36": "พยาบาลศาสตร์",
        "37": "สหเวชศาสตร์",
        "38": "จิตวิทยา",
        "39": "สำนักวิชาวิทยาศาสตร์การกีฬา",
        "40": "สำนักวิชาทรัพยากรการเกษตร",
        "56": "โครงการจัดตั้งสถาบันนวัตกรรมบูรณาการ"
    };
    var check = false;
    if (xname == "") {
        alert("กรุณาใส่ชื่อ-นามสกุลของคุณ");
        check = false;
        return;
    }
    if (nickname == "") {
        alert("กรุณาใส่ชื่อเล่นของคุณ");
        check = false;
        return;
    }
    if (id.length != 10) {
        alert("กรุณาใส่รหัสนิสิต 10 หลักของคุณ");
        check = false;
        return;
    }
    check = true;

    if (check) {
        XHR.send(JSON.stringify({
            'EventID': "CUFD",
            'StudentID': (id == "") ? null : id,
            'FirstName': ((name[0] == "") ? null : name[0]),
            'LastName': ((name[1] == "") ? null : name[1]),
            'Sex': "xxxxx",
            'Faculty': ((dict[id.substring(8)] == "") ? null : dict[id.substring(8)]),
            'Interest': ((interest == "") ? null : interest),
            'Other': ((($("#nickname").val()).trim() == "") ? null : ($("#nickname").val()).trim())

        }));

    }

    XHR.addEventListener("load", function (event) {
        //------ API ตอบกลับสำเร็จ ----------
        var json = event.target.responseText;
        //localStorage.setItem("json",json);
        var obj = JSON.parse(json);
        if (obj.StatusCode == "00") {
            alert(obj.Message);
        }

        // ทำเกี่ยวกับ cookie

        setCookie("QRCode", obj.Student.QRCode, 3);

        // ---------------------
        location.href = 'Avatar.html';

    });
    
    
}

function interested(button) {
    if (document.getElementById(button).value == "0") {
        document.getElementById(button).value = "1";
        document.getElementById(button).style.backgroundColor = "pink";
    }
    else {
        document.getElementById(button).value = "0";
        document.getElementById(button).style.backgroundColor = "";
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
    var cookie = getCookie("QRCode");
    if (cookie != "") {
        // เคยสมัครไปแล้วแสดงผลหน้า Card
        location.href = 'Card.html';
    } 
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

var CustomConfirm = new function() {

    this.show = function(msg,callback) {
        var dlg = document.getElementById('dialogCont');
        var dlgBody = dlg.querySelector('#dlgBody');
        dlg.style.top = '50%';
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        this.callback = callback;
        document.getElementById('freezeLayer').style.display = '';
    };
    this.okay = function() {
        this.callback();
        this.close();
    }
    this.close = function() {
        var dlg = document.getElementById('dialogCont');
        dlg.style.top = '-30%';
        dlg.style.opacity = 0;
        document.getElementById('freezeLayer').style.display = 'none';
    }
};