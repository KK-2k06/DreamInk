from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlitecloud
import bcrypt

app = Flask(__name__)
CORS(app)

SQLITE_CLOUD_URL = "sqlitecloud://cas86lwkvk.g3.sqlite.cloud:8860/my-database?apikey=DtB8frekkqMtjHjiAwCmuxKrbvyroQSwEWYOGyQu1RE"

def get_db_connection():
    return sqlitecloud.connect(SQLITE_CLOUD_URL)

def ensure_schema():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.close()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    
    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    email = email.lower()
    conn = get_db_connection()
    
    cursor = conn.execute('SELECT id FROM users WHERE email = ?', (email,))
    existing = cursor.fetchone()
    
    if existing:
        conn.close()
        return jsonify({'error': 'Account already exists'}), 409
    
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    conn.execute(
        'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
        (first_name, last_name, email, password_hash)
    )
    conn.close()
    
    return jsonify({
        'firstName': first_name,
        'lastName': last_name,
        'email': email
    }), 201

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Missing credentials'}), 400
    
    email = email.lower()
    conn = get_db_connection()
    
    cursor = conn.execute(
        'SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = ?',
        (email,)
    )
    user = cursor.fetchone()
    conn.close()
    
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    if not bcrypt.checkpw(password.encode('utf-8'), user[4].encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    return jsonify({
        'id': user[0],
        'firstName': user[1],
        'lastName': user[2],
        'email': user[3]
    })

if __name__ == '__main__':
    ensure_schema()
    app.run(host='0.0.0.0', port=3001, debug=True)
