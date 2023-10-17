<script lang="ts">
  export let cards: string[];
</script>

<main>
  {#each cards as card}
    <div class="card">
      {card}
    </div>
  {/each}
</main>

<style>
  main {
    justify-content: center;
    display: flex;
    gap: 15px;
  }

  .card {
    background-color: white;
    color: black;
    z-index: 5;
    height: 200px;
    width: 150px;
    border: solid white;
    border-radius: 7px;
    padding: 10px;
  }

  .card:hover {
    cursor: pointer;
    translate: 0 -100px;
  }
</style>
