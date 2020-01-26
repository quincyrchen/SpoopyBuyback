import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../appraisal.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})

export class AppraisalComponent implements OnInit {
  evepraisal_link;
  buybackpct = 0.85;
  iskperm3 = 350;
  volumepctmax = 0.25;

  output=0;
  totalfeepct=0;
  buyfrombuyback=0;
  buyfeepct=0;
  items = [];
  math = Math;

  constructor(private appraisalService : AppraisalService) { }

  ngOnInit() {
  }

  executeAppraisal(): void {
    this.appraisalService.getAppraisal(this.evepraisal_link).subscribe(
                    res=> {  this.output=res['totals']['buy']*this.buybackpct-Math.min(res['totals']['volume']*this.iskperm3, this.volumepctmax*res['totals']['buy']);
                             this.totalfeepct=100.0*this.output/res['totals']['buy'];
                             this.buyfrombuyback=res['totals']['buy']-Math.min(res['totals']['volume']*this.iskperm3, this.volumepctmax*res['totals']['buy']);
                             this.buyfeepct=100.0*this.buyfrombuyback/res['totals']['buy'];
                             this.items = res['items'];},
                    res=> console.log(res));
                           }

  clearAppraisal(): void {
    this.evepraisal_link = "";
    this.output=0;
    this.totalfeepct=0;
  }  

}