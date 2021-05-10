import json


def cut_till_closing_brace(s):
    counter = 0
    final = ''
    for x in s:
        if x == '[':
            counter += 1

        elif x == ']':
            counter -= 1
        final += x
        if counter == 0:
            return final


class Input:
    pass


def clean(data):
    return json.loads(cut_till_closing_brace(data[4:]))


class Radio(Input):
    def __init__(self, web):
        self.data = web.find_element_by_xpath(
            "./div").get_attribute('data-params')
        params = clean(self.data)
        self.q = params[1]
        self.isvertical = params[3] == 2
        if self.isvertical:
            temp = params[4]
            options_raw = temp[0][1]
            self.options = [x[0] for x in options_raw]

        else:
            temp = params[4]
            self.options = [x[0] for x in temp[0][1]]


class Text(Input):
    def __init__(self, web):
        pass
