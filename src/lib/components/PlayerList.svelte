<script lang="ts">
  import { gameStore } from "../../stores";

  const { players } = gameStore;

</script>

<main>
  <h1>Players:</h1>
  {#each $players as player}
    <p class:czar={player.isCzar} class:played={player.playedCard}>{player.name}</p>
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
  
  .played {
    border-left: solid white 15px;  
  }

  .czar {
    border-left: solid black 15px;
    /*background-color: black;
    font-weight: bolder;*/
  }
</style>
