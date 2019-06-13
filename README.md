
# Symulacja sieci Bluetooth mesh

W opisywanym projekcie zajęliśmy się tematem (rozproszonej) sieci Bluetooth w ramach zajęć symulacji procesów dyskretnych.

### Instukcja
Aby rozpocząć wystarczy uruchomić plik index.html.
Zmianę parametrów można dokonać modyfikują plik config.js

### Protokół bluetooth

(Rozproszona) sieć bluetooth jest tworzona na rozsyłaniu danych poprzez kanały rozgłaszające, na podstawie opisów zawartych w standardzie bluetooth. Sieć wykorzystuje eksosytem miliardów dostępnych na rynku kompatybilnych urządzeń,  takich jak: smartfony, laptopy oraz urządzenia “low-power”, co czyni ją bardzo przestronną (pozwala na jej wszechstronne wykorzystanie\otwartą na modyfikacje).

- **Model “publish/subscribe”**: Wymiana danych w (rozproszonej) sieci jest opisana z wykorzystaniem paradygmatu “publish/subscribe”. Węzły generujące wiadomości nadają je na adres, w czasie gdy zainteresowane węzły przyjmujące, dany adres subskrybują.
- **“Flooding with restricted relaying”**: “Flooding” jest najprostszym i bezpośrednim sposobem na propagację wiadomości w sieci wykorzystującej nadawanie rozgłaszania. Gdy urządzenie nada wiadomość, ta może zostać odebrana przez wiele przekaźników, które podadzą ją dalej. (Rozproszona) sieć bluetooth korzysta z zasad, które zabraniają urządzeniom na ponowne przekazanie ostatnio otrzymanych wiadomości aby zapobiec wyścigom przesłaniu wiadomości wieloma drogami.
- **Oszczędność mocy z wykorzystaniem “friendship”**: Urządzenia, wykorzystujące systemy “low-power” mogą współpracować z urządzeniami typu “always-on”, które będą przechowywać i przekazywać dalej wiadomości w ich imieniu, wykorzystując system znany jako “friendship”. Wspomniana technologia to specjalne połączenie pomiędzy węzłem “low-power” i węzłem zaprzyjaźnionym. Tworzenie tego połączenia rozpoczyna się od urządzenia “low power”. Po połączeniu węzeł zaprzyjaźniony odbywa operacje, które pozwalają na zmniejszenie (ilości) energii wykorzystywanej na węzłach “low-power”. “Zaprzyjaźniony” węzeł wykorzystuje dane tymczasowe, które przechowują wszystkie wiadomości wystosowane do urządzenia “low-power” i dostarcza je do niego w razie potrzeby. Dodatkowo zaprzyjaźniony węzeł przesyła łatki bezpieczeństwa, wystosowane do węzła “low-power”.

Schemat:

![Obraz 1](/images/image1.jpg)

"Friendship":

![Obraz 2](/images/image2.jpg)


### Pomiary

Jako rzeczywisty budynek do naszego projektu wybraliśmy Centrum Energetyki AGH przy ulicy Czarnowiejskiej 30. Ma on 95 m długości i 18 m szerokości co daje 6840 m^2 na czterech rozpatrywanych przez nas piętrach. Budynek ten pełni funkcje biurowe i laboratoryjne więc uważamy, że bardzo dobrze nadaje się na wzór do symulacji sieci bluetooth mesh.

Parter:

![Demo 1](/images/parter.png)


Piętro 1:

![Demo 2](/images/pietro2.png)

Piętro 2:

![Demo 3](/images/pietro3.png)

Piętro 3:

![Demo 4](/images/pietro4.png)


Piętro 4:

![Demo 5](/images/pietro5.png)

### Wyniki pomiarów

Moc mierzyliśmy w decybelach [dB]. Urządzenia obok siebie notowały spadek mocy o 25-36 dB w zależności od pomieszczenia  i ta wielkość została uznana za referencyjną. Największy spadek jaki udało się zarejestrować przed przerwaniem łączności wynosił ok 90 dB.

#### Próba odległościowa na korytarzu

Próba zasięgu na pustym korytarzu budynku. Korytarz łączył różne laboratoria, znajdowały się po lewej lub prawej skrzynki elektryczne.

Charakterystyka odległościowa:

