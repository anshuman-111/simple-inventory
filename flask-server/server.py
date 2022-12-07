from flask import Flask, request, redirect, render_template, session
from datetime import datetime
import json
import pymysql
import os
from dotenv import load_dotenv

# Initializling ENV file
load_dotenv()

# initializing Flask App
app = Flask(__name__)

# Configuring app secret and DB instance
app.config['SECRET_KEY'] = 'secret'
host_name=os.getenv('AWSRDS_HOST')
pass_aws=os.getenv('AWSRDS_PASS')
user_aws=os.getenv('AWSRDS_USER')


# Connecting to AWS DB Instance
db = pymysql.connect(host='database-1.c5jdmaeqpbra.ap-southeast-2.rds.amazonaws.com', user='admin', password='root5337',cursorclass=pymysql.cursors.DictCursor)

# Initializing DB cursor
cursor = db.cursor()
cursor.execute('use inventory')
# Creating Purchase and Sales tables
cursor.execute('''CREATE TABLE IF NOT EXISTS purchase (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    quantity INT,
    purchase_price FLOAT(8,2),
    purchase_date DATE,
    PRIMARY KEY (item_id));
    ''')

cursor.execute('''CREATE TABLE IF NOT EXISTS sales (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    quantity_sold INT,
    selling_price FLOAT(8,2),
    sale_date DATE,
    PRIMARY KEY (item_id));
    ''')    
db.commit()

# Add Item route
''' ITEM DATA IS POSTED FROM FRONTEND AND STORED IN MySQL DB instance on AWS RDS '''
@app.route('/add_item', methods=['POST'])
def add():
    res = request.json
    cursor = db.cursor()

    #SQL Query to add data to DB
    insert_query = ''' 
        INSERT INTO purchase(item_name,quantity,purchase_price,purchase_date) VALUES ('%s','%s', '%s', '%s') ''' % (res['itemName'],res['qty'],res['purPrice'],res['purDate'])
    cursor.execute(insert_query)
    db.commit()
    return "Added to DB"

# Delete Item route
@app.route('/delete' , methods=['POST'])
def delete():
    return "DELETE FEATURE"


# Dashboard route
@app.route('/home')
def home():
    return "DASHBOARD"

# View Inventory route
@app.route('/get_all')
def view():
    cursor = db.cursor()
    cursor.execute('SELECT * FROM purchase')
    data = cursor.fetchall()
    return json.dumps(data, sort_keys=True, default=str)
if __name__ == "__main__":
    app.run(debug=True)