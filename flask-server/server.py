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
db.ping()
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
        INSERT INTO purchase(item_name,quantity,purchase_price,purchase_date,sale_date,selling_price,quantity_sold) 
        VALUES ('%s','%s', '%s', '%s', '%s', '%s', '%s') ''' % (res['item_name'],res['quantity'],res['purchase_price'],res['purchase_date'], res['sale_date'],res['selling_price'],res['quantity_sold'])
    cursor.execute(insert_query)
    db.commit()
    print(res)
    return "Added to DB"

# Delete Item route
@app.route('/del_item' , methods=['POST'])
def del_item():
    res = request.json
    cursor = db.cursor()
    db.ping()
    delete_query = ''' DELETE FROM purchase WHERE item_id='%s' AND item_name='%s' ''' % (res['item_id'], res['item_name'])
    cursor.execute(delete_query)
    db.commit()
    print(res)
    return "OK"

@app.route('/sell_item' , methods=["POST"])
def sale():
    res = request.json
    return res

@app.route('/edit_item', methods=["POST"])
def edit():
    res = request.json
    item_id_pop = res.pop('item_id')
    db.ping()
    cursor = db.cursor()
    for k,v in res.items():
        if v.isnumeric():
            edit_query = ''' UPDATE purchase
                    SET %s=%s
                    WHERE item_id=%s
            ''' % (k,v,item_id_pop)
            cursor.execute(edit_query)
        else:
            edit_query = ''' UPDATE purchase
                    SET %s='%s'
                    WHERE item_id=%s
            ''' % (k,v,item_id_pop)
            cursor.execute(edit_query)
    db.commit()
    return res

# Dashboard route
@app.route('/home')
def home():
    return "DASHBOARD"

# View Inventory route
@app.route('/get_all')
def view():
    cursor = db.cursor()
    db.ping()
    cursor.execute('SELECT * FROM purchase')
    data = cursor.fetchall()
    return json.dumps(data, sort_keys=True, default=str)



if __name__ == "__main__":
    app.run(debug=True)