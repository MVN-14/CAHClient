<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let text: string;
  export let color: "black" | "white";
  export let faceDown: boolean = false;
  export let inHand: boolean = false;
</script>

<div
  on:click={() => dispatch("click", text)}
  class="card"
  class:black={color == "black"}
  class:white={color == "white"}
  class:inHand={inHand}
  role="none"
>
  {faceDown ? "Cards Against Humanity" : text}
</div>

<style>
  .card {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    font-weight: bold;
    font-size: 14px;
    z-index: 5;
    height: 175px;
    width: 115px;
    border-radius: 7px;
    padding: 10px;
  }

  .black {
    background-color: black;
    color: white;
  }

  .white {
    background-color: white;
    color: black;
    border: solid black thin
  }

  .inHand:hover {
    cursor: pointer;
    translate: 0 -100px;
  }
</style>
