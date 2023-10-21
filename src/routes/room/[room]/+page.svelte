<script lang="ts">
  import { Board, PlayerList, UsernameForm } from "$lib/components";
  import { gameStore, socketStore } from "../../../stores";
  import { initializeSocket } from "$lib/socket";

  export let data;

  let roomName: string;

  $: roomName = data.roomName;

  function onUsernameEntered(event: CustomEvent) {
    const username = event.detail.value;
    initializeSocket(username, roomName);
  }

  function onDraw() {
    const player = $gameStore.players.find(
      (p) => p.socketId === $socketStore.id
    );
    if (!player) {
      return;
    }

    $socketStore.emit("drawCards");
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
    <p>{$gameStore.statusMessage}</p>
    <div id="content">
      <PlayerList />
      <Board />
    </div>
    {#if $gameStore.started}
      <button class="draw" on:click={onDraw}>Draw</button>
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

  button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
  }

  button:hover {
    cursor: pointer;
    background-color: white;
    color: black
  }

  .draw {
    margin: 15px 0 0 0;
  }
</style>
