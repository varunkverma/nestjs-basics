import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(2050)
  @IsNumber()
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;
}
