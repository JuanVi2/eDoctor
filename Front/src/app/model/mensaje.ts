export class Mensaje {
  id: number;
  tipo: number;     // 0 -> enviado / 1 -> Recibido / 2-> Borrador
  persona: number;  // 0 -> medico / 1 -> paciente
  asunto: string;
  remitente: string;
  texto: string;
  fecha: string;
}
