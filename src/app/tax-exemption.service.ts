import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxExemptionService {

	// Tax exempt items have no hauling fee
  // Tax exempt items are bought at Trade Hub Sell price
  exemptions = [
    4246, // Hydrogen Fuel Block
    4247, // Helium Fuel Block
    4051, // Nitrogen Fuel Block
    4312, // Oxygen Fuel Block
    28437, // Compressed Gelidus
    28440, // Compressed Krystallos
    28435, // Compressed Dark Glitter
    16269, // Krystallos
    17976, // Pristine White Glaze
    16267, // Dark Glitter
    28439, // Compressed Glare Crust
    16264, // Blue Ice
    16268, // Gelidus
    16266, // Glare Crust
    28442, // Compressed Smooth Glacial Mass
    28436, // Compressed Enriched Clear Icicle
    28441, // Compressed Pristine White Glaze
    28438, // Compressed Glacial Mass
    28433, // Compressed Blue Ice
    28443, // Compressed Thick Blue Ice
    16265, // White Glaze
    16263, // Glacial Mass
    28434, // Compressed Clear Icicle
    28444, // Compressed White Glaze
    17977, // Smooth Glacial Mass
    16262, // Clear Icicle
    9848, // Robotics
    17975, // Thick Blue Ice
    44, // Enriched Uranium
    9832, // Coolant
    3689, // Mechanical Parts
    16275, // Strontium Clathrates
    16274, // Helium Isotopes
    17889, // Hydrogen Isotopes
    17888, // Nitrogen Isotopes
    17887, // Oxygen Isotopes
    3683, // Oxygen
    16273, // Liquid Ozone
    16272 // Heavy Water
  ];

  public getExemptions(): number[] {
  	return this.exemptions;
  }

  constructor() { }
}
