# TO Blacklist 

![example](https://i.ibb.co/BzQB9p1/ss.png)

## Description

Script to set custom colors depending on whether the player/clan is enemy or ally.

## Installation

1. Make sure you have a userscript manager extension installed. (E.g., Tampermonkey)
2. Click [here](blacklist.user.js).
3. Follow the installation prompt to add the userscript.

## Usage
- Customize settings by clicking on the color pickers in the battle list.

## Configuration

To configure the userscript, edit the `listUrl` variable in the script with the path to your JSON list. The JSON list should follow this structure:

```json
{
    "enemy_player": [
        "Opex-Rah",
        "CashOut"
    ],
    "enemy_clan": [
        "bigYT",
        "JMPER"
    ],
    "ally_player": [
        "Opex-Rah",
        "CashOut"
    ],
    "ally_clan": [
        "bigYT",
        "JMPER"
    ]
}
```
Make sure to update the Access-Control-Allow-Origin header on your server to allow requests from the domain where the userscript is running.

If you have any more requests or changes, let me know on discord: fetchhh. 
