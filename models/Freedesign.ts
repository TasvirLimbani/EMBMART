export interface FreedesignItem {
  [x: string]: any;
  id: number;
  name: string;
  designcode: string;
  stitches: number;
  area: string;
  needle: number;
  height: string;
  width: string;
  formats: string;
  category: string;
  detail: string;
  freedesign: number;
  created_at: string;
  updated_at: string;
  price: string;
  design_file: string;
  image: string;
  images: [string];
}

export interface FreedesignResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: FreedesignItem[];
}
