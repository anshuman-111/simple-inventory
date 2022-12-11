from flask import Flask, request, redirect, render_template, session
from datetime import datetime
import json
import pymysql
from pymysqlpool.pool import Pool
import os
from dotenv import load_dotenv

# PyMySQL raises packet sequence error because it operates on a single thread.
# Creating a connection pool

pool = Pool(host='database-1.c5jdmaeqpbra.ap-southeast-2.rds.amazonaws.com',port=3306, user='admin',password='root5337',db='inventory', autocommit=True)
pool.init()
conn1 = pool.get_conn()


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
""" 
db = pymysql.connect(host='database-1.c5jdmaeqpbra.ap-southeast-2.rds.amazonaws.com', user='admin', password='root5337',cursorclass=pymysql.cursors.DictCursor) """
# Initializing DB cursor
cursor = conn1.cursor()

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


# Add Item route
''' ITEM DATA IS POSTED FROM FRONTEND AND STORED IN MySQL DB instance on AWS RDS '''
@app.route('/add_item', methods=['POST'])
def add():
    res = request.json
    db = pool.get_conn()
    cursor = db.cursor()
    #SQL Query to add data to DB
    insert_query = ''' 
        INSERT INTO purchase(item_name,quantity,purchase_price,purchase_date,sale_date,selling_price,quantity_sold) 
        VALUES ('%s','%s', '%s', '%s', '%s', '%s', '%s') ''' % (res['item_name'],res['quantity'],res['purchase_price'],res['purchase_date'], res['sale_date'],res['selling_price'],res['quantity_sold'])
    
    cursor.execute(insert_query)
    pool.release(db)
    print(res)
    return "Added to DB"

# Delete Item route
@app.route('/del_item' , methods=['POST'])
def del_item():
    res = request.json
    db = pool.get_conn()
    cursor = db.cursor()
    delete_query = ''' DELETE FROM purchase WHERE item_id='%s' AND item_name='%s' ''' % (res['item_id'], res['item_name'])
    
    cursor.execute(delete_query)
    pool.release(db)
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
    db = pool.get_conn()
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
    pool.release(db)
    return res

# Dashboard route
@app.route('/home')
def home():
    return "DASHBOARD"

# View Inventory route
@app.route('/get_all')
def view():
    db = pool.get_conn()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM purchase')
    
    data = cursor.fetchall()
    pool.release(db)
    return json.dumps(data, sort_keys=True, default=str)

@app.route('/stats')
def stats():
    db = pool.get_conn()
    cursor = db.cursor()
   
    data =[]
    
    cursor.execute('SELECT SUM(selling_price) as revenue FROM purchase')

    data.append(cursor.fetchone())
    
    cursor.execute('''
    SELECT SUM(purchase_price*(quantity-quantity_sold)) as total_value 
    FROM purchase''')

    data[0]['total_value'] = (cursor.fetchone()['total_value'])
    pool.release(db)

    return data

@app.route('/stats_charts')
def charts():
    db = pool.get_conn()
    cursor = db.cursor()
    cursor.execute(''' 
        SELECT item_name, SUM(quantity-quantity_sold) as qty_avail
        FROM purchase
        GROUP BY item_name;
    ''')
    bardata = cursor.fetchall()

    cursor.execute( ''' 
    SELECT date_format(sale_date, '%M') as month, 
    SUM(selling_price) AS sales 
    FROM purchase 
    GROUP BY month 
    ORDER BY month(sale_date)''')

    linedata = cursor.fetchall()
    pool.release(db)
   
    return [bardata, linedata]




if __name__ == "__main__":
    app.run(debug=True)