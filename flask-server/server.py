from pathlib import Path
from flask import Flask, request, redirect, render_template, session
from datetime import datetime
import json
import pymysql
from pymysqlpool.pool import Pool
import os
from dotenv import load_dotenv

# PyMySQL raises packet sequence error because it operates on a single thread.
# Creating a connection pool
dotenv_path = Path('/Users/anshumangupta/Desktop/simple-inventory/flask-server/cred.env')
load_dotenv(dotenv_path=dotenv_path)
host = os.getenv('AWSRDS_HOST')
password = os.getenv('AWSRDS_PASS')
port = os.getenv('AWSRDS_PORT')
user = os.getenv('AWSRDS_USER')
db = os.getenv('AWSRDS_DB')
print(host,db)
# Connecting to AWS DB Instance
pool = Pool(host=host,port=3306, user=user,password=password,db=db, autocommit=True)

pool.init()
conn1 = pool.get_conn()


# Initializling ENV file


# initializing Flask App
app = Flask(__name__)

# Configuring app secret and DB instance
app.config['SECRET_KEY'] = 'secret'
host_name=os.getenv('AWSRDS_HOST')
pass_aws=os.getenv('AWSRDS_PASS')
user_aws=os.getenv('AWSRDS_USER')

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

pool.release(conn1)
# Add Item route

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

# Edit Item route
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

# View Inventory route
@app.route('/get_all')
def view():
    db = pool.get_conn()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM purchase')
    
    data = cursor.fetchall()
    pool.release(db)
    return json.dumps(data, sort_keys=True, default=str)

# Route for stats bar
@app.route('/stats')
def stats():
    db = pool.get_conn()
    cursor = db.cursor()
   
    data =[{}]
    
    # Get total revenue for inventory
    cursor.execute('SELECT SUM(selling_price*quantity_sold) as revenue FROM purchase')
    data[0]['revenue'] = '{:,}'.format(cursor.fetchone()['revenue'])
    data[0]['revenue'] = data[0]['revenue'][:-2]

    # Get total value of current inventory
    cursor.execute('''
    SELECT SUM(purchase_price*(quantity-quantity_sold)) as total_value 
    FROM purchase''')

    data[0]['total_value'] = '{:,}'.format((cursor.fetchone()['total_value']))
    data[0]['total_value'] = data[0]['total_value'][:-2]

    # Get net profit
    cursor.execute('''
    SELECT (SUM(selling_price*quantity_sold) - SUM(purchase_price*quantity_sold)) as profit FROM purchase
    ''')
    data[0]['profit'] = '{:,}'.format(cursor.fetchone()['profit'])
    data[0]['profit'] = data[0]['profit'][:-2]

    # get average number of days for an item in inventory
    cursor.execute('''
    SELECT AVG(DATEDIFF(sale_date,purchase_date)) as inv_days FROM purchase
    ''')
    data[0]['inv_days'] = cursor.fetchone()['inv_days']

    cursor.execute('''
        SELECT item_name FROM purchase ORDER BY quantity_sold DESC LIMIT 3;
    ''')
    data[0]['top_seller'] = cursor.fetchall()
    


    pool.release(db)
    return data

# Route for charts
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

    cursor.execute('''

        SELECT date_format(sale_date, '%M') AS month, 
        SUM(selling_price*quantity_sold) AS sales
        FROM purchase 
        GROUP BY month
        ORDER BY month(sale_date);
    ''')
    bar_2_data = cursor.fetchall()

    cursor.execute(''' 
        SELECT date_format(sale_date, '%M') AS month, 
        SUM((selling_price - purchase_price)*quantity_sold) AS profit 
        FROM purchase 
        GROUP BY month 
        ORDER BY month(sale_date)
    ''')
    linedata = cursor.fetchall()

    cursor.execute('''
    SELECT SUM((selling_price - purchase_price)*quantity_sold) as profit FROM purchase
    ''')
    result = cursor.fetchone()
    profit = result['profit']
    doughdata_query = '''
        SELECT item_name, 
        SUM((selling_price-purchase_price)*quantity_sold*100) / %s as perc  
        FROM purchase 
        WHERE selling_price-purchase_price > 0 
        GROUP BY item_name 
        ORDER BY (selling_price-purchase_price) DESC LIMIT 5;
    ''' % (profit)
    cursor.execute(doughdata_query)
    doughdata = cursor.fetchall()


    pool.release(db)
    print(doughdata)
    print(profit)
    return [bardata, bar_2_data, linedata, doughdata]




if __name__ == "__main__":
    app.run(debug=True)