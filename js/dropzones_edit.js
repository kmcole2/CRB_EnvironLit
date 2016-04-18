
var f = new Array();              // name, price
var exist = 0;                    //exist flag
  
var onplate = new Array();
var ontable = new Array();
var plate_zidx_arr = [2,3,4,5,6,7,8,9];
var table_zidx_arr = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

function toplate_zIdx(target){
  //if exists, splice 
  if(target.getAttribute("in") == 1){  
    splice_push(onplate, target);
  }
  //if new then add to Array
  else{
    if(onplate.length < 8){
      splice_other(ontable,target);
      onplate.push(item);
    }
    else{console.log("more than 8 on plate")}
  }
  //reassign zidx 
  for(var i = 0; i < onplate.length; i ++){
    onplate[i].style.zIndex = plate_zidx_arr[i]; 
    console.log(onplate[i].getAttribute('name') + "  " + plate_zidx_arr[i]);
  }  
};
//remove from plate arr, add to table
function totable_zIdx(target){
  //if exists, splice 
  if(target.getAttribute("table") == 1){  
    splice_push(ontable, target);
  }
  //if new then add to Array
  else{
    if(ontable.length < 24){
      splice_other(onplate,target);
      ontable.push(target);
    }
    else{console.log("more than 24 on table")}
  }
  //reassign zidx 
  for(var i = 0; i < ontable.length; i ++){
    ontable[i].style.zIndex = table_zidx_arr[i]; 
    console.log(ontable[i].getAttribute('name') + "  " + table_zidx_arr[i]);
  } 
}
function splice_other(arr, target){
  "removed from other arr"
  for(var a = 0; a < arr.length; a++){
  //if more than one instance exists decrement
    if (arr[a].name == target.getAttribute('name')){
      console.log(arr[a].name + " already exists");
      arr.splice(a,1);
    } 
  }
}
function splice_push(arr, target){
  for(var a = 0; a < arr.length; a++){
  //if more than one instance exists decrement
    if (arr[a].name == target.getAttribute('name')){
      console.log(arr[a].name + " already exists");
      arr.splice(a,1);
      arr.push(target);
    } 
  }
}
//scale image by 1.5
function doublesize(target){
  var transformVals =  window.getComputedStyle(target,null).getPropertyValue('transform');
  var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
  var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
  var value = "translate(" + transX + "px," + transY + "px) scale(1.5,1.5)";
  target.style.transform = value;
};

//scale image back to 1
function halfsize(target){
  var transformVals =  window.getComputedStyle(target,null).getPropertyValue('transform');
  var transX = parseInt((transformVals.replace (/,/g, "")).split(" ")[4]); 
  var transY = parseInt((transformVals.replace (/,/g, "")).split(" ")[5]); 
  var value = "translate(" + transX + "px," + transY + "px) scale(1,1)";
  target.style.transform = value;
};

//calculates a and returns chart total
function graphtotal(dataset){
  var total = 0;
  for (var i = 0; i<(dataset.getNumberOfRows()); i++){
    total += dataset.getValue(i, 1);
  }      
  total = total.toFixed(2);
  return total;
}

//redraw costTable
function costTable_redraw(){
  var food_table = '<tr><td width=60 height=50 >Item</td><td width=50>Price</td></tr><br>';

  //populate food table array html to print array as table 
  for(var i = 0; i < f.length; i ++){
    food_table += '<tr ' + 'id=\"' + f[i].name + '"\'> <td>' + f[i].name + ' </td> <td class=\"price\">' + parseFloat(f[i].price).toFixed(2) + '</td> </tr>';
  }
  food_table +=  '</table>';
  document.getElementById('table').innerHTML = food_table; 
}

//recalculate total costs
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

//add new elem to arr and chart (with 8 item limit)
function chart_cost_add(event){
  var item = event.relatedTarget; 

  if(f.length == 8){
    console.log("more than 8");
    snapback(event);
 }
 
        //add element if it doesn't exist 
        else{
          item.setAttribute("in",1);
          item.setAttribute("table",0);
            f.push({  
              name:  item.getAttribute('name'),
              price: parseFloat(item.getAttribute('cost')).toFixed(2),
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

          // if new, add to onplate and set zIndx 
          // onplate.push(item);
          // for(var i = 0; i < onplate.length; i ++){
          //     onplate[i].style.zIndex = plate_zidx_arr[i]; 
          // }
          // var zidx = window.getComputedStyle(item,null).getPropertyValue('z-index');
          // console.log("\n dropzones onplate - zIndex: " + zidx); //event.target.getAttribute.style.zIndex);

          }
    }

      /*  chart_cost_remove
      if more than one item of that type exists, 
      decrement quant update chart values and totals   */
function chart_cost_remove(target){
for(var a = 0; a < f.length; a++){
  //if more than one instance exists decrement
  if (f[a].name == target.getAttribute('name')){
  //   // if(f[a].quant > 1){
  //     f[a].quant = parseFloat(f[a].quant) - 1;
  //     // f[a].price = parseFloat(f[a].price) - parseFloat(target.getAttribute('cost'));
  //     // console.log("never enters ere");
  //     //decrement chart values
  //     H2O_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('water')));
  //     CO2_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('CO2')));
  //     Cal_data.setValue(a, 1, f[a].quant*parseInt(target.getAttribute('Cal')));
  // }
  // else{
    console.log("set attrib to 0");
    target.setAttribute("in",0);
    f.splice(a,1);
    H2O_data.removeRow(a);
    CO2_data.removeRow(a);
    Cal_data.removeRow(a);
    // console.log("plate arr size before" + onplate.length);

    // //if new, remove from plate arr
    // console.log("remove from plate arr");
    // for(var i = 0; onplate.length; i++){
    //     if(onplate[i] == item){
    //       onplate.splice(i,1);
    //       console.log("item found");

    //       // break;
    //     }
    // }
    //   console.log("plate arr size after" + onplate.length);

    //dont think we need to reassign zidx of plate here...   
    // for(var i = 0; i < onplate.length; i ++){
    //   onplate[i].style.zIndex = plate_zidx_arr[i]; 
    // }

      //if new, add to onplate and set zIndx 
      // ontable.push(item);
      // for(var i = 0; i < ontable.length; i ++){
      //     ontable[i].style.zIndex = table_zidx_arr[i]; 
      // }
      // var zidx = window.getComputedStyle(item,null).getPropertyValue('z-index');
      // console.log("\n ontable zIndex" + zidx); //event.target.getAttribute.style.zIndex);
    // }  
  }  
}  

  document.getElementById('chartTotal1').innerHTML = "Total    " + graphtotal(H2O_data);
  document.getElementById('chartTotal2').innerHTML = "Total    " + graphtotal(CO2_data);
  document.getElementById('chartTotal3').innerHTML = "Total    " + graphtotal(Cal_data);

  H2O_chart.draw(H2O_data, H2O_options);
  CO2_chart.draw(CO2_data, CO2_options);
  Cal_chart.draw(Cal_data, Cal_options);

}

