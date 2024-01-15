from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
# options.add_argument('--headless')  # Add any additional options if needed
options.add_argument('--disable-extensions')  # Add this line to disable extensions
options.add_argument('--disable-gpu')  # Add this line to disable GPU
service = Service(executable_path='/Users/sreekarreddy/Desktop/selenium-foodProj/chromedriver')
# Specify the explicit path to ChromeDriver
driver = webdriver.Chrome(service=service, options=options)
driver.get('http://localhost:3000/')


username = driver.find_element("id","username")
username.send_keys("sreekarreddy");
password = driver.find_element("id","password")
password.send_keys("deadshot")
loginBtn = driver.find_element("id","loginBtn")
loginBtn.click()
restaurantButton = None
itemButton = None

try:
    element = WebDriverWait(driver,10).until(
        EC.presence_of_element_located((By.CLASS_NAME,"loginText"))
    )
    restaurantButton = driver.find_element('id','restaurant-3')
except:
        driver.quit()

restaurantButton.click()

try:
      element = WebDriverWait(driver,10).until(
            EC.presence_of_element_located((By.ID,'addbutton'))
      )
      itemButton = driver.find_element("id","addbutton-5")
except:
      driver.quit()

itemButton.click()

viewCart = driver.find_element("id","viewcart")
viewCart.click()



time.sleep(5)
driver.quit()
