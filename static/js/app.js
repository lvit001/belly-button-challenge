// set the url as a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define a function to create the horizontal bar chart
function horizontalBarGraph(sampleId) {
    console.log(`Running Bar Chart for Sample ID: ${sampleId}`)
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
        console.log(`Top 10 Sample Values for Sample ID ${sampleId}: ${sampleValuesTen}`);
        let otuIdsTen = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()
        console.log(`Top 10 OTU IDs for Sample ID ${sampleId}: ${otuIdsTen}`);
        let otuLabelsTen = otuLabels.slice(0, 10).reverse()
        console.log(`Top 10 OTU Labels for Sample ID ${sampleId}: ${otuLabelsTen}`);

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
    console.log(`Running Bubble Chart for Sample ID: ${sampleId}`)
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
            width: 1200,
            xaxis: {title: "OTU ID"},
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    })
}

// define a function to display the meta data
function metaData(sampleId) {
    console.log(`Running MetaData for Sample ID: ${sampleId}`)
    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // access the samples property in the json file
        let metaDataArray = data.metadata;
        
        // filter the data for the specific sampleId being selected in the selector
        let metaData = metaDataArray.filter(md => md.id == sampleId)[0];

        // access the demographic info tag in the index.html file
        let demographicInfoTable = d3.select("#sample-metadata");

        // clear out the demographics table when a new subject is selected
        demographicInfoTable.html('');
        console.log(`Clearing demographics for previous Sample ID`)
       
        // Add the metadata object in for the sampleId
        // code for help adding key-value pairs in an object to the html file: 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(metaData)) {
            demographicInfoTable.append('h4').text(`${key}: ${value}`);
        }
    })
}
// define a function to add the name values to the selector
function init() {
    console.log(`Initializing Charts`)

    // assign the selector to a variable
    let selector = d3.select('#selDataset');

    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // grab the names for the labels of the selector
        let labels = data.names;

        // assign the labels to the selector
        labels.map(label => {
            selector.append("option").text(label).property("value", label);
        })
    
        // select the start value for the selector
        let startId = labels[0];

        // use the start id in the charts & metadata
        horizontalBarGraph(startId);
        bubbleChart(startId);
        metaData(startId);

    })
}

// define a function for when the subject id is changed with the selector
function optionChanged(sampleId) {

    console.log(`New Sample ID selected: ${sampleId}`);

    horizontalBarGraph(sampleId);
    bubbleChart(sampleId);
    metaData(sampleId);

}

init();