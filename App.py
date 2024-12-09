from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Route for Home Page
@app.route("/")
def index():
    return render_template("index.html")

# Route for Sales Page
@app.route("/sales", methods=["GET", "POST"])
def sales():
    if request.method == "POST":
        # Handle sale form submission
        product_name = request.form.get("product_name")
        quantity = request.form.get("quantity")
        price = request.form.get("price")
        # Save data to DB (Logic to be added)
        return jsonify({"status": "success", "message": "Sale recorded"})
    return render_template("sales.html")

# Route for Purchase Page
@app.route("/purchase")
def purchase():
    return render_template("purchase.html")

# Route for Stock Page
@app.route("/stock")
def stock():
    return render_template("stock.html")

# Run the application
if __name__ == "__main__":
    app.run(debug=True)
