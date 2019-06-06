var csvData = [];
let bias = 7;
let qMax=50;
let qn=-1;

let ansShow=0;

$(".backButton").text("前へ");
$(".nextButton").text("次へ");

function checkbnBtn(){
    if(qn<=0) $(".backButton").hide();
    else $(".backButton").show();
    if(qn>=qMax-1){
        $(".backButton").removeClass("link");
        $(".nextButton").hide();
    }
    else{
        $(".backButton").addClass("link");
        $(".nextButton").show();
    }
    if(qn<0){
        $("#showAnsButton").hide();
    }
    else $("#showAnsButton").show();
}

function ansShowReset(){
    $("#showAnsArea").html("");
    $("#showAnsButton").html("答えを見る");
    ansShow=0;
}

$(".backButton").on("click",function(){
    qn--;
    if(qn<0){
        qn=0;
    }
    showQ(qn);
    checkbnBtn();
    ansShowReset();
});

$(".nextButton").on("click",function(){
    qn++;
    if(qn>=qMax){
        qn=qMax-1;
    }
    showQ(qn);
    checkbnBtn();
    ansShowReset();
});

function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "./data/test.csv", true);
    req.send(null);

    req.onload = function(){
	    convertCSVtoArray(req.responseText);
    }
}


function convertCSVtoArray(str){

    var tmp = str.split("\n");

    for(var i=0;i<tmp.length;++i){
        csvData[i] = tmp[i].split(',');
        csvData[i][2] = csvData[i][2].replace(/\./g,",");
    }
}

function showQ(n=0){
    $("#qnArea").html((n+1)+"問目/"+qMax+"問中  ("+csvData[n+bias][0]+"点)");
    $("#questionArea").html(csvData[(n+bias)][3]);
   
    let caText="";
    let cType=csvData[n+bias][1]
    if(cType=="wordinput"){
        caText="<input type='text'></p>";
    }
    else if(cType=="dropdown"){
        for(var i=1;i<=6;i++){
            caText += i+". "+showDropdown() + "<br>";
        }
    }
    else if(cType=="radio"){
        for(var i=4;i<=13;i++){
            if(csvData[(n+bias)][i]=="") break;
            caText+="<input type='checkbox' name='"+i+"' value='"+csvData[(n+bias)][i]+"'>"+(i-3)+". "+csvData[(n+bias)][i]+"<br>"
        }
    }
    else if(cType=="matching"){
        caText=csvData[(n+bias)][[4]].replace(/:/g,"<br>");
        caText+="<br>";
        caText+="物理層"+showMatch()+":データリンク層"+showMatch()+":ネットワーク層"+showMatch()+":トランスポート層"+showMatch()+":セッション層"+showMatch()+":プレゼンテーション層"+showMatch()+":アプリケーション層"+showMatch();
        caText=caText.replace(/:/g,"<br>");
    }
    else if(cType="checkbox"){
        for(var i=4;i<=13;i++){
            if(csvData[(n+bias)][i]=="") break;
            caText+="<input type='checkbox' name='"+i+"' value='"+csvData[(n+bias)][i]+"'>"+(i-3)+". "+csvData[(n+bias)][i]+"<br>"
        }
    }
    else caText="ERROR";
    $("#choicesArea").html(caText);
}

$("#showAnsButton").on("click",function(){
    ansShow=(ansShow+1)%2;
    console.log(ansShow);
    if(ansShow==1){
        $("#showAnsArea").html(csvData[(qn+bias)][2]);
        $("#showAnsButton").html("答えを隠す");
    }
    else{
        $("#showAnsArea").html("");
        $("#showAnsButton").html("答えを見る");
    }
});

function showDropdown(){
    let str="";
    str+="<select name='example'>"
    for(var i=4;i<=13;i++){
        str+="<option value='選択肢"+(i-3)+"'>"+csvData[5+bias][i]+"</option>";
    }
    str += "</select>";
    return str;
}

function showMatch(){
    let str="";
    str+="<select name='example'>"
    for(var i=1;i<=7;i++) str+="<option value='選択肢"+i+"'>"+i+"</option>";
    str += "</select>";
    return str;
}

getCSV();
checkbnBtn();


