from flask import Flask
from flask import render_template, Response, jsonify, request
from semant import Semantix 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
a = None # variable globale de la classe sémantix


@app.route("/", methods=["GET", "POST"])
def index():
    global a
    if request.form:
        mot = "test" if request.form["mot"] == "" else request.form["mot"]
        a = Semantix(mot)
        if a.word_in_vocab() == False:
            return render_template("index.html", mess="Le mot n'est pas répertorié")
        a.run() # processing
        return render_template("devine.html", var=a.vocab, var2=a.mot)
    else:
        return render_template("index.html")


@app.route("/devine", methods=["GET", "POST"])
def devine():
    dico = request.get_json(silent=True)
    res = a.pct(dico['mot'])
    if "liste" in dico.keys():
        scores = dico["liste"]
        if not dico["mot"] in scores.keys():
            scores[dico["mot"]] = res 
    else:
        scores = {
            dico["mot"] : int(res)
        }
    return jsonify(scores)

if __name__ == "__main__":
    app.run(port=6234, debug=True)
