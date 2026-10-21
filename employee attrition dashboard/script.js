
Chart.defaults.color = "#aab8cf";
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = 500;

const gridColor = "rgba(113, 130, 156, 0.13)";

const palette = {
  blue: "#4776f5",
  blueLight: "#9ab5ff",
  purple: "#9270ed",
  teal: "#22a88a",
  coral: "#ed6b7d",
  text: "#172b4d",
  muted: "#71829c"
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 850,
    easing: "easeOutQuart"
  },
  interaction: {
    intersect: false,
    mode: "index"
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        boxWidth: 8,
        boxHeight: 8,
        color: palette.muted,
        font: { size: 11, weight: 600 }
      }
    },
    tooltip: {
      backgroundColor: "#14233d",
      titleColor: "#ffffff",
      bodyColor: "#dbe7ff",
      padding: 13,
      cornerRadius: 10,
      displayColors: true,
      boxPadding: 5,
      titleFont: { weight: 700 },
      bodyFont: { size: 12 }
    }
  }
};

const axisOptions = {
  x: {
    grid: { display: false },
    border: { display: false },
    ticks: {
      color: palette.muted,
      font: { size: 11, weight: 500 }
    }
  },
  y: {
    beginAtZero: true,
    grid: { color: gridColor, drawTicks: false },
    border: { display: false, dash: [4, 4] },
    ticks: {
      padding: 10,
      color: palette.muted,
      precision: 0
    }
  }
};

// 1. Department-wise employee attrition
new Chart(document.getElementById("departmentChart"), {
  type: "line",
  data: {
    labels: ["HR", "R&D", "Sales"],
    datasets: [{
  label: "Employees Left",
  data: [12, 133, 92],
  borderColor: "#9270ed",
  backgroundColor: "rgba(146, 112, 237, 0.15)",
  pointBackgroundColor: "#9270ed",
  pointBorderColor: "#ffffff",
  pointRadius: 5,
  pointHoverRadius: 8,
  borderWidth: 3,
  tension: 0.35,
  fill: true
}]
  },
  tions: {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...baseOptions.plugins.tooltip,
        callbacks: {
          label: context => ` Employees left: ${context.raw}`
        }
      }
    },
    scales: {
      ...axisOptions,
      y: {
        ...axisOptions.y,
        suggestedMax: 150
      }
    }
  }
});

// 2. Overall attrition vs retention
new Chart(document.getElementById("statusChart"), {
  type: "doughnut",
  data: {
    labels: ["Employees Left", "Retained"],
    datasets: [{
      data: [237, 1233],
      backgroundColor: [palette.coral, palette.blue],
      hoverBackgroundColor: ["#df526a", "#315fe0"],
      borderColor: "#ffffff",
      borderWidth: 5,
      hoverOffset: 9,
      spacing: 3
    }]
  },
  options: {
    ...baseOptions,
    cutout: "74%",
    plugins: {
      ...baseOptions.plugins,
      legend: {
        position: "bottom",
        labels: {
          ...baseOptions.plugins.legend.labels,
          padding: 22
        }
      },
      tooltip: {
        ...baseOptions.plugins.tooltip,
        callbacks: {
          label: context => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = (context.raw / total * 100).toFixed(2);
            return ` ${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    }
  }
});


// 3. Overtime and attrition rate
new Chart(document.getElementById("overtimeChart"), {
  type: "bar",
  data: {
    labels: ["No Overtime", "Overtime"],
    datasets: [{
      label: "Attrition Rate",
      // Actual counts ni employee dataset nunchi calculate chesi ikkada pettali
      data: [10.44, 30.53],
      backgroundColor: [
        "rgba(71, 118, 245, 0.9)",
        "rgba(237, 107, 125, 0.9)"
      ],
      borderRadius: 8,
       borderSkipped: false,
        maxBarThickness: 50
    }]
  },
  
  options: {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...baseOptions.plugins.tooltip,
        callbacks: {
          label: context => {
            const employeesLeft = [110, 127];

            return [
              `Attrition Rate: ${context.raw}%`,
              `Employees Left: ${employeesLeft[context.dataIndex]}`
            ];
          }
        }
      }
    },
    scales: {
      ...axisOptions,
      x: {
        ...axisOptions.x,
        beginAtZero: true,
        max: 40,
        ticks: {
          ...axisOptions.x.ticks,
          stepSize: 10,
          callback: value => value + "%"
        }
      }
    }
  }
});


// 4. Attrition by age group
new Chart(document.getElementById("ageChart"), {
  type: "bar",
  data: {
    labels: ["18–25", "26–35", "36–45", "46–55", "56–65"],
    datasets: [{
      label: "Attrition Rate",
      data: [35.77, 19.14, 9.19, 11.50, 17.02],
      backgroundColor: [
        "#ed6b7d",
        "#9270ed",
        "#22a88a",
        "#4776f5",
        "#6b9af8"
      ],
      hoverBackgroundColor: [
        "#df526a",
        "#8059dc",
        "#168f73",
        "#315fe0",
        "#4c7fe0"
      ],
      borderRadius: 7,
      borderSkipped: false,
      maxBarThickness: 38
    }]
  },
  
  options: {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...baseOptions.plugins.tooltip,
        callbacks: {
          label: context => {
            const employeesLeft = [44, 116, 43, 26, 8];

            return [
              `Attrition Rate: ${context.raw}%`,
              `Employees Left: ${employeesLeft[context.dataIndex]}`
            ];
          }
        }
      }
    },
    scales: {
      ...axisOptions,
      y: {
        ...axisOptions.y,
        max: 40,
        ticks: {
          ...axisOptions.y.ticks,
          stepSize: 10,
          callback: value => value + "%"
        }
      }
    }
  }
});
