export interface Rental{
    carId:number;
    carName?:string;
    rentalId?:number;
    brandName?:string;
    companyName?:string;
    rentDate:Date;
    returnDate?:Date;
    customerName?:string;
    customerId:number;
    colorName:string;
    dailyPrice:number;
    totalPrice:number;
}