// ==UserScript==
// @name         Blacklist
// @version      1.0
// @author       Fetch
// @match        https://*.tankionline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      your_domain
// ==/UserScript==


// URL to fetch the JSON list
const listUrl = 'https://raw.githubusercontent.com/fetchhh/blacklist/main/list.json';

// Function to create color input elements
const createColorInput = (_class, bottom, value) => {
    const input = document.createElement('input');
    input.type = 'color';
    input.className = _class;
    input.value = value;
    input.style.cssText = `width: 50px;height:50px;position: absolute;bottom:${bottom}px;z-index: 9999;display:none;`;
    document.querySelector('body').append(input);
    return input;
}

// Create color inputs for ally and enemy
const input_ally = createColorInput('ally', '135', '#3be30d');
const input_enemy = createColorInput('enemy', '85', '#8b0000');

// Set event listeners for color input changes and store values in localStorage
['ally', 'enemy'].forEach(type => {
    const input = type === 'enemy' ? input_enemy : input_ally;
    const storageKey = `${type}Color`;


    if (localStorage.getItem('storageKey') !== null) {
        input.value = localStorage.getItem(storageKey);
    }

    input.addEventListener('change', () => {
        localStorage.setItem(storageKey, input.value);
    })
})


// Fetch player list
const getPlayerList = () => {
    return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
            method: 'GET',
            url: listUrl,
            nocache: true,
            onload: (response) => {
                if (response.status === 200) {
                    const list = JSON.parse(response.responseText);
                    resolve(list);
                }
            },
            onerror: (error) => {
                reject(error);
            },
        });
    });
};

// Process the player list
getPlayerList()
    .then((list) => {

        const {
            ally_clan,
            ally_player,
            enemy_clan,
            enemy_player
        } = list;

        // Function to update the color of an element
        const updateColor = (element, type) => {
            element.style.color = (type == 'enemy') ? input_enemy.value : (type == 'ally') ? input_ally.value : '';
        }

        // Update the colors of players based on conditions
        const updatePlayersStatus = () => {
            const battleStats = document.querySelector('.BattleTabStatisticComponentStyle-container');
            const cellsSelector = battleStats ? '.BattleTabStatisticComponentStyle-tablesContainer > div > table > tbody > tr > .BattleTabStatisticComponentStyle-nicknameCell > div > div > div > span' : '.UsersTableStyle-containerBattleListCommands > tbody > div > tr > td  > div > div:nth-child(2) > div > div > span';
            const cells = document.querySelectorAll(cellsSelector);

            cells.forEach((element) => {

                let player, clan;
                // Separate clan and player name
                const splittedText = element.textContent.split(' ');
                player = (splittedText.length > 1) ? splittedText[1] : splittedText[0];
                // Remove clan brackets 
                clan = (splittedText.length > 1) ? splittedText[0].replace(/\[|\]/g, '') : null;


                if (player) {
                    // Update the color depending on whether the player is enemy or ally
                    [enemy_player, ally_player].map((arr, index) => {
                        arr.forEach((item) => {
                            if (item.toLowerCase() == player.toLowerCase()) {
                                updateColor(element, index === 0 ? 'enemy' : 'ally');
                            }
                        })
                    })

                    if (clan) {
                        // Update the color depending on whether the clan is enemy or ally
                        [enemy_clan, ally_clan].map((array, index) => {
                            array.forEach((item) => {
                                if (item.toLowerCase() == clan.toLowerCase()) {
                                    updateColor(element, index === 0 ? 'enemy' : 'ally');
                                }
                            })
                        })
                    }
                }
            })

        }
        // Wait for the presence of the battleList or BattleStats and trigger updatePlayersStatus()
        const waitForSelector = () => {
            document.querySelector('.ProBattlesComponentStyle-table') || document.querySelector('.ProBattlesComponentStyle-scrollBattlePick') ? (input_ally.style.display = input_enemy.style.display = 'block', updatePlayersStatus()) : document.querySelector('.BattleTabStatisticComponentStyle-container') ? updatePlayersStatus() : (input_ally.style.display = input_enemy.style.display = 'none');
            requestAnimationFrame(waitForSelector);
        }

        // Initial loop
        waitForSelector();
    })
    .catch(error => {
        console.error('Error fetching list:', error);
    });
