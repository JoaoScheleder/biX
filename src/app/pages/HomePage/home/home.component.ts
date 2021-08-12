import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTheme,
  ApexTooltip,
  ApexFill
} from "ng-apexcharts";

import "./dadosProvisorios"
import { dataSeries } from './dadosProvisorios';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selected : string = "tudo"

  public series2! : ApexAxisChartSeries;
  public chart2! : ApexChart;
  public dataLabels2! : ApexDataLabels;
  public markers2! : ApexMarkers;
  public title2! : ApexTitleSubtitle;
  public fill2! : ApexFill;
  public yaxis2! : ApexYAxis;
  public xaxis2! : ApexXAxis;
  public tooltip2! : ApexTooltip;


  grid = {
    borderColor: 'rgba(33, 150, 243, 0.2)',
    xaxis: {
        lines: {
            show: true
        },
        
    },   
    yaxis: {
        lines: {
            show: false
        }
    },

}




  public chartOptions! : Partial<ChartOptions> | any;
  public chartOptions2! : Partial<ChartOptions> | any;
  public chartOptions3! : Partial<ChartOptions> | any;


    theme : ApexTheme = {
      mode: 'light',
  }
  constructor(private dateAdapter : DateAdapter<Date>) {
    
    this.dateAdapter.setLocale("pt-BR")

    this.chartOptions2 = {
      series: [50, 30, 20 ],
      chart: {
        type: "pie"
      },
      labels: ["Cortes", "Vinho", "Produtos"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions = {
      series: [
        
        {
          name: "2021",
          data: [105, 95, 100, 110, 130, 95, 85, 95, 75, 65, 60, 80]
        },
        {
          name: "2020",
          data: [100, 70, 85, 70, 85, 60, 65, 75, 80, 75, 85, 90],
        }
      ],
      colors: ['rgba(33, 150, 243, 1)', "#545454"],
      chart: {
        height: 300,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 15,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Performance",
        align: "left",
        style: {
          color: undefined,
          fontSize: '30px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: "300",
      },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL","AGO","SET","OUT","NOV","DEZ"],
        axisBorder: {
          show: false,  
        },
        axisTicks: {
          show: false,
      },
      },
      yaxis: {
        min: 60,
        max: 130
        
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      grid: {
        borderColor: 'rgba(33, 150, 243, 0.2)',
        xaxis: {
            lines: {
                show: true
            },
            
        },   
        yaxis: {
            lines: {
                show: false
            }
        },

    }
    
    };

    this.chartOptions3 = {
      series: [
        {
          name: "Desmarcaram",
          data: [3, 5, 4, 6, 5, 10, 8, 6, 5]
        },
        {
          name: "Cortes",
          data: [432, 325, 451, 398, 487, 405, 391, 450, 673]
        },
        {
          name: "Clientes Novos",
          data: [32, 25, 51, 98, 87, 55, 61, 50, 73]
        }
      ],
      chart: {
        type: "bar",
        height: 370
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out"
        ]
      },
      grid: {
        borderColor: 'rgba(33, 150, 243, 0.2)',
        xaxis: {
            lines: {
                show: false
            },
            
        },   
        yaxis: {
            lines: {
                show: true
            }
        },

      }, 
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val : number) {
            return  val ;
          }
        }
      }
    };
    this.initChartData()
   }

  ngOnInit(): void {

  }


  public initChartData(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    this.series2 = [
      {
        name: "XYZ MOTORS",
        data : dates as []
      }
    ];
    this.chart2 = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels2 = {
      enabled: false
    };
    
    this.title2 = {
      text: "Carteira dia",
      align: "left",
      style: {
        color: undefined,
        fontSize: '30px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: "300",
      },
    };
    this.fill2 = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis2 = {
      labels: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
    this.xaxis2 = {
      type: "datetime",
        axisBorder: {
          show: false,  
        },
        axisTicks: {
          show: false,
        },
    };
    this.tooltip2 = {
      shared: false,
      y: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

}
