
	export default class Controller{
		static rightButtonOn(){
			document.getElementById("rightBtn").addEventListener("touchstart", function(){
				movingRight = true;
			});
			document.getElementById("rightBtn").addEventListener("touchend", function(){
				movingRight = false;
			});
		}

		
		static leftButtonOn(){
			document.getElementById("leftBtn").addEventListener("touchstart", function(){
				movingLeft = true;
			});
			document.getElementById("leftBtn").addEventListener("touchend", function(){
				movingLeft = false;
			});
		}
		static shootBottonOn(){
			document.getElementById("shootBtn").addEventListener("touchstart", function(){
				playerJump = true;
				console.log("jump");
			});
			document.getElementById("shootBtn").addEventListener("touchend", function(){
				playerJump = false;
			});
		}

		static startBottonOn(){
			//pause button
			document.getElementById("startBtn").addEventListener("touchstart", function(){
				startGame = true;
				
			});
			document.getElementById("startBtn").addEventListener("touchend", function(){
				startGame = false;
			});
		}

		static preventLongPressMenu(nodes) {
			for(var i=0; i<nodes.length; i++){
				nodes[i].ontouchstart = absorbEvent_;
				nodes[i].ontouchmove = absorbEvent_;
				nodes[i].ontouchend = absorbEvent_;
				nodes[i].ontouchcancel = absorbEvent_;
			}
		}
}
	
