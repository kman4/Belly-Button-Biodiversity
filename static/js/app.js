//---------------- Metadata Panel --------------------------------------------

function buildMetadata(sample) {

    // Use d3 to select the panel with id of `#sample-metadata`
   
  
    // Use `d3.json` to fetch the metadata for a sample
    d3.json("samples.json").then((data) => {

    var metData = data.metadata;
    var resultMetData = metData.filter(sampleObject =>sampleObject.id == sample);
    var results = resultMetData[0];
    
     // var metadata = data.metadata;
    //console.log(data);
    // var array1 = metadata.filter(obj => obj.id === sample);
    // var result2 = array1[0];


     var panel = d3.select("#sample-metadata");

     panel.html("");
    
      // Use `Object.entries` to add each key and value pair to the table
      Object.entries(results).forEach(([key, value]) => {
   
     panel.append("h6").text(`${key} : ${value}`);
      
      ;
      });
    });
  };


function retreiveData(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObject =>sampleObject.id == sample );
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;


        

        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    //  Building bar graph
        var trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
        var data = [trace1];
        // Apply the group bar mode to the layout
        var layout = {
        title: "Belly Button Biodiversity Bar Chart"
        //barmode: "group"
        }
       // Render the plot to the div tag with id "plot"

       Plotly.newPlot("bar",data,layout);

    //plot bubble chart    
      var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: { size: sample_values,
        color: otu_ids},
        hovertext: otu_labels
      };
      var layout2 = {title:"OTU ID"};
      var data2 = [trace2];
      Plotly.newPlot("bubble",data2,layout2);
    });
    
    
};

function init(){
    var dropDown =  d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample)=> {
            dropDown.append("option")
            .text(sample)
            .property("value", sample);

        });

  // Use the first sample from the list to build the initial plots

        var firstSample = sampleNames[0];
        retreiveData(firstSample);
        buildMetadata(firstSample);
        buildGauge(firstSample);
        
    });
    }

      
  // Fetch new data each time a new sample is selected


function optionChanged(newSample){
        retreiveData(newSample);
        buildMetadata(newSample);
        buildGauge(newSample);
}  

// Initialize the dashboard


init();
    