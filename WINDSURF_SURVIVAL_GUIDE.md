# 🌊 Windsurf Survival Guide - Aurum Team 🚀

Este documento es una guía rápida para que todos los devs del equipo de **Aurum** podamos sacarle el máximo provecho a Windsurf (Cascade) sin quemar la cuota de mensajes gratuitos.

---

## 🛠️ 1. Configuración Inicial (Mandatorio)

Para que la IA no delire y entienda nuestro stack (**React 19, Vite 7, MUI 7, Node 20**), asegúrense de tener el archivo `.windsurfrules` en la raíz del proyecto. 

> **Tip:** Esto evita que la IA sugiera TypeScript (que no usamos en este repo) o versiones viejas de librerías.

---

## 💡 2. Hacks para Ahorrar Créditos (Cuota)

Si querés que tus mensajes duren toda la jornada, seguí estas reglas de oro:

### 🎯 El Quirófano (`@` Contexto)
**No le preguntes al aire.** Usá la tecla `@` para mencionar solo los archivos estrictamente necesarios.
* ❌ *Mal:* "Revisá por qué no funciona el login." (La IA lee todo el proyecto).
* ✅ *Bien:* `@authService.js @Login.jsx Cascade, revisá por qué el token no se guarda en el session." (La IA lee solo 2 archivos).

### 🤖 Modo "Inline" primero
Antes de abrir el chat (`Ctrl + L`), intentá escribir un comentario en tu código:
`// TODO: Función para formatear el saldo en ARS usando Intl.NumberFormat`
Dejá que el autocompletado gris haga el trabajo. **El autocompletado suele consumir menos cuota que el Chat.**

### 🕵️ MCP Fetch (La Verdad Oficial)
Tenemos habilitado el **MCP Fetch**. Si tenés una duda sobre **MUI 7** o **React 19**, no dejes que la IA adivine.
* *Uso:* "Usá fetch para leer la doc de `DataGrid` en mui.com y ayudame a optimizar las columnas."
* **Por qué:** Respuestas más cortas, precisas y sin errores al primer intento.

### 🧹 Limpieza Previa (Lint & Cypress)
No gastes mensajes preguntando "por qué falla". 
1. Corré `npm run lint`.
2. Pegale el error específico a Cascade.
Ahorrás tokens de "análisis general" y vas directo al grano.

---

## 🚀 3. Flujo de Trabajo Recomendado

1. **Planificar:** Escribí lo que vas a hacer en un comentario.
2. **Consultar:** Si es complejo, usá el chat con `@` archivos.
3. **Refactorizar:** Pedile cambios pequeños y específicos.

---
*Mantené este archivo actualizado si encontrás un nuevo truco. ¡A programar! 💸*