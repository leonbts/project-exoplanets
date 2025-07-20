// star-map.js
const svg = d3.select('svg');
const width = +svg.attr('width') || 1600;
const height = +svg.attr('height') || 800;

const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

const tooltip = d3.select('.tooltip');
const pinnedInfo = d3.select('.pinned-info');

// Zoomable groups
const zoomLayer = svg.append('g');
const chartGroup = zoomLayer.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Scales
const xScale = d3.scaleLinear()
  .domain([0, 1000])
  .range([0, plotWidth]);

const yScale = d3.scaleLinear()
  .domain([10000, 2000])
  .range([0, plotHeight]);

// Zoom behavior
const zoom = d3.zoom()
  .scaleExtent([0.5, 20])
  .on('zoom', (event) => {
    zoomLayer.attr('transform', event.transform);
  });

svg.call(zoom);

d3.select('#resetZoom').on('click', () => {
  svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
});

let lastSelected = null;

// const drawStars = (data) => {
//   const filtered = d3.select('#filterHab').property('checked')
//     ? data.filter(d => d.potentially_habitable)
//     : data;

//   const stars = chartGroup.selectAll('circle')
//     .data(filtered, d => d.hostname);

//   stars.join(
//     enter => enter.append('circle')
//       .attr('class', 'star')
//       .attr('cx', d => xScale(d.sy_dist))
//       .attr('cy', d => yScale(d.st_teff))
//       .attr('r', d => d.total_planets ? Math.sqrt(d.total_planets) * 2 : 3)
//       .attr('fill', d => d.potentially_habitable ? '#0f0' : '#555')
//       .attr('stroke', '#fff')
//       .attr('stroke-width', 0.5)
//       .on('mouseover', (event, d) => {
//         tooltip.transition().duration(200).style('opacity', 0.9);
//         tooltip.html(`
//           <strong>${d.hostname}</strong><br/>
//           Distance: ${d.sy_dist} pc<br/>
//           Planets: ${d.total_planets}<br/>
//           Habitable: ${d.potentially_habitable ? 'Yes' : 'No'}<br/>
//           Temp: ${d.st_teff} K
//         `)
//         .style('left', (event.pageX + 10) + 'px')
//         .style('top', (event.pageY - 28) + 'px');
//       })
//       .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0))
//       .on('click', function(event, d) {
//         event.stopPropagation();

//         pinnedInfo.classed('hidden', false).html(`
//           <strong>${d.hostname}</strong><br/>
//           Distance: ${d.sy_dist} parsecs<br/>
//           Planets: ${d.total_planets}<br/>
//           Habitable: ${d.potentially_habitable ? 'Yes' : 'No'}<br/>
//           Temperature: ${d.st_teff} K<br/>
//           Mass: ${d.st_mass ?? 'N/A'} M☉<br/>
//           Radius: ${d.st_rad ?? 'N/A'} R☉
//         `);

//         if (lastSelected) lastSelected.classed('highlighted', false);
//         d3.select(this).classed('highlighted', true);
//         lastSelected = d3.select(this);
//       }),
//     update => update
//       .attr('cx', d => xScale(d.sy_dist))
//       .attr('cy', d => yScale(d.st_teff))
//       .attr('r', d => d.total_planets ? Math.sqrt(d.total_planets) * 2 : 3)
//       .attr('fill', d => d.potentially_habitable ? '#0f0' : '#555')
//       .attr('stroke', '#fff')
//       .attr('stroke-width', 0.5),
//     exit => exit.transition()
//       .duration(500)
//       .attr('r', 0)
//       .style('opacity', 0)
//       .remove()
//   );
// };
const drawStars = (data) => {
  const filtered = d3.select('#filterHab').property('checked')
    ? data.filter(d => d.potentially_habitable)
    : data;

  // Select circles by class for more robust code
  const stars = chartGroup.selectAll('circle.star')
    .data(filtered, d => d.hostname);

  stars.join(
    // --- ENTER ---
    // New elements will now grow into view instead of just appearing.
    enter => enter.append('circle')
      .attr('class', 'star') // Add class for consistent selection
      .attr('cx', d => xScale(d.sy_dist))
      .attr('cy', d => yScale(d.st_teff))
      .attr('fill', d => d.potentially_habitable ? '#0f0' : '#555')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>${d.hostname}</strong><br/>
          Distance: ${d.sy_dist} pc<br/>
          Planets: ${d.total_planets}<br/>
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0))
      .on('click', function(event, d) {
        event.stopPropagation();
        pinnedInfo.classed('hidden', false).html(`
          <strong>${d.hostname}</strong><br/>
          Distance: ${d.sy_dist} parsecs<br/>
          Planets: ${d.total_planets}<br/>
          Habitable: ${d.potentially_habitable ? 'Yes' : 'No'}<br/>
          Temperature: ${d.st_teff} K<br/>
          Mass: ${d.st_mass ?? 'N/A'} M☉<br/>
          Radius: ${d.st_rad ?? 'N/A'} R☉
        `);
        if (lastSelected) lastSelected.classed('highlighted', false);
        d3.select(this).classed('highlighted', true);
        lastSelected = d3.select(this);
      })
      // Start with radius 0 for the animation
      .attr('r', 0)
      // Apply the transition
      .transition()
      .duration(350) // Animation duration of 500ms
      .attr('r', d => d.total_planets ? Math.sqrt(d.total_planets) * 2 : 3), // Animate to final radius

    // --- UPDATE ---
    // No changes are needed for elements that are already on the screen.
    update => update,

    // --- EXIT ---
    // Elements being filtered out will shrink and disappear smoothly.
    exit => exit.transition() // Apply a transition
                .duration(350) // Use the same duration for consistency
                .attr('r', 0)    // Animate the radius to 0
                .remove()      // Remove the element from the DOM *after* the transition
  );
};

svg.on('click', (event) => {
  pinnedInfo.classed('hidden', true);
  if (lastSelected) lastSelected.classed('highlighted', false);
  lastSelected = null;
});

d3.csv('stars.csv').then(data => {
  data = data.filter(d => +d.sy_dist <= 1000);
  data.forEach(d => {
    d.sy_dist = +d.sy_dist;
    d.total_planets = +d.total_planets;
    d.potentially_habitable = +d.potentially_habitable;
    d.st_teff = +d.st_teff;
    d.st_mass = +d.st_mass;
    d.st_rad = +d.st_rad;
  });

  // Filter out invalid stars
  data = data.filter(d => d.st_teff > 100);

  // Axes
  chartGroup.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${plotHeight})`)
    .call(d3.axisBottom(xScale));

  chartGroup.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  // Labels
  chartGroup.append('text')
    .attr('x', plotWidth / 2)
    .attr('y', plotHeight + 40)
    .attr('text-anchor', 'middle')
    .attr('fill', '#aaa')
    .text('Distance to Star System (parsecs)');

  chartGroup.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -plotHeight / 2)
    .attr('y', -50)
    .attr('text-anchor', 'middle')
    .attr('fill', '#aaa')
    .text('Star Effective Temperature (K)');

  drawStars(data);

  d3.select('#filterHab').on('change', () => drawStars(data));
});
