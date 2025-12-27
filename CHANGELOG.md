### 1.1.0
* 36 tables for pirate ship names (bringing new total to 212).
* A **Generate Pirate Ship Name** macro that rolls a pirate ship name and whispers it to the user.
* Documented API methods:
  * `generatePirateShipName` for generating a pirate ship name.

### 1.0.0
* 176 rollable tables for generating personal and ship names from the major European powers active in the Caribbean during the Golden Age of Piracy (the Spanish Empire, the British Empire, the Kingdom of France, and the Dutch West India Company).
* A **Generate Name** macro that provides a UI for users to generate names for people and ships, which are whispered to that user.
* Documented API methods:
    * `generateGivenName` for generating masculine or feminine given names from any of the four provided nations.
    * `generateSurname` for generating a single surname from any of the four provided nations.
    * `generateName` for generating a full name from any of the four provided nations (including culturally-specific variations and forms).
    * `generateShipName` for generating the name of a Spanish, British, French, or Dutch merchant or naval ship.
    * `openGenerateNameDialog` for rendering the **Generate Name** UI
    * `rollTable` to allow other methods to reuse this module's method for returning a result from a rollable table.
