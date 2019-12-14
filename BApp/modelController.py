# model controller

from dbController import *
	
class ModelController:
    def __init__(self):
        self.db = DbController()
        
    def data(self):
        print("this data")

    def validate (self, data):
        for x in data:
            if type(x) == int:
                return False
        return True

    def getuserdata(self, key):
        
        # searches for data with key
        user = self.db.query(key, _type = 1)
        
        # return data found
        return user
        