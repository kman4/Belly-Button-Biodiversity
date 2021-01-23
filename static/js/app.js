function retreiveData(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObject =>sampleObject.id == sample );
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        

        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();


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

    // bubble chart
    
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
        var firstSample = sampleNames[0];
        retreiveData(firstSample);
        //met data first sample
    });
    }

      
function buildTable(data) {
        var table = d3.select("#sample-metadata");
        var tbody = table.select("tbody");
        var trow;
        for (var i = 0; i < 12; i++) {
          trow = tbody.append("tr");
          trow.append("td").text(ethnicity[i]);
          trow.append("td").text(gender[i]);
          trow.append("td").text(age[i]);
          trow.append("td").text(location[i]);
          trow.append("td").text(bbtype[i]);
          trow.append("td").text(wfreq[i]);
        }
    }    

function optionChanged(newSample){
        retreiveData(newSample);
}  


init();
    

//console.log(samples);



































