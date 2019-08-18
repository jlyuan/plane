
// 背景
var wrapBg = document.querySelector("#wrapBg");
var screen = document.querySelector("#screen");
var scoreDiv = document.querySelector("#score");
var score = 0;
function moveBg() {
    wrapBg.style.top = wrapBg.offsetTop + 2 + "px"
    if (wrapBg.offsetTop == 0) {
        wrapBg.style.top = -500 + 'px';
    }
}
// 背景定时移动
var timeBg = setInterval(moveBg, 100);

// 主机
var airPlane = document.querySelector("#airPlane");
// 主机移动
function airPlaneMove(direction, dist) {
    var left = airPlane.offsetLeft;
    var top = airPlane.offsetTop;
    switch (direction) {
        case 'up':
            top -= dist;
            break;
        case 'down':
            top += dist;
            break;
        case 'left':
            left -= dist;
            break;
        case 'right':
            left += dist;
            break;
        default:
            break;
    }
    if (left > 360) {
        left = 360;
    } if (left < 0) {
        left = 0;
    }
    if (top > 450) {
        top = 450;
    }
    if (top < 0) {
        top = 0;
    }
    airPlane.style.left = left + 'px';
    airPlane.style.top = top + 'px';
}


document.documentElement.addEventListener('keyup', function (event) {
    event = event || window.event;
    var dist = 10;
    var dire = 'up'
    if (event.keyCode == 38) {
        dire = 'up'
    }
    if (event.keyCode == 40) {
        dire = 'down'
    }
    if (event.keyCode == 37) {
        dire = 'left'
    }
    if (event.keyCode == 39) {
        dire = 'right'
    }
    airPlaneMove(dire, dist);
})

// 子弹
var bulletCreateTimer = setInterval(function () {
    var node = document.createElement('div')
    node.className = "bullet";
    node.style.left = airPlane.offsetLeft + 16 + 'px';
    node.style.top = airPlane.offsetTop - 6 + 'px';
    screen.appendChild(node);
    //子弹飞
    var timerFly = setInterval(function () {
        node.style.top = node.offsetTop - 12 + 'px';
        if (node.offsetTop < -10) {
            clearInterval(timerFly);
            screen.removeChild(node);
        }
    }, 100);
    node.timer = timerFly;
}, 300)


// 敌机
var enemyPlaneCreateTimer = setInterval(function () {
    var node = document.createElement('div')
    node.className = "enemyPlane";
    node.style.left = parseInt(Math.random() * 380) + 'px';
    node.style.top = parseInt(Math.random() * 20) + 'px';
    screen.appendChild(node);
    //敌机飞
    var enemyPlaneFlyTimer = setInterval(function () {
        node.style.top = node.offsetTop + 8 + 'px';
        if (node.offsetTop > 600) {
            clearInterval(enemyPlaneFlyTimer);
            screen.removeChild(node);
        }
    }, 200);
    node.timer = enemyPlaneFlyTimer;
}, 800)


// 碰撞检测
function pengzhuangFunc(n, m) {
    var result = false;
    var v = (n.offsetLeft + n.offsetWidth < m.offsetLeft) || (m.offsetLeft + m.offsetWidth < n.offsetLeft)
    var h = (n.offsetTop + n.offsetHeight < m.offsetTop) || (m.offsetTop + m.offsetHeight < m.offsetTop)
    if (!(v || h)) {
        result = true;
    }
    console.log(result)
    return result
}

//飞机与敌机 碰撞检测定时器
planePengZhuangTime = setInterval(function () {
    var enemyPlanes = document.getElementsByClassName('enemyPlane');
    for (var i = 0; i < enemyPlanes.length; i++) {
        if (pengzhuangFunc(enemyPlanes[i], airPlane)) {
            gameOver();
            break;
        }
    }
}, 80)

//子弹与敌机 碰撞检测定时器
bulletPlanePengZhuangTimer = setInterval(function () {
    var enemyPlanes = document.getElementsByClassName('enemyPlane');
    var bullets = document.getElementsByClassName('bullet');
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < enemyPlanes.length; j++) {
            if (pengzhuangFunc(enemyPlanes[j], bullets[i])) {
                clearInterval(enemyPlanes[j]);
                clearInterval(bullets[i]);
                screen.removeChild(bullets[i]);
                screen.removeChild(enemyPlanes[j]);
                score += 10;
                scoreDiv.innerHTML = "分数:" + score;
                break;
            }
        }
    }
}, 80)


function gameOver() {
    var enemyPlanes = document.getElementsByClassName('enemyPlane');
    var bullets = document.getElementsByClassName('bullet');
    clearInterval(timeBg);
    clearInterval(enemyPlaneCreateTimer);
    clearInterval(bulletCreateTimer);
    clearInterval(planePengZhuangTime);
    for (var i = 0; i < enemyPlanes.length; i++) {
        clearInterval(enemyPlanes[i].timer);
    }
    for (var i = 0; i < bullets.length; i++) {
        clearInterval(bullets[i].timer);
    }
    alert('game over!');
   
}