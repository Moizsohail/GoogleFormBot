# %%
from selenium.webdriver.common.keys import Keys
import argparse
from components import *
from selenium import webdriver
import pandas as pd
import time
import yaml
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
# parser = argparse.ArgumentParser(description='Process some integers.')
# parser.add_argument('id', metavar='N', type=int,
#                     help='Lums ID 21020569')
# parser.add_argument('p', metavar='N', type=str,
#                     help='Lums password')
# args = parser.parse_args()
# %%
# index = int(input("Index to start from: "))
# limit = int(input("Index to end on: "))
link = "https://docs.google.com/forms/d/e/1FAIpQLScwK8OAX_aGTP8LbNqZogVtV9CXRlB_PD0ymGiEV4pRhL8E6g/viewform?usp=sf_link"
chromedriver_dir = "chromedriver.exe"

chrome_options = Options()
driver = webdriver.Chrome(options=chrome_options)
driver.get(link)

# %%


def checkIfRadio(content):
    return not(len(content.find_elements_by_xpath('.//div[@role="radiogroup"]'))) == 0


def checkIfText(content):
    return not(len(content.find_elements_by_xpath('.//input[@type="text"]'))) == 0 or not(len(content.find_elements_by_xpath('.//textarea'))) == 0


def checkIfInput(content):
    # print(content.find_element_by_xpath('.//input').get_attribute('value'))
    return not len(content.find_elements_by_xpath('.//input')) == 0 or not len(content.find_elements_by_xpath('.//textarea')) == 0


def findAndClickNext(driver):
    n = driver.find_elements_by_xpath(
        "//div[@role='button']//span[text()='Next']")
    if len(n) > 0:
        n[0].click()
        return True
    else:
        return False


if __name__ == "__main__":
    objects = []
    while True:
        time.sleep(2)
        form = driver.find_element_by_tag_name('form')
        contents = form.find_elements_by_xpath(
            './/div[contains(@role,"listitem")]')
        inputs = [x for x in contents if checkIfInput(x)]
        for x in inputs:
            if checkIfRadio(x):
                objects += [Radio(x)]
            elif checkIfText(x):
                objects += [Text(x)]
        if not findAndClickNext(driver):
            break
    out_file = open("form.yml", "w")

    yaml.dump(objects, out_file)

    out_file.close()
driver.close()
# %%
