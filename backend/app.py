from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuración de la conexión a MySQL
def obtener_conexion():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="huellitas_saludables"
    )

@app.route('/')
def inicio():
    return jsonify({"mensaje": "¡Servidor de Huellitas Saludables activo!"})

# ==========================================
# RUTAS PARA PROPIETARIOS
# ==========================================

# 1. Guardar un propietario (POST)
@app.route('/api/propietarios', methods=['POST'])
def registrar_propietario():
    datos = request.json
    cedula = datos.get('cedula')
    nombre = datos.get('nombre_completo')
    telefono = datos.get('telefono')
    direccion = datos.get('direccion')
    
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        query = "INSERT INTO Propietarios (cedula, nombre_completo, telefono, direccion) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (cedula, nombre, telefono, direccion))
        conexion.commit()
        cursor.close()
        conexion.close()
        return jsonify({"mensaje": "Propietario registrado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Obtener todos los propietarios (GET)
@app.route('/api/propietarios', methods=['GET'])
def obtener_propietarios():
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Propietarios")
        propietarios = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(propietarios), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# RUTAS PARA MASCOTAS
# ==========================================

# 1. Guardar una mascota (POST)
@app.route('/api/mascotas', methods=['POST'])
def registrar_mascota():
    datos = request.json
    nombre = datos.get('nombre')
    especie = datos.get('especie')
    raza = datos.get('raza')
    edad = datos.get('edad')
    cedula_propietario = datos.get('cedula_propietario')
    
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        query = """INSERT INTO Mascotas (nombre, especie, raza, edad, cedula_propietario) 
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (nombre, especie, raza, edad, cedula_propietario))
        conexion.commit()
        cursor.close()
        conexion.close()
        return jsonify({"mensaje": "Mascota registrada con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Obtener todas las mascotas (GET)
@app.route('/api/mascotas', methods=['GET'])
def obtener_mascotas():
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Mascotas")
        mascotas = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(mascotas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ==========================================
# RUTAS PARA CITAS
# ==========================================

# 1. Reservar una cita (POST)
@app.route('/api/citas', methods=['POST'])
def registrar_cita():
    datos = request.json
    id_mascota = datos.get('id_mascota')
    fecha = datos.get('fecha')
    hora = datos.get('hora')
    motivo = datos.get('motivo')
    
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        query = """INSERT INTO citas (id_mascota, fecha, hora, motivo) 
                   VALUES (%s, %s, %s, %s)"""
        cursor.execute(query, (id_mascota, fecha, hora, motivo))
        conexion.commit()
        cursor.close()
        conexion.close()
        return jsonify({"mensaje": "Cita agendada con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Obtener todas las citas (GET)
@app.route('/api/citas', methods=['GET'])
def obtener_citas():
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM citas")
        citas = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(citas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   # ==========================================
# RUTAS PARA DIAGNÓSTICOS (CORREGIDO)
# ==========================================

# 1. Registrar un diagnóstico (POST)
@app.route('/api/diagnosticos', methods=['POST'])
def registrar_diagnostico():
    datos = request.json
    id_mascota = datos.get('id_mascota')
    descripcion = datos.get('descripcion')  # Viene del frontend
    receta = datos.get('receta')            # Viene del frontend
    
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        
        # Usamos los nombres exactos de tus columnas en phpMyAdmin
        query = """INSERT INTO diagnosticos (id_mascota, descripcion_sintomas, diagnostico, tratamiento_recetado) 
                   VALUES (%s, %s, %s, %s)"""
        
        # Mapeamos los datos: usamos 'descripcion' para ambas columnas de texto o lo distribuimos
        cursor.execute(query, (id_mascota, descripcion, descripcion, receta))
        
        conexion.commit()
        cursor.close()
        conexion.close()
        return jsonify({"mensaje": "Diagnóstico registrado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Obtener todos los diagnósticos (GET)
@app.route('/api/diagnosticos', methods=['GET'])
def obtener_diagnosticos():
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM diagnosticos")
        diagnosticos = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(diagnosticos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ==========================================
# RUTA PARA HISTORIAL CLÍNICO CONFIDENCIAL (FILTRADO)
# ==========================================

@app.route('/api/historial', methods=['GET'])
def obtener_historial_confidencial():
    # Recibimos la cédula del dueño desde la web
    cedula = request.args.get('cedula')
    
    if not cedula:
        return jsonify({"error": "Se requiere la cédula del propietario"}), 400
        
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        
        # Filtramos usando un JOIN para validar que la mascota pertenezca a esa cédula
        query = """
            SELECT h.id_diagnostico, m.nombre AS mascota, m.especie,
                   h.descripcion_sintomas, h.diagnostico, h.tratamiento_recetado, h.fecha_atencion
            FROM diagnosticos h
            INNER JOIN mascotas m ON h.id_mascota = m.id_mascota
            WHERE m.cedula_propietario = %s
            ORDER BY h.id_diagnostico DESC
        """
        cursor.execute(query, (cedula,))
        historial = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(historial), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # ==========================================
# OBTENER MASCOTAS POR CÉDULA (PARA DESPLEGABLES)
# ==========================================

@app.route('/api/mascotas-por-cedula', methods=['GET'])
def mascotas_por_cedula():
    cedula = request.args.get('cedula')
    if not cedula:
        return jsonify([]), 200
        
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        # Traemos solo el id y el nombre para el select
        query = "SELECT id_mascota, nombre FROM mascotas WHERE cedula_propietario = %s"
        cursor.execute(query, (cedula,))
        mascotas = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(mascotas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)