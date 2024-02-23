<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
  
    const dealsInDealership = writable([]);
    const dealershipId = writable('');
  
    onMount(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/common/dealsInDealership/${$dealershipId}`);
  
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
  
          const data = await response.json();
          dealsInDealership.set(data.dealsInDealership);
        } catch (error) {
          console.error('Error getting deals in dealership:', error);
        }
      };
  
      const form = document.getElementById('input');
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData();
      });
    });
  </script>
  
  <main class="p-6">
    <h1 class="text-3xl mb-4">Deals in Dealership</h1>
    <form id="input" class="mb-4">
      <label class="block">
        Dealership ID:
        <input type="text" name="dealership_id" required on:input={(e) => dealershipId.set(e.target.value)} class="mt-1 p-2 border rounded w-full" />
      </label>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Get Deals</button>
      <p class="text-gray-500 mt-2">Example ID: 6a18b4ec-407d-4f20-bb0d-b4108c2acfc5</p>
    </form>
  
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each $dealsInDealership as deal (deal._id)}
        <div class="bg-white p-4 rounded-md shadow-md">
          <h3 class="text-xl font-bold mb-2">Deal ID</h3>
          <p class="mb-2">{deal.deal_id}</p>
          <h3 class="text-xl font-bold mb-2">Car ID</h3>
          <p class="mb-2">{deal.car_id}</p>
        </div>
      {/each}
    </div>
  </main>
  
  
  