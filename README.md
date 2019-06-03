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

