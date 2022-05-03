/* alert entity */
export interface Alert {
  id: string | null;
  type: string;
  priority: string;
  message: string;
  date: Date;
}
