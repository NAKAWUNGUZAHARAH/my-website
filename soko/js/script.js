
var points = [],
velocity2 = 5, // velocity squared
canvas = 
document.getElementById('container'),
context = canvas.getContext('2d'),
radius = 5,
boundaryX = 200,
boundaryY = 200,
numberOfPoints = 30;

init();

function init() {
// create points
for (var i = 0; i<numberOfPoints; i++) {
createPoint();
}
// create connections
for (var i = 0, l=points.length; i<l; i++) {
var point = points[i];
if(i == 0) {
  points[i].buddy = points[points.length-1];
} else {
  points[i].buddy = points[i-1];
}
}

// animate
animate();
}

function createPoint() {
var point = {}, vx2, vy2;
point.x = Math.random()*boundaryX;
point.y = Math.random()*boundaryY;
// random vx 
point.vx = (Math.floor(Math.random())*2-1)*Math.random();
vx2 = Math.pow(point.vx, 2);
// vy^2 = velocity^2 - vx^2
vy2 = velocity2 - vx2;
point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
points.push(point);
}

function resetVelocity(point, axis, dir) {
var vx, vy;
if(axis == 'x') {
point.vx = dir*Math.random();  
vx2 = Math.pow(point.vx, 2);
// vy^2 = velocity^2 - vx^2
vy2 = velocity2 - vx2;
point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
} else {
point.vy = dir*Math.random();  
vy2 = Math.pow(point.vy, 2);
// vy^2 = velocity^2 - vx^2
vx2 = velocity2 - vy2;
point.vx = Math.sqrt(vx2) * (Math.random()*2-1);
}
}

function drawCircle(x, y) {
context.beginPath();
context.arc(x, y, radius, 0, 2 * Math.PI, false);
context.fillStyle = '#97badc';
context.fill();  
}

function drawLine(x1, y1, x2, y2) {
context.beginPath();
context.moveTo(x1, y1);
context.lineTo(x2, y2);
context.strokeStyle = '#8ab2d8'
context.stroke();
}  

function draw() {
for(var i =0, l=points.length; i<l; i++) {
// circles
var point = points[i];
point.x += point.vx;
point.y += point.vy;
drawCircle(point.x, point.y);
// lines
drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
// check for edge
if(point.x < 0+radius) {
  resetVelocity(point, 'x', 1);
} else if(point.x > boundaryX-radius) {
  resetVelocity(point, 'x', -1);
} else if(point.y < 0+radius) {
  resetVelocity(point, 'y', 1);
} else if(point.y > boundaryY-radius) {
  resetVelocity(point, 'y', -1);
} 
}
}

function animate() {
context.clearRect ( 0 , 0 , 200 , 200 );
draw();
requestAnimationFrame(animate);
}






// setInterval(function(){
//     $("#image").rotate({ count:99999, forceJS:true, duration: 4 });
// },52);

// setInterval(function(){
//     $("#image2").rotate({ count:99999, forceJS:true, endDeg:-360, duration: 4 });
// },52);

// /*
// jQuery-Rotate-Plugin v0.2 by anatol.at
// http://jsfiddle.net/Anatol/T6kDR/
// */
// $.fn.rotate=function(options) {
//  var $this=$(this), prefixes, opts, wait4css=0;
//  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
//  opts=$.extend({
//    startDeg: false,
//    endDeg: 360,
//    duration: 1,
//    count: 1,
//    easing: 'linear',
//    animate: {},
//    forceJS: false
//  }, options);

//  function supports(prop) {
//    var can=false, style=document.createElement('div').style;
//    $.each(prefixes, function(i, prefix) {
//      if (style[prefix.replace(/\-/g, '')+prop]==='') {
//        can=true;
//      }
//    });
//    return can;
//  }

//  function prefixed(prop, value) {
//    var css={};
//    if (!supports.transform) {
//      return css;
//    }
//    $.each(prefixes, function(i, prefix) {
//      css[prefix.toLowerCase()+prop]=value || '';
//    });
//    return css;
//  }

//  function generateFilter(deg) {
//    var rot, cos, sin, matrix;
//    if (supports.transform) {
//      return '';
//    }
//    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
//    cos=Math.cos(rot);
//    sin=Math.sin(rot);
//    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
//    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
//  }

//  supports.transform=supports('Transform');
//  supports.transition=supports('Transition');

//  opts.endDeg*=opts.count;
//  opts.duration*=opts.count;

//  if (supports.transition && !opts.forceJS) { // CSS-Transition
//    if ((/Firefox/).test(navigator.userAgent)) {
//      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
//    }
//    $this.queue(function(next) {
//      if (opts.startDeg!==false) {
//        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
//      }
//      setTimeout(function() {
//        $this
//          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
//          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
//          .css(opts.animate);
//      }, wait4css);

//      setTimeout(function() {
//        $this.css(prefixed('transition'));
//        if (!opts.persist) {
//          $this.css(prefixed('transform'));
//        }
//        next();
//      }, (opts.duration*1000)-wait4css);
//    });

//  } else { // JavaScript-Animation + filter
//    if (opts.startDeg===false) {
//      opts.startDeg=$this.data('rotated') || 0;
//    }
//    opts.animate.perc=100;

//    $this.animate(opts.animate, {
//      duration: opts.duration*1000,
//      easing: $.easing[opts.easing] ? opts.easing : '',
//      step: function(perc, fx) {
//        var deg;
//        if (fx.prop==='perc') {
//          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
//          $this
//            .css(prefixed('transform', 'rotate('+deg+'deg)'))
//            .css('filter', generateFilter(deg));
//        }
//      },
//      complete: function() {
//        if (opts.persist) {
//          while (opts.endDeg>=360) {
//            opts.endDeg-=360;
//          }
//        } else {
//          opts.endDeg=0;
//          $this.css(prefixed('transform'));
//        }
//        $this.css('perc', 0).data('rotated', opts.endDeg);
//      }
//    });
//  }

//  return $this;
// };