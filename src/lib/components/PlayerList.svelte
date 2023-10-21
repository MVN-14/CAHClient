<script lang="ts">
  import { gameStore } from "../../stores";
</script>

<main>
  <h1>Players:</h1>
  {#each $gameStore.players as player, i}
    <div class="row" class:highlighted={i % 2 == 0}>
    <p
      class="name"
      class:czar={player.isCzar}
      class:played={player.playedCards === $gameStore.prompt?.pick}
    >
      {player.name}
    </p>
    <p>
      {player.points}
    </p>
    </div>
  {/each}
</main>

<style>
  main {
    border: solid;
    width: 15vw;
    height: 70vh;
    text-align: left;
  }

  h1 {
    text-align: center;
    font-size: 24px;
  }

  .name {
    border-left: solid transparent 20px;
  }

  p {
    margin: 10px 0 10px 0;
    font-size: 24px;
    padding: 0 5px 0 5px;
  }

  .played {
    border-color: white;
  }

  .czar {
    border-color: black;
  }

  .highlighted {
    background: #3a3a3a;
  }

  .row {
    padding: 0 0 0 5px;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
</style>
