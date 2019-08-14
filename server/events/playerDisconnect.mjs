import * as alt from 'alt';
import * as saveEvents from '../database/saveevents.mjs';

console.log('Loaded: events->playerDisconnect.mjs');

alt.on('playerDisconnect', (player, reason) => {
    // If the player isn't logged in; don't do anything else.
    if (player.guid === undefined) {
        alt.log(`${player.name} has disconnected.`);
        return;
    }

    // Check if the player has character data.
    if (player.characterData === undefined) {
        alt.log(`${player.name} has disconnected.`);
        return;
    }

    // The data that is saved on player log out.
    player.characterData.lastposition = JSON.stringify(player.pos);
    player.characterData.health = player.health;

    // Save the data.
    saveEvents.saveCharacterData(player);
    alt.log(`${player.name} has disconnected and logged out.`);
});