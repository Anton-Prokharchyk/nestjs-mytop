import { IsDefined, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsDefined()
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDefined()
  @IsString()
  productId: string;

  @IsString()
  title: string;
}
