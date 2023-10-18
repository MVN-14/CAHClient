<script lang="ts">
  import { gameStore } from "../../stores";

  export let username: string;

  const { players } = gameStore;
</script>

<main>
  <h1>Players:</h1>
  {#each $players as player}
    <p>{player.name}{player.name === username ? " (You)" : ""}</p>
  {/each}
</main>

<style>
  main {
    border: solid;
    width: 15vw;
    height: 70vh;
    text-align: left;
    padding: 0 10px 0 10px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }
</style>
