export class Cuidado {
  id: number;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  medico: number;
  actividades: Array<Actividad>;
  anotaciones: Array<Anotacion>;
}

export class Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  periocidad: string;
  tipo: string;
}

export class Anotacion {
  texto: string;
  fecha: string;
  persona: string;
}
