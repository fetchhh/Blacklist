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

You can use a website like [Pastebin](https://pastebin.com/) to upload your own list.

Replace the `@connect` tag with the domain where the list is hosted:

`// @connect      pastebin.com`

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

If you don't want to load the JSON from an external source then just put it in the `listUrl` variable.

In case you host it on your own server, make sure to update the Access-Control-Allow-Origin header to allow requests from the domain where the userscript is running, you can either set it to `*` to allow all the domains or `https://your-domain.com` to allow one domain:

`Access-Control-Allow-Origin: *`\
`Access-Control-Allow-Origin: https://tankionline.com`
