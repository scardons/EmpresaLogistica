// src/domain/repositories/IUsuarioRepository.ts

export interface IUsuarioRepository {
  crearUsuario(nombre: string, email: string, password: string, rol?: string): Promise<any>;
  obtenerUsuarioPorEmail(email: string): Promise<any>;
}
