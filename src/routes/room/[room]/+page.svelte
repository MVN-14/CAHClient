<script lang="ts">
  import type { Socket } from "socket.io-client";
  import { Board, PlayerList, UsernameForm } from "$lib/components";
  import { userStore, gameStore } from "../../../stores";
  import { initializeSocket } from "$lib/socket";

  export let data;
  $: roomName = data.roomName;

  const maxCards = 7;
  const { cards, username } = userStore;
  const { status, started } = gameStore;

  let socket: Socket;

  function onUsernameEntered(event: CustomEvent) {
    username.set(event.detail.value);
    socket = initializeSocket(socket);
  }

  function drawCards() {
    if ($cards.length == maxCards) return;
    socket.emit("requestWhiteCards", maxCards - $cards.length);
  }

  function onReady() {
    socket.emit("ready");
  }
</script>

<main>
  <h1>Room - {roomName}</h1>
  {#if $username.length == 0}
    <UsernameForm on:usernameEntered={onUsernameEntered} />
  {:else}
    <button on:click={onReady}>Ready</button>
    <p>{$status}</p>
    <div id="content">
      <PlayerList />
      <Board />
    </div>
    {#if $started}
      <button on:click={drawCards}>Draw</button>
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
