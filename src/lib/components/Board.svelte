<script lang="ts">
  import Card from "./Card.svelte";
  import Hand from "./Hand.svelte";
  import { gameStore, getPlayer, socketStore } from "../../stores";
</script>

<main>
  <div class="mainContainer">
    <div class="prompt">
      {#if $gameStore.prompt}
        <Card text={$gameStore.prompt.text} color="black" />
      {/if}

      {#if ["reading", "selecting"].includes($gameStore.status)}
        {#each $gameStore.playedCards as card}
          <Card
            color="white"
            text={card.text}
            faceDown={card.faceDown}
            on:click={(_) => {
              if (!getPlayer($socketStore.id).isCzar) {
                return;
              }

              if($gameStore.status === "reading") {
                $socketStore.emit("revealCard", card);
              } else if ($gameStore.status === "selecting") {
                $socketStore.emit("selectCard", card);
              }
            }}
          />
        {/each}
      {:else}
        <div class="playedCards">
          {#each $gameStore.playedCards as _, i}
            <div
              style="position: absolute; left: 300px; translate: {i * 50}px 0;"
            >
              <Card faceDown color="white" text={"Clone Against Humanity"} />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  <div class="handContainer">
    <Hand
      cards={$gameStore.players.find((p) => p.socketId === $socketStore.id)
        ?.cards ?? []}
    />
  </div>
</main>

<style>
  .prompt {
    display: flex;
    padding: 25px 0 25px 75px;
  }

  main {
    border: solid;
    width: 70vw;
    height: 70vh;
    position: relative;
  }

  .playedCards {
    justify-content: space-evenly;
    flex-wrap: wrap;
    max-width: 75vw;
    display: flex;
  }

  .handContainer {
    position: absolute;
    bottom: 15px;
    width: 100%;
  }
</style>
