<script lang="ts">
  import { Socket, io } from "socket.io-client";
  import UsernameForm from "./UsernameForm.svelte";
  import PlayerList from "./PlayerList.svelte";
  import Board from "./Board.svelte";
  import Hand from "./Hand.svelte";
  import { PUBLIC_SOCKET_URL } from '$env/static/public'
  export let data;
  $: roomName = data.roomName;

  const maxCards = 5;

  let username: string;
  let socket: Socket;
  let players: string[] = [];
  let cards: string[] = [];
  let serverMessage: string = "";

  function onUsernameEntered(event: CustomEvent) {
    username = event.detail.username;
    socket = io(PUBLIC_SOCKET_URL);
    socket.on("connect", () => {
      console.log("socket connected");

      socket.emit("joinRoom", { username, roomName });
    });

    socket.on("updatePlayers", (newPlayers: string[]) => {
      players = newPlayers;
    });
    
    socket.on("recieveWhiteCards", (newCards: string[]) => {
      cards = [...cards, ...newCards];
    })
  }

  function drawCards() {
    if (cards.length == maxCards) return;
    socket.emit("requestWhiteCards", maxCards - cards.length);
  }

  function startGame() {
    
  }

</script>

<main>
  <h1>Room - {roomName}</h1>
  {#if !username || username.trim().length == 0}
    <UsernameForm on:usernameEntered={onUsernameEntered} />
  {:else}
  <button on:click={startGame}>Ready</button>
  <p>{serverMessage}</p>
    <div id="content">
      <PlayerList bind:players username={username}/>
      <Board />
    </div>
    <button on:click={drawCards}>Draw</button>
    <div id="hand">
      <Hand bind:cards />
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
  }

  #hand {
    text-align: center;
    padding: 20px 0 0 0;
  }

  #content {
    padding: 0 75px 0 75px;
    justify-content: space-between;
    display: flex;
    gap: 5;
  }
</style>
