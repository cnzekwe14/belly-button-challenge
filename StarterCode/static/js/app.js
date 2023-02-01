// read in url
var url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


    d3.json(url).then(function(data){
        // console.log(data);
       
    });
    


console.log("app.js");

{/* <select name="cars" id="cars">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="opel">Opel</option>
<option value="audi">Audi</option>
// </select> */}




//update function with option changed
function update(item){
    console.log(item);
    // let filt1 = sample.filter(item);
    d3.json(url).then(function(data) {
        // console.log(data);
        let samples = data.samples;
        let sample= samples.filter(obj => obj.id == item);
        let otuIDs = sample[0].otu_ids;
       
        // console.log(otuIDs);

        // let sv = samples.filter(obj=> obj.sample_values ==item);
        let sample_values=sample[0].sample_values;
        // console.log(sample_values);
    
        // let otunames = samples.filter(obj => obj.otu_labels == item);
        let otu_labels = sample[0].otu_labels;
        // console.log(otu_labels);

        
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            text: otuIDs.slice(0,10).reverse(),
            y:otuIDs.slice(0,10).map(otuIDs => `otu ${otuIDs}`).reverse(),
            type: "bar",
            orientation: 'h'
        };
        
        let tracedata = [trace];
        
        let layout = {
            title: "Top Ten OTUs",
            margin: {t:30,l:150}
        };
        
        Plotly.newPlot("bar",tracedata,layout);

        let trace2 = {
            x: otuIDs,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color:otuIDs,
                fillOpacity: .5
            },
            
        } ;

        let tracedata2 = [trace2];
        let layout2 = {
            title: 'Bubble Chart',
            height: 600,
            width: 1000,
        };
        Plotly.newPlot("bubble",tracedata2,layout2);

        let meta1 = data.metadata;
        let metadata = meta1.filter(obj => obj.id == item);
        let result = metadata[0];
        let result2 = result.wfreq;
        
        let panel = d3.select("#sample-metadata");
        panel.html("");
        for (key in result){
            panel.append("h6").text(`${key}: ${result[key]}`);
        };
        
    //     let array1 = [];
    //     for (i=0;i<meta1.length;i++){
    //         let row3 = meta1[i];
    //         let row33 = row3.wfreq;
    //         array1.push(row33);

    //     };
    //     let min1 = Math.min(...array1);
    //     let max1 = Math.max(...array1);
    //     let label1 = [];
    //     for (p = 0;p<max1;p++){
    //         if(p<max1){
    //         let part1 = `${p}-${p+1}`;
    //         label1.push(part1)   
    //         }
    //     };
        
    //  let gauge = [{
    //     domain: {x:[0,1],y:[0,1]}
    //  }
    //  ]
        

    //  let layout3 = {width: 600, height: 500, margin: {t:0,b:0}};
    //  Plotly.newPlot('gauge',gauge,layout3);
    });

       
};






// initalized the dropdown with ids
function init_selector() {
    let drop1 = d3.select("#selDataset"); 
    d3.json(url).then(function(data){
        // console.log(data);
        let subjectIDs = data.names;
        // for (let i = 0; subjectIDs.length; i++){
        for (let subjectID of subjectIDs){   
            drop1.append("option")
            .property("value",subjectID)
            .text(subjectID)
            
        }
     update(subjectIDs[0]);
    });
    
    
};

// call optionchanged when a change takes place
function optionChanged(subjectID) {
    console.log(subjectID);
    update(subjectID);
}


init_selector();
