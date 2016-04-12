//global chart attributes 
var H2O_data;
var H2O_chart;
var H2O_options;
var CO2_data;
var CO2_chart;
var CO2_options;
var Cal_data;
var Cal_chart;
var Cal_options;

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

var f = new Array();              // name, price
var exist = 0;                    //exist flag
  
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
  var angle3 = 0;
  var angle4 = 0;

  var arrow1, arrow2, arrow3, arrow4;

 function increase_zidx(e){
  // e.relatedTarget.setAttribute('style',"z-index: -1");  
 };
 // function decrease_zidx(e){

 // };

  // setup draggable elements.
  interact('.js-drag')
      .draggable({})
      .on('dragstart', function (event) {
          event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
          event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
          // event.target.style.z-index = 11;

          // console.log("z-idx:" + zidx);
          // var style = window.getComputedStyle(event.target,null);
          // event.target.setAttribute('style',"z-index: 11"); 
          // // event.target.setAttribute('style',style + "z-index: 11"); 
          // var zidx = window.getComputedStyle(event.target,null).getPropertyValue('z-index');
          // console.log("z-idx:" + zidx);
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
          // event.target.setAttribute('style',"z-index: 10"); 

      //     var zidx = window.getComputedStyle(event.target,null).getPropertyValue('z-index');
      //     console.log("z-idx:" + zidx);

      //           var transformVals =  window.getComputedStyle(event,null).getPropertyValue('transform');
      // var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
      // var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
      //     event.interaction.y = 0;
      //     event.interaction.x = 0;



      }) 
      // .gesturable({
      // onmove: function (event) {
      //   var arrow = event.target;//document.getElementsByClass('Calories');

      //   angle += event.da;
      //   console.log(angle);
      //   scale = scale * (1 + event.ds);

      //   var transformVals = window.getComputedStyle(arrow,null).getPropertyValue('transform');
      //   var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
      //   var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
      //   var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle + "deg) scale(" +
      //   scale + ")";
      //   // console.log(newtransform);
      //   // arrow.style.webkitTransform =
      //   arrow.style.webkitTransform = arrow.style.transform = newtransform;
      // }
      // });
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
        console.log(angle1);
        scale1 = scale1 * (1 + event.ds);

        var transformVals = window.getComputedStyle(arrow1,null).getPropertyValue('transform');
        var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
        var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
        var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle1 + "deg) scale(" +
        scale1 + ")";
        // console.log(newtransform);
        // arrow.style.webkitTransform =
        arrow1.style.webkitTransform = arrow1.style.transform = newtransform;
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
        var arrow2 = event.target;//document.getElementsByClass('Calories');

        angle2 += event.da;
        console.log(angle2);
        scale2 = scale2 * (1 + event.ds);

        var transformVals = window.getComputedStyle(arrow2,null).getPropertyValue('transform');
        var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
        var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
        var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle2 + "deg) scale(" +
        scale2 + ")";
        // console.log(newtransform);
        // arrow.style.webkitTransform =
        arrow2.style.webkitTransform = arrow2.style.transform = newtransform;
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
        console.log(angle3);
        scale3 = scale3 * (1 + event.ds);

        var transformVals = window.getComputedStyle(arrow3,null).getPropertyValue('transform');
        var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
        var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
        var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle3 + "deg) scale(" +
        scale3 + ")";
        // console.log(newtransform);
        // arrow.style.webkitTransform =
        arrow3.style.webkitTransform = arrow3.style.transform = newtransform;
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
        console.log(angle4);
        scale4 = scale4 * (1 + event.ds);

        var transformVals = window.getComputedStyle(arrow4,null).getPropertyValue('transform');
        var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
        var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
        var newtransform = "translate(" + transX + "px," + transY + "px) rotate(" + angle4 + "deg) scale(" +
        scale4 + ")";

        arrow4.style.webkitTransform = arrow4.style.transform = newtransform;
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

    
//image size
function doublesize(target){
  var transformVals =  window.getComputedStyle(target,null).getPropertyValue('transform');
  var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
  var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
  var value = "translate(" + transX + "px," + transY + "px) scale(1.5,1.5)";
  target.style.transform = value;
};

