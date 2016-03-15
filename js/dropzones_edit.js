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

  interact.maxInteractions(Infinity);

  // setup draggable elements.
  interact('.js-drag')
      .draggable({ max: Infinity })
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

      .on('drop', function (event) {
          // document.getElementById('')
          //chart.draw(data, options);
      });

  // setup drop areas.
  // dropzone #1 accepts draggable #1
  setupDropzone1('#drop1', '#drag1');
  setupDropzone('#drop2', '#drag1');

  function setupDropzone(el, accept) {
    interact(el)
        .dropzone({
            accept: accept,
            ondropactivate: function (event) {
                addClass(event.relatedTarget, '-drop-possible');
            },
            ondropdeactivate: function (event) {
                removeClass(event.relatedTarget, '-drop-possible');
            }
        })
        .on('dropactivate', function (event) {
            var active = event.target.getAttribute('active')|0;

            // change style if it was previously not active
            if (active === 0) {
                addClass(event.target, '-drop-possible');
                event.target.textContent = 'Drop me here!';
            }

            event.target.setAttribute('active', active + 1);
        })
        .on('dropdeactivate', function (event) {
            var active = event.target.getAttribute('active')|0;

            // change style if it was previously active
            // but will no longer be active
            if (active === 1) {
                removeClass(event.target, '-drop-possible');
                event.target.textContent = 'Dropzone';
            }

            event.target.setAttribute('active', active - 1);
        })
        .on('dragenter', function (event) {
            addClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'I\'m in';
        })
        .on('dragleave', function (event) {
            removeClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'Drag me…';
        })
        .on('drop', function (event) {

            removeClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'Dropped';

            console.log("event.target = " + event.target);
            console.log(event.relatedTarget.getAttribute('name'));

            //double image size
            doublesize(event.relatedTarget);
            chart_cost_add(event);

            costTable_redraw();
            calc_cost();
  });
  }

  function setupDropzone1(el, accept) {
    interact(el)
        .dropzone({
            accept: accept,
            ondropactivate: function (event) {
                addClass(event.relatedTarget, '-drop-possible');
            },
            ondropdeactivate: function (event) {
                removeClass(event.relatedTarget, '-drop-possible');
            }
        })
        .on('dropactivate', function (event) {
            var active = event.target.getAttribute('active')|0;

            // change style if it was previously not active
            if (active === 0) {
                addClass(event.target, '-drop-possible');
                event.target.textContent = 'Drop me here!';
            }

            event.target.setAttribute('active', active + 1);
        })
        .on('dropdeactivate', function (event) {
            var active = event.target.getAttribute('active')|0;

            // change style if it was previously active
            // but will no longer be active
            if (active === 1) {
                removeClass(event.target, '-drop-possible');
                event.target.textContent = 'Dropzone';
            }

            event.target.setAttribute('active', active - 1);
        })
        .on('dragenter', function (event) {
            addClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'I\'m in';
        })
        .on('dragleave', function (event) {
            removeClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'Drag me…';
        })
        .on('drop', function (event) {

            removeClass(event.target, '-drop-over');
            event.relatedTarget.textContent = 'Dropped';

            
            halfsize(event.relatedTarget);            //half image size
            chart_cost_remove(event.relatedTarget);   //remove elem from chart_cost list
            costTable_redraw();                       //redraw table
            calc_cost();                              
  });}

  function addClass (element, className) {
      if (element.classList) {
          return element.classList.add(className);
      }
      else {
          element.className += ' ' + className;
      }
  }

  function removeClass (element, className) {
      if (element.classList) {
          return element.classList.remove(className);
      }
      else {
          element.className = element.className.replace(new RegExp(className + ' *', 'g'), '');
      }
  }

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
    target.style.height = '100px';
    target.style.width = '100px';
};
function halfsize(target){
    target.style.height = '50px';
    target.style.width = '50px';  
}

    /*drawBasic, 
    draws initial chart*/
    function drawBasic() {
      H2O_data = new google.visualization.DataTable();
      H2O_data.addColumn('string', 'Water');
      H2O_data.addColumn('number', 'Liters');
      H2O_data.addRows([
      ]);
             
      CO2_data = new google.visualization.DataTable();
      CO2_data.addColumn('string', 'Carbon Dioxide');
      CO2_data.addColumn('number', 'kilograms');
      CO2_data.addRows([
      ]);

      Cal_data = new google.visualization.DataTable();
      Cal_data.addColumn('string', 'Food');
      Cal_data.addColumn('number', 'Calories');
      Cal_data.addRows([
      ]);

      H2O_options = {
        title: 'H2O', 
        titleTextStyle: {
          color: '#e8e3da', 
          // fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'},
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, textStyle:{color: '#e8e3da'},
          gridlines: { color: "#fff"},
          baselineColor: '#fff'
        },
        vAxis: {
          title:'L', 
          titleTextStyle: {color: '#e8e3da'},
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:18000,
              min:0
          }
       },
        legend: {position: 'none'},
        width: 300,
        backgroundColor: '#827f7f',
        bar:{ groupWidth:20},
        colors: ['#e8e3da']
      };

      CO2_options = {
        title: 'CO2',
        titleTextStyle: {
          color: '#e8e3da', 
          // fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'
        },
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da'}
        },
        vAxis: {  
          title: 'kg', 
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:60,
              min:0
          }
        },
        legend: {position: 'none'},
        backgroundColor: '#5099ab',
        width: 300,
        bar:{ groupWidth:20},
        colors: ['#e8e3da']
      };

      Cal_options = {
        title: 'Calories',
        titleTextStyle: {
          color: '#e8e3da', 
          // fontName: 'UniverseLight', 
          fontSize: '16', 
          fontWidth: 'normal'
        },
        hAxis: {
          titleTextStyle: {color: '#e8e3da'}, 
          textStyle:{color: '#e8e3da'}
        },
        vAxis: {
          title:'kcal', 
          titleTextStyle: {color: '#e8e3da'},
          textStyle:{color: '#e8e3da'},
          baselineColor: '#ccc',
          viewWindowMode:'explicit',
          viewWindow: {
              max:500,
              min:0
          }
        },
        legend: {position: 'none'},
        backgroundColor: '#57b947',
        width: 300,
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
     return total;
    }

    /* chart_cost_add
    append item to cost list & chart (with 8 item limit)*/ 
    function chart_cost_add(event){
      var item_quant = 0
      for(var a = 0; a < f.length; a++){
        item_quant += parseFloat(f[a].quant);
      }
        console.log(item_quant + " " +" " + f.length);

      if (f.length < 8 && item_quant < 8){
        //check for prexisting - edit array
        var item = event.relatedTarget;
        for(var a = 0; a < f.length; a++){
          if (f[a].name == event.relatedTarget.getAttribute('name')){
              f[a].quant = parseFloat(f[a].quant) + 1 ;
              f[a].price = parseFloat(f[a].price) + parseFloat(event.relatedTarget.getAttribute('cost')); 
              exist = 1;

              //accumulator for preexisting chart elements
              H2O_data.setValue(a, 1, f[a].quant*parseInt(event.relatedTarget.getAttribute('water')));
              CO2_data.setValue(a, 1, f[a].quant*parseInt(event.relatedTarget.getAttribute('CO2')));
              Cal_data.setValue(a, 1, f[a].quant*parseInt(event.relatedTarget.getAttribute('Cal')));
          }  
        }
        //add element if it doesn't exist 
        if(exist == 0){
          
          var cost = item.getAttribute('cost')
            
            f.push({  
              name:  item.getAttribute('name'),
              price: parseFloat(cost).toFixed(2),
              quant: item.getAttribute('quant'),
              water: item.getAttribute('water'),
              CO2:   item.getAttribute('CO2'),
              Cal:   item.getAttribute('Cal'),
              idx:   H2O_data.addRow([item.getAttribute('name'), parseInt(item.getAttribute('water'))])
            });   
            CO2_data.addRow([item.getAttribute('name'), parseInt(item.getAttribute('CO2'))]);
            Cal_data.addRow([item.getAttribute('name'), parseInt(item.getAttribute('Cal'))]);
        }
        //reset flag
        exist = 0;
        }
        else{
          console.log("more than 8");
        }
          document.getElementById('chartTotal1').innerHTML = "Total    " + graphtotal(H2O_data);
          document.getElementById('chartTotal2').innerHTML = "Total    " + graphtotal(CO2_data);
          document.getElementById('chartTotal3').innerHTML = "Total    " + graphtotal(Cal_data);
          
          H2O_chart.draw(H2O_data, H2O_options);
          CO2_chart.draw(CO2_data, CO2_options);
          Cal_chart.draw(Cal_data, Cal_options);      
    }

    /* costTable_redraw,
    reassign table w/ updated entries and update pricing  */
    function costTable_redraw(){
      var food_table = '<tr><td width=80 height=50 >Item</td><td width=50>Quantity</td><td width=50>Price</td></tr><br>';

      //populate food table array html to print array as table 
      for(var i = 0; i < f.length; i ++){
        food_table +=
        '<tr ' + 'id=\"' + f[i].name + '"\'> <td>' + f[i].name + ' </td> <td> x ' + f[i].quant + '</td> <td class=\"price\">' + parseFloat(f[i].price).toFixed(2) + '</td> </tr>';
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
        document.getElementById('totalprice').innerHTML = "$ " + parseFloat(total).toFixed(2);


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