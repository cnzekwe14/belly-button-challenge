// read in file
var url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(x){
   let table1 = [];
    for (let i=0;i<x.samples.length,i++;) {
    
    var people = x.samples[i];
    table1.push(people)
    }
    // let samps = x.samples.otu_ids
    console.log(x.samples[1].id); 


let drop1 = d3.select(".selDataset");

function Handclick (){
    console.log(d3.event.target);
};

drop1.on("optionchanged",Handclick);
let table2 = [];
drop1.on("optionchanged", function(){
    for (let p=0; p<x.samples.length,p++;) {
        let row = x.samples[i].id;
        table2.push(row);
        }
    console.log(table2);
});

});





