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
        let id1 = metadata[0].id;
        let ethnicity = metadata[0].ethnicity;
        let gender = metadata[0].gender;
        let age = metadata[0].age;
        let location = metadata[0].location;
        let bbtype = metadata[0].bbtype;
        let wfreq = metadata[0].wfreq;

        
        const alldata = {
            "id": id1,
            "ethinicity": ethnicity,
            "gender": gender,
            "age": age,
            "location": location,
            "bbtype": bbtype,
            "wfreq": wfreq
        };
        d3.select("#sample-metdata").(alldata);
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
