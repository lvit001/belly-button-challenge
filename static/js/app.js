// set the url as a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define a function to create the horizontal bar chart
function horizontalBarGraph(sampleId) {
    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // access the samples property in the json file
        let samples = data.samples;
        
        // filter the data for the specific sampleId being selected in the selector
        let sampleData = samples.filter(sample => sample.id == sampleId)[0];

        // save each of the datasets required for the chart to a variable
        let sampleValues = sampleData.sample_values;
        let otuIds = sampleData.otu_ids;
        let otuLabels = sampleData.otu_labels;

        // pull out the top 10 for each of the variables using slice and reverse
        let sampleValuesTen = sampleValues.slice(0, 10).reverse()
        let otuIdsTen = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()
        let otuLabelsTen = otuLabels.slice(0, 10).reverse()

        // Trace1 for the horizontal barchart
        let trace1 = {
            x: sampleValuesTen,
            y: otuIdsTen,
            text: otuLabelsTen,
            type: "bar",
            orientation: "h"
          };
          
        // Data array
        let barData = [trace1];

        // add a title to the bar chart
        let barLayout = {
            title: "Top 10 OTUs in Subject"
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barData, barLayout);
    })
}

// define a function to create the bubble chart
function bubbleChart(sampleId) {

    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // access the samples property in the json file
        let samples = data.samples;
        
        // filter the data for the specific sampleId being selected in the selector
        let sampleData = samples.filter(sample => sample.id == sampleId)[0];

        // // need to go down one level since the data for each sample is in an array
        // let sampleData = sampleArray[0];

        // save each of the datasets required for the chart to a variable
        let sampleValues = sampleData.sample_values;
        let otuIds = sampleData.otu_ids;
        let otuLabels = sampleData.otu_labels;

        // Trace2 for the bubble chart
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: sampleValues
            }
          };

        // Data array
        let bubbleData = [trace2];

        // add a title to the bar chart
        let bubbleLayout = {
            title: "OTU Frequency Bubble Chart",
            height: 600,
            width: 600
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    })
}

// define a function to displaye the meta data
function metaData(sampleId) {

    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // access the samples property in the json file
        let metaDataArray = data.metadata;
        
        // filter the data for the specific sampleId being selected in the selector
        let metaData = metaDataArray.filter(md => md.id == sampleId)[0];

        // access the demographic info tag in the index.html file
        let demographicInfoTable = d3.Select("#sample-metadata");


    })
}