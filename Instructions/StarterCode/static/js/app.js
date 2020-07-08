function getPlot(id){
    d3.json("samples.json").then((data)=>{
        console.log(data);
        var samples=data.samples.filter(s=>s.id==id)[0];
        console.log(samples);

        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d)
        var labels = samples.otu_labels.slice(0, 10);
        var sample_values = samples.sample_values.slice(0,10).reverse();


        var trace1 = {
            x: sample_values,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(124,195,188)'},
            type:"bar",
            orientation: "h",
            };
        var data=[trace1];
        Plotly.newPlot("bar",data,trace1);

        var trace2={
            x:OTU_id,
            y: sample_values,
            text: labels,
            mode: "markers",
            marker:{
                color:OTU_id,
                size: sample_values
            }
        };
        var data2=[trace2];

        var layout2={
            title: "Bubble chart",
            showlegend: false,
            height: 600,
            width: 1000
        };
        Plotly.newPlot("bubble",data2, layout2);
    })
};


function getInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data) => {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
        var demoGraphic = d3.select("#sample-metadata");

        // empty the demographic info
        demoGraphic.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demoGraphic.append("h5").text(key[0].toUpperCase() + ": " + key[1]);
        });
    });
}
// create the function for the change event
// function optionChanged(id) {
//     getPlot(id);
//     getInfo(id);
// };

function update(){
    var dropdown=d3.select("#selDataset");

    d3.json("samples.json").then((data)=>{
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
        })
    var first_id=data.names[0];
    getInfo(first_id);
    getPlot(first_id);
    });

    };
update();

//???how could I get the ID that selected to call getplot() and getinfo()?
function optionChanged(id){
    getPlot(id);
    getInfo(id);

};

// function init(){
//     var first_id=d3.select("#selDataset");
//     d3.json("samples.json").then((data)=>{
//         data.names[0]
//     })

// };