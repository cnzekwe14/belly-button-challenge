// read in file

let drop1 = d3.select("#selDataset");

var url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
   let row = data;
   for(let i = 0;i<row.samples.length;i++){
    d3.selectAll()

   }
});







