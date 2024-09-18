import bcrypt
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from connection import create, get_db
from model import base,companyRegistration
from schema import company, status, companylogin as cl
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

base.metadata.create_all(bind=create)

regex_mail = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def is_valid_mail(mail:str) -> bool:
    return re.match(regex_mail,mail) is not None

@app.post("/insertCompany", response_model=status)
async def insertCompany(company:company, db:Session=Depends(get_db)):
    if not is_valid_mail(company.mail):
        raise HTTPException(status_code=401,detail="Correo no valido")
    name_company = db.query(companyRegistration).filter(companyRegistration.company_user==company.company_user).first()
    if name_company:
        raise HTTPException(status_code=401,detail="compañia ya existente")
    encriptacion = bcrypt.hashpw(company.password.encode("utf-8"), bcrypt.gensalt())
    data = companyRegistration(
        company_user=company.company_user,
        mail=company.mail,
        password=encriptacion.decode('utf-8')
    )
    db.add(data)
    db.commit()
    db.refresh(data)
    return status(status="La compañia a sido registrada correctamente")

@app.post("/loginCompany", response_model=status)
async def logincompany(company_user:cl, db:Session=Depends(get_db)):
    db_company = db.query(companyRegistration).filter(companyRegistration.company_user == company_user.company_user).first()
    if db_company is None:
        raise HTTPException(status_code=400, detail="Compañia no existe")
    if not bcrypt.checkpw(company_user.password.encode('utf-8'), db_company.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Contraseña Incorrecta")
    return status(status="Inicio de sesion exitoso")