import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClasificadorService } from '../../services/clasificador.service';  // Asegúrate de que el servicio esté importado
import { CalendarsService } from '../../services/calendars.service';  // Importa el servicio para los calendarios
import { Calendar, Classification } from '../../models/clasificador.model'; // Usa los modelos adecuados
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-clasificador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calendar-clasificador.component.html',
  styleUrls: ['./calendar-clasificador.component.css']
})
export class ClasificadorComponent {
  clasificadorService = inject(ClasificadorService);
  calendarsService = inject(CalendarsService);  // Inyecta el servicio de calendarios
  calendarForm: FormGroup;
  calendars: Calendar[] = [];
  filteredCalendars: Calendar[] = [];
  classification: Classification | null = null;

  constructor(private fb: FormBuilder) {
    this.calendarForm = this.fb.group({
      filter: ['']
    });
  }

  ngOnInit() {
    // Obtener los calendarios desde el servicio CalendarsService
    this.calendarsService.getCalendars('userId').subscribe((data) => {
      this.calendars = data.calendars; // Asegúrate de que la respuesta tenga la propiedad 'calendars'
      this.filteredCalendars = this.calendars;
    });

    // Filtrar los calendarios cuando cambie el filtro
    this.calendarForm.get('filter')?.valueChanges.subscribe(value => {
      this.filterCalendars(value);
    });

    // Obtener la clasificación más reciente si está disponible
    this.clasificadorService.getLatestClassification().subscribe((data: Classification) => {
      this.classification = data;
    });
  }

  filterCalendars(filter: string) {
    this.filteredCalendars = this.calendars.filter(calendar =>
      calendar.calendarName.toLowerCase().includes(filter.toLowerCase())
    );
  }

  classifyCalendars() {
    // Llamar a la función classifyCalendars del servicio para clasificar los calendarios
    this.clasificadorService.classifyCalendars().subscribe((response: { message: string }) => {
      // Manejar la respuesta del mensaje, si es necesario
      console.log(response.message);
    });
  }
  
}
