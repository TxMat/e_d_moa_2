from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import os

app = Flask(__name__)

cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

password = "cacao"


@app.route("/new_dev", methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def new_dev():
    if ("date" in request.get_json().keys() and request.get_json()["password"] == password):
        pass
    else:
        return "pas ok"

    try:
        with open("save_devoirs.json", "r") as f:
            data = json.load(f)
            data.append(request.get_json())
            try:
                e = data[0]
            except:
                with open("save_devoirs.json", "w") as f:
                    json.dump([request.get_json()], f)

            i = len(data)-1
            data[i]["index"] = str(i)
            with open("save_devoirs.json", "w") as f:
                json.dump(data, f)

    except:
        dd = [request.get_json()]
        dd[0]["index"] = "0"
        with open("save_devoirs.json", "w") as f:
            json.dump(dd, f)
            return "ok"

    return 'ok'


@app.route("/get_devs", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_devs():
    try:
        with open("save_devoirs.json", "r") as f:
            data = json.load(f)
            return json.dumps(data)
    except:
        return json.dumps([])


@app.route("/del_dev", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def del_dev():
    if request.args["password"] != password:
        return "Mauvais password"
    data = []

    print("ooooooee")
    print(request.args)
    with open("save_devoirs.json", "r") as f:
        data = json.load(f)

    new_list = []
    for x in data:
        if str(x["index"]) != str(request.args["index"]):
            print("apped",  x["index"], request.args["index"])
            x["index"] = len(new_list)
            new_list.append(x)
        else:
            print("no apped",  x["index"], request.args["index"], "non")

    if len(new_list) > 0:
        with open("save_devoirs.json", "w") as f:
            json.dump(new_list, f)
    else:
        os.remove("save_devoirs.json")

    return "ok"


if __name__ == '__main__':
    app.run(port=5002, debug=True)
