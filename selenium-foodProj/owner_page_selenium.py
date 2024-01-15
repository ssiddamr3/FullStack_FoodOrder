from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

options = Options()
options.add_argument('--disable-extensions')
options.add_argument('--disable-gpu')
service = Service(executable_path='./chromedriver')
driver = webdriver.Chrome(service=service, options=options)
driver.get('http://localhost:3000/')

try:
    username = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    username.send_keys("owner1")

    password = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    password.send_keys("password143")

    loginBtn = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "loginBtn"))
    )
    loginBtn.click()

    updateButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "updatemenubutton"))
    )
    updateButton.click()

    updateItemButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "updateitemname-1"))
    )
    updateItemButton.click()

    updateItemTextField = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "itemname-1"))
    )
    updateItemTextField.clear()
    updateItemTextField.send_keys("Chicken Biryani")

    saveChangesButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "savechanges"))
    )
    saveChangesButton.click()

except TimeoutException as e:
    print(f"Timed out waiting for an element: {e}")
except NoSuchElementException as e:
    print(f"Element not found: {e}")
finally:
    time.sleep(5)
    driver.quit()
