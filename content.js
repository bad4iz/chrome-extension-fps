// content.js

class Fps {
    constructor() {
        this.width = 150;
        this.height = 65;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = 'fps';


        this.startTime = 0;
        this.frame = 0;

        this.allFps = [];

        this.hidden = true;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = 'bold 26px Arial';
        document.body.appendChild(this.canvas);
        
    }
    toggle() {
        this.hidden = !this.hidden;
        if(!this.hidden){
            this.loop();
            this.canvas.classList.add('visible');
        }else {
            this.canvas.classList.remove('visible');

        }


    }
    loop() {
        if (this.hidden) return false;
        window.requestAnimationFrame(()=>{
            this.draw();
            this.loop();
        })
    }
    add(fps) {
        this.allFps.unshift(fps);
        this.allFps = this.allFps.slice(0, this.width);
    }
    draw() {
        let currentFps = this.getFps();
        this.add(currentFps);


        this.ctx.clearRect(0, 0,this.width, this.height);
        for (let i=0; i<=this.width; i++) {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(i,0,1,this.height - this.allFps[i]);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(i,this.height - this.allFps[i],1,2);
        }
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(currentFps + 'fps', 21,51);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(currentFps + 'fps', 20,50);

    }

    getFps(){
        this.frame++;

        let d = Date.now();
        this.currentTime = (d - this.startTime) / 1000;
        let result = Math.floor(this.frame / this.currentTime);
        if(this.currentTime > 1) {
            this.startTime = Date.now();
            this.frame = 0;
        }
        return result;
    }

}

fps = new Fps();


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse)=> {
        if( request.message === "clicked_browser_action" ) {
            fps.toggle();
        }
    }
);

