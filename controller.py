"""
1. initialize the buget
2. display menu
3. get entered menu
4. perform appropriate action/ call appropriate controller
"""
from uiController import *
from modelController import *
from userController import *

class MainController:
    def __init__(self):
        self.model = ModelController()
        self.ui = UiController()
        self.ui.menu()
        self.login()
        
    def login(self):
        # display login form
        # Accept the data
        data = self.ui.login()
        print (data)
        # Validate it
        valid = self.model.validate(data)
        
        
        # Perform action on validation
        if valid:
            # gets the user data stored
            userdata = self.model.getuserdata(data)
            print(userdata)
            # starts the user interface
            self.user = UserController(
            	            self.ui.userUi(),
                         self.model,
            	            userdata
            )
        else:
            print("Login Failed")
            self.login()
        
    def signup(self):
        pass
        
    def requestParser(self):
        pass

    def logout(self):
        pass    
        
MainController()