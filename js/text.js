

class TextBox{
    constructor(str, x, y, r, reverse, len){
        this.str = str;
        this.strlen = str.length;
        this.posx = x;        this.posy = y;        this.rotate = r; //true or false
        this.reverse = reverse;
        this.delta=0;
        this.len = len;
        if(this.reverse == false){
            if(this.rotate == 'V') this.canvas = createGraphics(textsize, (len*cellsize)-cellsize/2);
            else if (this.rotate == 'H') this.canvas = createGraphics((len*cellsize)-cellsize/2, textsize);    
        }
        else if(this.reverse == true){
            if(this.rotate == 'V') this.canvas = createGraphics(textsize, (len*cellsize)-cellsize/2);
            else if (this.rotate == 'H') this.canvas = createGraphics((len*cellsize)-cellsize/2, textsize);    
        }
        this.bg = {'r':255, 'g':255, 'b':255};
        this.textfill = color(0, 0, 0);
    }

    init(){
        // this.canvas.background(77, 69 ,71);
        fill(255);
        this.canvas.textFont('Black Han Sans');
        this.canvas.textSize(textsize);
        this.canvas.textAlign(LEFT, CENTER);
        this.canvas.position(0,0);
    };

    drawImage(){
        this.init();
        this.canvas.background(this.bg['r'], this.bg['g'], this.bg['b']);
        this.canvas.fill(this.textfill);

        if(this.reverse == false){
            if(this.rotate == 'H'){
                this.canvas.text(this.str, this.delta, this.canvas.height/2);
                image(this.canvas, this.posx, this.posy); 

            } else if (this.rotate == 'V'){
                this.canvas.push();
                this.canvas.translate(this.canvas.width/2+textsize, 0);
                this.canvas.rotate(radians(90));
                this.canvas.position(0,textsize);
                this.canvas.text(this.str, this.delta, (this.canvas.width+textsize)/2);
                this.canvas.pop();
                image(this.canvas, this.posx, this.posy);
            }
        }
        else if(this.reverse == true){
            if(this.rotate == 'H'){
                this.canvas.push();
                this.canvas.rotate(radians(180));
                this.canvas.position(0, textsize);
                this.canvas.text(this.str, this.delta-this.canvas.width, -this.canvas.height/2);
                this.canvas.pop();
                image(this.canvas, this.posx - this.canvas.width + cellsize/2, this.posy);

            }
            else if(this.rotate == 'V'){
                // left
                
                this.canvas.push();
                this.canvas.translate(this.canvas.width/2+textsize, 0);
                this.canvas.rotate(radians(270));
                this.canvas.position(0,textsize);
                this.canvas.text(this.str, this.delta-this.canvas.height, -(this.canvas.width+textsize)/2);
                this.canvas.pop();
                image(this.canvas, this.posx, this.posy - this.canvas.height + cellsize/2);    

            }
        }

    };

}


function createTextBox(){

    var temp =0;
    var grow = curLength;
    for(var i=0; i<mapIndex; i++){
       // pool[i].posx = 0;
        temp += pool[i].len;
        pool[i].drawImage();
    }

    grow = curLength - temp;
    // pool[mapIndex].posy = mapIndex;
   // console.log(grow*cellsize);

    if(grow < 1){
        if(pool[mapIndex].rotate == 'H') {
            pool[mapIndex].canvas.resizeCanvas(1, pool[mapIndex].canvas.height);
            pool[mapIndex].drawImage();
        }
        else if(pool[mapIndex].rotate == 'V'){
            pool[mapIndex].canvas.resizeCanvas(pool[mapIndex].canvas.width, 1);
            pool[mapIndex].drawImage();
        }    
    }
    else {
        if(pool[mapIndex].rotate == 'H') {
            pool[mapIndex].canvas.resizeCanvas(grow*cellsize - cellsize/2, pool[mapIndex].canvas.height);
            pool[mapIndex].drawImage();
        }
        else if(pool[mapIndex].rotate == 'V'){
            pool[mapIndex].canvas.resizeCanvas(pool[mapIndex].canvas.width, grow*cellsize-cellsize/2);
            pool[mapIndex].drawImage();
        }    
    }
    
};

function mouseOver(mouseX, mouseY){

    for(var i=0; i<mapIndex; i++){

        if(pool[i].reverse == false) {
            if(mouseX > pool[i].posx && mouseX < pool[i].canvas.width+pool[i].posx
                && mouseY > pool[i].posy && mouseY < pool[i].posy+pool[i].canvas.height){
                    pool[i].bg['r'] = 77; pool[i].bg['g']=69; pool[i].bg['b']=71;
                    pool[i].textfill = color(255,255,255);
                    // 리사이즈 이거 쓰면 됨
                    // pool[i].canvas.resizeCanvas(pool[i].canvas.width+10, pool[i].canvas.height);
                    pool[i].delta -= deltaTime/20;
                    if(pool[i].delta <= -(pool[i].str.length*textsize*0.7)){
                        if(pool[i].rotate == 'H') pool[i].delta = pool[i].canvas.width;
                        else pool[i].delta = pool[i].canvas.height;
                    }
                }
                else {
                    pool[i].delta = 0;
                    pool[i].textfill = color(0);
                    pool[i].bg['r'] = 255; pool[i].bg['g']=255; pool[i].bg['b']=255;
                }
        }
        else if(pool[i].reverse == true && pool[i].rotate == 'H'){
            if(mouseX > pool[i].posx-pool[i].canvas.width+cellsize/2 && mouseX < pool[i].posx+cellsize/2
                && mouseY > pool[i].posy && mouseY < pool[i].posy+pool[i].canvas.height){
                    pool[i].bg['r'] = 77; pool[i].bg['g']=69; pool[i].bg['b']=71;
                    pool[i].textfill = color(255,255,255);
                    pool[i].delta -= deltaTime/20;
                    if(pool[i].delta <= -(pool[i].str.length*textsize*0.7)){
                        pool[i].delta = pool[i].canvas.width;
                    }
                }
                else {
                    pool[i].delta = 0;
                    pool[i].textfill = color(0);
                    pool[i].bg['r'] = 255; pool[i].bg['g']=255; pool[i].bg['b']=255;
                }
        } else if(pool[i].reverse == true && pool[i].rotate == 'V'){
            if(mouseX > pool[i].posx && mouseX < pool[i].posx + pool[i].canvas.width
                && mouseY > pool[i].posy - pool[i].canvas.height + cellsize/2 && mouseY < pool[i].posy+cellsize/2){
                    pool[i].bg['r'] = 77; pool[i].bg['g']=69; pool[i].bg['b']=71;
                    pool[i].textfill = color(255,255,255);
                    pool[i].delta -= deltaTime/20;
                    if(pool[i].delta <= -(pool[i].str.length*textsize*0.7)){
                        pool[i].delta = pool[i].canvas.height;
                    }
                }
                else {
                    pool[i].delta = 0;
                    pool[i].textfill = color(0);
                    pool[i].bg['r'] = 255; pool[i].bg['g']=255; pool[i].bg['b']=255;
                }
        }
    }
}
