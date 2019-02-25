var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
    // TODO implement this based on what we did in class
    "married": "#5B7BE9",
    "children": "#E0D22E",
    "healthcare": "#2CCEF6",
    "college": "#FB7F23",
    "employed": "#D63CA3",
    "selfemp": "#c38014",
    "publictrans": "#E24062",
    "income_moremed": "#5BB923",
    "inpoverty": "#555",
    "isveteran": "#B190D0",
    "bornoutus": "#bcc832",
    "diffmovecog":"#ee7b9c",
    "diffhearvis":"#f299b3" ,
    "widowed": "#01d99f"
}

var category_names = {
    // TODO implement this based on what we did in class
    "married": "married",
    "children": "have children in household",
    "healthcare": "have healthcare coverage",
    "college": "bachelor's degree or more",
    "employed": "employed",
    "selfemp": "self-employed",
    "publictrans": "prmiary trans to work",
    "income_moremed": "personal incom above nat med",
    "inpoverty": "below poverty line",
    "isveteran": "veteran",
    "bornoutus": "born outside us",
    "diffmovecog":"physics difficulty",
    "diffhearvis":"hearing difficult" ,
    "widowed": "widowed"
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file 
function loadData() {
    // load the demographics.csv file

    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem

    d3.csv("data/demographics.csv", (d) => {
        data = d
        data.forEach((item) => {
            item.n = parseInt(item.n)
        })
        visualizeSquareChart(findDataItem());
    })
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to 
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values


    //HINT: uncomment and COMPLETE the below lines of code
    var item = data.filter(function (d) { return d.sex == USER_SEX && d.racesimp == USER_RACESIMP && d.agegrp == USER_AGEGRP });
    if (item.length == 1) {
        return item[0];
    }

    return null;
}



//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(item) {

    var margin = { top:0, right:10, bottom:40, left:40}
    var width = 230 - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;
    // visualize the square plot per attribute in the category_color variable


    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var fields = d3.keys(category_colors)
    fields.forEach((v, i) => {
        var div = d3.select("#chart1").append("div")
            .attr("id", "holder" + v.key)
            .attr("class", "chartholder")
            .attr("style", "display:inline-block");
            //.attr("style","float: left; width = 20%");
            //.style("display", "inline-block");

        div.append("h6").html(category_names[v]);

        var svg = div.append("svg")
            .attr("class", "categoryGrid")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top +")")

        rectWidth = 15
        rectHeight = 15
        // define the size of each individual brick to be 20*20


        rects = svg.selectAll("rect")   //select all rectangle elements
            .data(d3.range(100 ))    //create a set of data from 1 to 100, which is the total # of rect elements
            .enter()        //access to all the data point
            .append("rect")
            .attr("x", (d, i) => rectWidth * (i % 10))  //take the reminder of the division as the rect x position
            .attr("y", (d, i) => rectWidth * Math.floor(i / 10))    //take the lower integer of the division as the rect y position
            .attr("height", rectHeight)
            .attr("width", rectWidth)
            .attr("stroke", "white")   //add white border to bricks
            .attr("fill", function (d, i) {
                if (i < 100 - item[v] ) {
                    return "lightgrey"
                }
                else return category_colors[v]
            } );

    });

    // update the count div whose id is "n" with item.total
    var format = d3.format(",d");
    n = d3.select("#n");
    n.html(format(item.total));

}





//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value. 
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });
    // RACE
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_RACESIMP = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });

    //AGEGROUP
    d3.selectAll("#agegrp .button").on("click", function () {
        USER_AGEGRP = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });


    // how to make multismall chart of 3 by 5?
    // how to show capitalized letter

}