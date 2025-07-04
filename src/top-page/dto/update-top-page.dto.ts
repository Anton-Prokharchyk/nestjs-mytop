import { TopLevelCategory } from '../top-page.model';

export class UpdateTopPageDto {
  firstCategory?: TopLevelCategory;
  secondCategory?: string;
  title?: string;
  category?: string;
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages?: { title: string; description: string }[];
  seoText?: string;
  tagsTitle?: string;
  tags?: string[];
}
