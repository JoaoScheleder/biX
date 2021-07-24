import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selected : string = "tudo"


  type1 = 'bar';
  options1 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes : [{
            ticks : {
                max : 100,    
                min : 0
            }
        }]
      }
    };
  data1:any;

  
  type2 = 'line';
  options2 = {
    elements: {
      line: {
          tension: 0
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes : [{
            ticks : {
                max : 100,    
                min : 0
            }
        }]
      }
    };
  data2:any;
    
  type3 = 'doughnut';
  options3 = {

    responsive: true,
    };
  data3:any;



  constructor() { }

  ngOnInit(): void {

    this.data1 = {

      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"], //months
      datasets: [
      {
          label: "Angular 11",
          data: ["45", "55", "35", "65", "60", "25", "45","86","76","68","53","43"],
          backgroundColor: "#f38b4a",
      },
      {
          label: "Angular 12",
          data: ["35", "69", "45", "96", "50", "60", "45","83","64","39","93","83"],
          backgroundColor: "#6970d5",
          
      }]
  };
      this.data2 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"], //months
        datasets: [
        {   
            fill: false,
            label: "Angular 11",
            data: ["45", "55", "35", "65", "60", "25", "45"],
            backgroundColor: "#f38b4a",
            borderColor: 'rgb(75, 192, 192)',
        },
        {     
            fill: false,
            label: "Angular 12",
            data: ["35", "69", "45", "96", "50", "60", "45"],
            backgroundColor: "#6970d5",
            borderColor: 'rgb(150, 30, 192)',
            
        }]
      };

      this.data3 = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 0
      }]
      };


  }

}
