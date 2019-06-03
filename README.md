# Bluetooth mesh simulation

This is the simulation of Bluetoothe mesh network for Discrete Simulation course.

### Bluetooth protocol 
The Bluetooth Mesh Profile builds on the broadcasting of data over the Bluetooth low-energy advertising channels, 
as specified in the Bluetooth core specification. 
Bluetooth mesh uses an ecosytem of billions of compatible devices such as smartphones, laptops and low-power devices on the market today, making it very versitale.

- **The publish/subscribe model**: The exchange of data within the mesh network is described as using a publish/subscribe paradigm. Nodes that generate messages publish the messages to an address, and nodes that are interested in receiving the messages will subscribe to such an address.
- **Flooding with restricted relaying**: Flooding is the most simple and straightforward way to propagate messages in a network using broadcast. When a device transmits a message, that message may be received by multiple relays that in turn forward it further. Bluetooth mesh includes rules to restrict devices from re-relaying messages that they have recently seen and to prevent messages from being relayed through many hops.
- **Power saving with "friendship"**: Devices that need low-power support can associate themselves with an always-on device that stores and relays messages on their behalf, using the concept known as friendship. Friendship is a special relationship between a low-power node and one neighboring "friend" node. Friendship is first established by the low-power node; once established, the friend node performs actions that help reduce the power consumption on the low-power node. The friend node maintains a cache that stores all incoming messages addressed to the low-power node and delivers those messages to the low-power node when requested. In addition, the friend node delivers security updates to the low-power node.


# Symulacja sieci bluetooth

W opisywanym projekcie zajęliśmy się tematem (rozproszonej) sieci Bluetooth w ramach zajęć symulacji procesów dyskretnych.

### Protokół bluetooth

(Rozproszona) sieć bluetooth jest tworzona na rozsyłaniu danych poprzez kanały rozgłaszające, na podstawie opisów zawartych w standardzie bluetooth. Sieć wykorzystuje eksosytem miliardów dostępnych na rynku kompatybilnych urządzeń,  takich jak: smartfony, laptopy oraz urządzenia “low-power”, co czyni ją bardzo przestronną (pozwala na jej wszechstronne wykorzystanie\otwartą na modyfikacje).

- **Model “publish/subscribe”**: Wymiana danych w (rozproszonej) sieci jest opisana z wykorzystaniem paradygmatu “publish/subscribe”. Węzły generujące wiadomości nadają je na adres, w czasie gdy zainteresowane węzły przyjmujące, dany adres subskrybują.
- **“Flooding with restricted relaying”**: “Flooding” jest najprostszym i bezpośrednim sposobem na propagację wiadomości w sieci wykorzystującej nadawanie rozgłaszania. Gdy urządzenie nada wiadomość, ta może zostać odebrana przez wiele przekaźników, które podadzą ją dalej. (Rozproszona) sieć bluetooth korzysta z zasad, które zabraniają urządzeniom na ponowne przekazanie ostatnio otrzymanych wiadomości aby zapobiec wyścigom przesłaniu wiadomości wieloma drogami.
- **Oszczędność mocy z wykorzystaniem “friendship”**: Urządzenia, wykorzystujące systemy “low-power” mogą współpracować z urządzeniami typu “always-on”, które będą przechowywać i przekazywać dalej wiadomości w ich imieniu, wykorzystując system znany jako “friendship”. Wspomniana technologia to specjalne połączenie pomiędzy węzłem “low-power” i węzłem zaprzyjaźnionym. Tworzenie tego połączenia rozpoczyna się od urządzenia “low power”. Po połączeniu węzeł zaprzyjaźniony odbywa operacje, które pozwalają na zmniejszenie (ilości) energii wykorzystywanej na węzłach “low-power”. “Zaprzyjaźniony” węzeł wykorzystuje dane tymczasowe, które przechowują wszystkie wiadomości wystosowane do urządzenia “low-power” i dostarcza je do niego w razie potrzeby. Dodatkowo zaprzyjaźniony węzeł przesyła łatki bezpieczeństwa, wystosowane do węzła “low-power”.

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


####Określenie charakterystyki spadku mocy w zależności od odległości

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

### Wnioski

- Ściany między pokojami są grube (ok 20-30cm) oraz zrobione z betonu prawdopodobnie zbrojonego. Urządzenia znajdujące się w dwóch sąsiednich pokojach nie potrafią się między sobą skomunikować.

- Sufity/podłogi również są zrobione z grubego betonu i również urządzenia znajdujące się nad sobą (na różnych piętrach) nie mogą się ze sobą komunikować.

- W budynku wszystkie drzwi (które nie prowadzą do pomieszczeń ściśle chronionych) zrobione są z płyty wiórowej. Straty na mocy sygnału przy przechodzeniu przez drzwi są niewielkie. Przechodzenie sygnału przez dwa drzwi pod rząd w lini prostej również nie sprawia problemów.

- Rozwiązaniem, które powinno spełniać oczekiwania są węzły umieszczone na korytarzach i to przez nie będzie prowadzona komunikacja w całym budynku. Sygnał w linii prostej w korytarzu może rozchodzić się na 25 m więc węzły w korytarzu mogą być rzadsze, jednak przy dużej ilości zakrętów czy zakłóceń (szafy elektryczne itp) powinny być gęściej. 

- Na klatce schodowej sygnał rozchodzi się poprawnie.

- Dane zostaną przekazane zespołowi od symulacji do implementacji w programie.

