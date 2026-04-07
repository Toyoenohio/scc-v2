# SCC V2 - Sistema de Control de Comisiones

Aplicación web progresiva (PWA) para la gestión de comisiones de ventas. Desarrollada con HTML vanilla, Tailwind CSS y backend WordPress con JetEngine CCT.

## Características

- **Autenticación JWT**: Login seguro con tokens
- **Dashboard**: Visualización de balance y solicitudes
- **Solicitud de comisiones**: Formulario para registrar nuevas comisiones
- **Gestión de comisiones (Admin)**: Panel administrativo para aprobar pagos
- **Responsive**: Diseño mobile-first con navegación sticky

## Stack Tecnológico

- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS
- **Backend**: WordPress + JetEngine CCT
- **Autenticación**: JWT Auth for WordPress
- **API**: WordPress REST API + JetEngine REST API

## Estructura del Proyecto

```
scc-v2/
├── index.html          # Aplicación principal (single-file)
└── README.md           # Documentación
```

## Flujo de Datos

### Custom Content Type: comisiones_dec

| Campo | Tipo | Descripción |
|-------|------|-------------|
| usuario | Text | Usuario que crea la comisión |
| comision | Select | Tipo (Zelle, Bolívares, Efectivo, etc.) |
| monto | Number | Monto en negativo (cargo) |
| monto_comision | Number | Monto duplicado para display |
| fecha | Date | Fecha de la transacción |
| observaciones | Textarea | Detalles adicionales |
| tarea | Text | Siempre "Pago de comisión" |
| grupo | Text | Igual al tipo de comisión |
| cantidad | Number | Siempre 1 |
| cct_status | Status | draft / published |

## Vistas

1. **Login** (`#login-view`): Autenticación de usuarios
2. **Dashboard** (`#dashboard-view`): Balance y listado de comisiones
3. **Solicitud** (`#solicitud-view`): Formulario nueva comisión
4. **Admin Comisiones** (`#admin-comisiones-view`): Solo admins - aprobación de pagos

## Roles

- **Usuario normal**: Ve dashboard, puede crear solicitudes
- **Administrador**: Acceso a menú inferior con sección "Comisiones" para aprobar pagos

## API Endpoints

```
POST   /wp-json/jwt-auth/v1/token           # Login
GET    /wp-json/wp/v2/users/me              # Datos del usuario
GET    /wp-json/jet-cct/comisiones_dec      # Listar comisiones
POST   /wp-json/jet-cct/comisiones_dec      # Crear comisión
PUT    /wp-json/jet-cct/comisiones_dec/{id} # Actualizar estado
```

## Variables de Entorno / Configuración

La URL base de la API está hardcodeada: `https://scc.ciwok.com/wp-json/`

## Uso

1. Abrir `index.html` en un servidor web o desplegar en hosting estático
2. Iniciar sesión con credenciales de WordPress
3. Crear solicitudes desde el dashboard
4. Los admins pueden aprobar desde el menú "Comisiones"

## Despliegue

Cambios cosméticos (CSS, textos) → directo a producción.
Cambios de arquitectura → aprobación de Wilmer primero.

## Autor

Desarrollado por Arianna Ignacia (Ari) para Wilmer Toyo.
