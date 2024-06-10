import pytest
import time
from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestPythontest():
    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        self.vars = {}
  
    def teardown_method(self, method):
        self.driver.quit()

    def test_pythontest(self):
        # Helper function to handle clicking and typing
        def click_and_type(element_id, text):
            elem = self.driver.find_element(By.ID, element_id)
            elem.click()
            elem.clear()
            elem.send_keys(text)

        # Helper function to handle alerts
        def assert_alert_text(expected_text):
            alert = WebDriverWait(self.driver, 10).until(EC.alert_is_present())
            assert alert.text == expected_text
            alert.accept()
  
        # Test steps
        self.driver.get("https://selenium-testing-testing.web.app/")
        self.driver.set_window_size(652, 672)
  
        click_and_type("lastname", "NWUNELI")
        click_and_type("firstname", "LUCY")
        self.driver.find_element(By.ID, "addMemberBtn").click()
        assert_alert_text("Size must be greater than 0")
  
        click_and_type("GroupSize", "1")
        self.driver.find_element(By.ID, "addMemberBtn").click()
  
        click_and_type("lastname", "smith")
        click_and_type("firstname", "john")
        click_and_type("GroupSize", "2")
        self.driver.find_element(By.ID, "addMemberBtn").click()
  
        dropdown = self.driver.find_element(By.ID, "members")
        dropdown.find_element(By.XPATH, "//option[. = 'NWUNELI LUCY']").click()
        self.driver.find_element(By.ID, "deleteMemberBtn").click()
        assert_alert_text("ERROR! You must work in this function before to send to Staging Environment!")
  
        dropdown.find_element(By.XPATH, "//option[. = 'smith john']").click()
        self.driver.find_element(By.ID, "deleteMemberBtn").click()
        assert_alert_text("ERROR! You must work in this function before to send to Staging Environment!")

