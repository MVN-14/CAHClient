<script lang="ts">
  import { gameStore } from "../../stores";
</script>

<main>
  <h1>Players:</h1>
  {#each $gameStore.players as player}
    <p
      class:czar={player.isCzar}
      class:played={player.playedCards === $gameStore.prompt?.pick}
    >
      {player.points} - {player.name}
    </p>
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
    border-left: solid transparent 15px;
    font-size: 24px;
    padding: 0 0 0 10px;
  }

  .played {
    border-color: white;
  }

  .czar {
    border-color: black;
  }
</style>
