from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI(
    title="Vet Appointment Manager",
)


@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")
