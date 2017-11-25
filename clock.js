//功能: 可以启动一个 25 分钟的番茄钟, 计时器将在 25 分钟后停止.
//功能: 可以重置番茄钟的状态以便启动下一次计时.
//功能: 可以为每个番茄钟自定义时长.
var wTimer = 1500;//工作时间总秒数
var bTimer = 300;//休息时间总秒数
var flag = 0;//0为开始工作,1为开始休息
var clock;//保存计时器
var save = 0;//剩余秒数存档
var pFlag = 0;//暂停标志,0为未暂停,1为暂停中
var work = new Vue({//绑定工作时间设置
  el:'#work',
  data:{
    wMin:25,
    wSec:"00"
  }
});
var Break = new Vue({//绑定休息时间设置
  el:'#break',
  data:{
    bMin:5,
    bSec:"00"
  }
});
document.getElementById("workTimeReduce").onclick = function(){//工作时间减少
  if(work.wMin===1){
    wTimer = 60;
  }else{
    wTimer -= 60;
  }
  work.wMin=wTimer/60;
};
document.getElementById("workTimeAdd").onclick = function(){//工作时间增加
  wTimer += 60;
  work.wMin=wTimer/60;
};

document.getElementById("breakTimeReduce").onclick = function(){//休息时间减少
    // console.log(work.wMin);
  if(Break.bMin===1){
    //分钟减少为0
    bTimer = 60;
  }else{
    bTimer -= 60;
  }
  Break.bMin = bTimer/60;
};
document.getElementById("breakTimeAdd").onclick = function(){//休息时间增加
  bTimer += 60;
  Break.bMin=bTimer/60;
};
document.getElementById("reset").onclick = function(){//重置
  document.getElementById("water").style.backgroundColor = "#FF6347";
  document.getElementById("start").setAttribute("class","orange");
  document.getElementById("reset").setAttribute("class","orange");
  document.getElementById("pause").setAttribute("class","orange");
  document.getElementById("stop").setAttribute("class","orange");
  wTimer = 1500;
  bTimer = 300;
  flag=0;
  work.wMin=wTimer/60;
  Break.bMin=bTimer/60;
  
};
document.getElementById("start").onclick = function(){//开始
  document.getElementById("timer").style.display="none";
  document.getElementById("start").style.display="none";
  document.getElementById("pause").style.display="inline-block";
  document.getElementById("stop").style.display="inline-block";
  document.getElementById("reset").style.display="none";
  document.getElementById("time").style.display="inline-block"; 
  if(pFlag){
    justDoIt(save);
  }else{
    justDoIt(wTimer);
  }
};
document.getElementById("pause").onclick = function(){//暂停
  document.getElementById("start").style.display="inline-block";
  document.getElementById("pause").style.display="none";
  pFlag = 1;
  clearTimeout(clock);
};
document.getElementById("stop").onclick = function(){//停止
  document.getElementById("time").style.display="none";
  document.getElementById("timer").style.display="block";
  document.getElementById("reset").style.display="inline-block";
  document.getElementById("start").style.display="inline-block";
  document.getElementById("pause").style.display="none";
  document.getElementById("stop").style.display="none";
  
  
  document.getElementById("water").style.backgroundColor = "#FF6347";
  document.getElementById("start").setAttribute("class","orange");
  document.getElementById("reset").setAttribute("class","orange");
  document.getElementById("pause").setAttribute("class","orange");
  document.getElementById("stop").setAttribute("class","orange");
  flag = 0;
  pFlag = 0;
  wTimer = work.wMin*60;
  bTimer = Break.bMin*60;
  document.getElementById("water").style.top = "100%";
  clearTimeout(clock);
};
function justDoIt(eve){
  if(eve < 0){
    //计时结束
    flag = 1 - flag;
    if(flag){//休息开始
      clock = setTimeout("justDoIt(" + bTimer + ")",1000);
      document.getElementById("water").style.backgroundColor = "#4ec4d1";
      document.getElementById("start").setAttribute("class","blue");
      document.getElementById("reset").setAttribute("class","blue");
      document.getElementById("pause").setAttribute("class","blue");
      document.getElementById("stop").setAttribute("class","blue");
    }else{//工作开始
      clock = setTimeout("justDoIt(" + wTimer + ")",1000);
      document.getElementById("water").style.backgroundColor = "#FF6347";
      document.getElementById("start").setAttribute("class","orange");
      document.getElementById("reset").setAttribute("class","orange");
      document.getElementById("pause").setAttribute("class","orange");
      document.getElementById("stop").setAttribute("class","orange");
    }
  }else{//计时未结束
    if(eve%60 < 10){
      var a = "0" + eve%60;
    }else{
      var a = eve%60;
    }
    if(!flag){//工作中
      document.getElementById("time").innerText = parseInt(eve/60) + ":" + a;
      document.getElementById("water").style.top = eve * 100 / wTimer + "%";
      eve -= 1;
    }else{//休息中
      document.getElementById("time").innerText = parseInt(eve/60) + ":" + a;
      document.getElementById("water").style.top = (bTimer - eve) * 100 / bTimer + "%";
      eve -= 1;
    }
    save = eve;
    clock = setTimeout("justDoIt(" + eve + ")",1000);
  }
};