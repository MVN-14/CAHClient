<script lang="ts">
  import type { Socket } from "socket.io-client";
  import { Board, PlayerList, UsernameForm } from "$lib/components";
  import { userStore, gameStore } from "../../../stores";
  import { initializeSocket } from "$lib/socket";

  export let data;
  $: roomName = data.roomName;

  const maxCards = 7;
  const { cards, username } = userStore;
  const { status } = gameStore;

  let socket: Socket;
  let prompt: string;

  function onUsernameEntered(event: CustomEvent) {
    console.log(event.detail.value)
    username.set(event.detail.value);
    socket = initializeSocket(socket);
  }

  function drawCards() {
    console.log($cards);
    if ($cards.length == maxCards) return;
    socket.emit("requestWhiteCards", maxCards - $cards.length);
  }

  function ready() {
    socket.emit("ready");
  }
</script>

<main>
  <h1>Room - {roomName}</h1>
  {#if $username.length == 0}
    <UsernameForm on:usernameEntered={onUsernameEntered} />
  {:else}
    <button on:click={ready}>Ready</button>
    <p>{$status}</p>
    <div id="content">
      <PlayerList />
      <Board {prompt} />
    </div>
    <button on:click={drawCards}>Draw</button>
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
