import os
import pymongo
import json

def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["clothr"]


    col = db.products

    maxid = 1

    for x in col.find():
        maxid = maxid+1


    action =  request_json['action']

    if action == "getall":

        products = []

        for x in col.find():
            p = {}
            p['id'] = x['id']
            p['Name'] = x['Name']
            p['Description'] = x['Description']
            p['Manufacturer'] = x['Manufacturer']
            p['planet'] = x['planet']
            p['people'] = x['people']
            p['animal'] = x['animal']
            p['overall'] = x['overall']
            p['img'] = x['img']
            p['link'] = x['Link']

            products.append(p)
        
        retjson = {}

        retjson['products'] = products
        retjson['action'] = action
        
        retjson['mongoresult'] = str(maxid)

        return json.dumps(retjson)


    if action == "getone":

        products = []
        id = request_json['id']

        for x in col.find():
            if x['id'] != id:
              continue
            p = {}
            p['id'] = x['id']
            p['Name'] = x['Name']
            p['Description'] = x['Description']
            p['Manufacturer'] = x['Manufacturer']
            p['planet'] = x['planet']
            p['people'] = x['people']
            p['animal'] = x['animal']
            p['overall'] = x['overall']
            p['img'] = x['img']
            p['link'] = x['Link']

            products.append(p)
        
        retjson = {}

        retjson['products'] = products
        retjson['action'] = action
        
        retjson['mongoresult'] = str(maxid)

        return json.dumps(retjson)

      

    if action == "search":

        products = []
        terms = request_json['searchterms']
        terms = terms.lower()

        for x in col.find():
            match = 0
            desc = x['Description']
            desc = desc.lower()
            for t in terms.split():
              if t in desc:
                match = 1
            
            if match == 0:
              continue
            p = {}
            p['id'] = x['id']
            p['Name'] = x['Name']
            p['Description'] = x['Description']
            p['Manufacturer'] = x['Manufacturer']
            p['planet'] = x['planet']
            p['people'] = x['people']
            p['animal'] = x['animal']
            p['overall'] = x['overall']
            p['img'] = x['img']
            p['link'] = x['Link']

            products.append(p)
        
        retjson = {}

        retjson['products'] = products
        retjson['action'] = action
        
        retjson['mongoresult'] = str(maxid)

        return json.dumps(retjson)

      

      
      
      

    
    # retjson['mongoresult'] = str(maxid)

    # return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