function halfsize(target){
  var transformVals =  window.getComputedStyle(target,null).getPropertyValue('transform');
  var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
  var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
  var value = "translate(" + transX + "px," + transY + "px) scale(1,1)";
  target.style.transform = value;
}

    /*drawBasic, 
    draws initial chart*/
    function drawBasic() {
      H2O_data = new google.visualization.DataTable();
      H2O_data.addColumn('string', 'Water');
      H2O_data.addColumn('number', 'Gal/serving');
      H2O_data.addColumn({type: 'number', role: 'annotation'});
      H2O_data.addRows([
      ]);
             
      CO2_data = new google.visualization.DataTable();
      CO2_data.addColumn('string', 'Carbon Dioxide');
      CO2_data.addColumn('number', 'CO2e/lb');
      CO2_data.addColumn({type: 'string', role: 'annotation'});
      CO2_data.addRows([
      ]);

      Cal_data = new google.visualization.DataTable();
      Cal_data.addColumn('string', 'Food');
      Cal_data.addColumn('number', 'Calories');
      Cal_data.addColumn({type: 'number', role: 'annotation'});
      Cal_data.addRows([
      ]);

      H2O_options = {
        title: 'H2O', 
        titleTextStyle: {
          color: '#e8e3da', 
          fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'},
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, textStyle:{color: '#e8e3da', fontSize:7},
          gridlines: { color: "#fff"},
          baselineColor: '#fff'
        },
        vAxis: {
          title:'Gallons per serving', 
          titleTextStyle: {color: '#e8e3da'},
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:900,
              min:0
          }
       },
        legend: {position: 'none'},
        backgroundColor: '#5099ab',
        width: 300,
        height: 175,
        bar:{ groupWidth:20},
        colors: ['#e8e3da']
      };

      CO2_options = {
        title: 'CO2',
        titleTextStyle: {
          color: '#e8e3da', 
          fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'
        },
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da', fontSize:7}

        },
        vAxis: {  
          title: 'CO2 equivalents per lb', 
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:8,
              min:0
          }
        },
        legend: {position: 'none'},
        width: 300,
        height: 175,
        backgroundColor: '#827f7f',
        bar:{ groupWidth:20},
        colors: ['#e8e3da']
      };

      Cal_options = {
        title: 'Calories',
        titleTextStyle: {
          color: '#e8e3da', 
          fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'
        },
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da', fontSize:7}
        },
        vAxis: {
          title:'Calories', 
          titleTextStyle: {color: '#e8e3da'},
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:800,
              min:0
          }
        },
        legend: {position: 'none'},
        backgroundColor: '#57b947',
        width: 300,
        height: 175,
        bar:{ groupWidth:20},
        colors: ['#e8e3da']
      };

      H2O_chart = new google.visualization.ColumnChart(
      document.getElementById('chart_div1'));
      CO2_chart = new google.visualization.ColumnChart(
      document.getElementById('chart_div2'));
      Cal_chart = new google.visualization.ColumnChart(
      document.getElementById('chart_div3'));

      H2O_chart.draw(H2O_data, H2O_options);
      CO2_chart.draw(CO2_data, CO2_options);
      Cal_chart.draw(Cal_data, Cal_options);
    }

    /* graphtotal
    calculates a and returns chart total */
    function graphtotal(dataset){
      var total=0;
      for (var i=0; i<(dataset.getNumberOfRows()); i++){
        total += dataset.getValue(i, 1);
      }      
      total = total.toFixed(2);
     return total;
    }

    /* chart_cost_add
    append item to cost list & chart (with 8 item limit)*/ 
    function chart_cost_add(event){
      if (f.length == 8){
        console.log("more than 8");
        exist = 1;
        if(event.relatedTarget.getAttribute("in")==0){
          snapback(event);
          }
      } 
      else {
        var item = event.relatedTarget;
        //check for prexisting element 
        for(var a = 0; a < f.length; a++){
          if (f[a].name == event.relatedTarget.getAttribute('name')){
              console.log('*DO NOTHING* item already exists');
              exist = 1;
          }  
        }
      }
        //add element if it doesn't exist 
        if(exist == 0){
          event.relatedTarget.setAttribute("in",1);
          console.log("in? = " + event.relatedTarget.getAttribute("in"));
          var cost = item.getAttribute('cost');
            f.push({  
              name:  item.getAttribute('name'),
              price: parseFloat(cost).toFixed(2),
              quant: 1,
              water: item.getAttribute('water'),
              CO2:   item.getAttribute('CO2'),
              Cal:   item.getAttribute('Cal'),
              idx:   H2O_data.addRow([item.getAttribute('name'), parseFloat(item.getAttribute('water')), parseInt(item.getAttribute('water'))])
            });   

            CO2_data.addRow([item.getAttribute('name'), parseFloat(item.getAttribute('CO2')), item.getAttribute('CO2')]);
            Cal_data.addRow([item.getAttribute('name'), parseFloat(item.getAttribute('Cal')), parseInt(item.getAttribute('Cal'))]);

          document.getElementById('chartTotal1').innerHTML = "Total    " + graphtotal(H2O_data);
          document.getElementById('chartTotal2').innerHTML = "Total    " + graphtotal(CO2_data);
          document.getElementById('chartTotal3').innerHTML = "Total    " + graphtotal(Cal_data);
          
          H2O_chart.draw(H2O_data, H2O_options);
          CO2_chart.draw(CO2_data, CO2_options);
          Cal_chart.draw(Cal_data, Cal_options);  
        }
        //reset flag
        exist = 0;

    
    }
 function snapback(e){
      var transformVals =  window.getComputedStyle(e.relatedTarget,null).getPropertyValue('transform');
      var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
      var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
      e.interaction.y = 0;
      e.interaction.x = 0;

      //convert from 20px to 20, remove 'px' w/ regular expressions
      // var top = window.getComputedStyle(e,null).getPropertyValue('top').replace(/[^-\d\.]/g, '');;
      // var left = window.getComputedStyle(e,null).getPropertyValue('left').replace(/[^-\d\.]/g, '');;
      // var newtransX = transX-left;
      // var newtransY = transY-top;

      var value = "transform: translate(" + transX + "px," + transY + "px); top:0px; left:0px;";
      console.log(value);
      // console.log(value);
      // e.style.transform = value;
      e.relatedTarget.setAttribute("style",value); 

      // e.style.top = "0";
      // e.style.left = "0";
    }
    
    /* costTable_redraw,
    reassign table w/ updated entries and update pricing  */
    function costTable_redraw(){
      var food_table = '<tr><td width=60 height=50 >Item</td><td width=50>Price</td></tr><br>';
      // var food_table = '<tr><td width=80 height=50 >Item</td><td width=50>Quantity</td><td width=50>Price</td></tr><br>';

      //populate food table array html to print array as table 
      for(var i = 0; i < f.length; i ++){
        food_table +=
        '<tr ' + 'id=\"' + f[i].name + '"\'> <td>' + f[i].name + ' </td>  <td class=\"price\">' + parseFloat(f[i].price).toFixed(2) + '</td> </tr>';
        // '<tr ' + 'id=\"' + f[i].name + '"\'> <td>' + f[i].name + ' </td> <td> x ' + f[i].quant + '</td> <td class=\"price\">' + parseFloat(f[i].price).toFixed(2) + '</td> </tr>';
      }
      // update cost table
      food_table +=  '</table>';
      document.getElementById('table').innerHTML = food_table; 
    }

    function calc_cost(){
        var fooditems = document.getElementById('cost').getElementsByTagName('td');
        var total = 0;
        for(var i = 0; i < fooditems.length; i++){
            if(fooditems[i].className == 'price'){
              total += isNaN(fooditems[i].innerHTML) ? 0: parseFloat(fooditems[i].innerHTML);
            }
        }
        document.getElementById('totalprice').innerHTML = "Total: $ " + parseFloat(total).toFixed(2);


    }
      /*  chart_cost_remove
      if more than one item of that type exists, 
      decrement quant update chart values and totals   */
      function chart_cost_remove(target){

        for(var a = 0; a < f.length; a++){
          //if more than one instance exists decrement
          if (f[a].name == target.getAttribute('name')){
            if(f[a].quant > 1){
              f[a].quant = parseFloat(f[a].quant) - 1;
              f[a].price = parseFloat(f[a].price) - parseFloat(target.getAttribute('cost'));

              //decrement chart values
              H2O_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('water')));
              CO2_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('CO2')));
              Cal_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('Cal')));
            }
            else{
              f.splice(a,1);
              H2O_data.removeRow(a);
              CO2_data.removeRow(a);
              Cal_data.removeRow(a);
            }  
          }  
      }

    document.getElementById('chartTotal1').innerHTML = "Total    " + graphtotal(H2O_data);
    document.getElementById('chartTotal2').innerHTML = "Total    " + graphtotal(CO2_data);
    document.getElementById('chartTotal3').innerHTML = "Total    " + graphtotal(Cal_data);

    H2O_chart.draw(H2O_data, H2O_options);
    CO2_chart.draw(CO2_data, CO2_options);
    Cal_chart.draw(Cal_data, Cal_options);

    }