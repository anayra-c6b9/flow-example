import { AfterViewInit, Component } from '@angular/core';
import { BezierConnector, DotEndpoint, newInstance } from '@jsplumb/browser-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'flow-builder';

  instance1: any;
  instance2: any

  constructor() {

  }

  ngAfterViewInit(): void {
    const flowContainer1: Element = document.getElementById("flow-container1")! as Element;
    const flowContainer2: Element = document.getElementById("flow-container2")! as Element;
    this.instance1 = newInstance({
      container: flowContainer1
    })
    this.instance2 = newInstance({
      container: flowContainer2
    })

    this.instance1.addEndpoint(flowContainer1, { endpoint: DotEndpoint.type, anchors: ["Top", "Bottom"] });
    this.instance2.addEndpoint(flowContainer2, { endpoint: DotEndpoint.type, anchors: ["Top", "Bottom"] });

    this.instance1.connect(this.instance2)
  }

}
