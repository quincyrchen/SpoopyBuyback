import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../appraisal.service';
import { TaxExemptionService } from '../tax-exemption.service';
import { HaulingExemptionService } from '../hauling-exemption.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})

export class AppraisalComponent implements OnInit {
  evepraisal_link;
  buybackTax = 0.15;
  iskPerM3 = 385;
  haulingFeeMax = 0.25;
  totalSellToBuybackValue = 0;
  totalSellToBuybackPercent = 0;
  items = [];
  taxExemptions = [];
  haulingExemptions = [];
  tradeHub;

  constructor(
    private appraisalService : AppraisalService,
    private taxExemptionService: TaxExemptionService,
    private haulingExemptionService: HaulingExemptionService
    ) { }

  ngOnInit() {
    // This is currently instant. If we get a database and no longer have to hard-code
    // this, then we should properly call this and ensure it completes prior to user
    // executing an appraisal.
    this.taxExemptions = this.taxExemptionService.getExemptions();
    this.haulingExemptions = this.haulingExemptionService.getExemptions();
  }

  capitalizeFirstLetter(word: string): string {
    let firstChar = word.charAt(0);
    let restOfWord = word.slice(1);
    return firstChar.toUpperCase() + restOfWord;
  }

  executeAppraisal(): void {
    this.items = [];
    this.appraisalService.getAppraisal(this.formatEvepraisalLink(this.evepraisal_link)).subscribe(
      res => {  
        this.tradeHub = this.capitalizeFirstLetter(res["market_name"]);
        this.items = res['items'];
        this.calculateBuyback();
        // Uncomment this to view evepraisal payload in console
        // console.log(res);
      },
      res => console.log(res)
    )
  }

  // Reformats http link to https
  formatEvepraisalLink(link: string): string {
    let pattern = "(http:\/\/)(.+)";
    let re = new RegExp(pattern);
    let matches = re.exec(link);
    if (matches == null) {
      // If it doesn't match our http pattern, just return it
      // TODO: Add a visible warning to the user if it doesn't match http or https
      return link;
    }
    // If it matches our http pattern, change it to https
    return "https://" + matches[2];
  }

  clearAppraisal(): void {
    this.evepraisal_link = "";
    this.totalSellToBuybackValue=0;
    this.totalSellToBuybackPercent=0;
    this.tradeHub = undefined;
    this.items = [];
  }

  calculateBuyback(): void {
    this.calculateHaulingFee();
    this.calculateBuybackTax();
    this.calculateUnitPriceSellToBuyback();
    this.calculateEffectiveRate();
    this.calculateTotalSellToBuybackValue();
    this.calculateTotalSellToBuybackPercent();
  }

  calculateHaulingFee(): void {
    for (let i in this.items) {
      // Tax exempt items have no hauling fee
      if (this.taxExemptions.includes(this.items[i]["typeID"]) || this.haulingExemptions.includes(this.items[i]["typeID"])) {
        this.items[i].haulingFee = 0;
      } else {
        this.items[i].haulingFee = 
        Math.min(this.items[i].typeVolume*this.iskPerM3, 
        this.items[i].prices.buy.max*this.haulingFeeMax);
      }
    }
  }

  calculateBuybackTax(): void {
    for (let i in this.items) {
      if (this.taxExemptions.includes(this.items[i]["typeID"])) {
        this.items[i].buybackTax = 0;
      } else {
        this.items[i].buybackTax = this.items[i].prices.buy.max * this.buybackTax;
      }
    }
  }

  calculateUnitPriceSellToBuyback(): void {
    for (let i in this.items) {
      if (this.taxExemptions.includes(this.items[i]["typeID"])) {
        this.items[i].unitPriceSellToBuyback = this.items[i].prices.buy.max;
      } else {
        this.items[i].unitPriceSellToBuyback = this.items[i].prices.buy.max - this.items[i].haulingFee - this.items[i].buybackTax;
      }
    }
  }

  calculateEffectiveRate(): void {
    for (let i in this.items) {
      this.items[i].effectiveRate = this.items[i].unitPriceSellToBuyback / this.items[i].prices.buy.max * 100;
    }
  }

  calculateTotalSellToBuybackValue(): void {
    let totalValue = 0;
    for (let i in this.items) {
      totalValue += this.items[i].unitPriceSellToBuyback * this.items[i].quantity;
    }

    this.totalSellToBuybackValue = totalValue;
  }

  calculateTotalSellToBuybackPercent(): void {
    let untaxedValue = 0;
    for (let i in this.items) {
      untaxedValue += this.items[i].prices.buy.max * this.items[i].quantity;
    }

    this.totalSellToBuybackPercent = this.totalSellToBuybackValue / untaxedValue * 100;
  }
}