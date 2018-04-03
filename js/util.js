//碰撞检测宽高为10px
function checkOverlap10px(a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
        return false;
    }

	var aright=a.centerX+5;
	var bright=b.centerX+5;
	var abottom=a.centerY+5;
	var bbottom=b.centerY+5;
	var ax=a.centerX-5;
	var bx=b.centerX-5;
	var ay=a.centerY-5;
	var by=b.centerY-5;
    return !(aright < bx || abottom < by || ax > bright || ay > bbottom);

};
//碰撞检测
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
//求角度
function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx>px&&my>py){//鼠标在第四象限
            angle = 180 - angle;
        }

        if(mx==px&&my>py){//鼠标在y轴负方向上
            angle = 180;
        }

        if(mx>px&&my==py){//鼠标在x轴正方向上
            angle = 90;
        }

        if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle-360;
        }

        if(mx<px&&my==py){//鼠标在x轴负方向
            angle = -90;
        }

        if(mx<px&&my<py){//鼠标在第二象限
            angle = 360 - angle-360;
        }

		if(angle)
			return angle;
		else
			return 0;
            
}
//生成尺子
function createruler(){
	ruler_base = game.add.sprite(10, 10, 'ruler_base');
	ruler = game.add.sprite(10, 10, 'ruler');
	ruler.animations.add('old',[1]);
	ruler.animations.add('new',[0]);
	ruler.inputEnabled = true;
	ruler.input.useHandCursor = true;
	ruler.events.onInputOver.add(function(){
		ruler.animations.play("old")
	}, this);
	ruler.events.onInputOut.add(function(){
		ruler.animations.play("new")
	}, this);
	ruler.events.onInputDown.add(function(){
		if(statedeg){
			clickrulernum++;
			ruler.positionDown={x:ruler.x+ruler.width/2,y:ruler.y+ruler.height/2}
			if(ruler.x<20&&ruler.y<20){
			statedeg=false
			ruler.x = ruler_base.x;
			ruler.y = ruler_base.y;
			clickrulernum=0;
		}
		}
		else{
			statedeg=true
			ruler.positionDown={x:ruler.x+ruler.width/2,y:ruler.y+ruler.height/2}
			clickrulernum++;
		}
		
	}, this);
}

//尺子跟随鼠标移动
function updateruler(){
	if(statedeg){
		var rulerx=0;
		var rulery=0;
		for(var x in AllList){
		if(checkOverlap10px(ruler.getBounds(), AllList[x].getBounds())){
			var xs = Math.abs(ruler.x+ruler.width/2 -game.input.activePointer.x);
			var y = Math.abs(ruler.y+ruler.height/2 -game.input.activePointer.y);
			var z = Math.sqrt(Math.pow(xs, 2) + Math.pow(y, 2));
			var juli=z;
			if(juli<15){
				var aaa=AllList[x].getBounds();
				rulerx=aaa.centerX-ruler.width/2;
				rulery=aaa.centerY-ruler.height/2;
			}
			else{
				rulerx = game.input.activePointer.x-ruler.width/2;
				rulery = game.input.activePointer.y-ruler.height/2;
			}
			break;
		}
		else{
			rulerx = game.input.activePointer.x-ruler.width/2;
			rulery = game.input.activePointer.y-ruler.height/2;

				
			}
		}
		ruler.x=rulerx;
		ruler.y=rulery;
	}
}

//生成测量线条距离
function renderruler(){
	if(statedeg&&clickrulernum>1){
		//game.debug.pointer(game.input.activePointer);
		var pointer=ruler;
        game.debug.start(pointer.x, pointer.y - 100, 'rgba(255,255,255,0.7)');
        game.context.fillStyle = 'rgba(255,255,255,0.7)';
    
		game.context.fill();
        game.context.closePath();

        //  Render the points
        game.context.beginPath();
        game.context.moveTo(pointer.positionDown.x, pointer.positionDown.y);
        game.context.lineTo(pointer.x+ruler.width/2, pointer.y+ruler.height/2);
        game.context.lineWidth = 2;
        game.context.stroke();
        game.context.closePath();

        //  Render the text
		var x = Math.abs(pointer.positionDown.x - (pointer.x+ruler.width/2));
		var y = Math.abs(pointer.positionDown.y - (pointer.y+ruler.height/2));
		// 斜边长
		var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		z=parseInt(z/20)
        game.debug.line();
		game.debug.line();
		game.debug.line();
		game.debug.line();
		game.debug.line();
		game.debug.line('距离: ' + z );
		game.debug.line('角度: ' + getAngle(pointer.positionDown.x,pointer.positionDown.y,pointer.x+ruler.width/2,pointer.y+ruler.height/2));
        game.debug.stop();
	
		
	}
}

function TypingEffect(textString, i, state) {
	if (i < textString.length) {
		editor.replaceRange(textString[i], editor.getCursor())
		setTimeout(function () {
			TypingEffect(textString, i + 1,state)
		}, 50);

	} else {
		if (state) {
			var aa = editor.getCursor()
			aa.ch -= 1;
			editor.setCursor(aa)
			editor.display.input.focus();
		}

	}

}