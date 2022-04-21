import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(2050)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
