let img;
let numSegments = 50;
let segments = [];
let drawSegments = false;
let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};
let canvasAspectRatio = 0;

function preload() {
  img = loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  canvasAspectRatio = width / height;
  calculateImageDrawProps();
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //We will use the x and y position to get the colour of the pixel from the image
      //let's take it from the centre of the segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
       let segment = new ImageSegment(segXPos,segYPos,segmentWidth,segmentHeight,segmentColour);
       segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  if (drawSegments) {
    //let's draw the segments to the canvas
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    //let's draw the image to the canvas
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}
function keyPressed() {
  if (key == " ") {
    //this is a neat trick to invert a boolean variable,
    //it will always make it the opposite of what it was
    drawSegments = !drawSegments;
  }
}

function calculateImageDrawProps(){
  if (imgDrwPrps.aspect > canvasAspectRatio){
    imgDrwPrps.width = width;
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height)/2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio){
    imgDrwPrps.height = height;
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  } else if (imgDrwPrps.aspect = canvasAspectRatio){
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

class ImageSegment{
  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrm,srcImgSegHeightInPrm,srcImgSegColourInPrm){
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
  }

  draw(){
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  }
}
