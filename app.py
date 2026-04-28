from flask import Flask, request, jsonify
import os
import psycopg2

app = Flask(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db():
    return psycopg2.connect(DATABASE_URL)

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM items;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/data', methods=['POST'])
def add_data():
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO items (name) VALUES (%s);", (data['name'],))
    conn.commit()
    cur.close()
    conn.close()
    return {"status": "ok"}

@app.route('/api/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM items WHERE id=%s;", (id,))
    conn.commit()
    cur.close()
    conn.close()
    return {"status": "deleted"}
