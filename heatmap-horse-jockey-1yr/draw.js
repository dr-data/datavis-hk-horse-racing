
  var itemSize = 22,
      cellSize = itemSize - 1,
      margin = {top: 120, right: 20, bottom: 20, left: 110};
      
  //var width = 750 - margin.right - margin.left,
  //    height = 300 - margin.top - margin.bottom;
  
  var width = 8000 - margin.right - margin.left,
      height = 8000 - margin.top - margin.bottom;

  var formatDate = d3.time.format("%Y-%m-%d");

  d3.csv('horse-jockey.csv', function ( response ) {

    var data = response.map(function( item ) {
        var newItem = {};
        newItem.country = item.x;
        newItem.product = item.y;
        newItem.value = item.value;

        return newItem;
    })

    var x_elements = d3.set(data.map(function( item ) { return item.product; } )).values(),
        y_elements = d3.set(data.map(function( item ) { return item.country; } )).values();

    var xScale = d3.scale.ordinal()
        .domain(x_elements)
        .rangeBands([0, x_elements.length * itemSize]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("top");

    var yScale = d3.scale.ordinal()
        .domain(y_elements)
        .rangeBands([0, y_elements.length * itemSize]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("left");

    var colorScale = d3.scale.threshold()
        //.domain([0.85, 1])
        .domain([0.1, 0.3, 0.5, 0.7, 1])
        //.range(["#2980B9", "#E67E22", "#27AE60", "#27AE60"]);
        .range(["#fff0e6", "#ffc299", "#ffa366", "#ff8533", "#FF0000", "#FF0000"]);

    var svg = d3.select('.heatmap')
    //var svg = d3.select('#example')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('y', function(d) { return yScale(d.country); })
        .attr('x', function(d) { return xScale(d.product); })
        .attr('fill', function(d) { return colorScale(d.value); });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .attr('font-weight', 'normal');

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
            return "rotate(-65)";
        });
  });

