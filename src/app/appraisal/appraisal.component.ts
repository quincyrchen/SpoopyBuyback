import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../appraisal.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})

export class AppraisalComponent implements OnInit {
  evepraisal_link;
  buybackTax = 0.15;
  iskPerM3 = 350;
  haulingFeeMax = 0.25;

  totalSellToBuybackValue = 0;
  totalSellToBuybackPercent = 0;

  items = [];
  tradeHub;

  // Tax exempt items have no hauling fee
  // Tax exempt items are bought at Trade Hub Sell price
  exemptions = [
    4246, // Hydrogen Fuel Block
    4247, // Helium Fuel Block
    4051, // Nitrogen Fuel Block
    4312 // Oxygen Fuel Block
  ];

  constructor(private appraisalService : AppraisalService) { }

  ngOnInit() {
  }

  capitalizeFirstLetter(word: string): string {
    let firstChar = word.charAt(0);
    let restOfWord = word.slice(1);
    return firstChar.toUpperCase() + restOfWord;
  }

  executeAppraisal(): void {
    this.appraisalService.getAppraisal(this.evepraisal_link).subscribe(
      res => {  
        this.tradeHub = this.capitalizeFirstLetter(res["market_name"]);
        this.items = res['items'];
        this.calculateBuyback();
      },
      res => console.log(res)
    )
  }

  clearAppraisal(): void {
    this.evepraisal_link = "";
    this.totalSellToBuybackValue=0;
    this.totalSellToBuybackPercent=0;
    this.tradeHub = undefined;
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
      if (this.exemptions.includes(this.items[i]["typeID"])) {
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
      if (this.exemptions.includes(this.items[i]["typeID"])) {
        this.items[i].buybackTax = 0;
      } else {
        this.items[i].buybackTax = this.items[i].prices.buy.max * this.buybackTax;
      }
    }
  }

  calculateUnitPriceSellToBuyback(): void {
    for (let i in this.items) {
      if (this.exemptions.includes(this.items[i]["typeID"])) {
        this.items[i].unitPriceSellToBuyback = this.items[i].prices.sell.min;
      } else {
        this.items[i].unitPriceSellToBuyback = this.items[i].prices.buy.max - this.items[i].haulingFee - this.items[i].buybackTax;
      }
    }
  }

  calculateEffectiveRate(): void {
    for (let i in this.items) {
      if (this.exemptions.includes(this.items[i]["typeID"])) {
        this.items[i].effectiveRate = this.items[i].unitPriceSellToBuyback / this.items[i].prices.sell.min * 100;
      } else {
        this.items[i].effectiveRate = this.items[i].unitPriceSellToBuyback / this.items[i].prices.buy.max * 100;
      }
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
      if (this.exemptions.includes(this.items[i]["typeID"])) {
        untaxedValue += this.items[i].prices.sell.min * this.items[i].quantity;
      } else {
        untaxedValue += this.items[i].prices.buy.max * this.items[i].quantity;
      }
    }

    this.totalSellToBuybackPercent = this.totalSellToBuybackValue / untaxedValue * 100;
  }
}