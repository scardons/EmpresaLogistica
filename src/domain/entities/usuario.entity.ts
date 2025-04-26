//src/domain/entities/usuario.entity.ts
export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol?: string;
  }
  