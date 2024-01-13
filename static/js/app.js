// set the url as a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define a function to create the horizontal bar chart
function horizontalBarGraph(sampleId) {
    // read in the json link
    d3.json(url).then(data => {console.log(data);

        // access the samples property in the json file
        let samples = data.samples;
        
        // filter the data for the specific sampleId being selected in the selector
        let sampleArray = samples.filter(sample => sample.id == sampleId);

        // need to go down one level since the data for each sample is in an array
        let sampleData = sampleArray[0];

        // save each of the datasets required for the chart to a variable
        let sampleValues = sampleData.sample_values;
        let otuIds = sampleData.otu_ids;
        let otuLabels = sampleData.otu_labels;




    })
}