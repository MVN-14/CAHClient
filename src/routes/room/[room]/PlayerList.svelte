<script lang="ts">
  export let players: string[];
  export let username: string;
</script>

<main>
  <h1>Players:</h1>
  {#each players as player}
    <p>{player}{player === username ? "(You)" : ""}</p>
  {/each}
</main>

<style>
  main {
    border: solid;
    width: 15vw;
    height: 60vh;
    text-align: left;
    padding: 10px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }
</style>
