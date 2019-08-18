export class TourFilters {
  readonly location: string;
  readonly priceMin: number;
  readonly priceMax: number;
  constructor(data: any) {
    this.location = data.location;
    this.priceMin = data.priceMin;
    this.priceMax = data.priceMax;
  }
  asObject() {
    const filter: any = {};
    if (this.location) filter.location = this.location;
    filter.price = {
      $lte: this.priceMax || 1000000,
      $gte: this.priceMin || 0
    }
    return filter;
  }