| Dystans   m     | Moc    dB       |
| :-------------: |:-------------:|
| 0 (ref)   | -36 |
| 4.5      | -60     |
| 6 | -62     |
| 8 | -65 |
| 9 | -68 |
| 11.25 | -65 |
| 12 | -70 |
| 14 | -72 |
| 18 | -75 |
| 21 | -80 |
| 24 | -83 |
| 25+ | XX|


#### Określenie charakterystyki spadku mocy w zależności od odległości

Spadek mocy z odległością:

![Demo 6](/images/wykres.png)

#### Zachowanie się sygnału na schodach

Schody stanowią specyficzne środowisko gdyż odległości muszą być uwzględniane także w pionie, oraz istnieją inne rodzaje przeszkód (barierki i sama konstrukcja schodów). Ponieważ klatka schodowa to jedna pomieszczenie rozciągające się na kilka pięter, odpowiednie ustawienie węzłów może zmniejszyć ich ilość, zużycie mocy i ogólne koszty.

Klatka schodowa jest pokryta tynkiem, barierki są metalowe (prawdopodobnie aluminiowe lub ze stali nierdzewnej).

Pomiary wykonywane były od miejsca referencyjnego ok 0,4 m od środka pierwszego schodka.
Kolejne punkty znajdują się w środkowej schodka po lewej lub prawej. 

| Miejsce     |    dB       |
| :-------------: |:-------------:|
| parter (ref)   | -25 |
| półpiętro      | -55     |
| półpiętro + barierki | -73     |
| piętro | -65 |
| piętro jeden nad drugim | -65 |
| półtora piętra | -81 |

Widać że metalowe barierki stanowią poważną przeszkodą na drodze sygnału. Jednak jeśli umiejętnie postawi się węzeł moc spada nieznacznie i komunikacja w drodze parter-półpiętro-piętro, możliwy jest w miarę bez zakłóceń. W przypadku montażu urządzeń na suficie i ścianie ok 3 m nad poziomem półpiętra powinno wyeliminować problem z przeszkodami w postaci ludzi czy barierek.

### Walidacja

Pomiar z urządzenia ustawionego pomiędzy Redmi i HUAWEI P9 lite które były od siebie oddalone o 50m (w taki sposób: Redmi -25m- pomiar -25m- HUAWEI P9 lite):

![Demo 7](/images/25.jpg)

Pomiar z urządzenia ustawionego pomiędzy Redmi i HUAWEI P9 lite które były od siebie oddalone o 64m (w taki sposób: Redmi -32m- pomiar -32m- HUAWEI P9 lite):

![Demo 8](/images/32.jpg)

### Wnioski pomiarów

- Ściany między pokojami są grube (ok 20-30cm) oraz zrobione z betonu prawdopodobnie zbrojonego. Urządzenia znajdujące się w dwóch sąsiednich pokojach nie potrafią się między sobą skomunikować.

- Sufity/podłogi również są zrobione z grubego betonu i również urządzenia znajdujące się nad sobą (na różnych piętrach) nie mogą się ze sobą komunikować.

- W budynku wszystkie drzwi (które nie prowadzą do pomieszczeń ściśle chronionych) zrobione są z płyty wiórowej. Straty na mocy sygnału przy przechodzeniu przez drzwi są niewielkie. Przechodzenie sygnału przez dwa drzwi pod rząd w lini prostej również nie sprawia problemów.

- Rozwiązaniem, które powinno spełniać oczekiwania są węzły umieszczone na korytarzach i to przez nie będzie prowadzona komunikacja w całym budynku. Sygnał w linii prostej w korytarzu może rozchodzić się na 25 m więc węzły w korytarzu mogą być rzadsze, jednak przy dużej ilości zakrętów czy zakłóceń (szafy elektryczne itp) powinny być gęściej. 

- Na klatce schodowej sygnał rozchodzi się poprawnie.


### Wnioski ogólne

- Rozmieszczenie przekaźników ma kluczowe znaczenie dla jakości sieci.

- Zagęszczenie fal powoduje znaczne spadki jakości sieci bluetooth.

- Nie ma jednego "dobrego" schematu umiejscowienia przekaźników.

- Rozwój technologi może w przyszłości się skutecznie sprawdzać w tzw."Smart Home"
