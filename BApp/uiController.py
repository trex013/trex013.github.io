# Ui Controller

class UiController:
    def menu(self):
        menu = "welcome"
        print(menu)

    def login(self):
        data = [0,0]
        data[0] = input("Enter username: ")
        data[1] = input("Enter password: ")
        return data
        
    def userUi(self):
        return UserUi()

class UserUi:
    def welcome (self, name):
        print("welcome user {}.".format(name))

    def showdata(self, data):
        print(data)