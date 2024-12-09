from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import datetime

app = Flask(__name__)

# Database Initialization
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT,
            quantity INTEGER,
            price REAL,
            total REAL,
            sale_date TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Route: Home Page
@app.route("/")
def index():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(total) FROM sales")
    total_sales = cursor.fetchone()[0] or 0
    conn.close()
    return render_template("index.html", total_sales=total_sales)

# Route: Sales Page
@app.route("/sales", methods=["GET", "POST"])
def sales():
    if request.method == "POST":
        product_name = request.form["product_name"]
        quantity = int(request.form["quantity"])
        price = float(request.form["price"])
        total = quantity * price
        sale_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO sales (product_name, quantity, price, total, sale_date) VALUES (?, ?, ?, ?, ?)",
                       (product_name, quantity, price, total, sale_date))
        conn.commit()
        conn.close()
        return redirect(url_for("sales"))

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sales ORDER BY sale_date DESC")
    sales_records = cursor.fetchall()
    conn.close()
    return render_template("sales.html", sales_records=sales_records)

# Route: Purchase Page
@app.route("/purchase")
def purchase():
    return render_template("purchase.html")

# Route: Stock Page
@app.route("/stock")
def stock():
    return render_template("stock.html")

if __name__ == "__main__":
    app.run(debug=True)
