# Bluetooth mesh simulation

This is the simulation of Bluetoothe mesh network for Discrete Simulation course.

### Bluetooth protocol 
The Bluetooth Mesh Profile builds on the broadcasting of data over the Bluetooth low-energy advertising channels, 
as specified in the Bluetooth core specification. 
Bluetooth mesh uses an ecosytem of billions of compatible devices such as smartphones, laptops and low-power devices on the market today, making it very versitale.

- **The publish/subscribe model**: The exchange of data within the mesh network is described as using a publish/subscribe paradigm. Nodes that generate messages publish the messages to an address, and nodes that are interested in receiving the messages will subscribe to such an address.
- **Flooding with restricted relaying**: Flooding is the most simple and straightforward way to propagate messages in a network using broadcast. When a device transmits a message, that message may be received by multiple relays that in turn forward it further. Bluetooth mesh includes rules to restrict devices from re-relaying messages that they have recently seen and to prevent messages from being relayed through many hops.
- **Power saving with "friendship"**: Devices that need low-power support can associate themselves with an always-on device that stores and relays messages on their behalf, using the concept known as friendship. Friendship is a special relationship between a low-power node and one neighboring "friend" node. Friendship is first established by the low-power node; once established, the friend node performs actions that help reduce the power consumption on the low-power node. The friend node maintains a cache that stores all incoming messages addressed to the low-power node and delivers those messages to the low-power node when requested. In addition, the friend node delivers security updates to the low-power node. 
