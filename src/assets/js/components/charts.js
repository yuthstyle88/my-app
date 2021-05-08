if (typeof Chart !== "undefined") {
  // Colors
  let colors = {};
  colors.primary = "20, 83, 136";

  // Tooltips
  const tooltips = {
    backgroundColor: "#ffffff",
    titleFontColor: "rgba(" + colors.primary + ")",
    borderColor: "#dddddd",
    borderWidth: 0.5,
    bodyFontColor: "#555555",
    bodySpacing: 8,
    xPadding: 16,
    yPadding: 16,
    cornerRadius: 4,
    displayColors: true,
  };

  // Chart defaults
  Chart.defaults.global.defaultFontFamily = "'Nunito Sans', sans-serif";
  Chart.defaults.global.defaultFontColor = "#555555";
  let ctx = "";

  // Charts with shadows
  const ShadowLineElement = Chart.elements.Line.extend({
    draw: function () {
      const { ctx } = this._chart;

      const originalStroke = ctx.stroke;

      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        originalStroke.apply(this, arguments);
        ctx.restore();
      };

      Chart.elements.Line.prototype.draw.apply(this, arguments);

      ctx.stroke = originalStroke;
    },
  });

  // Line with shadow
  Chart.defaults.lineWithShadow = Chart.defaults.line;
  Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
    datasetElementType: ShadowLineElement,
  });

  // Radar with shadow
  Chart.defaults.radarWithShadow = Chart.defaults.radar;
  Chart.controllers.radarWithShadow = Chart.controllers.radar.extend({
    datasetElementType: ShadowLineElement,
  });

  // Bar with shadow
  Chart.defaults.barWithShadow = Chart.defaults.bar;
  Chart.defaults.global.datasets.barWithShadow =
    Chart.defaults.global.datasets.bar;
  Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
    draw: function (ease) {
      Chart.controllers.bar.prototype.draw.call(this, ease);
      const ctx = this.chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      Chart.controllers.bar.prototype.draw.apply(this, arguments);
      ctx.restore();
    },
  });

  // Pie with shadow
  Chart.defaults.pieWithShadow = Chart.defaults.pie;
  Chart.controllers.pieWithShadow = Chart.controllers.pie.extend({
    draw: function (ease) {
      Chart.controllers.pie.prototype.draw.call(this, ease);
      const ctx = this.chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      Chart.controllers.pie.prototype.draw.apply(this, arguments);
      ctx.restore();
    },
  });

  // Doughnut with shadow
  Chart.defaults.doughnutWithShadow = Chart.defaults.doughnut;
  Chart.controllers.doughnutWithShadow = Chart.controllers.doughnut.extend({
    draw: function (ease) {
      Chart.controllers.doughnut.prototype.draw.call(this, ease);
      const ctx = this.chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      Chart.controllers.doughnut.prototype.draw.apply(this, arguments);
      ctx.restore();
    },
  });

  // Polar area with shadow
  Chart.defaults.polarAreaWithShadow = Chart.defaults.polarArea;
  Chart.controllers.polarAreaWithShadow = Chart.controllers.polarArea.extend({
    draw: function (ease) {
      Chart.controllers.polarArea.prototype.draw.call(this, ease);
      const ctx = this.chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      Chart.controllers.polarArea.prototype.draw.apply(this, arguments);
      ctx.restore();
    },
  });

  // Line with annotation
  Chart.defaults.lineWithAnnotation = Chart.defaults.line;
  Chart.controllers.lineWithAnnotation = Chart.controllers.line.extend({
    draw: function (ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);
      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
        const activePoint = this.chart.tooltip._active[0];
        const ctx = this.chart.ctx;
        const x = activePoint.tooltipPosition().x;
        const topY = this.chart.scales["y-axis-0"].top;
        const bottomY = this.chart.scales["y-axis-0"].bottom;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.stroke();
        ctx.restore();
      }
    },
  });

  // Line with annotation and Shadow
  Chart.defaults.lineWithAnnotationAndShadow = Chart.defaults.line;
  Chart.controllers.lineWithAnnotationAndShadow = Chart.controllers.line.extend(
    {
      draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);
        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          const activePoint = this.chart.tooltip._active[0];
          const ctx = this.chart.ctx;
          const x = activePoint.tooltipPosition().x;
          const topY = this.chart.scales["y-axis-0"].top;
          const bottomY = this.chart.scales["y-axis-0"].bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.stroke();
          ctx.restore();
        }
      },
      datasetElementType: ShadowLineElement,
    }
  );

  // Line With Annotation Plugin
  const lineWithAnnotationPlugin = {
    afterInit: function (chart, options) {
      const info = chart.canvas.parentNode;
      const value = chart.data.datasets[0].data[0];
      const heading = chart.data.datasets[0].label;
      const label = chart.data.labels[0];
      info.querySelector(".chart-value").innerHTML =
        "$" + value.toLocaleString();
      info.querySelector(".chart-label").innerHTML = heading + ": " + label;
    },
  };

  // Line with annotation options
  const lineWithAnnotationOptions = {
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 10,
      },
    },
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
      enabled: false,
      custom: function (tooltipModel) {
        if (tooltipModel && tooltipModel.dataPoints) {
          const info = this._chart.canvas.parentNode;
          const value = tooltipModel.dataPoints[0].yLabel;
          const heading = tooltipModel.body[0].lines[0].split(":")[0];
          const label = tooltipModel.dataPoints[0].xLabel;
          info.querySelector(".chart-value").innerHTML =
            "$" + value.toLocaleString();
          info.querySelector(".chart-label").innerHTML = heading + ": " + label;
        }
      },
    },
    scales: {
      yAxes: [
        {
          display: false,
        },
      ],
      xAxes: [
        {
          display: false,
        },
      ],
    },
  };

  // Charts
  // Area Chart
  ctx = document.getElementById("areaChart");
  if (ctx) {
    ctx.getContext("2d");
    const areaChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            data: [5, 10, 15, 10, 15, 10],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Area chart with shadow
  ctx = document.getElementById("areaWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const areaChartWithShadow = new Chart(ctx, {
      // The type of chart we want to create
      type: "lineWithShadow",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            data: [5, 10, 15, 10, 15, 10],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Line chart
  ctx = document.getElementById("lineChart");
  if (ctx) {
    ctx.getContext("2d");
    const lineChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            fill: false,
            data: [5, 10, 15, 10, 15, 10],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Line with shadow chart
  ctx = document.getElementById("lineWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "lineWithShadow",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            fill: false,
            data: [5, 10, 15, 10, 15, 10],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Bar chart
  ctx = document.getElementById("barChart");
  if (ctx) {
    ctx.getContext("2d");
    const barChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Potatoes",
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [5, 10, 15, 10, 15, 10],
          },
          {
            label: "Tomatoes",
            backgroundColor: "rgba(" + colors.primary + ", .5)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [7.5, 10, 17.5, 15, 12.5, 5],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Bar with shadow chart
  ctx = document.getElementById("barWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const barWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "barWithShadow",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Potatoes",
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [5, 10, 15, 10, 15, 10],
          },
          {
            label: "Tomatoes",
            backgroundColor: "rgba(" + colors.primary + ", .5)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [7.5, 10, 17.5, 15, 12.5, 5],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Pie chart
  ctx = document.getElementById("pieChart");
  if (ctx) {
    ctx.getContext("2d");
    const pieChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "pie",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Pie with shadow chart
  ctx = document.getElementById("pieWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const pieWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "pieWithShadow",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Doughnut chart
  ctx = document.getElementById("doughnutChart");
  if (ctx) {
    ctx.getContext("2d");
    const doughnutChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "doughnut",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        cutoutPercentage: 75,
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Doughnut with shadow chart
  ctx = document.getElementById("doughnutWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const doughnutWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "doughnutWithShadow",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        cutoutPercentage: 75,
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Polar chart
  ctx = document.getElementById("polarChart");
  if (ctx) {
    ctx.getContext("2d");
    const polarChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "polarArea",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        layout: {
          padding: 5,
        },
        scale: {
          ticks: {
            display: false,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Polar with shadow
  ctx = document.getElementById("polarWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const polarWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "polarAreaWithShadow",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        layout: {
          padding: 5,
        },
        scale: {
          ticks: {
            display: false,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Radar chart
  ctx = document.getElementById("radarChart");
  if (ctx) {
    ctx.getContext("2d");
    const radarChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "radar",

      // The data for our dataset
      data: {
        labels: ["Drinks", "Snacks", "Lunch", "Dinner"],
        datasets: [
          {
            label: "Potatoes",
            data: [25, 25, 25, 25],
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
          },
          {
            label: "Tomatoes",
            data: [10, 10, 0, 20, 20],
            backgroundColor: "rgba(" + colors.primary + ", .25",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
          },
        ],
      },

      // Configuration options go here
      options: {
        scale: {
          ticks: {
            display: false,
            max: 30,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Radar with shadow chart
  ctx = document.getElementById("radarWithShadowChart");
  if (ctx) {
    ctx.getContext("2d");
    const radarWithShadowChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "radarWithShadow",

      // The data for our dataset
      data: {
        labels: ["Drinks", "Snacks", "Lunch", "Dinner"],
        datasets: [
          {
            label: "Potatoes",
            data: [25, 25, 25, 25],
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
          },
          {
            label: "Tomatoes",
            data: [10, 10, 0, 20, 20],
            backgroundColor: "rgba(" + colors.primary + ", .25",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
          },
        ],
      },

      // Configuration options go here
      options: {
        scale: {
          ticks: {
            display: false,
            max: 30,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }

  // Line with annotation chart 1
  ctx = document.getElementById("lineWithAnnotationChart1");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationChart1 = new Chart(ctx, {
      type: "lineWithAnnotation",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Total Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [1250, 1300, 1550, 900, 1800, 1100, 1600],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation chart 2
  ctx = document.getElementById("lineWithAnnotationChart2");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationChart2 = new Chart(ctx, {
      type: "lineWithAnnotation",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Active Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [100, 150, 300, 200, 100, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation chart 3
  ctx = document.getElementById("lineWithAnnotationChart3");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationChart3 = new Chart(ctx, {
      type: "lineWithAnnotation",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Pending Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [350, 400, 750, 900, 600, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation chart 4
  ctx = document.getElementById("lineWithAnnotationChart4");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationChart4 = new Chart(ctx, {
      type: "lineWithAnnotation",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Shipped Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [200, 400, 250, 600, 100, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation and shadow chart 1
  ctx = document.getElementById("lineWithAnnotationAndShadowChart1");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationAndShadowChart1 = new Chart(ctx, {
      type: "lineWithAnnotationAndShadow",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Total Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [1250, 1300, 1550, 900, 1800, 1100, 1600],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation and shadow chart 2
  ctx = document.getElementById("lineWithAnnotationAndShadowChart2");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationAndShadowChart2 = new Chart(ctx, {
      type: "lineWithAnnotationAndShadow",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Active Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [100, 150, 300, 200, 100, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation and shadow chart 3
  ctx = document.getElementById("lineWithAnnotationAndShadowChart3");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationAndShadowChart3 = new Chart(ctx, {
      type: "lineWithAnnotationAndShadow",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Pending Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [350, 400, 750, 900, 600, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Line with annotation with shadow chart 4
  ctx = document.getElementById("lineWithAnnotationAndShadowChart4");
  if (ctx) {
    ctx.getContext("2d");
    const lineWithAnnotationAndShadowChart4 = new Chart(ctx, {
      type: "lineWithAnnotationAndShadow",
      plugins: [lineWithAnnotationPlugin],
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Shipped Orders",
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 2,
            pointBorderWidth: 4,
            pointHoverRadius: 2,
            fill: false,
            data: [200, 400, 250, 600, 100, 50, 50],
          },
        ],
      },
      options: lineWithAnnotationOptions,
    });
  }

  // Visitors chart
  ctx = document.getElementById("visitorsChart");
  if (ctx) {
    ctx = ctx.getContext("2d");

    gradientBackground = ctx.createLinearGradient(0, 0, 0, 450);
    gradientBackground.addColorStop(0, "rgba(" + colors.primary + ", .5)");
    gradientBackground.addColorStop(0.75, "rgba(" + colors.primary + ", 0)");

    const visitorsChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "lineWithShadow",

      // The data for our dataset
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            backgroundColor: "rgba(" + colors.primary + ", .1)",
            // backgroundColor: gradientBackground,
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(" + colors.primary + ")",
            pointHoverBackgroundColor: "rgba(" + colors.primary + ")",
            pointHoverBorderColor: "#ffffff",
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            data: [15, 10, 7.5, 5, 10, 15, 10, 12.5, 15, 10, 12.5, 12.5],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        tooltips: tooltips,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                min: 0,
                max: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }

  // Categories chart
  ctx = document.getElementById("categoriesChart");
  if (ctx) {
    ctx.getContext("2d");
    const categoriesChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "polarAreaWithShadow",

      // The data for our dataset
      data: {
        labels: ["Potatoes", "Tomatoes", "Onions"],
        datasets: [
          {
            backgroundColor: [
              "rgba(" + colors.primary + ", .1)",
              "rgba(" + colors.primary + ", .5)",
              "rgba(" + colors.primary + ", .25)",
            ],
            borderColor: "rgba(" + colors.primary + ")",
            borderWidth: 2,
            data: [25, 10, 15],
          },
        ],
      },

      // Configuration options go here
      options: {
        layout: {
          padding: 5,
        },
        scale: {
          ticks: {
            display: false,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltips: tooltips,
      },
    });
  }
}
