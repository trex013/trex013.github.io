# db Controller

# create an installer that creates the db table later
import sqlite3 as dbms

class DbController:
    
    table = "rex"
    
    def __init__(self, dbms):
        self.conn = dbms.connect("rex")
        print (self.conn)
        self.curs = self.conn.cursor()
    
    def cc(self):
        self.curs.close ()
        self.conn.close ()
        
    def query(self, key, rdata = [], idata = {}, _type = 0):
        # uses the key to query a db depending on the type
        if _type == 1:
            # query db
            
            sql = "select * from {}".format(self.table)
            #sql = #""#"insert into `rex` (ID, name, number, Address) values (1, 'abcd','','')"""
            #print(sql)
            	            
            data = self.curs.fetchall()
            
            self.cc
            
            if data:
                return data
            else:
                return data
            
            # dummy
            name = "Obisike"
            _id = 2
            
            return {"name":name, "id":_id}





#cursor.execute ( """CREATE TABLE rex (
#ID int ,
#name varchar (255),
#number varchar (255),
#Address varchar (255))""")

conn = dbms.connect("rex")
cur = conn.cursor()
cur.execute("""
	insert into rex (ID, name, number, Address) values (1, 'abcd','','')
""")

cur.execute("""
	select * from rex
	"""
)
	
x = cur.fetchall()

print(x)

x = DbController(dbms)

y = x.query([],_type=1)

print (y)