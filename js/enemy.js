function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function()
    {
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range)
        {
            this.inc = -1;
        }
        else if(this.currentX < this.x)
        {
            this.inc = 1;
        }
    }

    this.draw = function()
    {
        this.update();

        push();
        translate(this.currentX, this.y);

        let walk = sin(frameCount * 0.2) * 6;

        // body
        fill(255,80,80);
        ellipse(0,0,40,25);

        // eyes
        fill(255);
        ellipse(-10,-15,8,8);
        ellipse(10,-15,8,8);

        fill(0);
        ellipse(-10,-15,3,3);
        ellipse(10,-15,3,3);

        // claws
        fill(255,80,80);
        ellipse(-25,walk,15,10);
        ellipse(25,-walk,15,10);

        // legs
        stroke(0);
        strokeWeight(2);
        line(-15,10,-25,15+walk);
        line(-5,10,-15,15-walk);
        line(5,10,15,15+walk);
        line(15,10,25,15-walk);

        pop();
    }

    this.checkContact = function(gc_x, gc_y)
    {
        let d = dist(gc_x, gc_y, this.currentX, this.y);

        if(d < 30)
        {
            return true;
        }

        return false;
    }
}
