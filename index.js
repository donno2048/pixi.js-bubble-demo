$(window).resize(resize)
window.onorientationchange = resize;
document.addEventListener('DOMContentLoaded', start, false);
var w = 1024;
var h = 768;
var starCount = 2500;
var sx = 1.0 + (Math.random() / 20);
var sy = 1.0 + (Math.random() / 20);
var slideX = w / 2;
var slideY = h / 2;
var stars = [];
function start() {
    var ballTexture = new PIXI.Texture.fromImage("bubble.png");
    renderer = PIXI.autoDetectRenderer(w, h);
    stage = new PIXI.Stage;
    document.body.appendChild(renderer.view);
    for (var i = 0; i < starCount; i++) {
        var tempBall = new PIXI.Sprite(ballTexture);
        tempBall.position.x = (Math.random() * w) - slideX;
        tempBall.position.y = (Math.random() * h) - slideY;
        tempBall.anchor.x = 0.5;
        tempBall.anchor.y = 0.5;
        stars.push({ sprite: tempBall, x: tempBall.position.x, y: tempBall.position.y });
        stage.addChild(tempBall);
    }
    document.getElementById('rnd').onclick = newWave;
    document.getElementById('sx').innerHTML = 'SX: ' + sx + '<br />SY: ' + sy;
    resize();
    requestAnimFrame(update);
}
function newWave () {
    sx = 1.0 + (Math.random() / 20);
    sy = 1.0 + (Math.random() / 20);
    document.getElementById('sx').innerHTML = 'SX: ' + sx + '<br />SY: ' + sy;
}
function resize() {
    w = $(window).width() - 16;
    h = $(window).height() - 16;
    slideX = w / 2;
    slideY = h / 2;
    renderer.resize(w, h);
}
function update() {
    for (var i = 0; i < starCount; i++) {
        stars[i].sprite.position.x = stars[i].x + slideX;
        stars[i].sprite.position.y = stars[i].y + slideY;
        stars[i].x = stars[i].x * sx;
        stars[i].y = stars[i].y * sy;
        if (stars[i].x > w)	stars[i].x = stars[i].x - w;
        else if (stars[i].x < -w) stars[i].x = stars[i].x + w;
        if (stars[i].y > h)	stars[i].y = stars[i].y - h;
        else if (stars[i].y < -h) stars[i].y = stars[i].y + h;
    }
    renderer.render(stage);
    requestAnimFrame(update);
}