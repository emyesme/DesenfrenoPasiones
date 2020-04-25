#!flask/bin/python
from flask_cors import CORS, cross_origin
import os
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from os import system, getcwd
import subprocess

ALLOWED_EXTENSIONS = {'dzn'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/dzn', methods=['POST'])
@cross_origin()
def upload_file():
    result = "nada"
    target = os.path.join(getcwd(), 'upload') 
    dznfile = request.files['dznfile']
    filename = secure_filename(dznfile.filename)
    dznfile.save(os.path.join(target, 'temp.dzn'))
    command = "/home/esmeralda/Desktop/MiniZincIDE-2.3.2-bundle-linux-x86_64/MiniZincIDE-2.3.2-bundle-linux/bin/minizinc --solver Gecode /home/esmeralda/Desktop/DesenfrenoPasiones/minizinc/DesenfrenoDePasiones.mzn " + os.path.join(target, 'temp.dzn') + '>' + os.path.join(target, 'output.txt')
    result = subprocess.Popen(command, shell=True)
    f = open(os.path.join(target, 'output.txt'))
    result = f.read()
    return result

if __name__ == '__main__':
    app.run(debug=True)
