///INTERACT CODE
(function (interact) {

  'use strict';

  var transformProp;
  
  var scale1 = 1;
  var scale2 = 1;
  var scale3 = 1;
  var scale4 = 1;

  var angle1 = 0;
  var angle2 = 0;
  var angle3 = 180;
  var angle4 = 0;

  var arrow1, arrow2, arrow3, arrow4;

 // setup draggable elements.
  interact('.js-drag')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
          event.target.style.zIndex = 26;  
          // console.log("zidx set to 25");
      })
      .on('dragmove', function (event) {
          event.interaction.x += event.dx;
          event.interaction.y += event.dy;

          // var zidx = window.getComputedStyle(event.target,null).getPropertyValue('z-index');
          // console.log("\n drag move: zIndex" + zidx); //event.target.getAttribute.style.zIndex);

          if (transformProp) {
              event.target.style[transformProp] =
                  'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
          }
          else {
              event.target.style.left = event.interaction.x + 'px';
              event.target.style.top  = event.interaction.y + 'px';
          }
      })
      .on('dragend', function (event) {
          event.target.setAttribute('data-x', event.interaction.x);
          event.target.setAttribute('data-y', event.interaction.y);
      }) 

  interact('.chart1')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
      })
      .on('dragmove', function (event) {
          event.interaction.x += event.dx;
          event.interaction.y += event.dy;

          if (transformProp) {
              event.target.style[transformProp] =
                  'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
          }
          else {
              event.target.style.left = event.interaction.x + 'px';
              event.target.style.top  = event.interaction.y + 'px';
          }
      })
      .on('dragend', function (event) {
          event.target.setAttribute('data-x', event.interaction.x);
          event.target.setAttribute('data-y', event.interaction.y);

      }) 
      .gesturable({
      onmove: function (event) {
        var arrow1 = event.target;//document.getElementsByClass('Calories');

        angle1 += event.da;

        //1.8 max scale
     
           scale1 = scale1 * (1 + event.ds);
           var s = parseFloat(scale1);
           if(s <= 1.8 && s >= 1){
            var transformVals = window.getComputedStyle(arrow1,null).getPropertyValue('transform');
            var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
            var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
            var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle1 + "deg) scale(" +
            scale1 + ")";

            arrow1.style.webkitTransform = arrow1.style.transform = newtransform;
          }
          else if(s < 1){   scale1 = 1;  }
          else{             scale1 = 1.8;}
      }
      });
  interact('.chart2')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
      })
      .on('dragmove', function (event) {
          event.interaction.x += event.dx;
          event.interaction.y += event.dy;

          if (transformProp) {
              event.target.style[transformProp] =
                  'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
          }
          else {
              event.target.style.left = event.interaction.x + 'px';
              event.target.style.top  = event.interaction.y + 'px';
          }
      })
      .on('dragend', function (event) {
          event.target.setAttribute('data-x', event.interaction.x);
          event.target.setAttribute('data-y', event.interaction.y);

      }) 
      .gesturable({
      onmove: function (event) {
        var arrow2 = event.target;

        angle2 += event.da;

        //1.8 max scale
          scale2 = scale2 * (1 + event.ds);
          var s = parseFloat(scale2);
          
          if(s <= 1.8 && s >= 1){
            var transformVals = window.getComputedStyle(arrow2,null).getPropertyValue('transform');
            var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
            var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
            var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle2 + "deg) scale(" +
            scale2 + ")";
            // console.log(newtransform);
            // arrow.style.webkitTransform =
            arrow2.style.webkitTransform = arrow2.style.transform = newtransform;
          }
          else if(s < 1){   scale2 = 1;  }
          else{             scale2 = 1.8;}
      }
      });
  interact('.chart3')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
      })
      .on('dragmove', function (event) {
          event.interaction.x += event.dx;
          event.interaction.y += event.dy;

          if (transformProp) {
              event.target.style[transformProp] =
                  'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
          }
          else {
              event.target.style.left = event.interaction.x + 'px';
              event.target.style.top  = event.interaction.y + 'px';
          }
      })
      .on('dragend', function (event) {
          event.target.setAttribute('data-x', event.interaction.x);
          event.target.setAttribute('data-y', event.interaction.y);
      }) 
      .gesturable({
      onmove: function (event) {
        var arrow3 = event.target;//document.getElementsByClass('Calories');

        angle3 += event.da;
          scale3 = scale3 * (1 + event.ds);
          var s = parseFloat(scale3)

        if(s <= 1.8 && s >= 1){ 
          var transformVals = window.getComputedStyle(arrow3,null).getPropertyValue('transform');
          var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
          var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
          var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle3 + "deg) scale(" +
          scale3 + ")";
          // console.log(newtransform);
          // arrow.style.webkitTransform =
          arrow3.style.webkitTransform = arrow3.style.transform = newtransform;
        }
          else if(s < 1){   scale3 = 1;  }
          else{             scale3 = 1.8;}
        }

      });
  interact('.chart4')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
      })
      .on('dragmove', function (event) {
          event.interaction.x += event.dx;
          event.interaction.y += event.dy;

          if (transformProp) {
              event.target.style[transformProp] =
                  'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
          }
          else {
              event.target.style.left = event.interaction.x + 'px';
              event.target.style.top  = event.interaction.y + 'px';
          }
      })
      .on('dragend', function (event) {
          event.target.setAttribute('data-x', event.interaction.x);
          event.target.setAttribute('data-y', event.interaction.y);

      }) 
      .gesturable({
      onmove: function (event) {
        var arrow4 = event.target;

        angle4 += event.da;
          
        scale4 = scale4 * (1 + event.ds);
        var s = parseFloat(scale4);

        if(s <= 1.8 && s >= 1){    
          var transformVals = window.getComputedStyle(arrow4,null).getPropertyValue('transform');
          var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
          var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
          var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle4 + "deg) scale(" +
          scale4 + ")";

          arrow4.style.webkitTransform = arrow4.style.transform = newtransform;
        }
          else if(s < 1){   scale4 = 1;  }
          else{             scale4 = 1.8;}

      }
      });
  interact(document).on('ready', function () {
      transformProp = 'transform' in document.body.style
          ? 'transform': 'webkitTransform' in document.body.style
          ? 'webkitTransform': 'mozTransform' in document.body.style
          ? 'mozTransform': 'oTransform' in document.body.style
          ? 'oTransform': 'msTransform' in document.body.style
          ? 'msTransform': null;
  });
}(window.interact));