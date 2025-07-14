import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new HttpException('Bad id', 400);
    return value;
  }
}
