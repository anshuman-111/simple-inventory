from flask import Flask, request, redirect, render_template, session
from flask_mysqldb import MySQL
from datetime import datetime

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'inventory'
app.config['SECRET_KEY'] = 'secret'

sql = MySQL(app)

@app.route('/add_item', methods=['POST'])
def add():
    res = request.json
    session["data"] = res;
    print(res, "GOT IT")
    return res

@app.route('/delete' , methods=['POST'])
def delete():
    return "DELETE FEATURE"



@app.route('/home')
def home():
    return "DASHBOARD"

@app.route('/get_all')
def view():
    return [ session['data'],
    { 
    "itemID" : "XYZ111", 
    "itemName" : "XYZ", 
    "qty" : 500, 
    "purPrice" : 12,
    "purDate" : '2022-11-02',
    "sellPrice" : 12.5,
    "sellDate" : '2022-11-03'
    },
    { 
    "itemID" : "XYZ111", 
    "itemName" : "XYZ", 
    "qty" : 500, 
    "purPrice" : 12,
    "purDate" : '2022-11-02',
    "sellPrice" : 12.5,
    "sellDate" : '2022-11-03'
    },
     { 
    "itemID" : "XYZ111", 
    "itemName" : "XYZ", 
    "qty" : 500, 
    "purPrice" : 12,
    "purDate" : '2022-11-02',
    "sellPrice" : 12.5,
    "sellDate" : '2022-11-03'
    }]


if __name__ == "__main__":
    app.run(debug=True)