import os
import threading
import time
import requests
import sys
import random
import requests
accountstxt=""
proxiestxt=""
count = 0
proxies = []
accounts=[]
script=""
targetign = "HubHunt"
#Gathers the global variables, uses them to run the bot file using cmd node command.
def run():
    global args
    global currentproxy
    global currentaccount
    global targetign
    #print(f'cmd /c "node {script} {targetign} {currentaccount} {currentproxy}"')
    os.system(f'cmd /c "node {script} {targetign} {currentaccount} {currentproxy}"')
print("""
 ██░ ██  █    ██  ▄▄▄▄       ██▓    ▄▄▄       █    ██  ███▄    █  ▄████▄   ██░ ██ ▓█████  ██▀███  
▓██░ ██▒ ██  ▓██▒▓█████▄    ▓██▒   ▒████▄     ██  ▓██▒ ██ ▀█   █ ▒██▀ ▀█  ▓██░ ██▒▓█   ▀ ▓██ ▒ ██▒
▒██▀▀██░▓██  ▒██░▒██▒ ▄██   ▒██░   ▒██  ▀█▄  ▓██  ▒██░▓██  ▀█ ██▒▒▓█    ▄ ▒██▀▀██░▒███   ▓██ ░▄█ ▒
░▓█ ░██ ▓▓█  ░██░▒██░█▀     ▒██░   ░██▄▄▄▄██ ▓▓█  ░██░▓██▒  ▐▌██▒▒▓▓▄ ▄██▒░▓█ ░██ ▒▓█  ▄ ▒██▀▀█▄  
░▓█▒░██▓▒▒█████▓ ░▓█  ▀█▓   ░██████▒▓█   ▓██▒▒▒█████▓ ▒██░   ▓██░▒ ▓███▀ ░░▓█▒░██▓░▒████▒░██▓ ▒██▒
 ▒ ░░▒░▒░▒▓▒ ▒ ▒ ░▒▓███▀▒   ░ ▒░▓  ░▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒ ░ ░▒ ▒  ░ ▒ ░░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░
 ▒ ░▒░ ░░░▒░ ░ ░ ▒░▒   ░    ░ ░ ▒  ░ ▒   ▒▒ ░░░▒░ ░ ░ ░ ░░   ░ ▒░  ░  ▒    ▒ ░▒░ ░ ░ ░  ░  ░▒ ░ ▒░
 ░  ░░ ░ ░░░ ░ ░  ░    ░      ░ ░    ░   ▒    ░░░ ░ ░    ░   ░ ░ ░         ░  ░░ ░   ░     ░░   ░ 
 ░  ░  ░   ░      ░             ░  ░     ░  ░   ░              ░ ░ ░       ░  ░  ░   ░  ░   ░     
                       ░                                         ░  
                       
CURRENT OPTIONS: GRINDER, HUNTER, HARDBOT, SILENTBOT, WDRBOT, APEALER, SPAMBOT
COPYRIGHT : FREEMONEYHUB DISCORD.GG/PITBOTS (ALL FAGGOTS RESERVED)
""")
bottype=input("[?] ENTER OPTION : ")
if bottype.lower()=="grinder":
    script="grinder.js"
elif bottype.lower()=="hunter":
    script="hunter.js"
elif bottype.lower()=="hardbot":
    script="hard.js"
elif bottype.lower()=="silentbot":
    script="silent.js"
elif bottype.lower()=="wdrbot":
    script="wdrbot.js"
elif bottype.lower()=="apealer":
    script="apeal.js"
elif bottype.lower()=="spambot":
    script="spammer.js"
else:
    sys.exit("Pfft")

delay=15
def getdelay():
    num=random.randint(2, 4)
    return(num)

accountstxt="alts.txt"
proxiestxt="proxies.txt"

with open(proxiestxt, "r") as file:
    for i in file.readlines():
        a=i.strip()
        if a:
            proxies.append(a)

with open(accountstxt, "r") as f:
    for i in f.readlines():
        args = i.strip()
        if args:
            accounts.append(args)

botamount=int(input("Enter the amount of bots: "))
if botamount>len(accounts):
    botamount=len(accounts)

link = "https://api.mojang.com/users/profiles/minecraft/" + targetign
data = requests.get(link).json()
targetign = data["name"]
args = ""
currentproxy =""
currentaccount=""

amountofaccountsinlist=len(accounts)
randomnumbers=random.sample(range(amountofaccountsinlist), botamount)

for i in randomnumbers:
    currentaccount=accounts[i]
    currentproxy=proxies[i]
    t=threading.Thread(target=run)
    t.start()
    currentdelay=getdelay()
    time.sleep(currentdelay)
