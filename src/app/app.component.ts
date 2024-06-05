import { AfterViewInit, Component } from '@angular/core';
import { BezierConnector, DotEndpoint, StraightConnector, newInstance } from '@jsplumb/browser-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'flow-builder';

  instance: any;

  constructor() {

  }

  ngAfterViewInit(): void {
    const container: Element = document.getElementById("container")! as Element;
    const flowContainer1: Element = document.getElementById("flow_element_1")! as Element;
    const flowContainer2: Element = document.getElementById("flow_element_2")! as Element;
    const flowContainer3: Element = document.getElementById("flow_element_3")! as Element;
  
    this.instance = newInstance({
      container: container
    })

    const ep1 = this.instance.addEndpoint(
      flowContainer1,
      // "#flow_element_1",
      {
        endpoint: "Dot",
        anchors: ["Left", "Right"],
        // isSource: true
      }
    )

    const ep2 = this.instance.addEndpoint(
      flowContainer2,
      // "#flow_element_2",
      {
        endpoint: "Dot",
        anchor: "AutoDefault"
        // isTarget: true
      }
    )

    const ep3 = this.instance.addEndpoint(
      flowContainer3,
      // "#flow_element_2",
      {
        endpoint: "Dot",
        anchor: {
          type: "Perimeter",
          options: {
            shape: "Rectangle"
          }
        }
        // isTarget: true
      }
    )

    this.instance.connect({
      source: ep1,
      target: ep2,
      connector: {
        type: BezierConnector.type,
        options: {
          curviness: 80
        }
      },
      overlays:[ 
        { type:"Arrow", options:{
          location:0.33,
          width: 10,
          length: 14

        }},
        { type:"Arrow", options:{
          location:0.66,
          width: 10,
          length: 14

        }},
        // { 
        //     type:"Label", 
        //     options:{
        //        label:"Connection 1", location:0.5, id:"myLabel" ,
        //        cssClass: "text-rose-500 p-2 bg-white rounded-md z-10"

        //     } 
        // }
        {
          type: "Custom",
          options: {
            create: (component: any) => {
              const d = document.createElement("div");
              d.innerHTML = "<span>This is a custom label</span>";
              d.className = " p-2 bg-white text-rose-500 rounded-md z-10 ";
              return d;
            },
            location: 0.5,
            id: "customOverlay1",
          }
        }
    ]
    })
    const cntc = this.instance.connect({
      source: ep2,
      target: ep3,
      connector: {
        type: StraightConnector.type,
        options: {
          curviness: 80
        }
      }
    })

    // adding touch functions to cntc
    // cntc.bind()

  }

}
