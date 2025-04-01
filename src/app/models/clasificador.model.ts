export interface Calendar {
  _id: string;
  calendarName: string;
  appointments: any[];
}

export interface Classification {
  date: string;
  classifiedCalendars: {
    [key: string]: string[]; // Ejemplo: { "category1": ["calendar1", "calendar2"], "category2": ["calendar3"] }
  };
}