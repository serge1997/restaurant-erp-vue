
export interface UnitMeasure {
    label: "G" | "Ml" | "Un",
    sheet?: string
}
enum UnitContain {
    Un = 1,
    ML = 8,
    G = 1000,
}
export interface ProductCategoryProps {
    id: number,
    name: string,
    unit_measure: string | UnitMeasure
}

export class ProductCategory {
    constructor(
        private readonly props: ProductCategoryProps
    ){}

    static create(props: ProductCategoryProps): ProductCategory {
        return new ProductCategory({...props})
    }

    public isMl(): boolean{
        return (this.props.unit_measure as UnitMeasure).label == "Ml"
    }

    isUn(): boolean {
        return (this.props.unit_measure as UnitMeasure).label == "Un"
    }
    isGram(): boolean {
        return (this.props.unit_measure as UnitMeasure).label == "G"
    }

    getUnitContain(): number {
      const contains = {
       Ml: UnitContain.ML,
       Un: UnitContain.Un,
       G: UnitContain.G
      }
      const label = (this.props.unit_measure as UnitMeasure).label;
      return contains[label]
    }
}

export const unitMlMeasuresOptions = [
    {label: "5 cl (50ml)", value: 50},
    {label: "20 cl (200ml)", value: 200},
    {label: "37.5 cl (375ml)", value: 375},
    {label: "70 cl (700ml)", value: 700},
    {label: "75 cl (750ml)", value: 750},
    {label: "90 cl (900ml)", value: 900},
    {label: "1 L (1000ml)", value: 1000},
    {label: "1.5 L (1500ml)", value: 1500},
    {label: "1.75 L (1750ml)", value: 1750},
    {label: "2 L (2000ml)", value: 2000},
    {label: "3 L (3000ml)", value: 3000},
    {label: "6 L (6000ml)", value: 6000},
]
export const unitGramMeasuresOptions = [
    {label: "100 g", value: 100},
    {label: "150 g", value: 150},
    {label: "200 g", value: 200},
    {label: "300 g", value: 300},
    {label: "400 g", value: 400},
    {label: "500 g", value: 500},
    {label: "600 g", value: 600},
    {label: "1 kg (1000 g)", value: 1000},
    {label: "1.5 kg (1500 g)", value: 1500},
    {label: "2 kg (2000 g)", value: 2000},
    {label: "3 kg (3000g)", value: 3000}
]