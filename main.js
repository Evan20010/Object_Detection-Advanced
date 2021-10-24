img = "";
Status = "";
objects = [];

function preload()
{
    //img = loadImage('living_room.png');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if (Status !="")
    {
        r = random(255);

        g = random(255);

        b = random(255);


        objectDetector.detect(video, gotresult);
        for(i = 0; i<objects.length; i++)
        {
        document.getElementById("status").innerHTML="status: object detected";
        document.getElementById("number_objects").innerHTML = "number of objects detected are:" + objects.length;
        fill(r, g, b);
        percentage = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}

function modelLoaded()
{
    console.log("model loaded");
    Status =  true;
}

function gotresult(error, result)
{
    if (error)
    {
        console.log(error);
    }
    
    console.log(result);
    objects = result;
}