export interface IDireccionValidator {
    esDireccionValida(direccion: string): Promise<boolean>;
  }
  