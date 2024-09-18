from pydantic import BaseModel as bm

class status(bm):
    status:str

class company(bm):
    company_user:str
    mail:str
    password:str

class companylogin(bm):
    company_user:str
    password:str