from sqlalchemy import String, Column
from connection import base

class companyRegistration(base):
    __tablename__ = "company"
    company_user = Column(String(50), primary_key=True)
    mail = Column(String(200), nullable=False, unique=True)
    password = Column(String(80), nullable=False)