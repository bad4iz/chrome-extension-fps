// content.js

class Fps {
    constructor() {
        this.width = 150;
        this.height = 60;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = 'fps';

        this.hidden = true;

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

    draw() {
        alert('draw');
    }

    getFps(){

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

