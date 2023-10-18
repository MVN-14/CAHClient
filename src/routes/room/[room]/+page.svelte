<script lang="ts">
  import { Socket, io } from "socket.io-client";
  import UsernameForm from "./UsernameForm.svelte";
  import PlayerList from "./PlayerList.svelte";
  import Board from "./Board.svelte";
  import type { Player } from "./Player.ts";
  import { PUBLIC_SOCKET_URL } from "$env/static/public";
  import { userStore, gameStore } from "../../../stores";

  export let data;
  $: roomName = data.roomName;

  const maxCards = 7;
  const { cards, cardPlayed } = userStore;
  const { players } = gameStore;

  let username: string;
  let socket: Socket;
  let serverMessage: string = "";
  let prompt: string;

  function onUsernameEntered(event: CustomEvent) {
    username = event.detail.username;
    socket = io(PUBLIC_SOCKET_URL);
    socket.on("connect", () => {
      console.log("socket connected");

      socket.emit("joinRoom", { username, roomName });
    });

    cardPlayed.subscribe((card) => {
      if(!card) {
        return;
      }
      socket.emit("cardPlayed", card);
    });

    socket.on("updatePlayers", (newPlayers: Player[]) => {
      players.set(
        newPlayers.map((player) => ({
          name: player.name,
          ready: player.ready,
        }))
      );
    });

    socket.on("recieveWhiteCards", (newCards: string[]) => {
      cards.set([...$cards, ...newCards]);
    });

    socket.on("serverMessage", (message: string) => {
      serverMessage = message;
    });

    socket.on("prompt", ({ text }: { text: string }) => {
      prompt = text;
    });
  }

  function drawCards() {
    console.log(cards);
    if ($cards.length == maxCards) return;
    socket.emit("requestWhiteCards", maxCards - $cards.length);
  }

  function ready() {
    socket.emit("ready");
  }
</script>

<main>
  <h1>Room - {roomName}</h1>
  {#if !username || username.trim().length == 0}
    <UsernameForm on:usernameEntered={onUsernameEntered} />
  {:else}
    <button on:click={ready}>Ready</button>
    <p>{serverMessage}</p>
    <div id="content">
      <PlayerList {username} />
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
