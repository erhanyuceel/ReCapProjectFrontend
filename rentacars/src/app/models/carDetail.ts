export interface CarDetail{
    id:number;
    carName:string;
    brandName:string;
    brandId:number;
    colorName:string;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    descriptions:string;
    available?:boolean;
}