# User controller

class UserController:
    
    #user = {}
    
    def __init__(self, ui, model, data):
        self.ui = ui
        self.model = model
        self.user = data.copy()
        
        # welcomes user
        self.ui.welcome(self.user["name"])

        # print few insensitive userdata
            # get data from db
        rdata = ["inc", "exp"]
        data = self.model.db.query(self.user["id"], rdata = rdata, _type=2)
            # print outdata
        self.ui.showdata(data)
            
        # print menu
        # get menu request
        # call up appropriate response

