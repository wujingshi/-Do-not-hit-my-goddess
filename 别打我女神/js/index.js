/**
 * Created by wujingshi on 2017/7/29.
 */

window.onload=function() {
//获取元素
    var diShu = document.getElementById("diShu");
    var littleMou = diShu.getElementsByTagName("div")
    console.log(littleMou);
    var gameStr = document.getElementById("game-start");
    var numScore = document.getElementById("numScore");
    var gameTime = document.getElementById("gameTime");
//设置变量，打中天使每次增加的分数
    var downScore = 100;
//设置变量，打中女神每次扣分多少
    var lostScore = 50;
//设置开始默认的时间及默认得分
    var gameFullTime = 60;
    var strScore = 0;

    //设置定时器
    var moveTime=null;

//开始游戏
    console.log(gameStr);
    //调用开始游戏函数
    gameStr.onmousedown=function() {
        goGoMou();
    }



        //开始游戏按钮按下

            function ksGame() {
                //调用函数赋予值，兼容IE8
                setText(gameTime, gameFullTime);
                setText(numScore, strScore);
                //执行倒计时
                countOver();
                //执行天使属性
                mouseMove();
            }


//倒计时设置
        function countOver() {

            //设置倒计时
            var getTime = setInterval(function () {
                //兼容判断并赋予值
                setText(gameTime, --gameFullTime);

                //判断
                if (gameFullTime==0) {
                    clearInterval(getTime);
                    clearInterval(moveTime);

                    for (var i = 0; i < littleMou.length; i++) {
                        littleMou[i].style.display = "none";
                    }

                    alert("游戏结束，得分为" + strScore);
                }
            }, 1000)
        }

//属性操作
    function mouseMove() {
        //定时器随机定义正确和错误的天使和女神个数,以及需要显示的个数
         moveTime = setInterval(function () {
             //出现天使的个数
            for (var i = 0; i < littleMou.length; i++) {
                littleMou[i].className = "goodMou active";
                littleMou[i].setAttribute("clicked", "0");
                littleMou[i].style.display = "none";
            }

            //随机女神的个数
            for (var i = 0; i < randMou(0, 8); i++) {
                littleMou[randMou(0, 8)].className = "badMou active";
            }
            //显示女神个数
            for (var i = 0; i < randMou(0, 8); i++) {
                littleMou[randMou(0, 8)].style.display = "block";
            }
        }, 1000);
    }




//打天使操作
        function goGoMou() {
            //查看游戏是否点击开始或者重新开始
            gameStr.addEventListener("click", function () {
                ksGame();
            }, false);

            //打天使动作
            diShu.addEventListener("click", function (e) {
                //兼容判断
                e = e || window.event;
                var gameLem = e.target || e.srcElement;
                //判断得分设置，如果这个地鼠是隐藏的就不打他，多次打他就只得一次分数
                if (gameLem.style.display != "block" || gameLem.getAttribute("clicked") == "1") {
                    return;
                }
                //进行加减分的判断
                if (gameLem.className.indexOf("badMou") != -1) {
                    strScore -= lostScore;
                } else {
                    strScore += downScore;
                }

                gameLem.setAttribute("clicked", "1");
                setText(numScore, strScore);
            }, false);
        }





//兼容设置，获取文本类型，以便判断
    function setText(ele, text) {
        //能力检测
        if (typeof ele.textContent) {
            ele.textContent = text;
        } else {
            ele.innerText = text;
        }
    }


//设置女神随机数的函数
    function randMou(str, end) {
        return Math.floor(Math.random() * (end - str) + str);
    }
}
