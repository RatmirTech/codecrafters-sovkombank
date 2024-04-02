import requests
from bs4 import BeautifulSoup

# URL страницы с данными о курсе валют
url = "https://quote.rbc.ru/tag/currency"

# Отправляем GET-запрос на указанный URL
response = requests.get(url)

# Получаем HTML-код страницы
html_content = response.text

# Создаем объект BeautifulSoup для парсинга HTML-кода
soup = BeautifulSoup(response.content, "html.parser")

#Даты
date1 = soup.find("span", class_="q-item__date__text")
print(date1.text)

#Заголовки
title1 = soup.find("span", class_="q-item__title js-rm-central-column-item-text")
print(title1.text)

#по тегу тоже
url = "https://1prime.ru/simple_dirkham/"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

date2 = soup.find("div", class_="list-item__date")
print(date2.text)

title2 = soup.find("a", class_="list-item__title color-font-hover-only")
print(title2.text)

#вот тут по тегу
url = "https://1prime.ru/simple_juan/"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

date3 = soup.find("div", class_="list-item__date")
print(date3.text)

title3 = soup.find("a", class_="list-item__title color-font-hover-only")
print(title3.text)


url = "https://ru.investing.com/news/forex-news"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

date4 = soup.find("time", class_="mx-1 shrink-0 text-xs leading-4")
print(date4.text)

title4 = soup.find("a", class_="text-secondary hover:text-secondary hover:underline focus:text-secondary focus:underline whitespace-normal text-sm font-bold leading-5 !text-[#181C21] sm:text-base sm:leading-6 lg:text-lg lg:leading-7")
print(title4.text)

