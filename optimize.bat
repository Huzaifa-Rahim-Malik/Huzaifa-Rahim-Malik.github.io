@echo off
cd /d "%~dp0"
set PY=C:\Users\huzai\AppData\Local\Programs\Python\Python310\python.exe
if not exist "%PY%" set PY=python
"%PY%" -m pip install pillow --quiet
"%PY%" tools\optimize.py
pause
