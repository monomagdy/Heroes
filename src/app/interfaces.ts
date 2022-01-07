export interface Icountry {
    Name: String,
    Alpha2Code: String,
    Alpha3Code: String,
    NativeName: String,
    Region: String,
    SubRegion: String,
    Latitude: Number,
    Longitude: Number,
    Area: Number,
    NumericCode: Number,
    NativeLanguage: String,
    CurrencyCode: String,
    CurrencyName: String,
    CurrencySymbol: String,
    Flag: String,
    FlagPng: String,
}
export interface IResponseModel {
    count: number;
    message: string;
    IsSuccess: boolean;
    data:any;
    Response: object[];
  }
  export interface ITable {
    name: string;
    phone:string;
    email: string;
    date:Date;
    country:string;
    company:string;
  }