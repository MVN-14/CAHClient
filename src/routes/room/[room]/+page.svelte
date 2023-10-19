<script lang="ts">
  import { Board, PlayerList, UsernameForm } from "$lib/components";
  import { gameStore, getPlayer, socketStore } from "../../../stores";
  import { initializeSocket } from "$lib/socket";

  export let data;

  const maxCards = 7;

  let roomName: string;

  $: roomName = data.roomName;

  function onUsernameEntered(event: CustomEvent) {
    const username = event.detail.value;
    initializeSocket(username, roomName);
  }

  function onDraw() {
    const player = $gameStore.players.find(p => p.socketId === $socketStore.id);
    if (!player) { return }

    const numCards = player.cards.length;
    if (numCards < maxCards) {
      $socketStore.emit("drawCards", maxCards - numCards);
    }
  }

  function onReady() {
    $socketStore.emit("ready");
  }
</script>

<main>
  <h1>Room - {roomName}</h1>
  {#if !$socketStore}
    <UsernameForm on:usernameEntered={onUsernameEntered} />
  {:else}
    {#if !$gameStore.started}
      <button on:click={onReady}>Ready</button>
    {/if}
    <p>{$gameStore.status}</p>
    <div id="content">
      <PlayerList />
      <Board />
    </div>
    {#if $gameStore.started}
      <button on:click={onDraw}>Draw</button>
    {/if}
  {/if}
</main>

<style>
  main {
    text-align: center;
  }

  #content {
    padding: 0 75px 0 75px;
    justify-content: space-between;
    display: flex;
    gap: 5;
  }
</style>
