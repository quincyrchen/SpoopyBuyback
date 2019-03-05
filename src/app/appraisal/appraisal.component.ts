import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../appraisal.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})

export class AppraisalComponent implements OnInit {
  additionalRaw;

  buybackpct = 0.90;
  iskperm3 = 700;

  output=0;
  totalfeepct=0;
  buyfrombuyback=0;
  buyfeepct=0;
  items = [];

  constructor(private appraisalService : AppraisalService) { }

  ngOnInit() {
  }

  executeAppraisal(): void {
    this.appraisalService.getAppraisal(this.additionalRaw).subscribe(
                    res=> {  this.output=res['totals']['buy']*this.buybackpct-res['totals']['volume']*this.iskperm3;
                             this.totalfeepct=100.0*this.output/res['totals']['buy'];
                             this.buyfrombuyback=res['totals']['buy']-res['totals']['volume']*this.iskperm3;
                             this.buyfeepct=100.0*this.buyfrombuyback/res['totals']['buy'];
                             this.items = res['items'];},
                    res=> console.log(res));
                           }

  clearAppraisal(): void {
    this.additionalRaw = "";
    this.output=0;
    this.totalfeepct=0;
  }  

}
