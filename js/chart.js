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

    //  draws initial charts
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
          title:'Gallons', 
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
          title: 'lbs', 
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
